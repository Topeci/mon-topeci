import type { Market } from "./market";

/**
 * Tarifs de livraison TOPECI.
 * Pour modifier un prix ou ajouter une commune, modifier uniquement ce fichier.
 */

export type ShippingMethod = "abidjan" | "interieur" | "france" | "international";

/** Communes d'Abidjan et environs : prix par commande, en FCFA. */
export const ABIDJAN_ZONES: { name: string; price: number }[] = [
  { name: "Angré", price: 1000 },
  { name: "Cocody", price: 1000 },
  { name: "Faya", price: 1000 },
  { name: "Abatta", price: 1500 },
  { name: "Abobo", price: 1500 },
  { name: "Adjamé", price: 1500 },
  { name: "Akouédo", price: 1500 },
  { name: "Attécoubé", price: 1500 },
  { name: "Bingerville", price: 1500 },
  { name: "Plateau", price: 1500 },
  { name: "Treichville", price: 1500 },
  { name: "Anyama", price: 2000 },
  { name: "Koumassi", price: 2000 },
  { name: "Marcory", price: 2000 },
  { name: "Port-Bouët", price: 2000 },
  { name: "Yopougon", price: 2000 },
  { name: "Zone 4", price: 2000 },
  { name: "Anyama PK18", price: 2500 },
  { name: "Grand-Bassam", price: 3000 },
  { name: "Songon", price: 3000 },
];

/** Expédition vers l'intérieur du pays : prix par article, en FCFA. */
export const INTERIEUR_PRICE_PER_ITEM = 2000;

/** France métropolitaine via La Poste : prix par colis (= par commande), en €. */
export const FRANCE_PRICE_PER_PARCEL = 5;

/** International : prix de départ, en €. Montant exact confirmé sur WhatsApp. */
export const INTERNATIONAL_PRICE_FROM = 15;

export const SHIPPING_METHODS: Record<
  Market,
  { id: ShippingMethod; title: string; description: string }[]
> = {
  CI: [
    {
      id: "abidjan",
      title: "Livraison à Abidjan",
      description: "Livraison à domicile, tarif selon votre commune",
    },
    {
      id: "interieur",
      title: "Expédition intérieur du pays",
      description: "Villes de l’intérieur, envoi par car / gare",
    },
  ],
  EUR: [
    {
      id: "france",
      title: "France",
      description: "Envoi en colis par La Poste",
    },
    {
      id: "international",
      title: "Autre pays",
      description: "Europe, Amérique, Afrique… montant exact confirmé sur WhatsApp",
    },
  ],
};

export type ShippingQuote = {
  /** Montant des frais de livraison (null tant que le choix n'est pas complet) */
  amount: number | null;
  /** true quand le montant est un minimum (« à partir de ») */
  isMinimum: boolean;
  /** Explication courte du calcul, affichée au client et envoyée dans le mail */
  detail: string;
};

export function getShippingQuote(
  method: ShippingMethod | null,
  zone: string | null,
  itemCount: number,
): ShippingQuote {
  switch (method) {
    case "abidjan": {
      const found = ABIDJAN_ZONES.find((z) => z.name === zone);
      if (!found) {
        return { amount: null, isMinimum: false, detail: "Choisissez votre commune" };
      }
      return {
        amount: found.price,
        isMinimum: false,
        detail: `Abidjan – ${found.name}`,
      };
    }
    case "interieur":
      return {
        amount: INTERIEUR_PRICE_PER_ITEM * itemCount,
        isMinimum: false,
        detail: `Intérieur du pays – ${INTERIEUR_PRICE_PER_ITEM.toLocaleString("fr-FR")} FCFA × ${itemCount} article(s)`,
      };
    case "france":
      return {
        amount: FRANCE_PRICE_PER_PARCEL,
        isMinimum: false,
        detail: "France – La Poste, forfait par colis",
      };
    case "international":
      return {
        amount: INTERNATIONAL_PRICE_FROM,
        isMinimum: true,
        detail: "International – à partir de, montant exact confirmé sur WhatsApp",
      };
    default:
      return { amount: null, isMinimum: false, detail: "Choisissez un mode de livraison" };
  }
}
