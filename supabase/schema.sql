-- =====================================================================
-- TOPECI : base clients & commandes (Supabase / PostgreSQL)
-- A coller une seule fois dans Supabase > SQL Editor > New query > Run.
-- Le script peut etre relance sans risque (create if not exists / or replace).
-- =====================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Normalisation des numeros : un meme client = un seul numero.
--   "07 01 02 03 04"  (CI)  -> +2250701020304
--   "06 12 34 56 78"  (FR)  -> +33612345678
--   "00225..."              -> +225...
-- ---------------------------------------------------------------------
create or replace function normaliser_telephone(t text, marche text default 'CI')
returns text language plpgsql immutable as $$
declare d text;
begin
  if t is null or btrim(t) = '' then return null; end if;
  d := regexp_replace(t, '[^0-9+]', '', 'g');
  if d like '00%' then d := '+' || substr(d, 3); end if;
  if d like '+%' then return d; end if;
  -- Numero ivoirien a 10 chiffres (01, 05, 07, 25, 27...)
  if length(d) = 10 and (marche is null or marche = 'CI') then return '+225' || d; end if;
  -- Numero ivoirien deja prefixe sans "+"
  if d like '225%' and length(d) = 13 then return '+' || d; end if;
  -- Numero francais 0X XX XX XX XX
  if length(d) = 10 and d like '0%' and marche = 'EUR' then return '+33' || substr(d, 2); end if;
  if d like '33%' and length(d) = 11 then return '+' || d; end if;
  return d;
end $$;

-- ---------------------------------------------------------------------
-- CONTACTS : une fiche par personne (client ou simple inscrit)
-- ---------------------------------------------------------------------
create table if not exists contacts (
  id                uuid primary key default gen_random_uuid(),
  telephone         text unique,
  email             text unique,
  prenom            text,
  nom               text,
  ville             text,
  pays              text,
  marche            text check (marche in ('CI','EUR')),
  langues_interet   text[] not null default '{}',   -- baoule, dioula, bete
  ages_enfants      text,                            -- ex : "3 ans, 6 ans"
  source_premiere   text,                            -- site, dino, qr, jeu, ambassadeur, import...
  sources           text[] not null default '{}',
  code_ambassadeur  text,                            -- ambassadeur qui a apporte le contact
  consent_whatsapp  boolean not null default false,
  consent_email     boolean not null default false,
  consent_date      timestamptz,
  desinscrit        boolean not null default false,
  notes             text,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),
  constraint contact_joignable check (telephone is not null or email is not null)
);
create index if not exists contacts_pays_idx on contacts (pays);
create index if not exists contacts_created_idx on contacts (created_at);

