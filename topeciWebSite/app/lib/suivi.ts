"use client";

/**
 * Suivi de provenance : d'où vient le visiteur ?
 * Un lien comme montopeci.com/?src=qr&amb=AWA est mémorisé 60 jours,
 * puis rattaché à son inscription ou à sa commande.
 *   src = dino, qr, jeu, facebook, instagram, tiktok, whatsapp...
 *   amb = code ambassadeur
 */
const CLE = "topeci_suivi";
const DUREE_MS = 60 * 24 * 60 * 60 * 1000;

export type Suivi = { source?: string; ambassadeur?: string };

function propre(valeur: string | null): string | undefined {
  if (!valeur) return undefined;
  const v = valeur.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 40);
  return v || undefined;
}

export function capturerSuivi() {
  try {
    const params = new URLSearchParams(window.location.search);
    const source = propre(params.get("src") ?? params.get("utm_source"));
    const ambassadeur = propre(params.get("amb"));
    if (!source && !ambassadeur) return;
    const actuel = lireSuivi();
    const nouveau: Suivi = {
      source: source ?? actuel.source,
      ambassadeur: ambassadeur?.toUpperCase() ?? actuel.ambassadeur,
    };
    localStorage.setItem(CLE, JSON.stringify({ ...nouveau, t: Date.now() }));
  } catch {
    // stockage indisponible : on ignore
  }
}

export function lireSuivi(): Suivi {
  try {
    const brut = localStorage.getItem(CLE);
    if (!brut) return {};
    const data = JSON.parse(brut) as Suivi & { t?: number };
    if (!data.t || Date.now() - data.t > DUREE_MS) return {};
    return { source: data.source, ambassadeur: data.ambassadeur };
  } catch {
    return {};
  }
}
