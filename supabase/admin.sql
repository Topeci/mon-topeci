-- =====================================================================
-- Espace admin TOPECI : à exécuter une fois, après schema.sql
-- =====================================================================

-- Personnes autorisées à entrer dans l'espace admin
create table if not exists admins (
  email      text primary key check (email = lower(email)),
  nom        text not null,
  actif      boolean not null default true,
  created_at timestamptz not null default now()
);
alter table admins enable row level security;
revoke all on admins from anon, authenticated;

insert into admins (email, nom) values
  ('bonijeanm@gmail.com', 'Jean-Marc'),
  ('ornellakouakouakou29@gmail.com', 'Cindy')
on conflict (email) do nothing;

-- Commissions versées aux ambassadeurs
create table if not exists paiements_commissions (
  id         uuid primary key default gen_random_uuid(),
  code       text not null references ambassadeurs(code),
  montant    integer not null check (montant > 0),   -- FCFA
  note       text,
  par        text,                                    -- email de l'admin
  created_at timestamptz not null default now()
);
create index if not exists paiements_commissions_code_idx on paiements_commissions (code);
alter table paiements_commissions enable row level security;
revoke all on paiements_commissions from anon, authenticated;

-- Commissions : gagné, déjà versé, reste dû
drop view if exists v_commissions;
create view v_commissions with (security_invoker = true) as
select a.code, a.nom, a.telephone, a.actif, a.commission_par_jouet,
       coalesce(v.commandes, 0)  as commandes,
       coalesce(v.jouets, 0)     as jouets,
       coalesce(v.jouets, 0) * a.commission_par_jouet as commission_fcfa,
       coalesce(p.paye, 0)       as deja_paye,
       coalesce(v.jouets, 0) * a.commission_par_jouet - coalesce(p.paye, 0) as reste_du
from ambassadeurs a
left join (
  select o.code_ambassadeur as code, count(distinct o.id) as commandes, sum(lc.quantite) as jouets
  from commandes o join lignes_commande lc on lc.commande_id = o.id
  where o.statut <> 'annulee'
  group by o.code_ambassadeur
) v on v.code = a.code
left join (select code, sum(montant) as paye from paiements_commissions group by code) p on p.code = a.code;
revoke all on v_commissions from anon, authenticated;

-- Chiffres de l'accueil admin, en un seul appel
create or replace function admin_tableau()
returns jsonb language sql stable set search_path = public as $$
  select jsonb_build_object(
    'contacts',          (select count(*) from contacts),
    'contacts_ci',       (select count(*) from contacts where marche = 'CI'),
    'contacts_diaspora', (select count(*) from contacts where marche = 'EUR'),
    'acheteurs',         (select count(*) from v_clients where nb_commandes > 0),
    'fideles',           (select count(*) from v_clients where nb_commandes > 1),
    'commandes',         (select count(*) from commandes where statut <> 'annulee'),
    'jouets',            (select coalesce(sum(lc.quantite), 0) from lignes_commande lc join commandes o on o.id = lc.commande_id where o.statut <> 'annulee'),
    'accord_whatsapp',   (select count(*) from contacts where consent_whatsapp and not desinscrit),
    'a_traiter',         (select count(*) from commandes where statut = 'nouvelle'),
    'en_cours',          (select count(*) from commandes where statut in ('confirmee','en_livraison')),
    'jouets_7j',         (select coalesce(sum(lc.quantite), 0) from lignes_commande lc join commandes o on o.id = lc.commande_id where o.statut <> 'annulee' and o.created_at >= now() - interval '7 days'),
    'inscrits_7j',       (select count(*) from contacts where created_at >= now() - interval '7 days'),
    'objectif_contacts', (select objectif_contacts from v_objectifs),
    'jouets_campagne',   (select jouets_vendus_campagne from v_objectifs),
    'objectif_jouets',   (select objectif_jouets from v_objectifs),
    'par_langue',        (select coalesce(jsonb_object_agg(langue, n), '{}'::jsonb) from (
                            select lc.langue, sum(lc.quantite) as n from lignes_commande lc join commandes o on o.id = lc.commande_id
                            where o.statut <> 'annulee' and lc.langue is not null group by lc.langue) x)
  );
$$;
revoke execute on function admin_tableau() from public, anon, authenticated;
