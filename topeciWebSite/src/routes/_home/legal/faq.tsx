import { createFileRoute } from "@tanstack/react-router";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_home/legal/faq")({
  component: RouteComponent,
});

function RouteComponent() {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const FAQItem = ({ id, question, answer }) => (
    <div className="mb-6">
      <div
        className="flex items-start justify-between cursor-pointer group"
        onClick={() => toggleItem(id)}
      >
        <h2
          className="text-lg font-bold  flex-1 pr-4"
          style={{ fontFamily: "Glacial Indifference" }}
        >
          {question}
        </h2>
        <div className="mt-1 flex-shrink-0">
          {openItems[id] ? <Minus size={24} /> : <Plus size={24} />}
        </div>
      </div>
      {openItems[id] && (
        <div
          className="text-gray-700 mt-3 pr-8"
          style={{ fontFamily: "Glacial Indifference" }}
        >
          {answer}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* En-tête */}
      <div className="mx-9 mb-8 pt-8">
        <h1
          className="text-5xl text-center text-[#4E6FA7] font-bold mb-4"
          style={{ fontFamily: "WAFFLE-SOFT" }}
        >
          Foire aux questions (FAQ)
        </h1>
      </div>

      {/* Contenu FAQ */}
      <div className="px-6 py-4 max-w-4xl mx-auto">
        {/* Section 1 : À propos de TOPECI */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-[#D68E54] mb-6"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            À propos de TOPECI
          </h2>

          <FAQItem
            id="about-1"
            question="Qu'est-ce que TOPECI ?"
            answer={
              <div className="space-y-3 font-glacial-indifference">
                <p>
                  TOPECI est une entreprise ivoirienne. Chez TOPECI, nous
                  croyons qu'apprendre sa langue maternelle, c'est s'ancrer dans
                  son identité. C'est pourquoi nous créons des jouets africains
                  éducatifs qui éveillent la curiosité, célèbrent nos cultures
                  et offrent aux enfants une expérience d'apprentissage joyeuse,
                  interactive et profondément immersive.
                </p>
              </div>
            }
          />

          <FAQItem
            id="about-2"
            question="Quelle est votre mission ?"
            answer={
              <p className="font-glacial-indifference">
                Nous voulons préserver les langues africaines, transmettre la
                beauté de nos cultures et permettre à chaque enfant de grandir
                fier de ses origines.
              </p>
            }
          ></FAQItem>

          <FAQItem
            id="about-3"
            question="Pourquoi choisir TOPECI ?"
            answer={
              <p className="font-glacial-indifference">
                Parce que nous proposons des produits 100 % africains, pensés
                par des passionnés de culture et d'éducation. Chaque livre ou
                jeu audio combine tradition, technologie et apprentissage
                ludique.
              </p>
            }
          ></FAQItem>

          <FAQItem
            id="about-4"
            question="Quels types de produits proposez-vous ?"
            answer={
              <div className="space-y-2 font-glacial-indifference">
                <p>• Mon premier livre audio (Baoulé, Dioula)</p>
                <p>• Mes premières cartes audio Bété–Français</p>
                <p className="mt-3">
                  De nouvelles langues arrivent bientôt. Pour être tenu au
                  courant des nouveautés et des exclusivités, inscrivez-vous à
                  notre newsletter.
                </p>
              </div>
            }
          />

          <FAQItem
            id="about-5"
            question="Comment ça fonctionne ?"
            answer={
              <div className="space-y-3 font-glacial-indifference">
                <p>
                  Il suffit d'appuyer sur le bouton audio pour écouter la
                  prononciation des mots, des phrases, des chansons ou des
                  histoires. Aucun téléphone ni application n'est nécessaire :
                  tout est intégré dans le produit.
                </p>
                <p>
                  <strong>
                    Combien de cartes contient le coffret Bété–Français ?
                  </strong>
                  <br />
                  <br />
                  Le coffret comprend plus de 100 cartes illustrées avec des
                  mots traduits en Bété et en Français, ainsi que des histoires
                  et chansons audio.
                </p>
              </div>
            }
          />
        </div>

        {/* Section 2 : Apprentissage & langue */}
        <div className="mb-6">
          <h2
            className="text-2xl font-bold text-[#D68E54] mb-6"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Apprentissage & langue
          </h2>

          <FAQItem
            id="learning-1"
            question="À partir de quel âge peut-on l'utiliser ?"
            answer={
              <div className="space-y-3 font-glacial-indifference">
                <p>
                  Dès 3 ans. Les enfants peuvent écouter, répéter et apprendre
                  seuls ou avec leurs parents.
                </p>
                <p>
                  <strong>Est-ce utile si je ne parle pas la langue ?</strong>
                  <br />
                  <br />
                  Oui ! L'audio permet à l'enfant (et même au parent)
                  d'apprendre la prononciation correcte. Vous pouvez apprendre
                  ensemble, même sans maîtriser la langue.
                </p>
                <p>
                  <strong>Est-ce uniquement en Bété ?</strong>
                  <br />
                  <br />
                  Non, chaque produit existe dans une langue spécifique :
                  Baoulé, Dioula, Bété… et chaque version comprend toujours la
                  traduction en Français.
                </p>
                <p>
                  <strong>Les grands enfants peuvent-ils aussi jouer ?</strong>
                  <br />
                  <br />
                  Absolument. Nos produits sont conçus pour les enfants de 2 à
                  10 ans, mais les plus âgés y trouvent aussi un plaisir
                  d'apprentissage culturel.
                </p>
                <p>
                  <strong>
                    Ce jeu ou livre aide-t-il vraiment à parler la langue ?
                  </strong>
                  <br />
                  <br />
                  Oui, nos supports associent l'écoute, la répétition et
                  l'image, ce qui renforce la mémoire auditive et visuelle de
                  l'enfant.
                </p>
              </div>
            }
          />
        </div>

        {/* Section 3 : Fonctionnement technique */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-[#D68E54] mb-6"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Fonctionnement technique
          </h2>

          <FAQItem
            id="tech-1"
            question="Faut-il une application ?"
            answer={
              <p className="font-glacial-indifference">
                Non, tout est intégré dans le produit. Pas besoin d'Internet ni
                de téléphone.
              </p>
            }
          />

          <FAQItem
            id="tech-2"
            question="Comment le recharger ?"
            answer={
              <p className="font-glacial-indifference">
                Chaque produit fonctionne avec des piles, mais les cartes audio
                Bété sont hybrides : elles possèdent en plus une batterie
                rechargeable via le câble USB inclus.
              </p>
            }
          />

          <FAQItem
            id="tech-3"
            question="Quelle est l'autonomie ?"
            answer={
              <p className="font-glacial-indifference">
                Jusqu'à 5 à 6 heures d'écoute continue après une charge complète.
              </p>
            }
          />
        </div>

        {/* Section 4 : Livraison */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-[#D68E54] mb-6"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Livraison
          </h2>

          <FAQItem
            id="delivery-1"
            question="Quels sont les délais de livraison ?"
            answer={
              <div className="space-y-2 font-glacial-indifference">
                <p>• En Côte d'Ivoire : 1 à 2 jours ouvrés</p>
                <p>• À l'international : 3 à 7 jours ouvrés</p>
              </div>
            }
          />

          <FAQItem
            id="delivery-2"
            question="Livrez-vous à l'étranger ?"
            answer={
              <p className="font-glacial-indifference">
                Oui, TOPECI livre partout dans le monde via des partenaires fiables.
              </p>
            }
          />
        </div>

        {/* Section 5 : Commande & Paiement */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-[#D68E54] mb-6"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Commande & Paiement
          </h2>

          <FAQItem
            id="payment-1"
            question="Comment passer une commande ?"
            answer={
              <div className="space-y-3 font-glacial-indifference">
                <p>
                  Directement sur ce site www.montopeci.com, dans nos boutiques
                  partenaires ou lors d'événements.
                </p>
                <p>
                  <strong>Quels moyens de paiement acceptez-vous ?</strong>
                  <br />
                  Paiement possible via Wave, Paypal, carte bancaire, Orange
                  Money, virement bancaire ou en espèces à la livraison (si
                  commande via notre numéro direct).
                </p>
                <p>
                  <strong>Puis-je offrir un produit TOPECI ?</strong>
                  <br />
                  Oui ! C'est un cadeau éducatif et culturel parfait pour les
                  enfants.
                </p>
              </div>
            }
          />
        </div>

        {/* Section 6 : Retour, échange & garantie */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-[#D68E54] mb-6"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Retour, échange & garantie
          </h2>

          <FAQItem
            id="return-1"
            question="Puis-je changer d'avis après l'achat ?"
            answer={
              <div className="space-y-3 font-glacial-indifference">
                <p>
                  Oui, vous disposez de 7 jours pour retourner un produit non
                  ouvert et obtenir un échange ou un remboursement.
                </p>
                <p>
                  <strong>Que faire si le produit est abîmé ?</strong>
                  <br />
                  Contactez-nous à montopeci@gmail.com avec une photo. Nous le
                  remplacerons sans frais.
                </p>
                <p>
                  <strong>Y a-t-il une garantie ?</strong>
                  <br />
                  Oui, tous nos produits bénéficient d'une garantie constructeur
                  en cas de défaut technique.
                </p>
              </div>
            }
          />
        </div>

        {/* Section 7 : Collaboration & contact */}
        <div className="mb-12">
          <h2
            className="text-2xl font-bold text-[#D68E54] mb-6"
            style={{ fontFamily: "WAFFLE-SOFT" }}
          >
            Collaboration & contact
          </h2>

          <FAQItem
            id="contact-1"
            question="Travaillez-vous avec les écoles ou ONG ?"
            answer={
              <div className="space-y-3">
                <p>
                  Oui, TOPECI collabore avec des écoles, centres culturels et
                  fondations pour promouvoir les langues africaines.
                </p>
                <p>
                  <strong>Comment vous contacter ?</strong>
                  <br />
                  📧 montopeci@gmail.com
                  <br />
                  📞 WhatsApp disponible sur le site (+225 0172616133)
                </p>
                <p>Nous vous répondrons dans les plus brefs délais.</p>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
