// app/produit/page.tsx

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Check, MessageCircle, ShoppingCart, Truck } from "lucide-react";

const products = [
  {
    slug: "livre-audio-baoule",
    title: "Mon Premier Livre Audio Baoulé–Français",
    subtitle: "Baoulé - Français",
    price: "15 000 CFA",
    image: "/images/image jouet baoulé 1.png",
    category: "Livres Audio",
    description:
      "Offrez à votre enfant une immersion ludique au cœur de la langue et de la culture baoulé. Grâce à ses boutons audio interactifs, il écoute, découvre et mémorise naturellement plus de 150 mots et expressions du quotidien en baoulé et en français. Entre apprentissage, jeu et découverte culturelle, chaque page l’aide à développer son langage tout en renforçant son lien avec ses racines. Le plaisir de découvrir le baoulé pour lui, la fierté de le transmettre pour vous.",
    features: [
      "Livre audio interactif Baoulé–Français",
      "Dès 3 ans",
      "Plus de 150 mots et expressions du quotidien",
      "12 thématiques du quotidien",
      "Comptines traditionnelles",
      "Découverte de la culture baoulé",
      "12 pages interactives et 12 pages d'activités",
      "Développe le langage, l'écoute et la curiosité",
      "Utilisation simple et autonome",
      "Fonctionne avec 3 piles AA (non fournies)",
    ],
    productInfo: [
      "Marque : TOPECI",
      "Âge : À partir de 3 ans",
      "Dimensions : 28 x 28 x 3 cm",
      "Poids : 425 g",
      "Couleurs disponibles : Jaune ou Marron",
      "Garantie légale",
    ],
  },
  {
    slug: "livre-audio-dioula",
    title: "Mon Premier Livre Audio Dioula–Français",
    subtitle: "Dioula - Français",
    price: "15 000 CFA",
    image: "/images/image jouet dioula 1.png",
    category: "Livres Audio",
    description:
      "Offrez à votre enfant une immersion ludique au cœur de la langue et de la culture dioula. Grâce à ses boutons audio interactifs, il écoute, découvre et mémorise naturellement plus de 150 mots et expressions du quotidien en dioula et en français. Entre apprentissage, jeu et découverte culturelle, chaque page l’aide à développer son langage tout en renforçant son lien avec ses racines. Le dioula est une langue de partage, d’échange et de transmission. À travers ce livre, votre enfant découvre un univers riche en traditions, en histoires et en savoirs, tout en s’amusant. Une langue à découvrir, une culture à partager, un héritage à transmettre.",
    features: [
      "Livre audio interactif Dioula–Français",
      "Dès 3 ans",
      "Plus de 150 mots et expressions du quotidien",
      "Comptines traditionnelles",
      "Découverte de la culture dioula",
      "12 pages interactives et 12 pages d'activités",
      "Développe le langage, l'écoute et la curiosité",
      "Utilisation simple et autonome",
      "Fonctionne avec 3 piles AA (non fournies)",
    ],
    productInfo: [
      "Marque : TOPECI",
      "Âge : À partir de 3 ans",
      "Dimensions : 28 x 28 x 3 cm",
      "Poids : 425 g",
      "Couleurs disponibles : Jaune ou bleu",
      "Garantie légale",
    ],
  },
  {
    slug: "cartes-audio-bete",
    title: "Mes Premières Cartes Audio Bété–Français",
    subtitle: "Bété - Français",
    price: "15 000 CFA",
    image: "/images/cartes-audio.jpg",
    category: "Cartes Audio",
    description:
      "Faites découvrir à votre enfant la richesse de la langue et de la culture bété dès le plus jeune âge. Grâce à leurs contenus audio interactifs, les enfants écoutent, répètent et mémorisent naturellement leurs premiers mots du quotidien en bété et en français. Entre vocabulaire, comptines, histoires et découvertes culturelles, chaque carte transforme l’apprentissage en un moment de jeu et de curiosité. Des mots à écouter, une culture à découvrir, un héritage à faire vivre.",
    features: [
      "Plus de 100 cartes audio interactives",
      "Vocabulaire du quotidien",
      "Histoires et contes africains",
      "Comptines et musique",
      "Découverte de la culture bété",
      "Apprentissage du bété et du français",
      "Prononciation audio claire et intuitive",
      "Développe le langage, l'écoute et la mémoire",
      "Favorise l'autonomie et l'apprentissage par le jeu",
      "Utilisation simple adaptée aux jeunes enfants",
      "Fonctionne avec 3 piles AAA (non fournies) ou rechargeable",
    ],
    productInfo: [
      "Marque : TOPECI",
      "Âge recommandé : À partir de 3 ans",
      "Matière : Plastique",
      "Dimensions : 18 × 10 × 3 cm",
      "Poids : 570 g",
      "Couleurs : Bleu et Orange",
      "Nombre de joueurs minimum : 1",
      "Alimentation : rechargeable ou 3 piles AAA (non fournies)",
      "Garantie légale",
    ],
  },
];

