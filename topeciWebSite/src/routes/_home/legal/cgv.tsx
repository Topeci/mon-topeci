import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/legal/cgv")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800 leading-relaxed">

      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#4E6FA7] font-waffle-soft mb-4">
          Conditions Générales de Vente (CGV)
        </h1>
        <div className="w-24 h-1 bg-[#D68E54] mx-auto mb-6"></div>
      </div>

      {/* Section 1 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">1. Objet</h2>
      <p>
        Les présentes CGV définissent les droits et obligations de{" "}
        <strong>TOPECI</strong> et de ses clients dans le cadre de la vente de
        produits et services éducatifs et culturels (livres audio, contenus
        numériques, abonnements, activités interactives). Toute commande
        implique l’acceptation pleine et entière des présentes CGV.
      </p>

      {/* Section 2 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        2. Produits et services proposés
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Livres audio éducatifs et culturels,</li>
        <li>Activités pédagogiques numériques en ligne,</li>
        <li>Abonnements donnant accès à un catalogue élargi de contenus.</li>
      </ul>
      <p className="mt-2">
        Les caractéristiques essentielles des produits et services sont
        présentées sur le site.
      </p>

      {/* Section 3 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">3. Commande</h2>
      <p>
        Les commandes se font en ligne sur le site TOPECI. Toute commande
        validée suppose :
      </p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>La sélection du produit ou service,</li>
        <li>L’acceptation des CGV,</li>
        <li>Le paiement intégral de la commande.</li>
      </ul>
      <p className="mt-2">
        TOPECI se réserve le droit de refuser toute commande en cas de litige
        antérieur.
      </p>

      {/* Section 4 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">4. Prix</h2>
      <p>
        Les prix sont indiqués en FCFA, toutes taxes
        comprises (TTC). TOPECI se réserve le droit de modifier ses tarifs, mais
        le prix applicable est celui en vigueur lors de la commande.
      </p>

      {/* Section 5 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">5. Paiement</h2>
      <p>Le paiement en ligne peut se faire par :</p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>Carte bancaire,</li>
        <li>Mobile Money,</li>
        <li>Tout autre moyen sécurisé proposé sur le site.</li>
      </ul>
      <p className="mt-2">
        La commande est considérée comme ferme et définitive dès validation du
        paiement.
      </p>

      {/* Section 6 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        6. Livraison / Accès aux services
      </h2>
      <ul className="list-disc list-inside space-y-2">
        <li>
          Les produits numériques sont accessibles immédiatement après paiement
          (téléchargement ou espace personnel).
        </li>
        <li>
          Les abonnements donnent accès aux contenus pendant la durée choisie
          (mensuelle, annuelle, etc.).
        </li>
        <li>Aucun envoi physique n’est prévu sauf indication contraire.</li>
      </ul>

      {/* Section 7 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        7. Droit de rétractation
      </h2>
      <p>
        Conformément à la réglementation, les produits numériques livrés
        immédiatement après paiement ne donnent pas droit à rétractation une
        fois l’accès commencé (article L221-28 du Code de la consommation en
        France).
      </p>
      <p className="mt-2">
        Pour les services ou abonnements, le client dispose d’un délai de 14
        jours calendaires sauf si l’accès aux contenus a déjà débuté avec son
        accord.
      </p>

      {/* Section 8 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">8. Responsabilité</h2>
      <p>TOPECI ne pourra être tenu responsable des problèmes liés :</p>
      <ul className="list-disc list-inside space-y-2 mt-2">
        <li>à un mauvais usage du service,</li>
        <li>à une incompatibilité technique du matériel de l’utilisateur,</li>
        <li>
          à des interruptions indépendantes de sa volonté (Internet, hébergeur,
          force majeure).
        </li>
      </ul>

      {/* Section 9 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        9. Propriété intellectuelle
      </h2>
      <p>
        Les produits (livres audio, contenus numériques, illustrations,
        activités) sont protégés par le droit d’auteur. Toute reproduction ou
        partage non autorisé est interdit. L’achat confère uniquement un droit
        d’usage personnel et non exclusif.
      </p>

      {/* Section 10 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        10. Données personnelles
      </h2>
      <p>
        Les données collectées servent à traiter la commande, assurer la
        facturation et gérer l’accès aux contenus. Elles sont traitées
        conformément au RGPD. Plus d’informations dans notre{" "}
        <a
          href="/politique-confidentialite"
          className="text-blue-600 underline"
        >
          Politique de confidentialité & RGPD
        </a>
        .
      </p>

      {/* Section 11 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        11. Résiliation d’un abonnement
      </h2>
      <p>
        Le client peut résilier un abonnement depuis son espace personnel. Toute
        période entamée reste due et ne donnera pas lieu à remboursement, sauf
        cas exceptionnels.
      </p>

      {/* Section 12 */}
      <h2 className="text-xl font-semibold mt-8 mb-2">
        12. Droit applicable et litiges
      </h2>
      <p>
        Les présentes CGV sont régies par le droit{" "}
        <em>ivoirien</em>. En cas de litige, et à
        défaut de solution amiable, les tribunaux compétents seront ceux du
        ressort de <em>Abidjan</em>.
      </p>
    </div>
  );
}
