import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { enc, lire } from "../../../../lib/admin/base";
import { exigerAdmin } from "../../../../lib/admin/session";
import { changerStatut, noterCommande } from "../../actions";
import { CANAUX, Carte, LANGUES, ORDRE_STATUTS, PastilleStatut, STATUTS, argent, champ, date, lienWhatsapp, n, nomClient } from "../../ui";

type Commande = {
  id: string; numero: string; created_at: string; statut: string; canal: string; marche: string | null; devise: string | null;
  adresse: string | null; ville: string | null; pays: string | null; livraison_mode: string | null; livraison_detail: string | null;
  frais_livraison: number; total_produits: number; total: number; total_est_minimum: boolean; code_ambassadeur: string | null; notes: string | null;
  contacts: { id: string; prenom: string | null; nom: string | null; telephone: string | null; email: string | null; ville: string | null; consent_whatsapp: boolean } | null;
  lignes_commande: { id: string; produit_nom: string | null; langue: string | null; quantite: number; prix_unitaire: number }[];
};

export async function generateMetadata({ params }: { params: Promise<{ numero: string }> }) {
  return { title: `Commande ${decodeURIComponent((await params).numero)}` };
}

const MESSAGES: Record<string, (prenom: string, numero: string) => string> = {
  nouvelle: (p, num) => `Bonjour ${p} ! Merci pour ta commande TOPECI (${num}). On la prépare et on te recontacte pour la livraison.`,
  confirmee: (p, num) => `Bonjour ${p} ! Ta commande TOPECI (${num}) est confirmée. On organise la livraison.`,
  en_livraison: (p, num) => `Bonjour ${p} ! Ta commande TOPECI (${num}) est en route. Le livreur va t’appeler.`,
  livree: (p) => `Bonjour ${p} ! Ton jouet TOPECI est bien arrivé ? Envoie-nous une petite vidéo de ton enfant qui l’utilise, on adore !`,
  annulee: (p, num) => `Bonjour ${p}, au sujet de ta commande TOPECI (${num}) :`,
};

