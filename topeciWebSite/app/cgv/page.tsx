import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CGVPage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-title text-4xl font-bold text-[#D98B5F] md:text-5xl">
              Conditions Générales de Vente
            </h1>

            <div className="mt-8 rounded-2xl bg-[#FFF9F1] p-6 text-base leading-8 text-slate-700">
              <p>
                Les présentes Conditions Générales de Vente encadrent la vente
                des produits TOPECI, notamment les livres audio, supports
                éducatifs, coffrets, cartes, cahiers et autres articles proposés
                par la marque.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  1. Vendeur
                </h2>
                <p className="mt-4">
                  Les produits sont vendus par TOPECI.
                  <br />
                  Société : SAS
                  <br />
                  Siège social : Abidjan Faya Jules Verne
                  <br />
                  Email : info@montopeci.com
                  <br />
                  Téléphone : +225 17 26 16 133
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  2. Produits
                </h2>
                <p className="mt-4">
                  Les produits présentés sur le site sont décrits avec le plus
                  grand soin. Les images, visuels ou illustrations sont fournis à
                  titre indicatif et peuvent légèrement différer du produit réel.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  3. Prix
                </h2>
                <p className="mt-4">
                  Les prix sont indiqués en FCFA, sauf mention contraire. TOPECI
                  se réserve le droit de modifier ses prix à tout moment. Le prix
                  applicable est celui communiqué ou confirmé au moment de la
                  commande.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  4. Commande
                </h2>
                <p className="mt-4">
                  Dans la version vitrine du site, les boutons d’ajout, de
                  commande et de paiement sont présentés visuellement. Le panier,
                  le paiement en ligne, la gestion automatique des commandes et
                  l’espace administrateur seront développés dans une seconde
                  phase du projet.
                </p>
                <p className="mt-4">
                  Les commandes peuvent être finalisées via les moyens de contact
                  proposés par TOPECI, notamment email, téléphone ou WhatsApp.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  5. Disponibilité
                </h2>
                <p className="mt-4">
                  Les produits sont proposés dans la limite des stocks
                  disponibles. En cas d’indisponibilité, TOPECI informera le
                  client afin de proposer une solution adaptée : attente,
                  remplacement, avoir ou remboursement.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  6. Paiement
                </h2>
                <p className="mt-4">
                  Les modalités de paiement sont communiquées au client lors de
                  la confirmation de la commande. Selon les cas, TOPECI peut
                  accepter les moyens de paiement disponibles localement ou
                  internationalement.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  7. Livraison
                </h2>
                <p className="mt-4">
                  TOPECI livre ses articles en Côte d’Ivoire et à
                  l’international, sous réserve de disponibilité des produits,
                  des transporteurs et des délais applicables selon les villes et
                  pays concernés. Consultez notre{" "}
                  <Link
                    href="/politique-livraison"
                    className="font-semibold text-[#D93B7B]"
                  >
                    Politique de livraison
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  8. Retours et remboursements
                </h2>
                <p className="mt-4">
                  Les conditions de retour, d’échange ou de remboursement sont
                  détaillées dans notre{" "}
                  <Link
                    href="/politique-remboursement-retour"
                    className="font-semibold text-[#D93B7B]"
                  >
                    Politique remboursement & retour
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  9. Propriété intellectuelle
                </h2>
                <p className="mt-4">
                  Les contenus, supports, illustrations, textes, logos, sons et
                  produits TOPECI sont protégés. Toute reproduction ou
                  exploitation non autorisée est interdite.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  10. Responsabilité
                </h2>
                <p className="mt-4">
                  TOPECI ne saurait être tenu responsable des retards,
                  interruptions, indisponibilités ou dommages liés à un cas de
                  force majeure, à un transporteur, à une mauvaise utilisation du
                  produit ou à des informations inexactes fournies par le client.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  11. Données personnelles
                </h2>
                <p className="mt-4">
                  Les données collectées dans le cadre des commandes sont
                  traitées conformément à notre{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="font-semibold text-[#D93B7B]"
                  >
                    Politique de confidentialité
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  12. Droit applicable et litiges
                </h2>
                <p className="mt-4">
                  Les présentes CGV sont régies par le droit ivoirien. En cas de
                  litige, une solution amiable sera recherchée en priorité. À
                  défaut, les juridictions compétentes seront celles du ressort
                  d’Abidjan.
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