const advantages = [
  "Support éducatif simple et ludique",
  "Idéal pour découvrir les langues africaines",
  "Adapté aux enfants et aux familles",
  "Commande simple via contact ou WhatsApp",
];

type ProduitPageProps = {
  searchParams?: {
    produit?: string;
  };
};

export default function ProduitPage({ searchParams }: ProduitPageProps) {
  const selectedProduct =
    products.find((product) => product.slug === searchParams?.produit) ||
    products[0];

  const whatsappMessage = `Bonjour TOPECI, je souhaite avoir plus d'informations ou passer une commande pour le produit : ${selectedProduct.title}.`;

  return (
    <>
      <Header />

      <main className="bg-white pt-[88px] text-[#1E1E1E]">
        <section className="bg-[#FFF9F1] px-6 py-14">
          <div className="mx-auto max-w-7xl">
            <Link href="/boutique" className="font-semibold text-[#D93B7B]">
              ← Retour à la boutique
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              <div className="overflow-hidden rounded-3xl bg-white p-4 shadow-md">
                <div className="relative h-[360px] overflow-hidden rounded-2xl bg-white sm:h-[460px]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.title}
                    fill
                    priority
                    className="object-contain p-4"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#D93B7B]">
                  {selectedProduct.category}
                </p>

                <h1 className="mt-4 font-title text-4xl font-bold leading-tight text-[#5C7DB8] md:text-5xl">
                  {selectedProduct.title}
                </h1>

                <p className="mt-4 text-xl font-semibold text-[#D98B5F]">
                  {selectedProduct.subtitle}
                </p>

                <p className="mt-5 text-3xl font-bold text-[#D98B5F]">
                  {selectedProduct.price}
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-700">
                  {selectedProduct.description}
                </p>

                <div className="mt-7 rounded-2xl bg-white p-5 shadow-sm">
                  <h2 className="font-title text-xl font-bold text-[#5C7DB8]">
                    Autres produits disponibles
                  </h2>

                  <div className="mt-5 grid gap-4">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/produit?produit=${product.slug}`}
                        className={`flex items-center gap-4 rounded-xl border p-4 transition ${
                          product.slug === selectedProduct.slug
                            ? "border-[#79C8C7] bg-[#79C8C7]/10"
                            : "border-slate-200 bg-[#FAFAFA] hover:bg-white"
                        }`}
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-white">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain p-1"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-title text-base font-bold text-[#1E1E1E]">
                            {product.title}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {product.subtitle}
                          </p>
                        </div>

                        <p className="font-bold text-[#D98B5F]">
                          {product.price}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#79C8C7] px-8 py-4 font-semibold text-white"
                  >
                    <ShoppingCart size={20} />
                    Commander
                  </Link>

                  <a
                    href={`https://wa.me/2250172616133?text=${encodeURIComponent(
                      whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D93B7B] px-8 py-4 font-semibold text-[#D93B7B]"
                  >
                    <MessageCircle size={20} />
                    Demander plus d’infos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-title text-3xl font-bold text-[#D98B5F]">
                Caractéristiques
              </h2>

              <div className="mt-8 grid gap-4">
                {selectedProduct.features.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white">
                      <Check size={15} />
                    </div>
                    <p className="text-base leading-7 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#FFF9F1] p-8">
              <h2 className="font-title text-3xl font-bold text-[#D98B5F]">
                Informations produit
              </h2>

              <div className="mt-8 grid gap-4">
                {selectedProduct.productInfo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D93B7B] text-white">
                      <Check size={15} />
                    </div>
                    <p className="text-base leading-7 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
            <div>
              <h2 className="font-title text-3xl font-bold text-[#D98B5F]">
                Pourquoi choisir TOPECI ?
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-700">
                TOPECI propose des supports pensés pour transmettre les langues,
                les traditions et la fierté culturelle aux nouvelles
                générations. Chaque produit est conçu pour apprendre de manière
                simple, joyeuse et accessible.
              </p>

              <div className="mt-8 grid gap-4">
                {advantages.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white">
                      <Check size={15} />
                    </div>
                    <p className="text-base leading-7 text-slate-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#FFF9F1] p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D98B5F] text-white">
                  <Truck size={26} />
                </div>

                <div>
                  <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                    Livraison disponible
                  </h2>
                  <p className="mt-1 text-slate-600">
                    Selon les villes, les pays et la disponibilité des produits.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-700">
                TOPECI peut livrer ses articles en Côte d’Ivoire et partout dans
                le monde selon les délais applicables, les stocks disponibles et
                les conditions de transport.
              </p>

              <Link
                href="/politique-livraison"
                className="mt-6 inline-block font-semibold text-[#D93B7B]"
              >
                Voir la politique de livraison →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#D93B7B] px-6 py-16 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-title text-3xl font-bold">
              Vous souhaitez commander ce produit ?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8">
              Contactez notre équipe pour connaître les disponibilités, les
              délais de livraison et les modalités de commande.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-bold text-[#D93B7B]"
            >
              Contacter TOPECI
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}