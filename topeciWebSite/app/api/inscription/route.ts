import {
  appelerFonction,
  booleen,
  code,
  emailValide,
  langues,
  telephoneValide,
  texte,
} from "../../lib/base-clients";

/**
 * POST /api/inscription
 * Inscription d'un contact : offre en avant-première, jeu concours,
 * lien WhatsApp « DINO », QR code de l'emballage, ambassadeurs...
 */
export async function POST(request: Request) {
  let corps: Record<string, unknown>;
  try {
    corps = await request.json();
  } catch {
    return Response.json({ ok: false, erreur: "Requête invalide" }, { status: 400 });
  }

  if (texte(corps.site_web)) return Response.json({ ok: true }); // robot

  const telephone = telephoneValide(texte(corps.telephone, 30));
  const email = emailValide(texte(corps.email, 120));
  if (!telephone && !email) {
    return Response.json(
      { ok: false, erreur: "Indique ton numéro WhatsApp ou ton email." },
      { status: 400 },
    );
  }

  const consentWhatsapp = booleen(corps.consent_whatsapp);
  const consentEmail = booleen(corps.consent_email);
  if (!consentWhatsapp && !consentEmail) {
    return Response.json(
      { ok: false, erreur: "Coche au moins une façon de te prévenir." },
      { status: 400 },
    );
  }

  const resultat = await appelerFonction("enregistrer_contact", {
    prenom: texte(corps.prenom, 80),
    nom: texte(corps.nom, 80),
    telephone,
    email,
    ville: texte(corps.ville, 80),
    pays: texte(corps.pays, 80),
    marche: corps.marche === "EUR" ? "EUR" : "CI",
    langues: langues(corps.langues),
    ages_enfants: texte(corps.ages_enfants, 60),
    source: code(corps.source) ?? "inscription",
    code_ambassadeur: code(corps.ambassadeur),
    consent_whatsapp: consentWhatsapp,
    consent_email: consentEmail,
  });

  if (!resultat.ok) {
    if (resultat.raison === "erreur") console.error("[base clients] inscription :", resultat.detail);
    return Response.json(
      { ok: false, erreur: "Inscription momentanément indisponible. Écris-nous sur WhatsApp !" },
      { status: 503 },
    );
  }

  return Response.json({ ok: true });
}
