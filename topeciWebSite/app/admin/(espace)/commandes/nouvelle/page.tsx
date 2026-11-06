import { lire } from "../../../../lib/admin/base";
import { exigerAdmin } from "../../../../lib/admin/session";
import { PRODUCT_NAMES, PRODUCT_PRICES } from "../../../../lib/prices";
import { EnTete } from "../../ui";
import FormulaireVente from "./FormulaireVente";

export const metadata = { title: "Nouvelle vente" };

export default async function NouvelleVente() {
  await exigerAdmin();
  const ambassadeurs = await lire<{ code: string; nom: string }[]>("ambassadeurs?select=code,nom&actif=is.true&order=nom.asc");
  const produits = Object.entries(PRODUCT_NAMES).map(([id, nom]) => ({ id, nom, prix: PRODUCT_PRICES[id] }));
  const aujourdhui = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Abidjan" });

  return (
    <>
      <EnTete titre="Nouvelle vente" sousTitre="Une vente faite sur WhatsApp, en salon ou en librairie : elle rejoint la base comme les commandes du site." />
      <FormulaireVente produits={produits} ambassadeurs={ambassadeurs} aujourdhui={aujourdhui} />
    </>
  );
}
