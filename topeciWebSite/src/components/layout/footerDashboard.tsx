import { useState } from "react";

export function FooterDashboard() {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const legalContent = {
    refund: {
      title: "Politique de Remboursement",
      content: `Chez TOPECI, nous nous engageons à votre satisfaction. Si vous n'êtes pas entièrement satisfait de votre achat, vous pouvez demander un remboursement sous 14 jours suivant la réception de votre commande.

Conditions de remboursement :
• Les produits doivent être retournés dans leur état d'origine
• L'emballage doit être intact
• Les produits numériques ne sont pas remboursables
• Les frais de retour sont à la charge du client

Pour initier un remboursement, contactez notre service client.`,
    },
    privacy: {
      title: "Politique de Confidentialité",
      content: `TOPECI s'engage à protéger vos données personnelles.

1. Introduction
La présente Politique de Confidentialité décrit comment TOPECI collecte, utilise et protège les données personnelles des utilisateurs de son site et de ses services.

2. Données collectées
• Données d'identification : nom, prénom, adresse email, numéro de téléphone
• Données de connexion : adresse IP, type de navigateur, pages consultées
• Données de commande et de paiement
• Préférences éducatives : progression dans les modules

3. Finalités de traitement
• Gérer l'accès aux services
• Création et gestion du compte utilisateur
• Traiter les commandes et paiements
• Améliorer la qualité des contenus

4. Sécurité des données
Nous mettons en place des mesures techniques pour protéger vos données :
• Chiffrement des échanges (SSL/TLS)
• Hébergement sécurisé
• Contrôles d'accès restreints

Pour toute question relative à la gestion de vos données personnelles :
📧 Email : contact@topecishop.com`,
    },
    terms: {
      title: "Conditions Générales de Vente",
      content: `Les présentes conditions régissent l'utilisation de la boutique en ligne TOPECI.

1. Produits et services proposés
TOPECI propose :
• Des livres audio éducatifs et culturels
• Des activités pédagogiques numériques
• Des abonnements à un catalogue de contenus

2. Commande
L'utilisateur peut passer commande en ligne via le site TOPECI.
Toute commande validée suppose l'acceptation des CGV.

3. Prix et paiement
Les prix sont indiqués en FCFA, toutes taxes comprises.
Paiement sécurisé par carte bancaire ou mobile money.

4. Livraison / Accès aux services
• Les produits numériques sont accessibles immédiatement après paiement
• Les abonnements donnent accès aux contenus pendant la durée choisie

5. Droit de rétractation
Conformément à la réglementation, les produits numériques livrés immédiatement après paiement ne donnent pas droit à un délai de rétractation une fois l'accès commencé.`,
    },
    legal: {
      title: "Mentions Légales",
      content: `TOPECI Shop - Mentions légales

1. Éditeur du site
TOPECI
Siège social : Plateau, Rue des Commerce
01 BP 1234 Abidjan 01, Côte d'Ivoire
Email : contact@topecishop.com
Téléphone : +225 27 20 21 22 23

Représentants légaux :
• Jean-Marc Bonny Koffi, Co-fondateur
• Cindy Ornella Kouakou, Co-fondatrice

2. Propriété intellectuelle
L'ensemble des éléments figurant sur le site TOPECI sont protégés par le Code de la propriété intellectuelle et demeurent la propriété exclusive de TOPECI.

3. Responsabilité
TOPECI met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées sur le site.`,
    },
    contact: {
      title: "Coordonnées",
      content: `Service Client TOPECI

📞 Support téléphonique :
+225 27 20 21 22 23
(Lun-Ven: 8h-18h, Sam: 9h-13h)

📧 Email :
contact@topecishop.com
support@topecishop.com

📍 Adresse physique :
Plateau, Rue des Commerce
Immeuble Les Pyramides
01 BP 1234 Abidjan 01
Côte d'Ivoire

🕒 Horaires d'ouverture :
Lundi - Vendredi : 8h00 - 18h00
Samedi : 9h00 - 13h00
Dimanche : Fermé`,
    },
  };

  const closeDialog = () => setOpenDialog(null);

  return (
    <>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Liens principaux */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
              <button
                onClick={() => setOpenDialog("refund")}
                className="text-gray-600 dark:text-gray-400 hover:text-[#BE356A] dark:hover:text-[#D68E54] transition-colors font-indie-flower underline underline-offset-4"
              >
                Politique de remboursement
              </button>

              <button
                onClick={() => setOpenDialog("privacy")}
                className="text-gray-600 dark:text-gray-400 hover:text-[#BE356A] dark:hover:text-[#D68E54] transition-colors font-indie-flower underline underline-offset-4"
              >
                Politique de confidentialité
              </button>

              <button
                onClick={() => setOpenDialog("terms")}
                className="text-gray-600 dark:text-gray-400 hover:text-[#BE356A] dark:hover:text-[#D68E54] transition-colors font-indie-flower underline underline-offset-4"
              >
                Conditions générales de vente
              </button>

              <button
                onClick={() => setOpenDialog("legal")}
                className="text-gray-600 dark:text-gray-400 hover:text-[#BE356A] dark:hover:text-[#D68E54] transition-colors font-indie-flower underline underline-offset-4"
              >
                Mentions légales
              </button>

              <button
                onClick={() => setOpenDialog("contact")}
                className="text-gray-600 dark:text-gray-400 hover:text-[#BE356A] dark:hover:text-[#D68E54] transition-colors font-indie-flower underline underline-offset-4"
              >
                Coordonnées
              </button>
            </div>

            
          </div>
        </div>
      </footer>

      {/* Dialog pour le contenu légal */}
      {openDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-indie-flower">
                  {legalContent[openDialog as keyof typeof legalContent].title}
                </h3>
                <button
                  onClick={closeDialog}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <svg
                    className="w-6 h-6 text-gray-600 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {
                      legalContent[openDialog as keyof typeof legalContent]
                        .content
                    }
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                <button
                  onClick={closeDialog}
                  className="px-6 py-2 bg-[#BE356A] hover:bg-[#a52e5b] text-white rounded-lg font-medium transition-colors font-indie-flower"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
