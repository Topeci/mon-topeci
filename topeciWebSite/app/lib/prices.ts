/**
 * Catalogue et prix TOPECI, partagés entre le site (navigateur) et le serveur.
 * Pour changer un prix, modifier uniquement ce tableau.
 */
export type Market = "CI" | "EUR";

export const PRODUCT_PRICES: Record<string, Record<Market, number>> = {
  "livre-audio-baoule": { CI: 15000, EUR: 30 },
  "livre-audio-dioula": { CI: 15000, EUR: 30 },
  "cartes-audio-bete": { CI: 15000, EUR: 30 },
};

export const PRODUCT_NAMES: Record<string, string> = {
  "livre-audio-baoule": "Mon Premier Livre Audio Baoulé–Français",
  "livre-audio-dioula": "Mon Premier Livre Audio Dioula–Français",
  "cartes-audio-bete": "Mes Premières Cartes Audio Bété–Français",
};

export const DEFAULT_PRICE: Record<Market, number> = { CI: 15000, EUR: 30 };
