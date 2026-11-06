import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { enc, lire } from "../../../../lib/admin/base";
import { exigerAdmin } from "../../../../lib/admin/session";
import { modifierClient } from "../../actions";
import { CANAUX, Carte, LANGUES, PastilleStatut, Vide, argent, champ, date, etiquette, lienWhatsapp, n, nomClient } from "../../ui";

export const metadata = { title: "Fiche client" };

type Fiche = {
  id: string; prenom: string | null; nom: string | null; telephone: string | null; email: string | null; ville: string | null; pays: string | null;
  marche: string | null; langues_interet: string[] | null; ages_enfants: string | null; source_premiere: string | null; sources: string[] | null;
  code_ambassadeur: string | null; consent_whatsapp: boolean; consent_email: boolean; desinscrit: boolean; notes: string | null; created_at: string;
};
type Cmd = { id: string; numero: string; created_at: string; statut: string; canal: string; total: number; devise: string | null; lignes_commande: { quantite: number; langue: string | null }[] };

export default async function FicheClient({ params }: { params: Promise<{ id: string }> }) {
  await exigerAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const [[c], commandes] = await Promise.all([
    lire<Fiche[]>(`contacts?select=*&id=eq.${enc(id)}&limit=1`),
    lire<Cmd[]>(`commandes?select=id,numero,created_at,statut,canal,total,devise,lignes_commande(quantite,langue)&contact_id=eq.${enc(id)}&order=created_at.desc`),
  ]);
  if (!c) notFound();

  const actives = commandes.filter((x) => x.statut !== "annulee");
  const jouets = actives.reduce((s, x) => s + x.lignes_commande.reduce((t, l) => t + l.quantite, 0), 0);
  const wa = lienWhatsapp(c.telephone, `Bonjour ${c.prenom ?? ""} ! C’est l’équipe TOPECI.`);

  return (
    <>
      <Link href="/admin/clients" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-tp-encre">
        <ArrowLeft size={16} aria-hidden /> Clients
      </Link>
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-title text-2xl font-extrabold sm:text-3xl">{nomClient(c)}</h1>
          <p className="mt-1 text-sm text-slate-500">
            Dans la base depuis le {date(c.created_at)} · arrivé·e par {CANAUX[c.source_premiere ?? ""] ?? c.source_premiere ?? "—"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white">
              <MessageCircle size={16} aria-hidden /> WhatsApp
            </a>
          )}
          {c.telephone && (
            <a href={`tel:${c.telephone}`} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-black/10">
              <Phone size={16} aria-hidden /> Appeler
            </a>
          )}
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
        <div className="grid content-start gap-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              ["Commandes", n(actives.length)],
              ["Jouets", n(jouets)],
              ["Langues", (c.langues_interet ?? []).map((l) => LANGUES[l]?.nom ?? l).join(", ") || "—"],
            ].map(([l, v]) => (
              <Carte key={l} className="!p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{l}</p>
                <p className="mt-1 truncate font-title text-xl font-extrabold">{v}</p>
              </Carte>
            ))}
          </div>
          <Carte>
            <h2 className="font-title text-lg font-bold">Achats</h2>
            {commandes.length === 0 ? (
              <div className="mt-3"><Vide>Pas encore d’achat. C’est un prospect : une offre WhatsApp peut le convaincre.</Vide></div>
            ) : (
              <ul className="mt-3 divide-y divide-black/5">
                {commandes.map((x) => (
                  <li key={x.id}>
                    <Link href={`/admin/commandes/${x.numero}`} className="-mx-2 flex items-center gap-3 rounded-xl px-2 py-3 hover:bg-tp-creme">
                      <span className="min-w-0 flex-1 text-sm">
                        <b>{x.lignes_commande.map((l) => `${l.quantite} ${LANGUES[l.langue ?? ""]?.nom ?? "jouet"}`).join(", ")}</b>
                        <span className="block text-xs text-slate-500">{x.numero} · {date(x.created_at)} · {CANAUX[x.canal] ?? x.canal}</span>
                      </span>
                      <span className="hidden text-sm tabular-nums sm:block">{Number(x.total) > 0 ? argent(x.total, x.devise) : ""}</span>
                      <PastilleStatut statut={x.statut} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Carte>
        </div>

        <Carte className="content-start">
          <h2 className="font-title text-lg font-bold">Coordonnées et préférences</h2>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-xs text-slate-500">Téléphone</dt><dd className="tabular-nums">{c.telephone ?? "—"}</dd></div>
            <div><dt className="text-xs text-slate-500">E-mail</dt><dd className="break-all">{c.email ?? "—"}</dd></div>
            <div><dt className="text-xs text-slate-500">Pays</dt><dd>{c.pays ?? (c.marche === "CI" ? "Côte d’Ivoire" : "—")}</dd></div>
            <div><dt className="text-xs text-slate-500">Âge des enfants</dt><dd>{c.ages_enfants ?? "—"}</dd></div>
            {c.code_ambassadeur && <div><dt className="text-xs text-slate-500">Ambassadeur</dt><dd>{c.code_ambassadeur}</dd></div>}
          </dl>
          <form action={modifierClient} className="mt-5 space-y-4 border-t border-black/5 pt-4">
            <input type="hidden" name="id" value={c.id} />
            <label className="block"><span className={etiquette}>Commune / ville</span><input name="ville" defaultValue={c.ville ?? ""} className={champ} /></label>
            <fieldset className="space-y-2 text-sm">
              <legend className={etiquette}>Accepte de recevoir les offres</legend>
              <label className="flex items-center gap-2"><input type="checkbox" name="consent_whatsapp" defaultChecked={c.consent_whatsapp} className="h-4 w-4 accent-[#4e6fa7]" /> par WhatsApp</label>
              <label className="flex items-center gap-2"><input type="checkbox" name="consent_email" defaultChecked={c.consent_email} className="h-4 w-4 accent-[#4e6fa7]" /> par e-mail</label>
              <label className="flex items-center gap-2 text-slate-500"><input type="checkbox" name="desinscrit" defaultChecked={c.desinscrit} className="h-4 w-4 accent-[#be356a]" /> a demandé à ne plus être contacté·e</label>
            </fieldset>
            <label className="block"><span className={etiquette}>Notes</span><textarea name="notes" rows={3} defaultValue={c.notes ?? ""} className={champ} placeholder="Ex : a 2 enfants, intéressée par le bété…" /></label>
            <button className="rounded-2xl bg-tp-encre px-4 py-2 text-sm font-bold text-white">Enregistrer</button>
          </form>
        </Carte>
      </div>
    </>
  );
}
