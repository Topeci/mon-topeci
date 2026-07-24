"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Grid3X3,
  List,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  badge: string;
  rating: string;
  slug: string;
};

const products: Product[] = [
  {
    id: "livre-audio-baoule",
    name: "Mon Premier Livre Audio Baoulé–Français",
    category: "Livres Audio",
    description:
      "Livre interactif avec audio pour apprendre le baoulé, écouter et transmettre la langue en famille.",
    price: 15000,
    images: [
      "/images/image jouet baoulé 1.png",
      "/images/livre audio-baoule-francais1.jpg",
      "/images/baoule-francais-enfant.jpg",
    ],
    badge: "Nouveau",
    rating: "4.8",
    slug: "livre-audio-baoule",
  },
  {
    id: "livre-audio-dioula",
    name: "Mon Premier Livre Audio Dioula–Français",
    category: "Livres Audio",
    description:
      "Livre interactif avec audio pour apprendre le dioula et découvrir la langue avec plaisir.",
    price: 15000,
    images: [
      "/images/image jouet dioula 1.png",
      "/images/livre-audio-dioula.jpg",
      "/images/dioula-francais-2.jpg",
    ],
    badge: "Nouveau",
    rating: "4.7",
    slug: "livre-audio-dioula",
  },
  {
    id: "cartes-audio-bete",
    name: "Mes Premières Cartes Audio Bété–Français",
    category: "Cartes Audio",
    description:
      "Cartes audio éducatives pour découvrir le bété, écouter, apprendre et jouer en famille.",
    price: 15000,
    images: [
      "/images/Image jouet bété 1.png",
      "/images/Image jouet bété 2.png",
      "/images/Image jouet bété 3.png",
      "/images/Image jouet bété  4.png",
    ],
    badge: "Nouveau",
    rating: "4.6",
    slug: "cartes-audio-bete",
  },
];

const categories = ["Tous les produits", "Livres Audio", "Cartes Audio"];

type CartProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

type ProductImageGalleryProps = {
  product: Product;
  isListView: boolean;
  href: string;
};

function ProductImageGallery({
  product,
  isListView,
  href,
}: ProductImageGalleryProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const safeIndex =
      index < 0
        ? product.images.length - 1
        : index >= product.images.length
          ? 0
          : index;

    container.scrollTo({
      left: container.clientWidth * safeIndex,
      behavior: "smooth",
    });

    setActiveIndex(safeIndex);
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container || container.clientWidth === 0) return;

    const nextIndex = Math.round(container.scrollLeft / container.clientWidth);

    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-white ${
        isListView
          ? "h-[230px] sm:h-[280px] md:h-full md:min-h-[310px]"
          : "h-[235px] sm:h-[280px] lg:h-[300px]"
      }`}
    >
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full w-full snap-x snap-mandatory touch-pan-y overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {product.images.map((image, index) => (
          <Link
            key={`${product.id}-${image}`}
            href={href}
            className="relative h-full min-w-full snap-center"
            aria-label={`Voir ${product.name} - image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${product.name} - vue ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-3 sm:p-5"
            />
          </Link>
        ))}
      </div>

      <span className="absolute left-3 top-3 z-10 rounded-full bg-[#D98B5F] px-3 py-1.5 text-xs font-bold text-white shadow-sm">
        {product.badge}
      </span>

      <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold shadow-sm">
        <Star size={15} className="fill-[#F2C94C] text-[#F2C94C]" />
        {product.rating}
      </div>

      {product.images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goToSlide(activeIndex - 1)}
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex"
            aria-label="Voir l'image précédente"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => goToSlide(activeIndex + 1)}
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex"
            aria-label="Voir l'image suivante"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex max-w-[76%] -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
            {product.images.map((image, index) => (
              <button
                key={`indicator-${image}`}
                type="button"
                onClick={() => goToSlide(index)}
                className={`h-2 shrink-0 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-6 bg-white"
                    : "w-2 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Afficher l'image ${index + 1}`}
              />
            ))}
          </div>

          <p className="absolute bottom-3 right-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold text-white sm:hidden">
            Glissez
          </p>
        </>
      )}
    </div>
  );
}

