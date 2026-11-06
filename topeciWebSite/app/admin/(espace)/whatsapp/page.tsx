import { Download } from "lucide-react";
import { lire } from "../../../lib/admin/base";
import { exigerAdmin } from "../../../lib/admin/session";
import { Carte, EnTete, LANGUES, Vide, n, nomClient } from "../ui";
import CopierNumeros from "./CopierNumeros";

export const metadata = { title: "Liste WhatsApp" };

type Ligne = { prenom: string | null; nom: string | null; telephone: string; ville: string | null; langues_achetees: string[] | null; nb_commandes: number };

export default async function ListeWhatsapp() {
  await exigerAdmin();
  const liste = await lire<Ligne[]>("v_liste_whatsapp?select=prenom,nom,telephone,ville,langues_achetees,nb_commandes&limit=5000");
  const acheteurs = liste.filter((l) => l.nb_commandes > 0).length;

  return (
    <>
      <EnTete
        titre="Liste WhatsApp"
        sousTitre={<>{n(liste.length)} personne{liste.length > 1 ? "s" : ""} ont accepté de recevoir les offres, dont {n(acheteurs)} déjà clientes.</>}
        action={
          liste.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <CopierNumeros numeros={liste.map((l) => l.telephone)} />
              <a href="/api/admin/export-whatsapp" className="inline-flex items-center gap-2 rounded-2xl bg-tp-bleu px-4 py-2.5 text-sm font-bold text-white">
                <Download size={16} aria-hidden /> Télécharger (Excel)
              </a>
            </div>
          )
        }
      />
      <Carte className="mb-4 bg-tp-jaune/15 ring-tp-jaune/30">
        <p className="text-sm leading-6">
          <b>Pour une diffusion</b> : dans WhatsApp Business, crée une liste de diffusion et ajoute ces numéros.
          Seules les personnes qui ont <b>ton numéro enregistré</b> reçoivent les messages de diffusion :
          le premier message peut leur demander de l’enregistrer. Ne mets jamais quelqu’un ici sans son accord.
        </p>
      </Carte>
      <Carte className="!p-0">
        {liste.length === 0 ? (
          <div className="p-5">
            <Vide>
              Personne pour l’instant. La liste se remplit avec la page d’inscription du site, la case « offres » du panier
              et la case à cocher de la saisie de vente.
            </Vide>
          </div>
        ) : (
          <ul className="divide-y divide-black/5">
            {liste.map((l) => (
              <li key={l.telephone} className="flex items-center gap-4 px-5 py-3 text-sm">
                <span className="min-w-0 flex-1"><b>{nomClient(l)}</b><span className="block text-xs text-slate-500">{l.ville ?? "—"}</span></span>
                <span className="hidden text-xs text-slate-500 sm:block">{(l.langues_achetees ?? []).map((x) => LANGUES[x]?.nom ?? x).join(", ") || "prospect"}</span>
                <span className="tabular-nums">{l.telephone}</span>
              </li>
            ))}
          </ul>
        )}
      </Carte>
    </>
  );
}
