import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-title text-4xl font-bold text-[#D98B5F] md:text-5xl">
              Politique de confidentialité
            </h1>

            <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  1. Introduction
                </h2>
                <p className="mt-4">
                  La présente Politique de Confidentialité décrit comment TOPECI
                  collecte, utilise et protège les données personnelles des
                  utilisateurs de son site et de ses services (livres audio,
                  activités éducatives, abonnements).
                </p>
                <p className="mt-4">
                  Nous nous engageons à respecter la confidentialité des
                  informations et à les traiter conformément à la réglementation
                  applicable, notamment le Règlement Général sur la Protection
                  des Données (RGPD).
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  2. Responsable du traitement
                </h2>
                <p className="mt-4">
                  Le responsable du traitement des données personnelles est :
                  <br />
                  TOPECI
                  <br />
                  Forme juridique : SAS
                  <br />
                  Siège social : Abidjan Faya Jules Verne
                  <br />
                  Email : info@montopeci.com
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  3. Données collectées
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                  <li>
                    Données d’identification : nom, prénom, adresse email,
                    numéro de téléphone.
                  </li>
                  <li>
                    Données de connexion : adresse IP, type de navigateur,
                    système d’exploitation, pages consultées.
                  </li>
                  <li>
                    Données de commande et de paiement : produits achetés, date
                    et montant.
                  </li>
                  <li>
                    Préférences éducatives : progression dans un module, langues
                    choisies, contenus consultés.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  4. Finalités de traitement
                </h2>
                <p className="mt-4">
                  Les données collectées sont utilisées pour gérer l’accès aux
                  services, traiter les commandes, améliorer la qualité des
                  contenus et communiquer avec l’utilisateur.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  5. Bases légales du traitement
                </h2>
                <p className="mt-4">
                  Les traitements reposent sur l’exécution d’un contrat, le
                  consentement, l’intérêt légitime et le respect des obligations
                  légales.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  6. Partage des données
                </h2>
                <p className="mt-4">
                  Les données personnelles ne sont jamais vendues. Elles peuvent
                  être partagées uniquement avec nos prestataires techniques et
                  les autorités compétentes lorsque la loi l’exige.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  7. Durée de conservation
                </h2>
                <p className="mt-4">
                  Les données sont conservées pour une durée limitée (compte
                  utilisateur, facturation, cookies) conformément à la
                  réglementation.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  8. Droits des utilisateurs
                </h2>
                <p className="mt-4">
                  Vous disposez de droits d’accès, rectification, effacement,
                  limitation, portabilité et opposition.
                </p>
                <p className="mt-4">
                  Pour exercer vos droits, contactez-nous à :
                  info@montopeci.com
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  9. Sécurité des données
                </h2>
                <p className="mt-4">
                  Nous mettons en place des mesures techniques et
                  organisationnelles pour protéger vos données, notamment le
                  chiffrement SSL/TLS, l’hébergement sécurisé et des sauvegardes
                  régulières.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  10. Cookies
                </h2>
                <p className="mt-4">
                  Le site utilise des cookies pour améliorer l’expérience
                  utilisateur. Voir notre page « Cookies & traceurs » pour plus
                  d’informations.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  11. Modifications
                </h2>
                <p className="mt-4">
                  La présente Politique peut être mise à jour. Nous informerons
                  les utilisateurs en cas de changements significatifs.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  12. Contact
                </h2>
                <p className="mt-4">
                  Pour toute question relative à la gestion de vos données
                  personnelles :
                  <br />
                  Email : info@montopeci.com
                  <br />
                  Adresse : Abidjan Faya Jules Verne
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}