import Link from "next/link";
import { PlusCircle, Search } from "lucide-react";
import { enc, filtreTexte, lire, lireAvecTotal } from "../../../lib/admin/base";
import { exigerAdmin } from "../../../lib/admin/session";
import { BoutonLien, CANAUX, Carte, EnTete, LANGUES, PastilleStatut, Vide, argent, champ, date, n, nomClient } from "../ui";

export const metadata = { title: "Commandes" };

const FILTRES = {
  a_traiter: { libelle: "À confirmer", requete: "statut=eq.nouvelle" },
  en_cours: { libelle: "En cours", requete: "statut=in.(confirmee,en_livraison)" },
  livree: { libelle: "Livrées", requete: "statut=eq.livree" },
  annulee: { libelle: "Annulées", requete: "statut=eq.annulee" },
  toutes: { libelle: "Toutes", requete: "" },
} as const;
type Filtre = keyof typeof FILTRES;
const PAR_PAGE = 30;

type Ligne = {
  id: string; numero: string; created_at: string; statut: string; canal: string; ville: string | null;
  total: number; devise: string | null;
  contacts: { prenom: string | null; nom: string | null; telephone: string | null } | null;
  lignes_commande: { quantite: number; langue: string | null }[];
};

export default async function Commandes({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await exigerAdmin();
  const p = await searchParams;
  const filtre: Filtre = (p.statut && p.statut in FILTRES ? p.statut : "toutes") as Filtre;
  const q = filtreTexte(p.q ?? "");
  const page = Math.max(1, Math.trunc(Number(p.page) || 1));

  const conditions: string[] = [];
  if (FILTRES[filtre].requete) conditions.push(FILTRES[filtre].requete);
  if (q) {
    const motif = enc(`*${q}*`);
    const clients = await lire<{ id: string }[]>(
      `contacts?select=id&or=(prenom.ilike.${motif},nom.ilike.${motif},telephone.ilike.${motif})&limit=60`,
    );
    const ou = [`numero.ilike.${motif}`, `ville.ilike.${motif}`];
    if (clients.length) ou.push(`contact_id.in.(${clients.map((c) => c.id).join(",")})`);
    conditions.push(`or=(${ou.join(",")})`);
  }

  const { lignes, total } = await lireAvecTotal<Ligne[]>(
    "commandes?select=id,numero,created_at,statut,canal,ville,total,devise,contacts(prenom,nom,telephone),lignes_commande(quantite,langue)" +
      `&order=created_at.desc&limit=${PAR_PAGE}&offset=${(page - 1) * PAR_PAGE}` +
      (conditions.length ? `&${conditions.join("&")}` : ""),
  );
  const pages = Math.max(1, Math.ceil((total ?? 0) / PAR_PAGE));
  const lien = (changes: Record<string, string | number | undefined>) => {
    const s = new URLSearchParams();
    const v = { statut: filtre, q, page: 1, ...changes };
    if (v.statut && v.statut !== "toutes") s.set("statut", String(v.statut));
    if (v.q) s.set("q", String(v.q));
    if (Number(v.page) > 1) s.set("page", String(v.page));
    const t = s.toString();
    return `/admin/commandes${t ? `?${t}` : ""}`;
  };

  return (
    <>
      <EnTete
        titre="Commandes"
        sousTitre={`${n(total ?? 0)} commande${(total ?? 0) > 1 ? "s" : ""}${q ? ` pour « ${q} »` : ""}`}
        action={<BoutonLien href="/admin/commandes/nouvelle"><PlusCircle size={16} aria-hidden /> Nouvelle vente</BoutonLien>}
      />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {(Object.keys(FILTRES) as Filtre[]).map((f) => (
            <Link
              key={f}
              href={lien({ statut: f })}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold transition ${
                f === filtre ? "bg-tp-encre text-white" : "bg-white text-slate-600 ring-1 ring-black/5 hover:text-tp-encre"
              }`}
            >
              {FILTRES[f].libelle}
            </Link>
          ))}
        </div>
        <form className="relative w-full lg:w-80" action="/admin/commandes">
          {filtre !== "toutes" && <input type="hidden" name="statut" value={filtre} />}
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <input name="q" defaultValue={q} placeholder="Nom, téléphone, ville, n°…" className={`${champ} pl-10`} />
        </form>
      </div>

      <Carte className="!p-0">
        {lignes.length === 0 ? (
          <div className="p-5"><Vide>Aucune commande ici.</Vide></div>
        ) : (
          <ul className="divide-y divide-black/5">
            {lignes.map((c) => {
              const jouets = c.lignes_commande.reduce((s, l) => s + l.quantite, 0);
              const langues = [...new Set(c.lignes_commande.map((l) => LANGUES[l.langue ?? ""]?.nom ?? "Jouet"))].join(", ");
              return (
                <li key={c.id}>
                  <Link href={`/admin/commandes/${c.numero}`} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-3.5 transition hover:bg-tp-creme sm:grid-cols-[1.6fr_1fr_0.8fr_auto]">
                    <div className="min-w-0">
                      <p className="truncate font-bold">{nomClient(c.contacts)}</p>
                      <p className="truncate text-xs text-slate-500">{c.numero} · {date(c.created_at)} · {CANAUX[c.canal] ?? c.canal}</p>
                    </div>
                    <p className="hidden truncate text-sm text-slate-600 sm:block">{n(jouets)} × {langues}<br /><span className="text-xs text-slate-400">{c.ville ?? "—"}</span></p>
                    <p className="hidden text-right text-sm font-bold tabular-nums sm:block">{Number(c.total) > 0 ? argent(c.total, c.devise) : "—"}</p>
                    <PastilleStatut statut={c.statut} />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Carte>

      {pages > 1 && (
        <nav className="mt-4 flex items-center justify-between text-sm" aria-label="Pages">
          {page > 1 ? <Link className="font-bold text-tp-bleu" href={lien({ page: page - 1 })}>← Précédentes</Link> : <span />}
          <span className="text-slate-500">Page {page} sur {pages}</span>
          {page < pages ? <Link className="font-bold text-tp-bleu" href={lien({ page: page + 1 })}>Suivantes →</Link> : <span />}
        </nav>
      )}
    </>
  );
}
