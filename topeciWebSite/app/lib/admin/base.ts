import "server-only";

/**
 * Lecture et écriture de la base TOPECI pour l'espace admin.
 * Uniquement côté serveur, avec la clé secrète (SUPABASE_SERVICE_ROLE_KEY).
 * Chaque page et chaque action vérifie d'abord la session admin.
 */

function config() {
  const url = process.env.SUPABASE_URL;
  const cle = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !cle) throw new Error("Base non configurée (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  return { url: url.replace(/\/$/, ""), cle };
}

export class ErreurBase extends Error {}

async function appel<T>(chemin: string, init: RequestInit & { compter?: boolean } = {}): Promise<{ data: T; total: number | null }> {
  const { url, cle } = config();
  const { compter, ...options } = init;
  const reponse = await fetch(`${url}/rest/v1/${chemin}`, {
    ...options,
    headers: {
      apikey: cle,
      Authorization: `Bearer ${cle}`,
      "Content-Type": "application/json",
      ...(compter ? { Prefer: "count=exact" } : {}),
      ...(options.headers ?? {}),
    },
    cache: "no-store",
  });
  const texte = await reponse.text();
  if (!reponse.ok) throw new ErreurBase(`Base : ${reponse.status} ${texte.slice(0, 300)}`);
  const plage = reponse.headers.get("content-range");
  const total = plage && plage.includes("/") ? Number(plage.split("/")[1]) : null;
  return { data: (texte ? JSON.parse(texte) : null) as T, total: Number.isFinite(total) ? total : null };
}

/** Lecture PostgREST : `table?select=...&filtre=eq.valeur` */
export async function lire<T>(chemin: string): Promise<T> {
  return (await appel<T>(chemin)).data;
}

/** Lecture avec le nombre total de lignes (pour « 120 résultats »). */
export async function lireAvecTotal<T>(chemin: string): Promise<{ lignes: T; total: number | null }> {
  const r = await appel<T>(chemin, { compter: true });
  return { lignes: r.data, total: r.total };
}

export async function modifier(chemin: string, valeurs: Record<string, unknown>): Promise<void> {
  await appel(chemin, { method: "PATCH", body: JSON.stringify(valeurs), headers: { Prefer: "return=minimal" } });
}

export async function ajouter(table: string, valeurs: Record<string, unknown>): Promise<void> {
  await appel(table, { method: "POST", body: JSON.stringify(valeurs), headers: { Prefer: "return=minimal" } });
}

/** Fonction SQL (rpc). `args` est passé tel quel. */
export async function fonction<T>(nom: string, args: Record<string, unknown> = {}): Promise<T> {
  return (await appel<T>(`rpc/${nom}`, { method: "POST", body: JSON.stringify(args) })).data;
}

/** Valeur sûre dans un filtre PostgREST (ilike, or=...). */
export function filtreTexte(valeur: string): string {
  return valeur.replace(/[,()*\\:"'%]/g, " ").replace(/\s+/g, " ").trim().slice(0, 60);
}

export const enc = encodeURIComponent;
