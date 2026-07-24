import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PolitiqueRemboursementRetourPage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-title text-4xl font-bold text-[#D98B5F] md:text-5xl">
              Politique remboursement & retour
            </h1>

            <div className="mt-8 rounded-2xl bg-[#FFF9F1] p-6 text-base leading-8 text-slate-700">
              <p>
                Cette politique explique les conditions de retour, d’échange et
                de remboursement applicables aux articles vendus par TOPECI.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  1. Délai de retour
                </h2>
                <p className="mt-4">
                  Le client peut demander un retour dans un délai raisonnable
                  après réception du produit, sous réserve que l’article soit
                  intact, non utilisé, complet et dans son emballage d’origine.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  2. Produits éligibles au retour
                </h2>
                <p className="mt-4">
                  Les articles physiques peuvent être retournés s’ils présentent
                  un défaut, une erreur de livraison ou un problème constaté à
                  la réception. Les produits endommagés par une mauvaise
                  utilisation ne sont pas éligibles au retour.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  3. Produits non retournables
                </h2>
                <p className="mt-4">
                  Les produits personnalisés, téléchargés, consommés ou utilisés
                  ne peuvent pas faire l’objet d’un retour, sauf en cas de défaut
                  avéré ou d’erreur imputable à TOPECI.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  4. Procédure de retour
                </h2>
                <p className="mt-4">
                  Pour demander un retour, le client doit contacter TOPECI en
                  précisant le numéro de commande, le produit concerné, le motif
                  de la demande et, si possible, des photos du produit reçu.
                </p>

                <p className="mt-4">
                  TOPECI indiquera ensuite les modalités de retour ou d’échange
                  selon la situation.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  5. Frais de retour
                </h2>
                <p className="mt-4">
                  Les frais de retour peuvent être à la charge du client, sauf
                  en cas d’erreur de livraison, de produit défectueux ou de
                  problème imputable à TOPECI.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  6. Échange
                </h2>
                <p className="mt-4">
                  Lorsqu’un produit est éligible, TOPECI peut proposer un échange
                  contre un produit identique ou équivalent, selon les stocks
                  disponibles.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  7. Remboursement
                </h2>
                <p className="mt-4">
                  En cas d’acceptation de la demande, le remboursement peut être
                  effectué selon le moyen de paiement utilisé ou par tout autre
                  moyen convenu avec le client.
                </p>

                <p className="mt-4">
                  Les délais de remboursement peuvent varier selon les banques,
                  opérateurs de paiement ou prestataires concernés.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  8. Articles reçus endommagés
                </h2>
                <p className="mt-4">
                  Si un article est reçu endommagé, le client doit contacter
                  TOPECI rapidement après réception avec des photos du colis et
                  du produit afin de permettre l’analyse de la demande.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  9. Contact
                </h2>
                <p className="mt-4">
                  Pour toute demande de retour, échange ou remboursement,
                  contactez-nous via la page{" "}
                  <Link href="/contact" className="font-semibold text-[#D93B7B]">
                    Contact
                  </Link>
                  .
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