export default function BoutiquePage() {
  const [activeCategory, setActiveCategory] = useState("Tous les produits");
  const [sort, setSort] = useState("Nouveautés");
  const [view, setView] = useState<"grid" | "list">("grid");

  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"quantity" | "success">(
    "quantity",
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const filteredProducts = useMemo(() => {
    let result =
      activeCategory === "Tous les produits"
        ? [...products]
        : products.filter((product) => product.category === activeCategory);

    if (sort === "Prix croissant") {
      result = result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Prix décroissant") {
      result = result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sort]);

  const openQuantityModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
    setModalStep("quantity");
    setCartModalOpen(true);
  };

  const closeModal = () => {
    setCartModalOpen(false);
    setSelectedProduct(null);
    setSelectedQuantity(1);
    setModalStep("quantity");
  };

  const confirmAddToCart = () => {
    if (!selectedProduct) return;

    const savedCart = localStorage.getItem("topeci_cart_items");
    const cart: CartProduct[] = savedCart ? JSON.parse(savedCart) : [];

    const existingProduct = cart.find((item) => item.id === selectedProduct.id);

    if (existingProduct) {
      existingProduct.quantity += selectedQuantity;
    } else {
      cart.push({
        id: selectedProduct.id,
        title: selectedProduct.name,
        price: `${selectedProduct.price.toLocaleString("fr-FR")} CFA`,
        image: selectedProduct.images[0],
        quantity: selectedQuantity,
      });
    }

    localStorage.setItem("topeci_cart_items", JSON.stringify(cart));
    window.dispatchEvent(new Event("topeci-cart-updated"));

    setModalStep("success");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen overflow-x-hidden bg-[#FFF9F1] pt-[72px] text-[#1E1E1E] sm:pt-[80px] lg:pt-[88px]">
        <section
          className="relative isolate w-full overflow-hidden bg-[#FFF9F1]"
          aria-label="Présentation des créations TOPECI"
        >
          <Image
            src="/images/Banniere page produits.png"
            alt="Les créations TOPECI pour apprendre, écouter et construire avec fierté"
            width={1920}
            height={650}
            priority
            sizes="100vw"
            className="block h-auto w-full max-w-full object-contain object-center"
          />
        </section>

        <section className="px-3 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14 xl:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex min-w-0 flex-col gap-4 sm:gap-5 lg:mb-10 xl:flex-row xl:items-center xl:justify-between">
              <div className="-mx-3 flex gap-2 overflow-x-auto px-3 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`min-h-11 shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:px-6 sm:py-3 sm:text-base ${
                      activeCategory === category
                        ? "bg-[#79C8C7] text-white shadow-sm"
                        : "bg-white text-slate-700 shadow-sm hover:bg-[#79C8C7]/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:flex sm:w-auto sm:gap-3">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  aria-label="Trier les produits"
                  className="h-11 min-w-0 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none transition focus:border-[#79C8C7] focus:ring-2 focus:ring-[#79C8C7]/20 sm:w-[200px] sm:px-4 sm:text-base"
                >
                  <option>Nouveautés</option>
                  <option>Prix croissant</option>
                  <option>Prix décroissant</option>
                </select>

                <div className="flex shrink-0 overflow-hidden rounded-xl border border-black/10 bg-white">
                  <button
                    type="button"
                    onClick={() => setView("grid")}
                    className={`flex h-11 w-11 items-center justify-center ${
                      view === "grid"
                        ? "bg-[#79C8C7] text-white"
                        : "text-slate-600"
                    }`}
                    aria-label="Vue grille"
                  >
                    <Grid3X3 size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setView("list")}
                    className={`flex h-11 w-11 items-center justify-center ${
                      view === "list"
                        ? "bg-[#79C8C7] text-white"
                        : "text-slate-600"
                    }`}
                    aria-label="Vue liste"
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            <p className="mb-5 text-sm font-semibold text-slate-500 sm:mb-6">
              {filteredProducts.length} produit(s) affiché(s)
            </p>

            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                  : "grid gap-5"
              }
            >
              {filteredProducts.map((product) => {
                const productHref = `/produit/${product.slug}`;

                return (
                  <article
                    key={product.slug}
                    className={`flex min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-lg ${
                      view === "list"
                        ? "sm:grid sm:grid-cols-[minmax(240px,42%)_1fr] lg:grid-cols-[minmax(300px,380px)_1fr]"
                        : ""
                    }`}
                  >
                    <ProductImageGallery
                      product={product}
                      href={productHref}
                      isListView={view === "list"}
                    />

                    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D93B7B]">
                        {product.category}
                      </p>

                      <h2 className="mt-2 break-words font-title text-lg font-extrabold leading-snug sm:text-xl">
                        {product.name}
                      </h2>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {product.description}
                      </p>

                      <p className="mt-4 text-lg font-bold text-[#5C7DB8] sm:text-xl">
                        {product.price.toLocaleString("fr-FR")} CFA
                      </p>

                      <div className="mt-auto flex flex-col gap-2 pt-5 min-[380px]:flex-row">
                        <button
                          type="button"
                          onClick={() => openQuantityModal(product)}
                          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#79C8C7] px-3 py-3 text-sm font-bold text-white transition hover:bg-[#66b8b7] focus:outline-none focus:ring-2 focus:ring-[#79C8C7] focus:ring-offset-2 sm:text-base"
                        >
                          <ShoppingCart size={18} />
                          Ajouter
                        </button>

                        <Link
                          href={productHref}
                          className="flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-[#D93B7B] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D93B7B] focus:ring-offset-2 min-[380px]:w-12"
                          aria-label={`Voir le produit ${product.name}`}
                        >
                          <Eye size={19} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 rounded-2xl bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm sm:mt-10 sm:p-6 sm:leading-7">
              <strong className="text-[#D93B7B]">NOTE :</strong> Les frais de
              livraison sont en sus. Ils varient selon la destination et seront
              communiqués lors de la confirmation de votre commande et de
              l’organisation de la livraison.
            </div>
          </div>
        </section>
      </main>

      {cartModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 px-0 py-0 sm:items-center sm:px-6 sm:py-5">
          <div className="max-h-[94dvh] w-full max-w-md overflow-y-auto rounded-t-3xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-center shadow-xl sm:max-h-[92dvh] sm:rounded-3xl sm:p-6">
            <button
              type="button"
              onClick={closeModal}
              className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600"
              aria-label="Fermer"
            >
              <X size={18} />
            </button>

            <div className="mx-auto mt-2 h-20 w-20 overflow-hidden rounded-2xl bg-[#FFF9F1] sm:h-24 sm:w-24">
              <Image
                src={selectedProduct.images[0]}
                alt={selectedProduct.name}
                width={96}
                height={96}
                className="h-full w-full object-contain p-2"
              />
            </div>

            {modalStep === "quantity" ? (
              <>
                <h2 className="mt-5 font-title text-xl font-bold text-[#5C7DB8] sm:text-2xl">
                  Choisissez la quantité
                </h2>

                <p className="mt-3 text-sm font-semibold text-[#1E1E1E] sm:text-base">
                  {selectedProduct.name}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Combien d&apos;exemplaires souhaitez-vous ajouter ?
                </p>

                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuantity((current) => Math.max(1, current - 1))
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700"
                    aria-label="Réduire la quantité"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="min-w-[76px] rounded-xl border border-slate-200 px-5 py-2 font-title text-xl font-bold text-[#D93B7B]">
                    {selectedQuantity}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuantity((current) => current + 1)
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#79C8C7] text-white"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={confirmAddToCart}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#79C8C7] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#66b8b7] sm:text-base"
                >
                  <ShoppingCart size={19} />
                  Ajouter {selectedQuantity} au panier
                </button>
              </>
            ) : (
              <>
                <h2 className="mt-5 font-title text-xl font-bold text-[#5C7DB8] sm:text-2xl">
                  Produit ajouté au panier ❤️
                </h2>

                <p className="mt-3 text-sm font-semibold text-[#1E1E1E] sm:text-base">
                  {selectedQuantity} × {selectedProduct.name}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Votre sélection a bien été ajoutée au panier.
                </p>

                <div className="mt-6 grid gap-3">
                  <Link
                    href="/mon-panier"
                    className="rounded-xl bg-[#79C8C7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#66b8b7] sm:text-base"
                  >
                    Aller au panier
                  </Link>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-[#D93B7B] px-6 py-3 text-sm font-bold text-[#D93B7B] transition hover:bg-[#D93B7B] hover:text-white sm:text-base"
                  >
                    Continuer mes achats
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
