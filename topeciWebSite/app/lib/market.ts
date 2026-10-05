"use client";

import { useSyncExternalStore } from "react";

/**
 * Marchés de vente TOPECI.
 * - CI  : clients en Côte d'Ivoire / Afrique → prix en FCFA
 * - EUR : clients en France et à l'international → prix en euros
 */
export type Market = "CI" | "EUR";

export const MARKET_STORAGE_KEY = "topeci_market";
export const MARKET_EVENT = "topeci-market-updated";

export const MARKETS: Record<
  Market,
  { label: string; short: string; flag: string; currency: string }
> = {
  CI: { label: "Côte d’Ivoire", short: "FCFA", flag: "🇨🇮", currency: "FCFA" },
  EUR: {
    label: "France & international",
    short: "€",
    flag: "🇫🇷",
    currency: "€",
  },
};

/**
 * Prix de chaque produit selon le marché.
 * Pour changer un prix, modifier uniquement ce tableau.
 */
export const PRODUCT_PRICES: Record<string, Record<Market, number>> = {
  "livre-audio-baoule": { CI: 15000, EUR: 30 },
  "livre-audio-dioula": { CI: 15000, EUR: 30 },
  "cartes-audio-bete": { CI: 15000, EUR: 30 },
};

const DEFAULT_PRICE: Record<Market, number> = { CI: 15000, EUR: 30 };

export function getProductPrice(productId: string, market: Market): number {
  return (PRODUCT_PRICES[productId] ?? DEFAULT_PRICE)[market];
}

export function formatPrice(amount: number, market: Market): string {
  if (market === "EUR") {
    const value = Number.isInteger(amount)
      ? amount.toLocaleString("fr-FR")
      : amount.toLocaleString("fr-FR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    return `${value} €`;
  }

  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

/** Devine le marché à partir du fuseau horaire du téléphone / ordinateur. */
function detectMarket(): Market {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (timeZone === "" || timeZone.startsWith("Africa/")) return "CI";
    return "EUR";
  } catch {
    return "CI";
  }
}

export function readMarket(): Market {
  try {
    const saved = localStorage.getItem(MARKET_STORAGE_KEY);
    if (saved === "CI" || saved === "EUR") return saved;
  } catch {
    // stockage indisponible : on se rabat sur la détection
  }
  return detectMarket();
}

export function saveMarket(market: Market) {
  try {
    localStorage.setItem(MARKET_STORAGE_KEY, market);
  } catch {
    // stockage indisponible : le choix vaut pour la page en cours
  }
  window.dispatchEvent(new CustomEvent(MARKET_EVENT, { detail: market }));
}

function subscribe(onChange: () => void) {
  window.addEventListener(MARKET_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(MARKET_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/** Marché courant, partagé entre tous les composants de la page. */
export function useMarket(): [Market, (market: Market) => void] {
  // Côté serveur : FCFA par défaut, puis le navigateur applique le bon marché
  const market = useSyncExternalStore(subscribe, readMarket, () => "CI" as Market);
  return [market, saveMarket];
}
