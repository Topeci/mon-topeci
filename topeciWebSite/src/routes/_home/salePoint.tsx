import { createFileRoute } from "@tanstack/react-router";
import salePoint from "../../assets/images/salepoint.png";
import imgJumia from "../../assets/images/imgjumia.png";
import librairieFrance from "../../assets/images/librairieFrance.jpg";
import amazon from "../../assets/images/amazon.png";

export const Route = createFileRoute("/_home/salePoint")({
  component: RouteComponent,
});

function RouteComponent() {
  const physicalStores = [
    { name: "Librairie de France", location: "Abidjan Plateau" },
    { name: "Sococe", location: "Abidjan 2 Plateaux" },
    { name: "FNAC Cap Sud", location: "Abidjan Marcory" },
    { name: "FNAC Cap Nord", location: "Abidjan Riviera Cocody" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="flex flex-col items-center text-center mb-12">
          <img
            src={salePoint}
            alt="Points de vente"
            className="mb-6 h-24 w-auto object-contain"
          />
        </div>

        {/* Section Boutique en ligne */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-center text-[#4E6FA7] mb-8"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Boutiques en ligne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Carte Jumia */}
            <a
              href="https://www.jumia.ci"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={imgJumia}
                    alt="Jumia Côte d'Ivoire"
                    className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Jumia CI
                </h3>
                <p className="text-gray-600 mb-4">
                  Achetez nos produits TOPECI sur la plus grande plateforme
                  e-commerce de Côte d'Ivoire
                </p>
                <div className="bg-orange-50 text-orange-600 py-2 px-4 rounded-lg text-sm font-medium text-center">
                  Livraison en Côte d'Ivoire
                </div>
              </div>
            </a>

            {/* Carte Librairie de France */}
            <a
              href="https://www.librairiedefrance.net"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={librairieFrance}
                    alt="Librairie France"
                    className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Librairie de France
                </h3>
                <p className="text-gray-600 mb-4">
                  Commandez nos livres éducatifs TOPECI depuis le site de la
                  Librairie de France
                </p>
                <div className="bg-blue-50 text-blue-600 py-2 px-4 rounded-lg text-sm font-medium text-center">
                  Livraison en Côte d'Ivoire
                </div>
              </div>
            </a>

            {/* Carte Amazon */}
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={amazon}
                    alt="amazon"
                    className="h-16 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Amazon
                </h3>
                <p className="text-gray-600 mb-4">
                  Commandez nos produits TOPECI et profitez de la livraison
                  internationale
                </p>
                <div className="bg-green-50 text-green-600 py-2 px-4 rounded-lg text-sm font-medium text-center">
                  Livraison internationale
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Section Points de vente physiques */}
        <div className="mb-16">
          <h2
            className="text-3xl font-bold text-center text-[#4E6FA7] mb-8"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Points de vente physiques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {physicalStores.map((store, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-[#4E6FA7] rounded-full flex items-center justify-center text-white text-2xl">
                    🏪
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
                  {store.name}
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  📍 {store.location}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Retrouvez nos produits dans ces magasins partenaires à Abidjan
            </p>
          </div>
        </div>

        {/* Section Informations supplémentaires */}
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto mb-12">
          <h2
            className="text-3xl font-bold text-center text-[#4E6FA7] mb-8"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Informations importantes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-700">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-2xl mr-3">🛒</div>
                <div>
                  <h4 className="font-bold mb-2 text-lg">Commandes en ligne</h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      ✓ Paiement sécurisé (Wave, Paypal, CB, Orange Money)
                    </li>
                    <li>✓ Livraison Côte d'Ivoire : 1-2 jours ouvrés</li>
                    <li>✓ Livraison internationale : 3-7 jours ouvrés</li>
                    <li>✓ Suivi de commande disponible</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-2xl mr-3">🏪</div>
                <div>
                  <h4 className="font-bold mb-2 text-lg">
                    Points de vente physiques
                  </h4>
                  <ul className="text-sm space-y-2">
                    <li>✓ Produits disponibles immédiatement</li>
                    <li>✓ Conseils personnalisés en magasin</li>
                    <li>✓ Paiement en espèces et mobile money</li>
                    <li>✓ Testez les produits avant achat</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-700 mb-6 text-lg">
            Vous avez des questions sur nos points de vente ?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/2250172616133"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="text-xl">📱</span>
              Contactez-nous sur WhatsApp
            </a>
            <a
              href="mailto:montopeci@gmail.com"
              className="inline-flex items-center gap-2 bg-[#4E6FA7] hover:bg-[#3d5a8a] text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="text-xl">📧</span>
              Envoyez-nous un email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
