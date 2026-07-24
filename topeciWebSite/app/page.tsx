"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

const bannerImage = "/images/topeci-banner.gif";

type Product = {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  images: string[];
  href: string;
};

const products: Product[] = [
  {
    id: "livre-audio-baoule",
    title: "Mon Premier Livre Audio Baoulé–Français",
    subtitle: "Baoulé - Français",
    price: "15 000 CFA",
    images: [
      "/images/image jouet baoulé 1.png",
      "/images/livre audio-baoule-francais1.jpg",
      "/images/baoule-francais-enfant.jpg",
    ],
    href: "/produit/livre-audio-baoule",
  },
  {
    id: "livre-audio-dioula",
    title: "Mon Premier Livre Audio Dioula–Français",
    subtitle: "Dioula - Français",
    price: "15 000 CFA",
    images: [
      "/images/image jouet dioula 1.png",
      "/images/livre-audio-dioula.jpg",
      "/images/dioula-francais-2.jpg",
    ],
    href: "/produit/livre-audio-dioula",
  },
  {
    id: "cartes-audio-bete",
    title: "Mes Premières Cartes Audio Bété–Français",
    subtitle: "Bété - Français",
    price: "15 000 CFA",
    images: [
      "/images/cartes-audio.jpg",
      "/images/cartes-audios.jpg",
      "/images/carte-lots.jpg",
      "/images/lot-de-carte.jpg",
      "/images/carte-audio.jpg",
      "/images/carte-audio3.jpg",
      "/images/carte-audio4.jpg",
    ],
    href: "/produit/cartes-audio-bete",
  },
];

const testimonials = [
  {
    name: "Paul B.",
    city: "Abidjan, Côte d'Ivoire",
    text: "Produit de qualité exceptionnelle, mes enfants sont ravis !",
  },
  {
    name: "Sarah T.",
    city: "Lyon, France",
    text: "Service client excellent et livraison rapide. Merci TOPECI !",
  },
  {
    name: "Amandine K.",
    city: "Abidjan, Côte d'Ivoire",
    text: "Ma fille ne lâche plus son livre TOPECI, elle apprend le baoulé avec plaisir !",
  },
  {
    name: "Michel D.",
    city: "Paris, France",
    text: "Ce livre est tellement précieux que je le lis à mon neveu.",
  },
  {
    name: "Stéphanie A.",
    city: "Marseille, France",
    text: "Excellent support éducatif pour transmettre nos langues aux enfants.",
  },
];

type CartProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

type ProductGalleryProps = {
  product: Product;
};

