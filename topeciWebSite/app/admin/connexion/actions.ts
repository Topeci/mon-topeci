"use server";

import { headers } from "next/headers";
import { trouverAdmin } from "../../lib/admin/session";

export type EtatConnexion = { etat: "attente" | "envoye" | "erreur"; message?: string };

/**
 * Envoie le lien de connexion par e-mail (Supabase Auth).
 * Seules les adresses de la table `admins` reçoivent un lien ; la réponse est
 * la même pour toutes les adresses, pour ne pas révéler qui est admin.
 */
export async function demanderLien(_avant: EtatConnexion, formulaire: FormData): Promise<EtatConnexion> {
  const email = String(formulaire.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { etat: "erreur", message: "Cette adresse e-mail n’a pas l’air valide." };
  }

  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const clePublique = process.env.SUPABASE_ANON_KEY;
  if (!url || !clePublique) return { etat: "erreur", message: "Connexion indisponible : configuration manquante." };

  const admin = await trouverAdmin(email).catch(() => null);
  if (!admin) return { etat: "envoye" };

  const entetes = await headers();
  const hote = entetes.get("x-forwarded-host") ?? entetes.get("host");
  const protocole = entetes.get("x-forwarded-proto") ?? (hote?.startsWith("localhost") ? "http" : "https");
  const retour = `${protocole}://${hote}/admin/auth`;

  const reponse = await fetch(`${url}/auth/v1/otp?redirect_to=${encodeURIComponent(retour)}`, {
    method: "POST",
    headers: { apikey: clePublique, "Content-Type": "application/json" },
    body: JSON.stringify({ email, create_user: true }),
    cache: "no-store",
  });

  if (reponse.status === 429) {
    return { etat: "erreur", message: "Trop de demandes d’affilée. Réessaie dans une heure, ou utilise le dernier lien reçu." };
  }
  if (!reponse.ok) {
    console.error("[admin] envoi du lien :", reponse.status, (await reponse.text()).slice(0, 300));
    return { etat: "erreur", message: "Le lien n’a pas pu être envoyé. Réessaie dans quelques minutes." };
  }
  return { etat: "envoye" };
}
