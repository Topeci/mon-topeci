import "server-only";

/**
 * Accès à la base clients TOPECI (Supabase), uniquement côté serveur.
 *
 * Variables d'environnement (Netlify > Site configuration > Environment variables) :
 *   SUPABASE_URL               ex : https://abcd1234.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY  clé "service_role" (Supabase > Project Settings > API)
 *
 * Tant qu'elles ne sont pas renseignées, le site fonctionne comme avant :
 * les commandes partent toujours par email, rien n'est enregistré.
 */

export type ResultatBase =
  | { ok: true; data: unknown }
  | { ok: false; raison: "non_configuree" | "erreur"; detail?: string };

export function baseConfiguree(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/** Appelle une fonction SQL de la base (enregistrer_commande, enregistrer_contact). */
export async function appelerFonction(nom: string, donnees: unknown): Promise<ResultatBase> {
  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) return { ok: false, raison: "non_configuree" };

  try {
    const reponse = await fetch(`${url.replace(/\/$/, "")}/rest/v1/rpc/${nom}`, {
      method: "POST",
      headers: {
        apikey: cle,
        Authorization: `Bearer ${cle}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p: donnees }),
      cache: "no-store",
    });
    const texte = await reponse.text();
    if (!reponse.ok) return { ok: false, raison: "erreur", detail: texte.slice(0, 300) };
    return { ok: true, data: texte ? JSON.parse(texte) : null };
  } catch (erreur) {
    return { ok: false, raison: "erreur", detail: String(erreur).slice(0, 300) };
  }
}

/* ------------------------------------------------------------------ */
/* Petits outils de nettoyage des données reçues du navigateur          */
/* ------------------------------------------------------------------ */

export function texte(valeur: unknown, max = 200): string | undefined {
  if (typeof valeur !== "string") return undefined;
  const propre = valeur.trim().slice(0, max);
  return propre === "" ? undefined : propre;
}

export function booleen(valeur: unknown): boolean {
  return valeur === true || valeur === "true" || valeur === "on";
}

export function emailValide(valeur: string | undefined): string | undefined {
  if (!valeur) return undefined;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valeur) ? valeur.toLowerCase() : undefined;
}

export function telephoneValide(valeur: string | undefined): string | undefined {
  if (!valeur) return undefined;
  const chiffres = valeur.replace(/[^0-9]/g, "");
  return chiffres.length >= 8 && chiffres.length <= 15 ? valeur : undefined;
}

export const LANGUES = ["baoule", "dioula", "bete"] as const;

export function langues(valeur: unknown): string[] {
  if (!Array.isArray(valeur)) return [];
  return valeur.filter((l): l is string => (LANGUES as readonly string[]).includes(l));
}

/** Code source / ambassadeur : lettres, chiffres, tirets. */
export function code(valeur: unknown): string | undefined {
  const t = texte(valeur, 40);
  if (!t) return undefined;
  const propre = t.replace(/[^a-zA-Z0-9_-]/g, "");
  return propre === "" ? undefined : propre;
}