export default async function FicheCommande({
  params,
  searchParams,
}: {
  params: Promise<{ numero: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  await exigerAdmin();
  const numero = decodeURIComponent((await params).numero);
  const { nouvelle } = await searchParams;
  const [c] = await lire<Commande[]>(
    "commandes?select=*,contacts(id,prenom,nom,telephone,email,ville,consent_whatsapp),lignes_commande(id,produit_nom,langue,quantite,prix_unitaire)" +
      `&numero=eq.${enc(numero)}&limit=1`,
  );
  if (!c) notFound();

  const prenom = c.contacts?.prenom ?? "";
  const wa = lienWhatsapp(c.contacts?.telephone, (MESSAGES[c.statut] ?? MESSAGES.nouvelle)(prenom, c.numero));
  const jouets = c.lignes_commande.reduce((s, l) => s + l.quantite, 0);
  const etapeActuelle = ORDRE_STATUTS.indexOf(c.statut as (typeof ORDRE_STATUTS)[number]);

  return (
    <>
      <Link href="/admin/commandes" className="mb-4 inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 hover:text-tp-encre">
        <ArrowLeft size={16} aria-hidden /> Commandes
      </Link>

      {nouvelle && (
        <p className="mb-4 flex items-center gap-2 rounded-2xl bg-tp-turquoise/20 px-4 py-3 text-sm font-bold text-[#2f7f7f]">
          <CheckCircle2 size={18} aria-hidden /> Vente enregistrée.
        </p>
      )}

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{c.numero} · {date(c.created_at, true)} · {CANAUX[c.canal] ?? c.canal}</p>
          <h1 className="mt-1 font-title text-2xl font-extrabold sm:text-3xl">{nomClient(c.contacts)}</h1>
          <div className="mt-2"><PastilleStatut statut={c.statut} /></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white">
              <MessageCircle size={16} aria-hidden /> WhatsApp
            </a>
          )}
          {c.contacts?.telephone && (
            <a href={`tel:${c.contacts.telephone}`} className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-black/10">
              <Phone size={16} aria-hidden /> Appeler
            </a>
          )}
        </div>
      </header>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-4">
          <Carte>
            <h2 className="font-title text-lg font-bold">Où en est la commande ?</h2>
            <form action={changerStatut} className="mt-4 flex flex-wrap gap-2">
              <input type="hidden" name="id" value={c.id} />
              {ORDRE_STATUTS.map((s, i) => {
                const actuel = s === c.statut;
                return (
                  <button
                    key={s}
                    name="statut"
                    value={s}
                    disabled={actuel}
                    className={`rounded-2xl px-4 py-2.5 text-sm font-bold transition ${
                      actuel
                        ? "bg-tp-encre text-white"
                        : s === "annulee"
                          ? "text-slate-500 ring-1 ring-black/10 hover:text-tp-fuchsia"
                          : i === etapeActuelle + 1
                            ? "bg-tp-bleu text-white hover:bg-tp-bleu/90"
                            : "bg-white ring-1 ring-black/10 hover:ring-tp-bleu"
                    }`}
                  >
                    {i === etapeActuelle + 1 && s !== "annulee" ? `Passer à « ${STATUTS[s].libelle} »` : STATUTS[s].libelle}
                  </button>
                );
              })}
            </form>
          </Carte>

          <Carte>
            <h2 className="font-title text-lg font-bold">{n(jouets)} jouet{jouets > 1 ? "s" : ""}</h2>
            <ul className="mt-3 divide-y divide-black/5">
              {c.lignes_commande.map((l) => (
                <li key={l.id} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="min-w-0">
                    <b>{l.quantite} ×</b> {l.produit_nom ?? LANGUES[l.langue ?? ""]?.nom ?? "Jouet"}
                  </span>
                  <span className="shrink-0 tabular-nums text-slate-600">{Number(l.prix_unitaire) > 0 ? argent(l.prix_unitaire * l.quantite, c.devise) : "prix non renseigné"}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-2 space-y-1.5 border-t border-black/5 pt-3 text-sm">
              <div className="flex justify-between"><dt className="text-slate-500">Livraison</dt><dd className="tabular-nums">{argent(c.frais_livraison, c.devise)}{c.total_est_minimum ? " (à partir de)" : ""}</dd></div>
              <div className="flex justify-between font-bold"><dt>Total</dt><dd className="tabular-nums">{argent(c.total, c.devise)}</dd></div>
            </dl>
          </Carte>

          <Carte>
            <h2 className="font-title text-lg font-bold">Notes internes</h2>
            <form action={noterCommande} className="mt-3 space-y-3">
              <input type="hidden" name="id" value={c.id} />
              <textarea name="notes" defaultValue={c.notes ?? ""} rows={3} className={champ} placeholder="Ex : livrer après 17h, payé par Wave…" />
              <button className="rounded-2xl bg-tp-encre px-4 py-2 text-sm font-bold text-white">Enregistrer la note</button>
            </form>
          </Carte>
        </div>

        <div className="grid content-start gap-4">
          <Carte>
            <h2 className="font-title text-lg font-bold">Livraison</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div><dt className="text-xs text-slate-500">Adresse</dt><dd>{[c.adresse, c.ville, c.pays].filter(Boolean).join(", ") || "—"}</dd></div>
              {c.livraison_detail && <div><dt className="text-xs text-slate-500">Mode</dt><dd>{c.livraison_detail}</dd></div>}
              {c.code_ambassadeur && <div><dt className="text-xs text-slate-500">Ambassadeur</dt><dd>{c.code_ambassadeur}</dd></div>}
            </dl>
          </Carte>
          {c.contacts && (
            <Carte>
              <h2 className="font-title text-lg font-bold">Client</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div><dt className="text-xs text-slate-500">Téléphone</dt><dd className="tabular-nums">{c.contacts.telephone ?? "—"}</dd></div>
                <div><dt className="text-xs text-slate-500">E-mail</dt><dd className="break-all">{c.contacts.email ?? "—"}</dd></div>
                <div><dt className="text-xs text-slate-500">Offres WhatsApp</dt><dd>{c.contacts.consent_whatsapp ? "Oui, a donné son accord" : "Pas d’accord"}</dd></div>
              </dl>
              <Link href={`/admin/clients/${c.contacts.id}`} className="mt-4 inline-block text-sm font-bold text-tp-bleu">Voir la fiche client →</Link>
            </Carte>
          )}
        </div>
      </div>
    </>
  );
}