-- ---------------------------------------------------------------------
-- AMBASSADEURS (mamans, enseignantes...) payes a la commission
-- ---------------------------------------------------------------------
create table if not exists ambassadeurs (
  code                  text primary key,            -- ex : AWA, MME-KONE
  nom                   text not null,
  telephone             text,
  commission_par_jouet  integer not null default 1000,  -- FCFA
  actif                 boolean not null default true,
  created_at            timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- COMMANDES + LIGNES
-- ---------------------------------------------------------------------
create sequence if not exists commandes_seq;

create table if not exists commandes (
  id                 uuid primary key default gen_random_uuid(),
  numero             text unique not null
                       default 'TP-' || to_char(now(),'YYYY') || '-' || lpad(nextval('commandes_seq')::text, 5, '0'),
  contact_id         uuid not null references contacts(id),
  canal              text not null default 'site',   -- site, whatsapp, b2b, ambassadeur, revendeur, marche
  marche             text check (marche in ('CI','EUR')),
  devise             text,                           -- FCFA ou EUR
  adresse            text,
  ville              text,
  pays               text,
  livraison_mode     text,                           -- abidjan, interieur, france, international
  livraison_detail   text,
  frais_livraison    numeric(12,2) not null default 0,
  total_produits     numeric(12,2) not null default 0,
  total              numeric(12,2) not null default 0,
  total_est_minimum  boolean not null default false, -- frais "a partir de"
  code_ambassadeur   text references ambassadeurs(code),
  statut             text not null default 'nouvelle'
                       check (statut in ('nouvelle','confirmee','en_livraison','livree','annulee')),
  notes              text,
  brut               jsonb,                          -- donnees envoyees par le site, pour trace
  created_at         timestamptz not null default now()
);
create index if not exists commandes_contact_idx on commandes (contact_id);
create index if not exists commandes_created_idx on commandes (created_at);

create table if not exists lignes_commande (
  id             uuid primary key default gen_random_uuid(),
  commande_id    uuid not null references commandes(id) on delete cascade,
  produit_id     text not null,           -- livre-audio-baoule, livre-audio-dioula, cartes-audio-bete
  produit_nom    text,
  langue         text,                    -- baoule, dioula, bete
  quantite       integer not null check (quantite > 0),
  prix_unitaire  numeric(12,2) not null default 0
);
create index if not exists lignes_commande_idx on lignes_commande (commande_id);

-- ---------------------------------------------------------------------
-- Securite : personne ne lit ni n'ecrit depuis le navigateur.
-- Seul le site (cote serveur, cle "service_role") passe par les fonctions.
-- ---------------------------------------------------------------------
alter table contacts        enable row level security;
alter table ambassadeurs    enable row level security;
alter table commandes       enable row level security;
alter table lignes_commande enable row level security;

-- ---------------------------------------------------------------------
-- Langue d'un produit a partir de son identifiant
-- ---------------------------------------------------------------------
create or replace function langue_produit(produit text)
returns text language sql immutable as $$
  select case
    when produit ilike '%baoule%' then 'baoule'
    when produit ilike '%dioula%' then 'dioula'
    when produit ilike '%bete%'   then 'bete'
    else null end
$$;

-- ---------------------------------------------------------------------
-- enregistrer_contact(p) : cree OU complete une fiche, sans doublon.
-- p = {telephone, email, prenom, nom, ville, pays, marche, langues[],
--      ages_enfants, source, code_ambassadeur, consent_whatsapp, consent_email}
-- Regles : on ne remplace jamais une info connue par du vide,
--          un consentement donne n'est jamais retire automatiquement.
-- ---------------------------------------------------------------------
create or replace function enregistrer_contact(p jsonb)
returns uuid language plpgsql as $$
declare
  v_marche text := nullif(p->>'marche','');
  v_tel    text := normaliser_telephone(p->>'telephone', coalesce(v_marche,'CI'));
  v_email  text := lower(nullif(btrim(p->>'email'),''));
  v_source text := coalesce(nullif(p->>'source',''), 'site');
  v_langs  text[] := coalesce(array(select jsonb_array_elements_text(p->'langues')), '{}');
  v_cw     boolean := coalesce((p->>'consent_whatsapp')::boolean, false);
  v_ce     boolean := coalesce((p->>'consent_email')::boolean, false);
  v_id     uuid;
begin
  if v_tel is null and v_email is null then
    raise exception 'telephone ou email obligatoire';
  end if;

  select id into v_id from contacts
   where (v_tel is not null and telephone = v_tel)
      or (v_email is not null and email = v_email)
   order by (telephone = v_tel) desc nulls last
   limit 1;

  if v_id is null then
    insert into contacts (telephone, email, prenom, nom, ville, pays, marche, langues_interet,
                          ages_enfants, source_premiere, sources, code_ambassadeur,
                          consent_whatsapp, consent_email, consent_date)
    values (v_tel, v_email, nullif(p->>'prenom',''), nullif(p->>'nom',''),
            nullif(p->>'ville',''), nullif(p->>'pays',''), v_marche, v_langs,
            nullif(p->>'ages_enfants',''), v_source, array[v_source],
            upper(nullif(p->>'code_ambassadeur','')),
            v_cw, v_ce, case when v_cw or v_ce then now() end)
    returning id into v_id;
  else
    update contacts set
      telephone        = coalesce(telephone, v_tel),
      email            = coalesce(email, case when not exists (select 1 from contacts where email = v_email) then v_email end),
      prenom           = coalesce(nullif(p->>'prenom',''), prenom),
      nom              = coalesce(nullif(p->>'nom',''), nom),
      ville            = coalesce(nullif(p->>'ville',''), ville),
      pays             = coalesce(nullif(p->>'pays',''), pays),
      marche           = coalesce(v_marche, marche),
      langues_interet  = array(select distinct unnest(langues_interet || v_langs)),
      ages_enfants     = coalesce(nullif(p->>'ages_enfants',''), ages_enfants),
      sources          = case when v_source = any(sources) then sources else sources || v_source end,
      code_ambassadeur = coalesce(code_ambassadeur, upper(nullif(p->>'code_ambassadeur',''))),
      consent_whatsapp = consent_whatsapp or v_cw,
      consent_email    = consent_email or v_ce,
      consent_date     = case when (v_cw and not consent_whatsapp) or (v_ce and not consent_email)
                              then now() else consent_date end,
      desinscrit       = case when v_cw or v_ce then false else desinscrit end,
      updated_at       = now()
    where id = v_id;
  end if;

  return v_id;
end $$;

-- ---------------------------------------------------------------------
-- enregistrer_commande(p) : contact + commande + lignes en une fois.
-- p = {client:{...comme enregistrer_contact...}, canal, marche, devise,
--      adresse, ville, pays, livraison_mode, livraison_detail,
--      frais_livraison, total_produits, total, total_est_minimum,
--      code_ambassadeur, lignes:[{produit_id, produit_nom, quantite, prix_unitaire}]}
-- ---------------------------------------------------------------------
create or replace function enregistrer_commande(p jsonb)
returns jsonb language plpgsql as $$
declare
  v_client  jsonb := coalesce(p->'client','{}'::jsonb);
  v_langs   jsonb;
  v_contact uuid;
  v_cmd     uuid;
  v_numero  text;
  v_amb     text := upper(nullif(p->>'code_ambassadeur',''));
  l         jsonb;
begin
  if jsonb_array_length(coalesce(p->'lignes','[]'::jsonb)) = 0 then
    raise exception 'commande sans produit';
  end if;

  -- Les langues achetees enrichissent la fiche client
  select coalesce(jsonb_agg(distinct langue_produit(x->>'produit_id')) filter (where langue_produit(x->>'produit_id') is not null), '[]'::jsonb)
    into v_langs from jsonb_array_elements(p->'lignes') x;

  v_contact := enregistrer_contact(
    v_client || jsonb_build_object(
      'marche', p->>'marche',
      'source', coalesce(nullif(v_client->>'source',''), p->>'canal', 'site'),
      'langues', v_langs,
      'code_ambassadeur', v_amb));

  if v_amb is not null and not exists (select 1 from ambassadeurs where code = v_amb) then
    v_amb := null;  -- code inconnu : on garde la commande, sans l'attribuer
  end if;

  insert into commandes (created_at, statut, notes, contact_id, canal, marche, devise, adresse, ville, pays,
                         livraison_mode, livraison_detail, frais_livraison,
                         total_produits, total, total_est_minimum, code_ambassadeur, brut)
  values (coalesce((p->>'date')::timestamptz, now()),          -- date d'origine (imports)
          coalesce(nullif(p->>'statut',''), 'nouvelle'),
          nullif(p->>'notes',''),
          v_contact, coalesce(nullif(p->>'canal',''),'site'), nullif(p->>'marche',''),
          nullif(p->>'devise',''), nullif(p->>'adresse',''), nullif(p->>'ville',''),
          nullif(p->>'pays',''), nullif(p->>'livraison_mode',''), nullif(p->>'livraison_detail',''),
          coalesce((p->>'frais_livraison')::numeric,0), coalesce((p->>'total_produits')::numeric,0),
          coalesce((p->>'total')::numeric,0), coalesce((p->>'total_est_minimum')::boolean,false),
          v_amb, p)
  returning id, numero into v_cmd, v_numero;

  for l in select * from jsonb_array_elements(p->'lignes') loop
    insert into lignes_commande (commande_id, produit_id, produit_nom, langue, quantite, prix_unitaire)
    values (v_cmd, l->>'produit_id', l->>'produit_nom', langue_produit(l->>'produit_id'),
            greatest(coalesce((l->>'quantite')::int,1),1), coalesce((l->>'prix_unitaire')::numeric,0));
  end loop;

  return jsonb_build_object('commande_id', v_cmd, 'numero', v_numero, 'contact_id', v_contact);
end $$;

-- Les fonctions ne sont appelables qu'avec la cle serveur (service_role)
revoke execute on function enregistrer_contact(jsonb)  from public, anon, authenticated;
revoke execute on function enregistrer_commande(jsonb) from public, anon, authenticated;

-- ---------------------------------------------------------------------
-- VUES pour piloter (Supabase > Table Editor, ou export CSV)
-- ---------------------------------------------------------------------
drop view if exists v_objectifs, v_commissions, v_ventes_jour, v_liste_whatsapp, v_clients;
create or replace view v_clients as
select c.id, c.prenom, c.nom, c.telephone, c.email, c.ville, c.pays, c.marche,
       c.langues_interet, c.ages_enfants, c.source_premiere, c.sources, c.code_ambassadeur,
       c.consent_whatsapp, c.consent_email, c.desinscrit,
       count(distinct o.id)                         as nb_commandes,
       coalesce(sum(lc.quantite), 0)                as nb_jouets,
       array_remove(array_agg(distinct lc.langue), null) as langues_achetees,
       max(o.created_at)                            as derniere_commande,
       c.created_at
from contacts c
left join commandes o        on o.contact_id = c.id and o.statut <> 'annulee'
left join lignes_commande lc on lc.commande_id = o.id
group by c.id;

-- Pret pour une liste de diffusion WhatsApp : accord donne, pas desinscrit
create or replace view v_liste_whatsapp as
select prenom, nom, telephone, ville, pays, langues_interet, langues_achetees, nb_commandes
from v_clients
where consent_whatsapp and not desinscrit and telephone is not null
order by created_at desc;

-- Ventes par jour, par langue et par canal (suivi de campagne)
create or replace view v_ventes_jour as
select date_trunc('day', o.created_at)::date as jour, o.canal, o.marche, o.devise, lc.langue,
       count(distinct o.id) as commandes, sum(lc.quantite) as jouets,
       sum(lc.quantite * lc.prix_unitaire) as chiffre_affaires
from commandes o join lignes_commande lc on lc.commande_id = o.id
where o.statut <> 'annulee'
group by 1,2,3,4,5
order by 1 desc;

-- Commissions dues aux ambassadeurs
create or replace view v_commissions as
select a.code, a.nom, count(distinct o.id) as commandes, coalesce(sum(lc.quantite),0) as jouets,
       coalesce(sum(lc.quantite),0) * a.commission_par_jouet as commission_fcfa
from ambassadeurs a
left join commandes o on o.code_ambassadeur = a.code and o.statut <> 'annulee'
left join lignes_commande lc on lc.commande_id = o.id
group by a.code, a.nom, a.commission_par_jouet;

-- Compteur vers l'objectif : 1 000 contacts au 31 decembre
create or replace view v_objectifs as
select (select count(*) from contacts)                                         as contacts,
       1000                                                                    as objectif_contacts,
       (select count(*) from contacts where consent_whatsapp and not desinscrit) as contacts_whatsapp,
       (select coalesce(sum(lc.quantite),0) from lignes_commande lc
          join commandes o on o.id = lc.commande_id
         where o.statut <> 'annulee' and o.created_at >= '2026-11-16')        as jouets_vendus_campagne,
       2000                                                                    as objectif_jouets;

-- Les vues ne sont pas exposees publiquement non plus
revoke all on v_clients, v_liste_whatsapp, v_ventes_jour, v_commissions, v_objectifs from anon, authenticated;
