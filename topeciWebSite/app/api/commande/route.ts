import {
  appelerFonction,
  booleen,
  code,
  emailValide,
  telephoneValide,
  texte,
} from "../../lib/base-clients";
import { PRODUCT_NAMES, PRODUCT_PRICES, type Market } from "../../lib/prices";

/**
 * POST /api/commande
 * Enregistre une commande du panier dans la base clients.
 * L'email de commande (FormSubmit) reste envoyé par le panier : si la base
 * est indisponible, la commande n'est jamais perdue.
 */
export async function POST(request: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = await request.json();
  } catch {
    return Response.json({ ok: false, erreur: "Requête invalide" }, { status: 400 });
  }

  // Piège à robots : champ invisible pour un humain
  if (texte(corps.site_web)) return Response.json({ ok: true });

  const marche: Market = corps.marche === "EUR" ? "EUR" : "CI";
  const client = (corps.client ?? {}) as Record<string, unknown>;
  const telephone = telephoneValide(texte(client.telephone, 30));
  const email = emailValide(texte(client.email, 120));
  if (!telephone && !email) {
    return Response.json({ ok: false, erreur: "Téléphone ou email requis" }, { status: 400 });
  }

  // Les prix sont recalculés ici : on ne fait pas confiance au navigateur
  const lignesRecues = Array.isArray(corps.lignes) ? corps.lignes : [];
  const lignes = lignesRecues
    .map((l) => l as Record<string, unknown>)
    .filter((l) => typeof l.produit_id === "string" && PRODUCT_PRICES[l.produit_id as string])
    .slice(0, 20)
    .map((l) => {
      const produit = l.produit_id as string;
      const quantite = Math.min(Math.max(Math.floor(Number(l.quantite) || 1), 1), 500);
      return {
        produit_id: produit,
        produit_nom: PRODUCT_NAMES[produit] ?? produit,
        quantite,
        prix_unitaire: PRODUCT_PRICES[produit][marche],
      };
    });

  if (lignes.length === 0) {
    return Response.json({ ok: false, erreur: "Commande vide" }, { status: 400 });
  }

  const totalProduits = lignes.reduce((s, l) => s + l.prix_unitaire * l.quantite, 0);
  const fraisLivraison = Math.max(Number(corps.frais_livraison) || 0, 0);
  const suivi = (corps.suivi ?? {}) as Record<string, unknown>;

  const resultat = await appelerFonction("enregistrer_commande", {
    client: {
      prenom: texte(client.prenom, 80),
      nom: texte(client.nom, 80),
      telephone,
      email,
      ville: texte(client.ville, 80),
      pays: texte(client.pays, 80),
      consent_whatsapp: booleen(client.consent_whatsapp),
      consent_email: booleen(client.consent_email),
      source: code(suivi.source) ?? "site",
    },
    canal: "site",
    marche,
    devise: marche === "EUR" ? "EUR" : "FCFA",
    adresse: texte(client.adresse, 200),
    ville: texte(client.ville, 80),
    pays: texte(client.pays, 80),
    livraison_mode: code(corps.livraison_mode),
    livraison_detail: texte(corps.livraison_detail, 200),
    frais_livraison: fraisLivraison,
    total_produits: totalProduits,
    total: totalProduits + fraisLivraison,
    total_est_minimum: booleen(corps.total_est_minimum),
    code_ambassadeur: code(suivi.ambassadeur),
    lignes,
  });

  if (!resultat.ok) {
    if (resultat.raison === "erreur") console.error("[base clients] commande :", resultat.detail);
    // 202 : la commande est quand même partie par email
    return Response.json({ ok: false, enregistree: false }, { status: 202 });
  }

  const data = resultat.data as { numero?: string } | null;
  return Response.json({ ok: true, enregistree: true, numero: data?.numero });
}
