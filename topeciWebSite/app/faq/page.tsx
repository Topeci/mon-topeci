import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "Qu’est-ce que TOPECI ?",
    answer:
      "TOPECI est une marque éducative et culturelle qui crée des supports ludiques pour transmettre les langues, les cultures et les traditions africaines aux enfants.",
  },
  {
    question: "Quels produits propose TOPECI ?",
    answer:
      "TOPECI propose notamment des livres audio interactifs, des cartes parlantes, des cahiers, des coffrets éducatifs et d’autres supports destinés à l’apprentissage des langues africaines.",
  },
  {
    question: "Les produits sont-ils adaptés aux enfants ?",
    answer:
      "Oui. Les produits TOPECI sont pensés pour accompagner les enfants dans un apprentissage simple, amusant et valorisant, avec des contenus adaptés aux plus jeunes.",
  },
  {
    question: "Comment commander un produit ?",
    answer:
      "Dans cette version vitrine, les boutons d’ajout et de commande sont présentés visuellement. Pour commander, vous pouvez nous contacter directement via la page Contact, par email ou WhatsApp.",
  },
  {
    question: "Le paiement en ligne est-il disponible ?",
    answer:
      "Non, pas encore. Le panier, le paiement en ligne, la gestion automatique des commandes et l’espace administrateur seront développés dans une seconde phase du projet.",
  },
  {
    question: "TOPECI livre-t-il à l’international ?",
    answer:
      "Oui. TOPECI peut livrer partout dans le monde selon la disponibilité des produits, les délais de transport et les conditions applicables dans chaque ville ou pays.",
  },
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Les délais varient selon la destination, la ville, le pays, la disponibilité du produit et le transporteur. Ils sont confirmés au moment de la commande.",
  },
  {
    question: "Puis-je devenir partenaire ou distributeur ?",
    answer:
      "Oui. Les écoles, librairies, associations, boutiques, entreprises ou particuliers engagés peuvent contacter TOPECI pour proposer ou distribuer les produits.",
  },
  {
    question: "Les produits TOPECI sont-ils destinés aux écoles ?",
    answer:
      "Oui. Les produits peuvent être utilisés par des écoles, associations ou structures éducatives pour accompagner la découverte des langues et cultures africaines.",
  },
  {
    question: "Comment contacter TOPECI ?",
    answer:
      "Vous pouvez contacter TOPECI via la page Contact, par email à contact@mon-topeci.com ou par WhatsApp selon les coordonnées affichées sur le site.",
  },
];

export default function FAQPage() {
  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-14 text-center">
          <h1 className="font-title text-4xl font-bold text-[#5C7DB8] md:text-5xl">
            FAQ
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Retrouvez les réponses aux questions fréquentes sur TOPECI, ses
            produits, les commandes, la livraison et les partenariats.
          </p>
        </section>

        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h2 className="font-title text-xl font-bold text-[#D93B7B]">
                  {index + 1}. {faq.question}
                </h2>

                <p className="mt-4 text-base leading-8 text-slate-700">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#FFF9F1] px-6 py-14 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-title text-3xl font-bold text-[#D98B5F]">
              Vous n’avez pas trouvé votre réponse ?
            </h2>

            <p className="mx-auto mt-5 text-base leading-8 text-slate-600">
              Notre équipe reste disponible pour répondre à vos questions sur
              les produits, la livraison, les commandes ou les partenariats.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-xl bg-[#79C8C7] px-8 py-3.5 font-semibold text-white"
            >
              Nous contacter
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}