function ProductGallery({ product }: ProductGalleryProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToImage = (index: number) => {
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

    const index = Math.round(container.scrollLeft / container.clientWidth);

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative h-[220px] overflow-hidden bg-white min-[380px]:h-[245px] sm:h-[280px] md:h-[300px] lg:h-[310px] xl:h-[330px]">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full w-full snap-x snap-mandatory touch-pan-x overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {product.images.map((image, index) => (
          <Link
            key={`${product.id}-${image}`}
            href={product.href}
            className="relative h-full min-w-full snap-center"
            aria-label={`Voir ${product.title} - image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${product.title} - vue ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
              className="object-contain p-3 min-[380px]:p-4 sm:p-5 lg:p-6"
            />
          </Link>
        ))}
      </div>

      {product.images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goToImage(activeIndex - 1)}
            className="absolute left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex lg:left-3"
            aria-label="Image précédente"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => goToImage(activeIndex + 1)}
            className="absolute right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex lg:right-3"
            aria-label="Image suivante"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-2 left-1/2 z-10 flex max-w-[74%] -translate-x-1/2 items-center gap-1.5 overflow-hidden rounded-full bg-black/25 px-2.5 py-1.5 backdrop-blur-sm sm:bottom-3 sm:px-3 sm:py-2">
            {product.images.map((image, index) => (
              <button
                key={`dot-${image}`}
                type="button"
                onClick={() => goToImage(index)}
                className={`h-2 shrink-0 rounded-full transition-all ${
                  activeIndex === index
                    ? "w-5 bg-white sm:w-6"
                    : "w-2 bg-white/60 hover:bg-white"
                }`}
                aria-label={`Afficher l'image ${index + 1}`}
              />
            ))}
          </div>

          <p className="absolute bottom-2 right-2 z-10 rounded-full bg-black/60 px-2 py-1 text-[9px] font-semibold text-white min-[380px]:text-[10px] sm:hidden">
            Glissez
          </p>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"quantity" | "success">(
    "quantity"
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const saveCart = (cart: CartProduct[]) => {
    localStorage.setItem("topeci_cart_items", JSON.stringify(cart));
    window.dispatchEvent(new Event("topeci-cart-updated"));
  };

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

    const existingProduct = cart.find(
      (item) => item.id === selectedProduct.id
    );

    if (existingProduct) {
      existingProduct.quantity += selectedQuantity;
    } else {
      cart.push({
        id: selectedProduct.id,
        title: selectedProduct.title,
        price: selectedProduct.price,
        image: selectedProduct.images[0],
        quantity: selectedQuantity,
      });
    }

    saveCart(cart);
    setModalStep("success");
  };

  return (
    <>
      <Header />

      <main className="overflow-x-hidden bg-[#FFF9F1] pt-[72px] text-[#1E1E1E] sm:pt-[80px] lg:pt-[88px]">
        <section className="relative w-full overflow-hidden bg-white">
          <Link
            href="/boutique"
            aria-label="Aller vers la boutique TOPECI"
            className="relative block h-[190px] w-full min-[380px]:h-[225px] sm:h-[360px] md:h-[440px] lg:h-[560px] xl:h-[650px]"
          >
            <Image
              src={bannerImage}
              alt="TOPECI - Grandir connecté à ses racines"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="object-contain object-center xl:object-cover"
            />
          </Link>
        </section>

        <section className="px-4 py-10 min-[380px]:px-5 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-title text-[1.75rem] font-bold uppercase leading-[1.15] text-[#D93B7B] min-[380px]:text-3xl sm:text-4xl lg:text-5xl">
                Des jouets qui rendent fière
              </h2>

              <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 md:text-lg lg:text-xl">
                Une sélection de créations pour apprendre avec plaisir.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:mt-14 lg:grid-cols-3 lg:gap-8">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <ProductGallery product={product} />

                  <div className="flex flex-1 flex-col px-4 py-5 text-center min-[380px]:px-5 sm:px-5 sm:py-6 md:px-6 md:py-7">
                    <h3 className="font-title text-lg font-bold leading-snug min-[380px]:text-xl lg:text-2xl">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-sm font-semibold sm:text-base lg:text-lg">
                      {product.subtitle}
                    </p>

                    <p className="mt-3 text-lg font-bold sm:mt-4 sm:text-xl lg:text-2xl">
                      {product.price}
                    </p>

                    <div className="mt-auto grid gap-3 pt-5 sm:pt-6">
                      <button
                        type="button"
                        onClick={() => openQuantityModal(product)}
                        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#F2C94C] px-4 py-3 text-sm font-semibold text-[#1E1E1E] transition hover:bg-[#e8bd3f] sm:text-base"
                      >
                        <ShoppingCart size={18} />
                        Ajouter
                      </button>

                      <Link
                        href={product.href}
                        className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[#D93B7B] px-4 py-3 text-sm font-semibold text-[#D93B7B] transition hover:bg-[#D93B7B] hover:text-white sm:text-base"
                      >
                        Voir le produit
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center sm:mt-10 lg:mt-12">
              <Link
                href="/boutique"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D98B5F] px-6 py-3 font-title text-sm font-bold text-white shadow-sm transition hover:bg-[#c9794f] min-[380px]:px-7 sm:px-10 sm:py-4 sm:text-lg"
              >
                Découvrir nos jouets
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-10 min-[380px]:px-5 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="text-center">
              <h2 className="font-title text-[1.75rem] font-bold uppercase leading-tight text-[#F2C94C] min-[380px]:text-3xl sm:text-4xl lg:text-5xl">
                L’univers TOPECI
              </h2>

              <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl">
                Découvrez nos jouets en vidéo.
              </p>
            </div>

            <div className="relative mx-auto mt-7 aspect-video w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-lg sm:mt-10 sm:rounded-2xl lg:mt-12 lg:shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/qKfgQsuhTrk"
                title="L’univers TOPECI"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section className="overflow-hidden px-4 py-10 min-[380px]:px-5 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-title text-[1.7rem] font-bold uppercase leading-tight text-[#D98B5F] min-[380px]:text-3xl sm:text-4xl lg:text-5xl">
                Ils partagent l&apos;aventure TOPECI
              </h2>
            </div>

            <div className="relative mt-7 overflow-hidden sm:mt-10 lg:mt-12">
              <div className="flex w-max animate-testimonials gap-4 sm:gap-6 lg:gap-8">
                {[...testimonials, ...testimonials].map((item, index) => (
                  <article
                    key={`${item.name}-${index}`}
                    className="w-[82vw] max-w-[285px] shrink-0 rounded-xl bg-white p-5 shadow-md min-[480px]:w-[300px] sm:w-[320px] sm:max-w-none sm:p-6 lg:p-7"
                  >
                    <div className="mb-4 flex min-w-0 items-center gap-3 sm:gap-4 lg:gap-5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-base font-bold text-white sm:h-13 sm:w-13 sm:text-lg lg:h-14 lg:w-14 lg:text-xl">
                        {item.name[0]}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-title text-sm font-bold sm:text-base lg:text-lg">
                          {item.name}
                        </h3>

                        <p className="mt-0.5 text-xs leading-5 text-zinc-500 sm:text-sm lg:text-base">
                          {item.city}
                        </p>
                      </div>
                    </div>

                    <p className="mb-3 text-sm tracking-wide text-[#F2C94C]">
                      ★★★★★
                    </p>

                    <p className="text-sm leading-6 sm:text-base">
                      {item.text}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center sm:mt-10">
              <a
                href="https://www.facebook.com/share/18KXhuUvgz/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#D98B5F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c9794f] sm:px-9 sm:text-lg"
              >
                Donner votre avis
              </a>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-10 min-[380px]:px-5 sm:px-6 sm:py-14 md:py-16 lg:px-8 lg:py-20 xl:py-24">
          <div className="mx-auto w-full max-w-5xl rounded-2xl bg-[#D93B7B] px-5 py-9 text-center text-white min-[380px]:px-6 sm:rounded-3xl sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <h2 className="font-title text-2xl font-bold uppercase leading-snug sm:text-3xl lg:text-4xl">
              Faisons rayonner les langues et cultures africaines ensemble
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 sm:mt-5 sm:text-base sm:leading-8 lg:text-lg">
              Vous êtes une école, une association, un média ou une entreprise ?
              Collaborons afin de faire découvrir la richesse des langues et
              cultures africaines aux nouvelles générations.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#D93B7B] transition hover:bg-[#FFF9F1] sm:mt-8 sm:px-9 sm:py-4 sm:text-lg"
            >
              Contactez-nous
            </Link>
          </div>
        </section>
      </main>

      {cartModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-0 backdrop-blur-[1px] sm:items-center sm:px-6 sm:py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cart-modal-title"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) {
              closeModal();
            }
          }}
        >
          <div className="max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 text-center shadow-2xl sm:max-w-md sm:rounded-3xl sm:p-6">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Fermer"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mx-auto mt-1 h-20 w-20 overflow-hidden rounded-2xl bg-[#FFF9F1] min-[380px]:h-24 min-[380px]:w-24">
              <Image
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                width={96}
                height={96}
                className="h-full w-full object-contain p-2"
              />
            </div>

            {modalStep === "quantity" ? (
              <>
                <h2
                  id="cart-modal-title"
                  className="mt-4 font-title text-xl font-bold text-[#5C7DB8] min-[380px]:text-2xl"
                >
                  Choisissez la quantité
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[#1E1E1E] sm:text-base">
                  {selectedProduct.title}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Combien d&apos;exemplaires souhaitez-vous ajouter ?
                </p>

                <div className="mt-6 flex items-center justify-center gap-3 min-[380px]:gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuantity((current) => Math.max(1, current - 1))
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                    aria-label="Réduire la quantité"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="min-w-[72px] rounded-xl border border-slate-200 px-4 py-2 font-title text-xl font-bold text-[#D93B7B] min-[380px]:min-w-[76px] min-[380px]:px-5">
                    {selectedQuantity}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuantity((current) => current + 1)
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white transition hover:bg-[#66b8b7]"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={confirmAddToCart}
                  className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#79C8C7] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#66b8b7] sm:px-5 sm:text-base"
                >
                  <ShoppingCart size={19} />
                  Ajouter {selectedQuantity} au panier
                </button>
              </>
            ) : (
              <>
                <h2
                  id="cart-modal-title"
                  className="mt-4 font-title text-xl font-bold text-[#5C7DB8] min-[380px]:text-2xl"
                >
                  Produit ajouté au panier ❤️
                </h2>

                <p className="mx-auto mt-3 max-w-sm text-sm font-semibold leading-6 text-[#1E1E1E] sm:text-base">
                  {selectedQuantity} × {selectedProduct.title}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Votre sélection a bien été ajoutée au panier.
                </p>

                <div className="mt-6 grid gap-3">
                  <Link
                    href="/mon-panier"
                    className="flex min-h-12 items-center justify-center rounded-xl bg-[#79C8C7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#66b8b7] sm:text-base"
                  >
                    Aller au panier
                  </Link>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="min-h-12 rounded-xl border border-[#D93B7B] px-6 py-3 text-sm font-bold text-[#D93B7B] transition hover:bg-[#D93B7B] hover:text-white sm:text-base"
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