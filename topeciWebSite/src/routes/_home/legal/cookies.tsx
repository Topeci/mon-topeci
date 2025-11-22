import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/legal/cookies")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800 leading-relaxed">
      <h1 className="text-2xl font-bold mb-6"></h1>
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#4E6FA7] font-waffle-soft mb-4">
          Cookies & Traceurs
        </h1>
        <div className="w-24 h-1 bg-[#D68E54] mx-auto mb-6"></div>
      </div>
      <p className="mb-4">
        Cette page explique comment <strong>TOPECI</strong> — une plateforme
        éducative et culturelle dédiée à la préservation et à la transmission
        des langues et traditions africaines — utilise des cookies et
        technologies similaires (collectivement, « cookies ») sur son site
        public et dans ses espaces interactifs (accès aux livres audio,
        activités éducatives, contenus immersifs).
      </p>
      <p className="mb-6">
        Pour en savoir plus sur le traitement de vos données personnelles,
        consultez notre <strong>Politique de confidentialité & RGPD</strong>.
      </p>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        1. Qu’est-ce qu’un cookie ?
      </h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre appareil
        (ordinateur, smartphone, tablette) lors de la consultation d’un site ou
        d’une application. Il permet de stocker des informations afin de
        reconnaître votre navigateur, mémoriser vos préférences, sécuriser vos
        sessions ou mesurer l’usage de nos services.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. Types de cookies que nous utilisons
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Cookies strictement nécessaires :</strong> indispensables au
          fonctionnement (authentification, maintien de session, sécurité,
          prévention de la fraude, accès aux contenus éducatifs).
        </li>
        <li>
          <strong>Cookies de performance / mesure d’audience :</strong> aident à
          comprendre l’utilisation du site (pages consultées, interactions avec
          les activités éducatives, téléchargement/écoute de livres audio).
        </li>
        <li>
          <strong>Cookies de fonctionnalité :</strong> mémorisent vos
          préférences (langue choisie, dernier livre audio consulté, progression
          dans un module éducatif) pour personnaliser votre expérience
          utilisateur.
        </li>
        <li>
          <strong>Cookies de sécurité :</strong> détection d’activité anormale,
          limitation d’accès, protection CSRF/XSS, mécanismes anti-bot.
        </li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        3. Finalités spécifiques à TOPECI
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Garantir la continuité de votre parcours (livres audio, activités).
        </li>
        <li>
          Sécuriser l’accès aux contenus réservés et préférences personnelles.
        </li>
        <li>Faciliter des fonctionnalités optionnelles (langue, filtres).</li>
        <li>
          Améliorer l’interactivité et la personnalisation (rappels,
          suggestions).
        </li>
      </ul>
      <p className="mt-2">
        Important : les cookies ne stockent jamais d’informations sensibles
        relatives à votre identité culturelle ou à vos contenus personnels.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        4. Fondements juridiques
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Intérêt légitime / obligation légale :</strong> cookies
          strictement nécessaires.
        </li>
        <li>
          <strong>Consentement :</strong> cookies non essentiels (mesure
          d’audience, personnalisation).
        </li>
      </ul>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        5. Durée de conservation
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Cookies de session : expirent à la fermeture du navigateur.</li>
        <li>Cookies persistants : durée limitée selon leur objectif.</li>
        <li>
          Cookies strictement nécessaires : durée minimale pour le service.
        </li>
      </ul>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        6. Gestion de votre consentement
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Bandeau ou module de gestion des préférences pour accepter/refuser.
        </li>
        <li>Possibilité de modifier vos choix à tout moment.</li>
      </ul>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        7. Paramètres de navigateur
      </h2>
      <p className="mb-2">
        Vous pouvez configurer votre navigateur pour accepter, refuser ou
        supprimer des cookies.
      </p>
      <p className="mb-4 text-sm text-gray-600">
        ⚠ Le refus des cookies strictement nécessaires peut altérer l’accès au
        site.
      </p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        <li>
          Chrome — Paramètres &gt; Confidentialité et sécurité &gt; Cookies.
        </li>
        <li>Firefox — Options &gt; Vie privée et sécurité &gt; Cookies.</li>
        <li>Safari — Préférences &gt; Confidentialité.</li>
        <li>Edge — Paramètres &gt; Cookies et autorisations de site.</li>
      </ul>

      {/* Section 8 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">8. Cookies tiers</h2>
      <p>
        Nous pouvons recourir à des services tiers (hébergement, mesure
        d’audience, protection anti-bot, diffusion de contenus audio/vidéo)
        susceptibles de déposer leurs propres cookies. Leur dépôt est soumis à
        votre consentement.
      </p>

      {/* Section 9 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        9. Sécurité et confidentialité
      </h2>
      <p>
        TOPECI applique des mesures techniques et organisationnelles pour
        protéger l’intégrité et la confidentialité des informations :
        chiffrement, contrôle d’accès, supervision, minimisation des données.
      </p>

      {/* Section 10 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">10. Modifications</h2>
      <p>
        Nous pouvons mettre à jour cette page pour refléter des évolutions
        légales, techniques ou organisationnelles. Les changements significatifs
        seront communiqués par les moyens appropriés.
      </p>

      {/* Section 11 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">11. Contact</h2>
      <p>
        Pour toute question ou demande relative aux cookies, contactez-nous via
        la page{" "}
        <a href="/contact" className="text-blue-600 underline">
          Contact
        </a>
        .
      </p>
      <p className="mt-2">
        Vous pouvez également consulter nos{" "}
        <a href="/cgu" className="text-blue-600 underline">
          CGU/CGV
        </a>{" "}
        et notre{" "}
        <a
          href="/privacy"
          className="text-blue-600 underline"
        >
          Politique de confidentialité & RGPD
        </a>
        .
      </p>
    </div>
  );
}
