"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: number;
  images: string[];
  badge: string;
  rating: string;
  features: string[];
  productInfo: string[];
};

const products: Product[] = [
  {
    id: "livre-audio-baoule",
    name: "Mon Premier Livre Audio Baoulé–Français",
    category: "Livres Audio",
    description:
      "Offrez à votre enfant une immersion ludique au cœur de la langue et de la culture baoulé.",
    longDescription:
      "Grâce à ses boutons audio interactifs, il écoute, découvre et mémorise naturellement plus de 150 mots et expressions du quotidien en baoulé et en français. Entre apprentissage, jeu et découverte culturelle, chaque page l'aide à développer son langage tout en renforçant son lien avec ses racines. Le plaisir de découvrir le baoulé pour lui, la fierté de le transmettre pour vous.",
    price: 15000,
    images: [
      "/images/image jouet baoulé 1.png",
      "/images/livre audio-baoule-francais1.jpg",
      "/images/baoule-francais-enfant.jpg",
    ],
    badge: "Nouveau",
    rating: "4.8",
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
    id: "livre-audio-dioula",
    name: "Mon Premier Livre Audio Dioula–Français",
    category: "Livres Audio",
    description:
      "Offrez à votre enfant une immersion ludique au cœur de la langue et de la culture dioula.",
    longDescription:
      "Grâce à ses boutons audio interactifs, il écoute, découvre et mémorise naturellement plus de 150 mots et expressions du quotidien en dioula et en français. Entre apprentissage, jeu et découverte culturelle, chaque page l'aide à développer son langage tout en renforçant son lien avec ses racines. Le dioula est une langue de partage, d'échange et de transmission. À travers ce livre, votre enfant découvre un univers riche en traditions, en histoires et en savoirs, tout en s'amusant. Une langue à découvrir, une culture à partager, un héritage à transmettre.",
    price: 15000,
    images: [
      "/images/image jouet dioula 1.png",
      "/images/livre-audio-dioula.jpg",
      "/images/dioula-francais-2.jpg",
    ],
    badge: "Nouveau",
    rating: "4.7",
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
    id: "cartes-audio-bete",
    name: "Mes Premières Cartes Audio Bété–Français",
    category: "Cartes Audio",
    description:
      "Faites découvrir à votre enfant la richesse de la langue et de la culture bété dès le plus jeune âge.",
    longDescription:
      "Grâce à leurs contenus audio interactifs, les enfants écoutent, répètent et mémorisent naturellement leurs premiers mots du quotidien en bété et en français. Entre vocabulaire, comptines, histoires et découvertes culturelles, chaque carte transforme l'apprentissage en un moment de jeu et de curiosité. Des mots à écouter, une culture à découvrir, un héritage à faire vivre.",
    price: 15000,
    images: [
      "/images/cartes-audio.jpg",
      "/images/cartes-audios.jpg",
      "/images/carte-lots.jpg",
      "/images/lot-de-carte.jpg",
      "/images/carte-audio.jpg",
      "/images/carte-audio3.jpg",
      "/images/carte-audio4.jpg",
    ],
    badge: "Nouveau",
    rating: "4.6",
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
  "Des outils simples et ludiques",
  "Adaptés à l’éveil et au développement des enfants",
  "Favorisent l’apprentissage des langues africaines",
  "Encouragent la découverte et la fierté culturelle",
  "Conçus avec passion pour rapprocher les générations",
];

type CartProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();

  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const product = products.find((item) => item.id === params.id) || products[0];
  const relatedProducts = products.filter((item) => item.id !== product.id);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product.id]);

  const activeImage = product.images[activeImageIndex] || product.images[0];

  const goToImage = (index: number) => {
    const safeIndex =
      index < 0
        ? product.images.length - 1
        : index >= product.images.length
          ? 0
          : index;

    setActiveImageIndex(safeIndex);
  };

  const previousImage = () => {
    goToImage(activeImageIndex - 1);
  };

  const nextImage = () => {
    goToImage(activeImageIndex + 1);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = touchStartX.current - touchEndX;

    if (Math.abs(distance) > 40) {
      if (distance > 0) {
        nextImage();
      } else {
        previousImage();
      }
    }

    touchStartX.current = null;
  };

  const addToCart = () => {
    const savedCart = localStorage.getItem("topeci_cart_items");
    const cart: CartProduct[] = savedCart ? JSON.parse(savedCart) : [];

    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        title: product.name,
        price: `${product.price.toLocaleString("fr-FR")} CFA`,
        image: product.images[0],
        quantity: 1,
      });
    }

    localStorage.setItem("topeci_cart_items", JSON.stringify(cart));
    window.dispatchEvent(new Event("topeci-cart-updated"));
    setCartModalOpen(true);
  };

  return (
    <>
      <Header />

      <main className="bg-white pt-[80px] text-[#1E1E1E] sm:pt-[88px]">
        <section className="bg-[#FFF9F1] px-4 py-7 sm:px-6 sm:py-10 lg:px-8 lg:py-14">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D93B7B] sm:text-base"
            >
              <ArrowLeft size={18} />
              Retour à la boutique
            </Link>

            <div className="mt-7 grid min-w-0 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-12">
              <div className="min-w-0 rounded-3xl bg-white p-3 shadow-md sm:p-4">
                <div
                  className="relative h-[320px] overflow-hidden rounded-2xl bg-white sm:h-[430px] md:h-[500px] lg:h-[540px]"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  <Image
                    src={activeImage}
                    alt={`${product.name} - image ${activeImageIndex + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-3 sm:p-5"
                  />

                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#D98B5F] px-3 py-1.5 text-xs font-bold text-white shadow-sm sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-sm">
                      {product.badge}
                    </span>
                  )}

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold shadow-sm sm:right-5 sm:top-5">
                    <Star
                      size={15}
                      className="fill-[#F2C94C] text-[#F2C94C]"
                    />
                    {product.rating}
                  </div>

                  {product.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={previousImage}
                        className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex"
                        aria-label="Image précédente"
                      >
                        <ChevronLeft size={22} />
                      </button>

                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex"
                        aria-label="Image suivante"
                      >
                        <ChevronRight size={22} />
                      </button>

                      <div className="absolute bottom-4 left-1/2 flex max-w-[80%] -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
                        {product.images.map((image, index) => (
                          <button
                            key={image}
                            type="button"
                            onClick={() => goToImage(index)}
                            className={`h-2.5 shrink-0 rounded-full transition-all ${
                              activeImageIndex === index
                                ? "w-7 bg-white"
                                : "w-2.5 bg-white/60 hover:bg-white"
                            }`}
                            aria-label={`Afficher l'image ${index + 1}`}
                          />
                        ))}
                      </div>

                      <p className="absolute bottom-3 right-3 rounded-full bg-black/55 px-3 py-1.5 text-xs font-semibold text-white sm:hidden">
                        Glissez pour voir
                      </p>
                    </>
                  )}
                </div>

                {product.images.length > 1 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto px-0.5 pb-2 sm:gap-3">
                    {product.images.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => goToImage(index)}
                        className={`relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl border-2 bg-white transition sm:h-20 sm:w-20 md:h-24 md:w-24 ${
                          activeImageIndex === index
                            ? "border-[#79C8C7] ring-2 ring-[#79C8C7]/25"
                            : "border-transparent hover:border-[#D93B7B]/50"
                        }`}
                        aria-label={`Choisir l'image ${index + 1}`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} - miniature ${index + 1}`}
                          fill
                          sizes="96px"
                          className="object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="min-w-0 self-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D93B7B] sm:text-sm sm:tracking-[0.25em]">
                  {product.category}
                </p>

                <h1 className="mt-3 font-title text-[32px] font-bold leading-[1.15] text-[#5C7DB8] sm:mt-4 sm:text-4xl md:text-5xl">
                  {product.name}
                </h1>

                <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                  {product.description}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  {product.longDescription}
                </p>

                <p className="mt-6 text-2xl font-bold text-[#D98B5F] sm:text-3xl">
                  {product.price.toLocaleString("fr-FR")} CFA
                </p>

                <button
                  type="button"
                  onClick={addToCart}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#79C8C7] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#66b8b7] sm:mt-8 sm:w-auto sm:px-8"
                >
                  <ShoppingCart size={20} />
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:gap-10">
            <div>
              <h2 className="font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl md:text-4xl">
                Caractéristiques
              </h2>

              <div className="mt-6 grid gap-4 sm:mt-8">
                {product.features.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white">
                      <Check size={15} />
                    </div>

                    <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#FFF9F1] p-5 sm:p-8">
              <h2 className="font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl md:text-4xl">
                Informations produit
              </h2>

              <div className="mt-6 grid gap-4 sm:mt-8">
                {product.productInfo.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#D93B7B] text-white">
                      <Check size={15} />
                    </div>

                    <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl md:text-4xl">
              Pourquoi choisir nos produits ?
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8 md:text-lg">
              <p>
                Chez TOPECI, chaque produit est conçu pour éveiller la curiosité
                des enfants tout en valorisant les langues et les cultures
                africaines.
              </p>

              <p>
                Nos produits sont pensés pour transmettre un héritage culturel
                de manière simple, amusante et interactive.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {advantages.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white">
                    <Check size={15} />
                  </div>

                  <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FAFAFA] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl">
              Produits similaires
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedProducts.map((item) => (
                <article
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <Link
                    href={`/produit/${item.id}`}
                    className="relative block h-[220px] bg-white sm:h-[260px]"
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-4"
                    />
                  </Link>

                  <div className="p-5">
                    <p className="mb-2 text-sm font-semibold text-[#D93B7B]">
                      {item.category}
                    </p>

                    <h3 className="font-title text-xl font-bold text-[#5C7DB8]">
                      {item.name}
                    </h3>

                    <p className="mt-3 text-lg font-bold text-[#D98B5F]">
                      {item.price.toLocaleString("fr-FR")} CFA
                    </p>

                    <Link
                      href={`/produit/${item.id}`}
                      className="mt-5 inline-block rounded-xl bg-[#79C8C7] px-5 py-3 font-semibold text-white transition hover:bg-[#66b8b7]"
                    >
                      Voir le produit
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {cartModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-5 sm:px-5">
          <div className="max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 text-center shadow-xl sm:p-6">
            <button
              type="button"
              onClick={() => setCartModalOpen(false)}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <h2 className="mt-3 font-title text-xl font-bold text-[#5C7DB8] sm:text-2xl">
              Produit ajouté au panier ❤️
            </h2>

            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Votre produit a bien été ajouté au panier.
            </p>

            <div className="mt-6 grid gap-3">
              <Link
                href="/mon-panier"
                className="rounded-xl bg-[#79C8C7] px-6 py-3 text-sm font-bold text-white sm:text-base"
              >
                Finaliser ma commande
              </Link>

              <button
                type="button"
                onClick={() => setCartModalOpen(false)}
                className="rounded-xl border border-[#D93B7B] px-6 py-3 text-sm font-bold text-[#D93B7B] sm:text-base"
              >
                Continuer mes achats
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}