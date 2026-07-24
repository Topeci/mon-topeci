import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PolitiqueLivraisonPage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-title text-4xl font-bold text-[#D98B5F] md:text-5xl">
              Politique de livraison
            </h1>

            <div className="mt-8 rounded-2xl bg-[#FFF9F1] p-6 text-base leading-8 text-slate-700">
              <p>
                TOPECI livre ses articles partout dans le monde, sous réserve de
                disponibilité des produits, des services de transport et des
                délais applicables selon les villes, pays et zones de livraison.
              </p>
            </div>

            <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  1. Zones de livraison
                </h2>
                <p className="mt-4">
                  TOPECI propose la livraison en Côte d’Ivoire et à
                  l’international. Les délais et les frais peuvent varier selon
                  la ville, le pays, la disponibilité du transporteur et la
                  nature des articles commandés.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  2. Délais de livraison
                </h2>
                <p className="mt-4">
                  Les délais sont communiqués à titre indicatif au moment de la
                  commande ou de la confirmation par TOPECI. Ils peuvent varier
                  selon la destination, les jours ouvrés, les contraintes
                  logistiques, les formalités douanières ou les périodes de forte
                  demande.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  3. Disponibilité des produits
                </h2>
                <p className="mt-4">
                  Les produits sont livrés dans la limite des stocks disponibles.
                  En cas d’indisponibilité d’un article, TOPECI informera le
                  client afin de proposer une solution adaptée : attente,
                  remplacement, avoir ou remboursement selon le cas.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  4. Frais de livraison
                </h2>
                <p className="mt-4">
                  Les frais de livraison dépendent de la destination, du poids,
                  du volume du colis et du mode d’expédition choisi. Ils peuvent
                  être communiqués avant la validation définitive de la commande.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  5. Suivi de commande
                </h2>
                <p className="mt-4">
                  Lorsque cela est possible, TOPECI transmet au client les
                  informations de suivi disponibles. Certaines livraisons locales
                  peuvent être suivies directement par téléphone, WhatsApp ou
                  email.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  6. Adresse de livraison
                </h2>
                <p className="mt-4">
                  Le client doit fournir une adresse complète, exacte et
                  accessible. TOPECI ne saurait être tenu responsable d’un retard
                  ou d’un échec de livraison lié à une adresse incorrecte,
                  incomplète ou difficilement accessible.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  7. Livraison internationale
                </h2>
                <p className="mt-4">
                  Pour les livraisons hors Côte d’Ivoire, des frais
                  supplémentaires, taxes, droits de douane ou formalités locales
                  peuvent s’appliquer. Ces frais sont à la charge du client,
                  sauf indication contraire.
                </p>
              </section>

              <section>
                <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                  8. Contact
                </h2>
                <p className="mt-4">
                  Pour toute question relative à une livraison, contactez-nous
                  via la page{" "}
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