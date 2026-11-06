import Link from "next/link";
import { Search } from "lucide-react";
import { enc, filtreTexte, lireAvecTotal } from "../../../lib/admin/base";
import { exigerAdmin } from "../../../lib/admin/session";
import { Carte, EnTete, LANGUES, Vide, champ, date, n, nomClient } from "../ui";

export const metadata = { title: "Clients" };

const FILTRES = {
  tous: { libelle: "Tous", requete: "" },
  acheteurs: { libelle: "Acheteurs", requete: "nb_commandes=gt.0" },
  fideles: { libelle: "Fidèles", requete: "nb_commandes=gt.1" },
  prospects: { libelle: "Jamais acheté", requete: "nb_commandes=eq.0" },
  diaspora: { libelle: "Diaspora", requete: "marche=eq.EUR" },
} as const;
type Filtre = keyof typeof FILTRES;
const PAR_PAGE = 40;

type Client = {
  id: string; prenom: string | null; nom: string | null; telephone: string | null; ville: string | null; marche: string | null;
  nb_commandes: number; nb_jouets: number; langues_achetees: string[] | null; derniere_commande: string | null; consent_whatsapp: boolean;
};

export default async function Clients({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  await exigerAdmin();
  const p = await searchParams;
  const filtre: Filtre = (p.filtre && p.filtre in FILTRES ? p.filtre : "tous") as Filtre;
  const q = filtreTexte(p.q ?? "");
  const page = Math.max(1, Math.trunc(Number(p.page) || 1));

  const conditions: string[] = [];
  if (FILTRES[filtre].requete) conditions.push(FILTRES[filtre].requete);
  if (q) {
    const m = enc(`*${q}*`);
    conditions.push(`or=(prenom.ilike.${m},nom.ilike.${m},telephone.ilike.${m},ville.ilike.${m},email.ilike.${m})`);
  }
  const { lignes, total } = await lireAvecTotal<Client[]>(
    "v_clients?select=id,prenom,nom,telephone,ville,marche,nb_commandes,nb_jouets,langues_achetees,derniere_commande,consent_whatsapp" +
      `&order=derniere_commande.desc.nullslast,created_at.desc&limit=${PAR_PAGE}&offset=${(page - 1) * PAR_PAGE}` +
      (conditions.length ? `&${conditions.join("&")}` : ""),
  );
  const pages = Math.max(1, Math.ceil((total ?? 0) / PAR_PAGE));
  const lien = (changes: Record<string, string | number | undefined>) => {
    const v = { filtre, q, page: 1, ...changes };
    const s = new URLSearchParams();
    if (v.filtre !== "tous") s.set("filtre", String(v.filtre));
    if (v.q) s.set("q", String(v.q));
    if (Number(v.page) > 1) s.set("page", String(v.page));
    return `/admin/clients${s.size ? `?${s}` : ""}`;
  };

  return (
    <>
      <EnTete titre="Clients" sousTitre={`${n(total ?? 0)} personne${(total ?? 0) > 1 ? "s" : ""}${q ? ` pour « ${q} »` : ""}`} />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {(Object.keys(FILTRES) as Filtre[]).map((f) => (
            <Link key={f} href={lien({ filtre: f })} className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-bold transition ${f === filtre ? "bg-tp-encre text-white" : "bg-white text-slate-600 ring-1 ring-black/5"}`}>
              {FILTRES[f].libelle}
            </Link>
          ))}
        </div>
        <form className="relative w-full lg:w-80" action="/admin/clients">
          {filtre !== "tous" && <input type="hidden" name="filtre" value={filtre} />}
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
          <input name="q" defaultValue={q} placeholder="Nom, téléphone, commune…" className={`${champ} pl-10`} />
        </form>
      </div>

      <Carte className="!p-0">
        {lignes.length === 0 ? (
          <div className="p-5"><Vide>Personne ne correspond.</Vide></div>
        ) : (
          <ul className="divide-y divide-black/5">
            {lignes.map((c) => (
              <li key={c.id}>
                <Link href={`/admin/clients/${c.id}`} className="grid grid-cols-[1fr_auto] items-center gap-x-4 px-5 py-3.5 transition hover:bg-tp-creme sm:grid-cols-[1.4fr_1fr_1fr_auto]">
                  <div className="min-w-0">
                    <p className="truncate font-bold">{nomClient(c)}</p>
                    <p className="truncate text-xs tabular-nums text-slate-500">{c.telephone ?? "—"}{c.marche === "EUR" ? " · diaspora" : ""}</p>
                  </div>
                  <p className="hidden truncate text-sm text-slate-600 sm:block">{c.ville ?? "—"}</p>
                  <p className="hidden text-sm sm:block">
                    {(c.langues_achetees ?? []).map((l) => (
                      <span key={l} className="mr-1 inline-flex items-center gap-1 text-xs">
                        <i className="h-2 w-2 rounded-full" style={{ background: LANGUES[l]?.couleur ?? "#ccc" }} aria-hidden />
                        {LANGUES[l]?.nom ?? l}
                      </span>
                    ))}
                  </p>
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums">{c.nb_commandes > 0 ? `${n(c.nb_jouets)} jouet${c.nb_jouets > 1 ? "s" : ""}` : "Prospect"}</p>
                    <p className="text-xs text-slate-500">{c.derniere_commande ? date(c.derniere_commande) : c.consent_whatsapp ? "accord WhatsApp" : ""}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Carte>

      {pages > 1 && (
        <nav className="mt-4 flex items-center justify-between text-sm" aria-label="Pages">
          {page > 1 ? <Link className="font-bold text-tp-bleu" href={lien({ page: page - 1 })}>← Précédents</Link> : <span />}
          <span className="text-slate-500">Page {page} sur {pages}</span>
          {page < pages ? <Link className="font-bold text-tp-bleu" href={lien({ page: page + 1 })}>Suivants →</Link> : <span />}
        </nav>
      )}
    </>
  );
}
