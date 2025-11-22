import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/legal/privacy")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-[#4E6FA7] font-waffle-soft mb-4">
          Politique de confidentialité
        </h1>
        <div className="w-24 h-1 bg-[#D68E54] mx-auto mb-6" />
      </div>

      {/* Contenu */}
      <div className="space-y-6 leading-relaxed">
        <h2 className="text-xl font-semibold">1. Introduction</h2>
        <p>
          La présente Politique de Confidentialité décrit comment TOPECI
          collecte, utilise et protège les données personnelles des utilisateurs
          de son site et de ses services (livres audio, activités éducatives,
          abonnements). Nous nous engageons à respecter la confidentialité des
          informations et à les traiter conformément à la réglementation
          applicable, notamment le Règlement Général sur la Protection des
          Données (RGPD).
        </p>

        <h2 className="text-xl font-semibold">2. Responsable du traitement</h2>
        <p>
          Le responsable du traitement des données personnelles est :
          <br />
          TOPECI Forme juridique : SAS <br />
          Siège social : Siège faya Jule verne <br />
          Email : Montopeci@gmail.com <br />
        </p>

        <h2 className="text-xl font-semibold">3. Données collectées</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Données d’identification : nom, prénom, adresse email, numéro de
            téléphone.
          </li>
          <li>
            Données de connexion : adresse IP, type de navigateur, système
            d’exploitation, pages consultées.
          </li>
          <li>
            Données de commande et de paiement : produits achetés, date et
            montant.
          </li>
          <li>
            Préférences éducatives : progression dans un module, langues
            choisies, contenus consultés.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">4. Finalités de traitement</h2>
        <p>
          Les données collectées sont utilisées pour gérer l’accès aux services,
          traiter les commandes, améliorer la qualité des contenus et
          communiquer avec l’utilisateur.
        </p>

        <h2 className="text-xl font-semibold">
          5. Bases légales du traitement
        </h2>
        <p>
          Les traitements reposent sur l’exécution d’un contrat, le
          consentement, l’intérêt légitime et le respect des obligations
          légales.
        </p>

        <h2 className="text-xl font-semibold">6. Partage des données</h2>
        <p>
          Les données personnelles ne sont jamais vendues. Elles peuvent être
          partagées uniquement avec nos prestataires techniques et les autorités
          compétentes lorsque la loi l’exige.
        </p>

        <h2 className="text-xl font-semibold">7. Durée de conservation</h2>
        <p>
          Les données sont conservées pour une durée limitée (compte
          utilisateur, facturation, cookies) conformément à la réglementation.
        </p>

        <h2 className="text-xl font-semibold">8. Droits des utilisateurs</h2>
        <p>
          Vous disposez de droits d’accès, rectification, effacement,
          limitation, portabilité et opposition. Contactez-nous à
          Montopeci@gmail.com .
        </p>

        <h2 className="text-xl font-semibold">9. Sécurité des données</h2>
        <p>
          Nous mettons en place des mesures techniques et organisationnelles
          pour protéger vos données (chiffrement SSL/TLS, hébergement sécurisé,
          sauvegardes régulières).
        </p>

        <h2 className="text-xl font-semibold">10. Cookies</h2>
        <p>
          Le site utilise des cookies pour améliorer l’expérience utilisateur.
          Voir notre page « Cookies & traceurs » pour plus d’informations.
        </p>

        <h2 className="text-xl font-semibold">11. Modifications</h2>
        <p>
          La présente Politique peut être mise à jour. Nous informerons les
          utilisateurs en cas de changements significatifs.
        </p>

        <h2 className="text-xl font-semibold">12. Contact</h2>
        <p>
          Pour toute question relative à la gestion de vos données personnelles
          :
          <br />
          📧 Email : Montopeci@gmail.com <br />
          📍 Adresse : Siège faya Jule verne <br />
        </p>
      </div>
    </div>
  );
}
