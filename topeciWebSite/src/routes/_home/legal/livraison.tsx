import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/legal/livraison")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-6 py-10 max-w-4xl mx-auto text-gray-800">
      {/* En-tête */}
      <div className="text-center mb-12">
        <h1 className="text-2xl font-bold text-[#4E6FA7] font-waffle-soft mb-4">
          Politique de livraison
        </h1>
        <div className="w-24 h-1 bg-[#D68E54] mx-auto mb-6" />
      </div>

      {/* Contenu */}
      <section className="space-y-6 leading-relaxed">
        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">1. Objet</h2>
          <p>
            La présente politique de livraison a pour but d’informer les clients
            de TOPECI sur les modalités, délais et conditions de livraison des
            produits achetés sur le site, qu’il s’agisse de livres numériques
            (audio, PDF, e-book) ou de livres physiques expédiés à domicile.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            2. Types de produits livrés
          </h2>
          <ul className="list-disc pl-6">
            <li>
              Produits numériques : livres audio, e-books, PDF téléchargeables.
            </li>
            <li>Produits physiques : livres imprimés et supports culturels.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            3. Livraison des produits numériques
          </h2>
          <p>
            Les livres numériques sont livrés instantanément après confirmation
            du paiement.
          </p>
          <ul className="list-disc pl-6">
            <li>Un lien de téléchargement est envoyé par e-mail.</li>
            <li>
              Les achats sont disponibles dans l’espace personnel du client.
            </li>
            <li>Livraison immédiate, sauf incident technique.</li>
            <li>En cas de problème : 📧 [email de support].</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            4. Livraison des produits physiques
          </h2>
          <p>
            Les produits physiques sont livrés à l’adresse indiquée par le
            client.
          </p>
          <h3 className="font-semibold mt-3">Zones de livraison :</h3>
          <ul className="list-disc pl-6">
            <li>Côte d’Ivoire (Abidjan et intérieur du pays).</li>
            <li>Afrique de l’Ouest (selon partenariats logistiques).</li>
            <li>International sur demande (frais supplémentaires).</li>
          </ul>

          <h3 className="font-semibold mt-3">Délais moyens :</h3>
          <ul className="list-disc pl-6">
            <li>Abidjan : 2 à 5 jours ouvrés.</li>
            <li>Intérieur du pays : 5 à 10 jours ouvrés.</li>
            <li>Autres pays : 10 à 20 jours ouvrés.</li>
          </ul>

          <h3 className="font-semibold mt-3">Frais de livraison :</h3>
          <p>
            Calculés automatiquement selon le poids, la destination et le mode
            choisi. Affichés avant paiement.
          </p>

          <h3 className="font-semibold mt-3">Suivi :</h3>
          <p>
            Un numéro de suivi est communiqué dès l’expédition et disponible via
            le compte client ou le transporteur.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            5. Retards ou absence de livraison
          </h2>
          <p>
            En cas de problème, le client doit signaler à 📧 [email de support].
            Une enquête sera ouverte auprès du transporteur. Si le colis est
            perdu, réexpédition ou remboursement intégral.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            6. Erreur ou produit endommagé
          </h2>
          <p>
            Le client dispose de 48h pour signaler tout problème avec photo à 📧
            [email de support]. TOPECI prend en charge l’échange ou
            remboursement.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            7. Responsabilité
          </h2>
          <ul className="list-disc pl-6">
            <li>Retards dus à la logistique ou force majeure.</li>
            <li>Erreurs d’adresse saisies par le client.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">
            8. Modification de la politique
          </h2>
          <p>
            TOPECI se réserve le droit de modifier la présente politique pour
            s’adapter à l’évolution de ses services, de la législation ou de ses
            partenaires logistiques.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[#4E6FA7]">9. Contact</h2>
          <p>
            📧 Service client TOPECI <br />
            Email : [email de contact] <br />
            Téléphone : [numéro si applicable] <br />
            Adresse : [adresse du siège social]
          </p>
        </div>
      </section>
    </div>
  );
}

export default RouteComponent;
