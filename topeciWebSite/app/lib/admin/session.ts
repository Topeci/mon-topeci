import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { enc, lire } from "./base";

/**
 * Session de l'espace admin : un cookie signé (HMAC) valable 30 jours.
 * La clé de signature est dérivée de la clé secrète Supabase : rien à configurer en plus.
 * À chaque page, on revérifie que la personne est toujours dans la table `admins`.
 */

export const COOKIE_ADMIN = "topeci_admin";
const DUREE_SECONDES = 30 * 24 * 3600;

export type Admin = { email: string; nom: string };

const encodeur = new TextEncoder();

async function cleSignature(): Promise<CryptoKey> {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("SUPABASE_SERVICE_ROLE_KEY manquante");
  const empreinte = await crypto.subtle.digest("SHA-256", encodeur.encode(`topeci-admin-session-v1:${secret}`));
  return crypto.subtle.importKey("raw", empreinte, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

function base64url(octets: ArrayBuffer | Uint8Array): string {
  const tableau = octets instanceof Uint8Array ? octets : new Uint8Array(octets);
  let binaire = "";
  tableau.forEach((o) => (binaire += String.fromCharCode(o)));
  return btoa(binaire).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function depuisBase64url(texte: string): Uint8Array {
  const b64 = texte.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((texte.length + 3) % 4);
  const binaire = atob(b64);
  return Uint8Array.from(binaire, (c) => c.charCodeAt(0));
}

export async function creerJeton(email: string): Promise<{ valeur: string; maxAge: number }> {
  const expire = Math.floor(Date.now() / 1000) + DUREE_SECONDES;
  const contenu = base64url(encodeur.encode(`${email}|${expire}`));
  const signature = await crypto.subtle.sign("HMAC", await cleSignature(), encodeur.encode(contenu));
  return { valeur: `${contenu}.${base64url(signature)}`, maxAge: DUREE_SECONDES };
}

async function verifierJeton(jeton: string | undefined): Promise<string | null> {
  if (!jeton || !jeton.includes(".")) return null;
  const [contenu, signature] = jeton.split(".");
  try {
    const valide = await crypto.subtle.verify(
      "HMAC",
      await cleSignature(),
      depuisBase64url(signature) as BufferSource,
      encodeur.encode(contenu),
    );
    if (!valide) return null;
    const [email, expire] = new TextDecoder().decode(depuisBase64url(contenu)).split("|");
    if (!email || !(Number(expire) > Date.now() / 1000)) return null;
    return email;
  } catch {
    return null;
  }
}

/** La personne est-elle dans la liste des admins actifs ? */
export async function trouverAdmin(email: string): Promise<Admin | null> {
  const lignes = await lire<Admin[]>(`admins?select=email,nom&actif=is.true&email=eq.${enc(email.toLowerCase())}`);
  return lignes[0] ?? null;
}

export async function lireSession(): Promise<Admin | null> {
  const magasin = await cookies();
  const email = await verifierJeton(magasin.get(COOKIE_ADMIN)?.value);
  if (!email) return null;
  return trouverAdmin(email);
}

/** À appeler en tête de chaque page et de chaque action de l'espace admin. */
export async function exigerAdmin(): Promise<Admin> {
  const admin = await lireSession();
  if (!admin) redirect("/admin/connexion");
  return admin;
}
