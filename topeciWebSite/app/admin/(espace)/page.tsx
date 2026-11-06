import Link from "next/link";
import { ArrowRight, PlusCircle } from "lucide-react";
import { fonction, lire } from "../../lib/admin/base";
import { exigerAdmin } from "../../lib/admin/session";
import { BoutonLien, Carte, EnTete, LANGUES, PastilleStatut, Vide, argent, date, n, nomClient } from "./ui";

export const metadata = { title: "Accueil" };

type Tableau = {
  contacts: number; contacts_ci: number; contacts_diaspora: number; acheteurs: number; fideles: number;
  commandes: number; jouets: number; accord_whatsapp: number; a_traiter: number; en_cours: number;
  jouets_7j: number; inscrits_7j: number; objectif_contacts: number; jouets_campagne: number; objectif_jouets: number;
  par_langue: Record<string, number>;
};

type CommandeCourte = {
  id: string; numero: string; created_at: string; statut: string; ville: string | null; total: number; devise: string | null;
  contacts: { prenom: string | null; nom: string | null } | null;
  lignes_commande: { quantite: number; langue: string | null }[];
};

function bonjour() {
  const h = parseInt(new Date().toLocaleString("en-GB", { hour: "2-digit", hourCycle: "h23", timeZone: "Africa/Abidjan" }), 10);
  return h < 18 ? "Bonjour" : "Bonsoir";
}

export default async function Accueil() {
  const admin = await exigerAdmin();
  const [t, aTraiter] = await Promise.all([
    fonction<Tableau>("admin_tableau"),
    lire<CommandeCourte[]>(
      "commandes?select=id,numero,created_at,statut,ville,total,devise,contacts(prenom,nom),lignes_commande(quantite,langue)" +
        "&statut=in.(nouvelle,confirmee,en_livraison)&order=created_at.asc&limit=6",
    ),
  ]);

  const tuiles = [
    { libelle: "Jouets vendus", valeur: t.jouets, detail: `${n(t.jouets_7j)} ces 7 derniers jours`, couleur: "bg-tp-bleu" },
    { libelle: "Clients dans la base", valeur: t.contacts, detail: `${n(t.inscrits_7j)} nouveaux en 7 jours`, couleur: "bg-tp-turquoise" },
    { libelle: "Ont déjà acheté", valeur: t.acheteurs, detail: `${n(t.fideles)} clients fidèles`, couleur: "bg-tp-orange" },
    { libelle: "Accord WhatsApp", valeur: t.accord_whatsapp, detail: "joignables pour les offres", couleur: "bg-tp-jaune" },
  ];
  const totalLangues = Object.values(t.par_langue).reduce((s, v) => s + Number(v), 0) || 1;
  const objectifs = [
    { libelle: "Contacts dans la base", valeur: t.contacts, cible: t.objectif_contacts, couleur: "bg-tp-turquoise" },
    { libelle: "Jouets vendus depuis le 16 novembre", valeur: t.jouets_campagne, cible: t.objectif_jouets, couleur: "bg-tp-fuchsia" },
  ];

  return (
    <>
      <EnTete
        titre={`${bonjour()} ${admin.nom}`}
        sousTitre={
          t.a_traiter > 0
            ? <>Tu as <b className="text-tp-fuchsia">{n(t.a_traiter)} commande{t.a_traiter > 1 ? "s" : ""} à confirmer</b> et {n(t.en_cours)} en cours.</>
            : <>Aucune nouvelle commande à confirmer. {n(t.en_cours)} en cours.</>
        }
        action={<BoutonLien href="/admin/commandes/nouvelle"><PlusCircle size={16} aria-hidden /> Nouvelle vente</BoutonLien>}
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {tuiles.map((x) => (
          <Carte key={x.libelle} className="relative overflow-hidden">
            <span className={`absolute left-0 top-0 h-1.5 w-full ${x.couleur}`} aria-hidden />
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{x.libelle}</p>
            <p className="mt-2 font-title text-3xl font-extrabold tabular-nums sm:text-4xl">{n(x.valeur)}</p>
            <p className="mt-1 text-xs text-slate-500">{x.detail}</p>
          </Carte>
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <Carte>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-title text-lg font-bold">À traiter</h2>
            <Link href="/admin/commandes?statut=a_traiter" className="flex items-center gap-1 text-sm font-bold text-tp-bleu">
              Tout voir <ArrowRight size={14} aria-hidden />
            </Link>
          </div>
          {aTraiter.length === 0 ? (
            <Vide>Tout est à jour. Les nouvelles commandes du site apparaîtront ici.</Vide>
          ) : (
            <ul className="divide-y divide-black/5">
              {aTraiter.map((c) => (
                <li key={c.id}>
                  <Link href={`/admin/commandes/${c.numero}`} className="-mx-2 flex items-center gap-3 rounded-2xl px-2 py-3 transition hover:bg-tp-creme">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-bold">{nomClient(c.contacts)}</p>
                      <p className="truncate text-xs text-slate-500">
                        {c.numero} · {date(c.created_at)} · {c.ville ?? "ville ?"} ·{" "}
                        {c.lignes_commande.map((l) => `${l.quantite} ${LANGUES[l.langue ?? ""]?.nom ?? "jouet"}`).join(", ")}
                      </p>
                    </div>
                    <div className="hidden text-right text-sm font-bold tabular-nums sm:block">{argent(c.total, c.devise)}</div>
                    <PastilleStatut statut={c.statut} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Carte>

        <div className="grid min-w-0 gap-4">
          <Carte>
            <h2 className="font-title text-lg font-bold">Objectifs de fin d’année</h2>
            <div className="mt-4 space-y-5">
              {objectifs.map((o) => (
                <div key={o.libelle}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span>{o.libelle}</span>
                    <span className="tabular-nums"><b>{n(o.valeur)}</b> / {n(o.cible)}</span>
                  </div>
                  <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-tp-sable">
                    <div className={`h-full rounded-full ${o.couleur}`} style={{ width: `${Math.min(100, (o.valeur / Math.max(o.cible, 1)) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Carte>
          <Carte>
            <h2 className="font-title text-lg font-bold">Jouets vendus par langue</h2>
            <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-tp-sable">
              {Object.entries(LANGUES).map(([cle, l]) => (
                <div key={cle} style={{ width: `${(Number(t.par_langue[cle] ?? 0) / totalLangues) * 100}%`, background: l.couleur }} />
              ))}
            </div>
            <ul className="mt-4 grid grid-cols-3 gap-2 text-sm">
              {Object.entries(LANGUES).map(([cle, l]) => (
                <li key={cle}>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <i className="h-2.5 w-2.5 rounded-full" style={{ background: l.couleur }} aria-hidden />
                    {l.nom}
                  </span>
                  <b className="font-title text-xl tabular-nums">{n(t.par_langue[cle] ?? 0)}</b>
                </li>
              ))}
            </ul>
          </Carte>
        </div>
      </div>
    </>
  );
}
