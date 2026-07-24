"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type CartProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

type CustomerInfos = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse: string;
  ville: string;
  pays: string;
};

const productImages: Record<string, string[]> = {
  "livre-audio-baoule": [
    "/images/image jouet baoulé 1.png",
    "/images/livre audio-baoule-francais1.jpg",
    "/images/baoule-francais-enfant.jpg",
  ],
  "livre-audio-dioula": [
    "/images/image jouet dioula 1.png",
    "/images/livre-audio-dioula.jpg",
    "/images/dioula-francais-2.jpg",
  ],
  "cartes-audio-bete": [
    "/images/cartes-audio.jpg",
    "/images/cartes-audios.jpg",
    "/images/carte-lots.jpg",
    "/images/lot-de-carte.jpg",
    "/images/carte-audio.jpg",
    "/images/carte-audio3.jpg",
    "/images/carte-audio4.jpg",
  ],
};

const parsePrice = (price: string) => {
  return Number(price.replace(/\D/g, "")) || 0;
};

type CartProductGalleryProps = {
  item: CartProduct;
};

function CartProductGallery({ item }: CartProductGalleryProps) {
  const images = productImages[item.id] || [item.image];
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToImage = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const safeIndex =
      index < 0 ? images.length - 1 : index >= images.length ? 0 : index;

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
    <div className="relative h-[220px] w-full overflow-hidden rounded-2xl bg-[#FFF9F1] sm:h-[240px] md:h-[260px] lg:w-[260px] lg:shrink-0">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex h-full w-full snap-x snap-mandatory touch-pan-y overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((image, index) => (
          <div
            key={`${item.id}-${image}`}
            className="relative h-full min-w-full snap-center"
          >
            <Image
              src={image}
              alt={`${item.title} - image ${index + 1}`}
              fill
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px"
              className="object-contain p-3 sm:p-4"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => goToImage(activeIndex - 1)}
            className="absolute left-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex"
            aria-label="Voir l'image précédente"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={() => goToImage(activeIndex + 1)}
            className="absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/95 p-2 text-slate-700 shadow-md transition hover:bg-[#79C8C7] hover:text-white sm:flex"
            aria-label="Voir l'image suivante"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex max-w-[78%] -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
            {images.map((image, index) => (
              <button
                key={`indicator-${item.id}-${image}`}
                type="button"
                onClick={() => goToImage(index)}
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

export default function MonPanierPage() {
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [orderReceived, setOrderReceived] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [customerInfos, setCustomerInfos] = useState<CustomerInfos>({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    ville: "",
    pays: "",
  });

  const saveCart = (updatedCart: CartProduct[]) => {
    localStorage.setItem("topeci_cart_items", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("topeci-cart-updated"));
    setCart(updatedCart);
  };

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("topeci_cart_items");
      const parsedCart: CartProduct[] = savedCart ? JSON.parse(savedCart) : [];

      setCart(Array.isArray(parsedCart) ? parsedCart : []);
    } catch {
      setCart([]);
    }
  }, []);

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      return sum + parsePrice(item.price) * item.quantity;
    }, 0);
  }, [cart]);

  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    );

    saveCart(updatedCart);
  };

  const removeProduct = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveCart(updatedCart);
  };

  const handleChange = (field: keyof CustomerInfos, value: string) => {
    setCustomerInfos((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0 || !acceptedTerms) return;

    setIsSubmitting(true);

    const produitsCommande = cart
      .map(
        (item) =>
          `${item.title} | Prix : ${item.price} | Quantité : ${item.quantity}`
      )
      .join("\n");

    const formData = new FormData();

    formData.append("_subject", "Nouvelle commande TOPECI ❤️");
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    formData.append("Nom", customerInfos.nom);
    formData.append("Prénom", customerInfos.prenom);
    formData.append("Email", customerInfos.email);
    formData.append("Téléphone", customerInfos.telephone);
    formData.append("Adresse", customerInfos.adresse);
    formData.append("Ville", customerInfos.ville);
    formData.append("Pays", customerInfos.pays);
    formData.append("Produits commandés", produitsCommande);
    formData.append("Total produits", `${total.toLocaleString("fr-FR")} CFA`);
    formData.append("CGV acceptées", acceptedTerms ? "Oui" : "Non");

    formData.append(
      "Note livraison",
      "Les frais de livraison sont en sus. Ils varient selon la destination et seront communiqués lors de la confirmation de votre commande et de l’organisation de la livraison."
    );

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/montopeci@gmail.com",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l’envoi de la commande.");
      }

      setOrderReceived(true);

      localStorage.removeItem("topeci_cart_items");
      window.dispatchEvent(new Event("topeci-cart-updated"));

      setCart([]);
      setAcceptedTerms(false);

      setCustomerInfos({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        adresse: "",
        ville: "",
        pays: "",
      });
    } catch {
      alert(
        "Une erreur est survenue pendant l’envoi de la commande. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="bg-[#FFF9F1] pt-[88px] text-[#1E1E1E]">
        <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/boutique"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D93B7B] sm:text-base"
            >
              <ArrowLeft size={18} />
              Continuer mes achats
            </Link>

            <h1 className="mt-7 font-title text-3xl font-bold text-[#5C7DB8] sm:text-4xl md:text-5xl">
              Mon panier
            </h1>

            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Préparez votre commande. Notre équipe vous contactera ensuite pour
              confirmer les détails et vous communiquer les frais de livraison.
            </p>

            {cart.length === 0 ? (
              <div className="mt-10 rounded-3xl bg-white p-6 text-center shadow-sm sm:p-8">
                <ShoppingBag
                  className="mx-auto text-[#D98B5F]"
                  size={50}
                />

                <h2 className="mt-5 font-title text-2xl font-bold text-[#5C7DB8]">
                  Votre panier est vide
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  Sélectionnez un produit depuis la boutique pour préparer votre
                  commande.
                </p>

                <Link
                  href="/boutique"
                  className="mt-7 inline-block rounded-xl bg-[#79C8C7] px-7 py-3.5 text-sm font-semibold text-white sm:px-8 sm:py-4 sm:text-base"
                >
                  Aller à la boutique
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mt-10 grid gap-8 xl:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="space-y-6">
                  <div className="rounded-3xl bg-white p-4 shadow-sm sm:p-6">
                    <h2 className="font-title text-2xl font-bold text-[#D98B5F]">
                      Récapitulatif de la commande
                    </h2>

                    <div className="mt-6 space-y-5">
                      {cart.map((item) => {
                        const itemTotal =
                          parsePrice(item.price) * item.quantity;

                        return (
                          <div
                            key={item.id}
                            className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-4 lg:flex-row"
                          >
                            <CartProductGallery item={item} />

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-title text-lg font-bold leading-snug text-[#5C7DB8] sm:text-xl">
                                  {item.title}
                                </h3>

                                <button
                                  type="button"
                                  onClick={() => removeProduct(item.id)}
                                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-500"
                                  aria-label="Supprimer le produit"
                                >
                                  <X size={16} />
                                </button>
                              </div>

                              <p className="mt-3 text-lg font-bold text-[#D98B5F]">
                                {item.price}
                              </p>

                              <div className="mt-5 flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700"
                                  aria-label="Réduire la quantité"
                                >
                                  <Minus size={18} />
                                </button>

                                <span className="min-w-[64px] rounded-xl border border-slate-200 bg-white px-5 py-2 text-center font-bold">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#79C8C7] text-white"
                                  aria-label="Augmenter la quantité"
                                >
                                  <Plus size={18} />
                                </button>
                              </div>

                              <p className="mt-4 text-sm font-semibold text-slate-600">
                                Sous-total :{" "}
                                <span className="text-[#D98B5F]">
                                  {itemTotal.toLocaleString("fr-FR")} CFA
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                      Note sur la livraison
                    </h2>

                    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                      Les frais de livraison sont en sus. Ils varient selon la
                      destination et seront communiqués lors de la confirmation
                      de votre commande et de l’organisation de la livraison.
                    </p>

                    <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-5 text-lg font-bold text-[#D98B5F] sm:flex-row sm:items-center sm:justify-between sm:text-xl">
                      <span>Total produits</span>
                      <span>{total.toLocaleString("fr-FR")} CFA</span>
                    </div>
                  </div>
                </div>

                <div className="h-fit rounded-3xl bg-white p-5 shadow-sm sm:p-6 xl:sticky xl:top-[110px]">
                  <h2 className="font-title text-2xl font-bold text-[#5C7DB8]">
                    Informations personnelles
                  </h2>

                  <div className="mt-6 grid gap-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                          Nom
                        </label>

                        <input
                          required
                          type="text"
                          value={customerInfos.nom}
                          onChange={(event) =>
                            handleChange("nom", event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                        />
                      </div>

                      <div>
                        <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                          Prénom
                        </label>

                        <input
                          required
                          type="text"
                          value={customerInfos.prenom}
                          onChange={(event) =>
                            handleChange("prenom", event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                        Email
                      </label>

                      <input
                        required
                        type="email"
                        value={customerInfos.email}
                        onChange={(event) =>
                          handleChange("email", event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                      />
                    </div>

                    <div>
                      <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                        Téléphone
                      </label>

                      <input
                        required
                        type="tel"
                        value={customerInfos.telephone}
                        onChange={(event) =>
                          handleChange("telephone", event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                      />
                    </div>

                    <div>
                      <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                        Adresse de livraison
                      </label>

                      <input
                        required
                        type="text"
                        value={customerInfos.adresse}
                        onChange={(event) =>
                          handleChange("adresse", event.target.value)
                        }
                        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                          Ville
                        </label>

                        <input
                          required
                          type="text"
                          value={customerInfos.ville}
                          onChange={(event) =>
                            handleChange("ville", event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                        />
                      </div>

                      <div>
                        <label className="font-title text-sm font-semibold text-[#5C7DB8]">
                          Pays
                        </label>

                        <input
                          required
                          type="text"
                          value={customerInfos.pays}
                          onChange={(event) =>
                            handleChange("pays", event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]"
                        />
                      </div>
                    </div>

                    <label className="flex items-start gap-3 rounded-2xl bg-[#FFF9F1] p-4 text-sm leading-6 text-slate-600">
                      <input
                        required
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(event) =>
                          setAcceptedTerms(event.target.checked)
                        }
                        className="mt-1 h-4 w-4 shrink-0 accent-[#79C8C7]"
                      />

                      <span>
                        J&apos;accepte les{" "}
                        <Link
                          href="/cgv"
                          target="_blank"
                          className="font-semibold text-[#D93B7B] underline"
                        >
                          conditions générales de vente
                        </Link>{" "}
                        applicables à ma commande.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting || !acceptedTerms}
                      className="mt-2 w-full rounded-xl bg-[#79C8C7] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#66b8b7] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
                    >
                      {isSubmitting
                        ? "Envoi de la commande..."
                        : "Valider la commande"}
                    </button>

                    <p className="text-center text-xs leading-6 text-slate-500 sm:text-sm">
                      La commande sera envoyée automatiquement à :
                      <br />
                      <span className="font-semibold text-[#D93B7B]">
                        montopeci@gmail.com
                      </span>
                    </p>
                  </div>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      {orderReceived && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 py-5 sm:px-6">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-xl sm:p-8">
            <h2 className="font-title text-2xl font-bold text-[#D93B7B] sm:text-3xl">
              COMMANDE REÇUE ❤️
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
              Merci pour votre commande.
              <br />
              Elle a bien été enregistrée.
              <br />
              Notre équipe vous contactera prochainement afin de confirmer les
              détails de livraison et vous communiquer les frais de livraison
              associés.
            </p>

            <Link
              href="/boutique"
              onClick={() => setOrderReceived(false)}
              className="mt-7 inline-block rounded-xl bg-[#79C8C7] px-7 py-3.5 text-sm font-bold text-white sm:px-8 sm:py-4 sm:text-base"
            >
              Retour à la boutique
            </Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}