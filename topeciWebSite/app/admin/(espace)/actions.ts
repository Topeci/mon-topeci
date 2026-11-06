"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { ajouter, enc, fonction, modifier } from "../../lib/admin/base";
import { COOKIE_ADMIN, exigerAdmin } from "../../lib/admin/session";
import { DEFAULT_PRICE, PRODUCT_NAMES } from "../../lib/prices";

const STATUTS = ["nouvelle", "confirmee", "en_livraison", "livree", "annulee"];
const CANAUX = ["whatsapp", "salon", "librairie", "ambassadeur", "revendeur", "site", "autre"];
const UUID = /^[0-9a-f-]{36}$/i;

const txt = (f: FormData, cle: string, max = 200) => {
  const v = String(f.get(cle) ?? "").trim().slice(0, max);
  return v === "" ? null : v;
};

export async function seDeconnecter() {
  (await cookies()).delete(COOKIE_ADMIN);
  redirect("/admin/connexion");
}

export async function changerStatut(formulaire: FormData) {
  await exigerAdmin();
  const id = txt(formulaire, "id", 40);
  const statut = txt(formulaire, "statut", 20);
  if (!id || !UUID.test(id) || !statut || !STATUTS.includes(statut)) return;
  await modifier(`commandes?id=eq.${enc(id)}`, { statut });
  revalidatePath("/admin", "layout");
}

export async function noterCommande(formulaire: FormData) {
  await exigerAdmin();
  const id = txt(formulaire, "id", 40);
  if (!id || !UUID.test(id)) return;
  await modifier(`commandes?id=eq.${enc(id)}`, { notes: txt(formulaire, "notes", 2000) });
  revalidatePath("/admin", "layout");
}

export async function modifierClient(formulaire: FormData) {
  await exigerAdmin();
  const id = txt(formulaire, "id", 40);
  if (!id || !UUID.test(id)) return;
  const whatsapp = formulaire.get("consent_whatsapp") === "on";
  const email = formulaire.get("consent_email") === "on";
  await modifier(`contacts?id=eq.${enc(id)}`, {
    notes: txt(formulaire, "notes", 2000),
    ville: txt(formulaire, "ville", 80),
    consent_whatsapp: whatsapp,
    consent_email: email,
    desinscrit: !whatsapp && !email && formulaire.get("desinscrit") === "on",
    updated_at: new Date().toISOString(),
  });
  revalidatePath("/admin", "layout");
}

export type EtatVente = { erreur?: string };

/** Saisie rapide d'une vente faite hors du site (WhatsApp, salon, librairie...). */
export async function enregistrerVente(_avant: EtatVente, f: FormData): Promise<EtatVente> {
  const admin = await exigerAdmin();

  const telephone = txt(f, "telephone", 30);
  const email = txt(f, "email", 120);
  if (!telephone && !email) return { erreur: "Il faut au moins le téléphone (ou l’e-mail) du client." };

  const marche = f.get("marche") === "EUR" ? "EUR" : "CI";
  const canal = CANAUX.includes(String(f.get("canal"))) ? String(f.get("canal")) : "autre";
  const statut = STATUTS.includes(String(f.get("statut"))) ? String(f.get("statut")) : "livree";

  const lignes = Object.keys(PRODUCT_NAMES)
    .map((produit_id) => {
      const quantite = Math.min(Math.max(Math.trunc(Number(f.get(`qte_${produit_id}`) || 0)), 0), 500);
      const prix = Number(f.get(`prix_${produit_id}`));
      return {
        produit_id,
        produit_nom: PRODUCT_NAMES[produit_id],
        quantite,
        prix_unitaire: Number.isFinite(prix) && prix >= 0 ? prix : DEFAULT_PRICE[marche],
      };
    })
    .filter((l) => l.quantite > 0);
  if (lignes.length === 0) return { erreur: "Indique au moins un jouet vendu." };

  const fraisSaisis = Number(f.get("frais_livraison") || 0);
  const frais = Number.isFinite(fraisSaisis) && fraisSaisis > 0 ? fraisSaisis : 0;
  const totalProduits = lignes.reduce((s, l) => s + l.quantite * l.prix_unitaire, 0);
  const jour = txt(f, "date", 10);
  const ville = txt(f, "ville", 80);

  let numero: string | undefined;
  try {
    const r = await fonction<{ numero: string }>("enregistrer_commande", {
      p: {
        canal,
        marche,
        devise: marche === "EUR" ? "EUR" : "FCFA",
        statut,
        date: jour && /^\d{4}-\d{2}-\d{2}$/.test(jour) ? `${jour}T12:00:00Z` : undefined,
        ville,
        adresse: txt(f, "adresse", 200),
        pays: marche === "EUR" ? txt(f, "pays", 80) : "Côte d’Ivoire",
        frais_livraison: frais,
        total_produits: totalProduits,
        total: totalProduits + frais,
        code_ambassadeur: txt(f, "code_ambassadeur", 30),
        notes: [txt(f, "notes", 1000), `Saisie par ${admin.nom}`].filter(Boolean).join(" · "),
        client: {
          prenom: txt(f, "prenom", 80),
          nom: txt(f, "nom", 80),
          telephone,
          email,
          ville,
          source: canal,
          consent_whatsapp: f.get("consent_whatsapp") === "on",
        },
        lignes,
      },
    });
    numero = r?.numero;
  } catch (e) {
    console.error("[admin] vente :", e);
    return { erreur: "La vente n’a pas pu être enregistrée. Vérifie le numéro de téléphone et réessaie." };
  }
  revalidatePath("/admin", "layout");
  redirect(numero ? `/admin/commandes/${enc(numero)}?nouvelle=1` : "/admin/commandes");
}

export async function ajouterAmbassadeur(f: FormData) {
  await exigerAdmin();
  const code = txt(f, "code", 20)?.toUpperCase().replace(/[^A-Z0-9-]/g, "");
  const nom = txt(f, "nom", 80);
  if (!code || !nom) return;
  const commission = Math.max(0, Math.trunc(Number(f.get("commission") || 1000)));
  try {
    await ajouter("ambassadeurs", { code, nom, telephone: txt(f, "telephone", 30), commission_par_jouet: commission });
  } catch (e) {
    console.error("[admin] ambassadeur (code déjà pris ?) :", e);
  }
  revalidatePath("/admin/ambassadeurs");
}

export async function payerCommission(f: FormData) {
  const admin = await exigerAdmin();
  const code = txt(f, "code", 20);
  const montant = Math.trunc(Number(f.get("montant") || 0));
  if (!code || !(montant > 0)) return;
  await ajouter("paiements_commissions", { code, montant, note: txt(f, "note", 200), par: admin.email });
  revalidatePath("/admin/ambassadeurs");
}
