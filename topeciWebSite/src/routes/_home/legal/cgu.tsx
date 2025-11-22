import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/legal/cgu")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800 leading-relaxed">

      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#4E6FA7] font-waffle-soft mb-4">
          Conditions Générales d’Utilisation (CGU)
        </h1>
        <div className="w-24 h-1 bg-[#D68E54] mx-auto mb-6"></div>
      </div>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mt-8 mb-2 font-glacial-indifference">1. Objet</h2>
      <p className="font-glacial-indifference">
        Les présentes CGU définissent les modalités d’accès et d’utilisation du
        site et des services proposés par <strong>TOPECI</strong>, plateforme
        éducative et culturelle dédiée à la préservation et la transmission des
        langues, coutumes et traditions africaines. Toute navigation sur le site
        implique l’acceptation pleine et entière des présentes CGU par
        l’utilisateur.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mt-8 mb-2 font-glacial-indifference">2. Accès au site</h2>
      <p className="font-glacial-indifference">
        Le site TOPECI est accessible gratuitement à tout utilisateur disposant
        d’un accès à Internet. Certains contenus ou services peuvent être
        réservés aux utilisateurs inscrits et nécessiter la création d’un compte
        personnel. L’utilisateur est responsable de son équipement, de son accès
        Internet et des frais afférents.
      </p>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        3. Inscription et compte utilisateur
      </h2>
      <p>
        Pour accéder à certains services (livres audio, activités éducatives
        interactives, parcours personnalisés), l’utilisateur doit créer un
        compte avec des informations exactes et à jour.
      </p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>
          L’utilisateur s’engage à préserver la confidentialité de ses
          identifiants.
        </li>
        <li>
          Toute connexion avec ces identifiants sera réputée effectuée par
          l’utilisateur.
        </li>
        <li>
          En cas d’utilisation frauduleuse, TOPECI ne pourra être tenu
          responsable.
        </li>
      </ul>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        4. Utilisation du site
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Utiliser le site dans le respect des lois en vigueur.</li>
        <li>
          Ne pas porter atteinte aux droits de propriété intellectuelle de
          TOPECI ou de tiers.
        </li>
        <li>
          Ne pas détourner les services à des fins commerciales, politiques ou
          publicitaires.
        </li>
        <li>Ne pas introduire volontairement de virus ou code malveillant.</li>
      </ul>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Contenus proposés</h2>
      <p>
        Les contenus (textes, livres audio, illustrations, activités éducatives)
        sont destinés à un usage personnel et éducatif. Toute reproduction ou
        diffusion non autorisée est interdite.
      </p>
      <p className="mt-2">
        TOPECI s’efforce d’assurer l’exactitude et la qualité des contenus, sans
        pouvoir garantir l’absence totale d’erreurs.
      </p>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        6. Propriété intellectuelle
      </h2>
      <p>
        Tous les éléments du site (logos, textes, images, vidéos, bases de
        données, logiciels, etc.) demeurent la propriété exclusive de TOPECI ou
        de ses partenaires. Toute reproduction, représentation ou traduction,
        même partielle, sans autorisation écrite est interdite.
      </p>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">7. Responsabilité</h2>
      <p>
        TOPECI met en œuvre tous les moyens pour assurer un accès continu et
        sécurisé, mais ne peut garantir un fonctionnement ininterrompu.
      </p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>Interruptions temporaires ou permanentes,</li>
        <li>Pannes, bugs ou erreurs,</li>
        <li>Domages directs ou indirects liés à l’utilisation du site.</li>
      </ul>
      <p className="mt-2">
        TOPECI n’est pas responsable des contenus externes accessibles via des
        liens.
      </p>

      {/* Section 8 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        8. Protection des données personnelles
      </h2>
      <p>Les données personnelles sont traitées conformément au RGPD.</p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>
          <strong>Responsable :</strong> TOPECI
        </li>
        <li>
          <strong>Finalités :</strong> gestion des comptes, accès aux services,
          suivi pédagogique, communication.
        </li>
        <li>
          <strong>Droits :</strong> accès, rectification, opposition,
          suppression, portabilité.
        </li>
      </ul>
      <p className="mt-2">
        Pour exercer vos droits, contactez-nous à :{" "}
        <a href="mailto:contact@topeci.org" className="text-blue-600 underline">
          contact@topeci.org
        </a>
        . Plus d’informations dans notre{" "}
        <a
          href="/politique-confidentialite"
          className="text-blue-600 underline"
        >
          Politique de confidentialité & RGPD
        </a>
        .
      </p>

      {/* Section 9 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">9. Cookies</h2>
      <p>
        Le site utilise des cookies et traceurs pour améliorer l’expérience
        utilisateur. L’utilisateur peut gérer ses préférences via le bandeau
        prévu à cet effet ou depuis son navigateur. Plus de détails dans la page{" "}
        <a href="/cookies" className="text-blue-600 underline">
          Cookies & traceurs
        </a>
        .
      </p>

      {/* Section 10 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        10. Modification des CGU
      </h2>
      <p>
        TOPECI se réserve le droit de modifier les présentes CGU à tout moment.
        Les utilisateurs seront informés des changements par tout moyen
        approprié. La poursuite de l’utilisation vaut acceptation des nouvelles
        CGU.
      </p>

      {/* Section 11 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        11. Droit applicable et juridiction compétente
      </h2>
      <p>
        Les présentes CGU sont régies par le droit{" "}
        <em>ivoirien</em>. En cas de litige, les
        tribunaux compétents seront ceux du ressort d'{" "}
        <em>Abidjan</em>.
      </p>
    </div>
  );
}
