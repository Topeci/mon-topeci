"use client";

import { useActionState, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { enregistrerVente, type EtatVente } from "../../actions";
import { Carte, champ, etiquette } from "../../ui";

type Produit = { id: string; nom: string; prix: { CI: number; EUR: number } };

const CANAUX = [
  ["whatsapp", "WhatsApp"],
  ["salon", "Salon / marché"],
  ["librairie", "Librairie"],
  ["ambassadeur", "Ambassadeur"],
  ["revendeur", "Revendeur"],
  ["autre", "Autre"],
] as const;

const STATUTS = [
  ["livree", "Déjà livrée / remise"],
  ["confirmee", "Confirmée, à livrer"],
  ["nouvelle", "À confirmer"],
] as const;

const nombre = new Intl.NumberFormat("fr-FR");

export default function FormulaireVente({
  produits,
  ambassadeurs,
  aujourdhui,
}: {
  produits: Produit[];
  ambassadeurs: { code: string; nom: string }[];
  aujourdhui: string;
}) {
  const [etat, envoyer, enCours] = useActionState<EtatVente, FormData>(enregistrerVente, {});
  const [marche, setMarche] = useState<"CI" | "EUR">("CI");
  const [canal, setCanal] = useState("whatsapp");
  const [quantites, setQuantites] = useState<Record<string, number>>({});
  const [prix, setPrix] = useState<Record<string, string>>({});
  const [frais, setFrais] = useState("");

  const prixDe = (p: Produit) => (prix[p.id] !== undefined && prix[p.id] !== "" ? Number(prix[p.id]) : p.prix[marche]);
  const total = produits.reduce((s, p) => s + (quantites[p.id] ?? 0) * prixDe(p), 0) + (Number(frais) || 0);
  const devise = marche === "EUR" ? "€" : "FCFA";
  const changerQte = (id: string, delta: number) => setQuantites((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }));

  return (
    <form action={envoyer} className="grid gap-4 xl:grid-cols-[1.3fr_1fr]">
      <input type="hidden" name="marche" value={marche} />
      <div className="grid content-start gap-4">
        <Carte>
          <h2 className="font-title text-lg font-bold">Les jouets</h2>
          <div className="mt-3 inline-flex rounded-2xl bg-tp-sable p-1 text-sm font-bold">
            {(["CI", "EUR"] as const).map((m) => (
              <button
                type="button"
                key={m}
                onClick={() => setMarche(m)}
                className={`rounded-xl px-3.5 py-1.5 transition ${marche === m ? "bg-white shadow-sm" : "text-slate-500"}`}
              >
                {m === "CI" ? "Côte d’Ivoire (FCFA)" : "Diaspora (€)"}
              </button>
            ))}
          </div>
          <ul className="mt-4 divide-y divide-black/5">
            {produits.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center gap-3 py-3">
                <span className="w-full text-sm font-bold sm:w-auto sm:min-w-0 sm:flex-1">{p.nom}</span>
                <label className="mr-auto flex items-center gap-1.5 text-xs text-slate-500 sm:mr-0">
                  Prix
                  <input
                    name={`prix_${p.id}`}
                    inputMode="numeric"
                    value={prix[p.id] ?? String(p.prix[marche])}
                    onChange={(e) => setPrix((x) => ({ ...x, [p.id]: e.target.value.replace(/[^\d.]/g, "") }))}
                    className="w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-right text-sm tabular-nums"
                  />
                </label>
                <div className="flex items-center rounded-xl ring-1 ring-black/10">
                  <button type="button" onClick={() => changerQte(p.id, -1)} className="p-2 text-slate-500" aria-label={`Retirer un ${p.nom}`}><Minus size={16} /></button>
                  <input
                    name={`qte_${p.id}`}
                    value={quantites[p.id] ?? 0}
                    onChange={(e) => setQuantites((q) => ({ ...q, [p.id]: Math.max(0, Math.trunc(Number(e.target.value) || 0)) }))}
                    inputMode="numeric"
                    className="w-10 bg-transparent text-center font-bold tabular-nums outline-none"
                    aria-label={`Quantité ${p.nom}`}
                  />
                  <button type="button" onClick={() => changerQte(p.id, 1)} className="p-2 text-tp-bleu" aria-label={`Ajouter un ${p.nom}`}><Plus size={16} /></button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4 border-t border-black/5 pt-4">
            <label className="block">
              <span className={etiquette}>Frais de livraison</span>
              <input name="frais_livraison" inputMode="numeric" value={frais} onChange={(e) => setFrais(e.target.value.replace(/[^\d.]/g, ""))} placeholder="0" className={`${champ} w-36`} />
            </label>
            <p className="text-right">
              <span className="block text-xs font-bold uppercase tracking-wide text-slate-500">Total</span>
              <span className="font-title text-2xl font-extrabold tabular-nums">{nombre.format(total)} {devise}</span>
            </p>
          </div>
        </Carte>

        <Carte>
          <h2 className="font-title text-lg font-bold">La vente</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className={etiquette}>Vendu via</span>
              <select name="canal" value={canal} onChange={(e) => setCanal(e.target.value)} className={champ}>
                {CANAUX.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <label className="block">
              <span className={etiquette}>Où en est-elle ?</span>
              <select name="statut" defaultValue="livree" className={champ}>
                {STATUTS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <label className="block">
              <span className={etiquette}>Date</span>
              <input type="date" name="date" defaultValue={aujourdhui} max={aujourdhui} className={champ} />
            </label>
            <label className="block">
              <span className={etiquette}>Code ambassadeur</span>
              <select name="code_ambassadeur" defaultValue="" className={champ}>
                <option value="">Aucun</option>
                {ambassadeurs.map((a) => <option key={a.code} value={a.code}>{a.nom} ({a.code})</option>)}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className={etiquette}>Note</span>
              <input name="notes" className={champ} placeholder="Ex : payé par Wave, salon du livre d’Abidjan…" />
            </label>
          </div>
        </Carte>
      </div>

      <div className="grid content-start gap-4">
        <Carte>
          <h2 className="font-title text-lg font-bold">Le client</h2>
          <p className="mt-1 text-xs text-slate-500">S’il est déjà dans la base (même téléphone), sa fiche est complétée.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <label className="block"><span className={etiquette}>Prénom</span><input name="prenom" className={champ} autoComplete="off" /></label>
            <label className="block"><span className={etiquette}>Nom</span><input name="nom" className={champ} autoComplete="off" /></label>
            <label className="block"><span className={etiquette}>Téléphone *</span><input name="telephone" type="tel" inputMode="tel" placeholder={marche === "CI" ? "07 00 00 00 00" : "+33 6 00 00 00 00"} className={champ} autoComplete="off" /></label>
            <label className="block"><span className={etiquette}>E-mail</span><input name="email" type="email" className={champ} autoComplete="off" /></label>
            <label className="block"><span className={etiquette}>{marche === "CI" ? "Commune / ville" : "Ville"}</span><input name="ville" className={champ} /></label>
            {marche === "EUR" && <label className="block"><span className={etiquette}>Pays</span><input name="pays" defaultValue="France" className={champ} /></label>}
            <label className="block sm:col-span-2 xl:col-span-1 2xl:col-span-2"><span className={etiquette}>Adresse de livraison</span><input name="adresse" className={champ} /></label>
          </div>
          <label className="mt-4 flex items-start gap-3 rounded-2xl bg-tp-sable/60 p-3 text-sm">
            <input type="checkbox" name="consent_whatsapp" className="mt-0.5 h-4 w-4 accent-[#4e6fa7]" />
            <span>Le client <b>accepte de recevoir les offres</b> TOPECI sur WhatsApp (à lui demander).</span>
          </label>
        </Carte>

        {etat.erreur && <p className="rounded-2xl bg-tp-fuchsia/10 px-4 py-3 text-sm font-bold text-tp-fuchsia">{etat.erreur}</p>}
        <button disabled={enCours || total === 0 && !Object.values(quantites).some(Boolean)} className="rounded-2xl bg-tp-bleu py-4 font-title text-lg font-bold text-white transition hover:bg-tp-bleu/90 disabled:opacity-50">
          {enCours ? "Enregistrement…" : "Enregistrer la vente"}
        </button>
      </div>
    </form>
  );
}
