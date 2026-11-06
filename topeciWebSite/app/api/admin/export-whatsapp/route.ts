import { lire } from "../../../lib/admin/base";
import { lireSession } from "../../../lib/admin/session";

type Ligne = { prenom: string | null; nom: string | null; telephone: string; ville: string | null; pays: string | null; langues_achetees: string[] | null; nb_commandes: number };

const cellule = (v: unknown) => {
  let t = v == null ? "" : Array.isArray(v) ? v.join(" ") : String(v);
  if (/^[=+\-@]/.test(t)) t = `'${t}`; // pas de formule Excel
  return `"${t.replace(/"/g, '""')}"`;
};

/** Export CSV (ouvrable dans Excel) des contacts qui ont accepté les offres WhatsApp. */
export async function GET() {
  if (!(await lireSession())) return new Response("Non autorisé", { status: 401 });
  const liste = await lire<Ligne[]>("v_liste_whatsapp?select=prenom,nom,telephone,ville,pays,langues_achetees,nb_commandes&limit=10000");
  const lignes = [
    ["Prénom", "Nom", "Téléphone", "Ville", "Pays", "Langues achetées", "Commandes"],
    ...liste.map((l) => [l.prenom, l.nom, l.telephone, l.ville, l.pays, l.langues_achetees, l.nb_commandes]),
  ].map((r) => r.map(cellule).join(";"));
  const jour = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + lignes.join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="topeci-liste-whatsapp-${jour}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
