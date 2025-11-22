/**
 * Page d'accueil du site TOPECI avec fonctionnalité panier et avis clients.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import "../index.css";

import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import CookiesBanner from "../components/layout/CookieBanner";
import FloatingGift from "../components/layout/FloatingGift";
import { useCart } from "../contexts/CartContext";
import { useCountryConfiguration } from "../components/layout/header";

import {
  Play,
  Star,
  Camera,
  X,
  Send,
  Truck,
  CreditCard,
  Store,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import livreBaoule from "../assets/images/livrebaoule.png";
import livreDioula from "../assets/images/livredioula.png";
import jouetFiere from "../assets/images/imgJouetFiere.png";
import carteBete from "../assets/images/cartebete.png";
import imgVideo from "../assets/images/imgVideo.png";
import imgAvis from "../assets/images/imgAvis.png";
import imgEngagement from "../assets/images/imgEngagement.png";
import banniereTopeci from "../assets/images/banniereTopeci.jpg";
import VideoTopeci from "../videos/topeci_video.mp4";

export const Route = createFileRoute("/")({
  component: Index,
});

// Fonction pour formater les prix selon la devise
const formatPrice = (
  price: number,
  currencySymbol: string,
  currency: string
) => {
  if (currency === "XOF") {
    const formatted = price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formatted} ${currencySymbol}`;
  } else {
    return `${price} ${currencySymbol}`;
  }
};

// Configuration des prix par type de produit
const getProductPrice = (
  basePriceXOF: number,
  productType: "livre" | "carte",
  currency: string
) => {
  if (currency === "XOF") {
    return basePriceXOF; // Prix XOF de base
  } else {
    // Prix fixes en EUR selon le type de produit
    if (productType === "livre") {
      return 30; // 30€ pour les livres
    } else if (productType === "carte") {
      return 35; // 35€ pour les cartes parlantes
    }
    return basePriceXOF / 655; // Fallback
  }
};

// Produits de la page d'accueil avec prix de base en XOF et type de produit
const homeProducts = [
  {
    id: 2,
    name: "Mon Premier Livre Audio Baoulé - Français",
    basePriceXOF: 16500,
    type: "livre" as const,
    image: livreBaoule,
  },
  {
    id: 3,
    name: "Mon Premier Livre Audio Dioula - Français",
    basePriceXOF: 16500,
    type: "livre" as const,
    image: livreDioula,
  },
  {
    id: 1,
    name: "Cartes Parlantes Bété - Français",
    basePriceXOF: 20000,
    type: "carte" as const,
    image: carteBete,
  },
];

// Ease definitions
const easeOut = [0.22, 1, 0.36, 1];

// Animations réutilisables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: easeOut },
};

function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const { addToCart } = useCart();
  const countryConfig = useCountryConfiguration();

  // Fonction pour obtenir le prix affiché
  const getProductPriceDisplay = (
    basePriceXOF: number,
    productType: "livre" | "carte"
  ) => {
    const price = getProductPrice(
      basePriceXOF,
      productType,
      countryConfig.currency
    );
    return formatPrice(
      price,
      countryConfig.currencySymbol,
      countryConfig.currency
    );
  };

  // Produits avec prix calculés selon la devise
  const getProductsWithCurrentPrices = () => {
    return homeProducts.map((product) => ({
      ...product,
      price: getProductPrice(
        product.basePriceXOF,
        product.type,
        countryConfig.currency
      ),
      priceDisplay: getProductPriceDisplay(product.basePriceXOF, product.type),
    }));
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAddToCart = (product: (typeof homeProducts)[0]) => {
    const productsWithPrices = getProductsWithCurrentPrices();
    const currentProduct = productsWithPrices.find((p) => p.id === product.id);

    if (currentProduct) {
      addToCart(
        {
          id: currentProduct.id,
          name: currentProduct.name,
          price: currentProduct.price,
          priceDisplay: currentProduct.priceDisplay,
          image: currentProduct.image,
        },
        1
      );

      // Afficher la confirmation
      setAddedProductId(currentProduct.id);
      setTimeout(() => {
        setAddedProductId(null);
      }, 2000);
    }
  };

  // Fermer le formulaire en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowReviewForm(false);
      }
    };

    if (showReviewForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showReviewForm]);

  // Défilement automatique des avis
  useEffect(() => {
    if (!reviewsContainerRef.current || isPaused) return;

    const container = reviewsContainerRef.current;
    const scrollWidth = container.scrollWidth;
    const clientWidth = container.clientWidth;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll <= 0) return;

    let scrollPosition = 0;
    let direction = 1;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!container || isPaused) return;

      scrollPosition += scrollSpeed * direction;

      if (scrollPosition >= maxScroll) {
        scrollPosition = maxScroll;
        direction = -1;
      } else if (scrollPosition <= 0) {
        scrollPosition = 0;
        direction = 1;
      }

      container.scrollLeft = scrollPosition;
      requestAnimationFrame(scroll);
    };

    const animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPaused]);

  const sampleReviews = [
    {
      id: 1,
      author: "Amandine K.",
      location: "Abidjan, Côte d'Ivoire",
      rating: 5,
      comment:
        "Ma fille ne lâche plus son livre TOPECI, elle apprend le baoulé avec plaisir !",
      date: "2024-01-15",
    },
    {
      id: 2,
      author: "Michel D.",
      location: "Paris, France",
      rating: 4,
      comment:
        "Tonton, ce livre est tellement précieux que je le lis à mon chevet...",
      date: "2024-01-10",
    },
    {
      id: 3,
      author: "Sophie T.",
      location: "Lyon, France",
      rating: 5,
      comment: "Excellente qualité et contenu éducatif. Mes enfants adorent!",
      date: "2024-01-08",
    },
    {
      id: 4,
      author: "Jean M.",
      location: "Dakar, Sénégal",
      rating: 5,
      comment:
        "Une excellente initiative pour préserver nos langues africaines.",
      date: "2024-01-05",
    },
    {
      id: 5,
      author: "Fatou D.",
      location: "Bamako, Mali",
      rating: 4,
      comment: "Très bon produit, je recommande vivement !",
      date: "2024-01-03",
    },
    {
      id: 6,
      author: "Paul B.",
      location: "Abidjan, Côte d'Ivoire",
      rating: 5,
      comment: "Produit de qualité exceptionnelle, mes enfants sont ravis !",
      date: "2024-01-20",
    },
    {
      id: 7,
      author: "Sarah T.",
      location: "Lyon, France",
      rating: 5,
      comment: "Service client excellent et livraison rapide. Merci TOPECI !",
      date: "2024-01-18",
    },
  ];

  const ReviewForm = () => (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 z-50 flex justify-end">
      <div
        ref={formRef}
        className="bg-gray-50 h-full w-full max-w-md transform transition-transform duration-300 ease-in-out"
        style={{
          transform: showReviewForm ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="h-full overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#4E6FA7] font-waffle-soft">
              Écrire un avis
            </h3>
            <button
              onClick={() => setShowReviewForm(false)}
              className="text-gray-500 hover:text-gray-700 p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700">
              Évaluation *
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="text-3xl focus:outline-none transition-transform hover:scale-110"
                >
                  {star <= (hoverRating || rating) ? (
                    <Star className="text-yellow-400 fill-current" />
                  ) : (
                    <Star className="text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700">
              Votre avis *
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent resize-none"
              rows={5}
              placeholder="Partagez votre expérience avec nos produits..."
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700">
              Ajouter une photo ou vidéo (optionnel)
            </label>
            <label className="flex flex-col items-center text-[#74C6C6] p-4 border-2 border-dashed border-[#74C6C6] rounded-lg cursor-pointer hover:bg-opacity-10 transition-colors">
              <Camera size={24} className="mb-2" />
              <span className="text-center">Cliquer pour ajouter un média</span>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    console.log("Fichier sélectionné:", e.target.files[0].name);
                  }
                }}
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700">
              Nom d'affichage *
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent"
              placeholder="Marie D."
              required
            />
            <p className="text-sm text-gray-500 mt-2">Affiché publiquement</p>
          </div>

          <div className="mb-6">
            <label className="block mb-3 font-semibold text-gray-700">
              Adresse Mail *
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent"
              placeholder="votre@email.com"
              required
            />
            <p className="text-sm text-gray-500 mt-2">
              Ne sera pas affiché publiquement
            </p>
          </div>

          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Comment nous utilisons vos données :</strong> Nous vous
              contacterons uniquement à propos de l'avis que vous avez laissé,
              et seulement si nécessaire. En soumettant votre avis, vous
              acceptez les{" "}
              <Link
                to="/legal/cgu"
                className="text-[#74C6C6] hover:text-[#5fb3b3] underline"
                onClick={(e) => e.stopPropagation()}
              >
                conditions d'utilisation
              </Link>{" "}
              et la{" "}
              <Link
                to="/legal/privacy"
                className="text-[#74C6C6] hover:text-[#5fb3b3] underline"
                onClick={(e) => e.stopPropagation()}
              >
                politique de confidentialité
              </Link>
              .
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#D68E54] hover:bg-[#c57f4a] text-white py-3 px-6 rounded-lg transition-colors font-semibold flex items-center justify-center"
            >
              <Send size={18} className="mr-2" />
              Soumettre
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const currentProducts = getProductsWithCurrentPrices();

  return (
    <div className="flex flex-col min-h-screen w-full mx-0 text-brown-800">
      <Header />

      {/* Message de succès ajout panier */}
      {addedProductId && (
        <div className="fixed top-20 right-4 z-50 bg-[#D68E54] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
          <CheckCircle size={24} />
          <div>
            <p className="font-bold">Produit ajouté au panier !</p>
            <Link
              to="/panier"
              className="text-sm underline hover:text-green-100"
            >
              Voir le panier
            </Link>
          </div>
        </div>
      )}

      <main className="flex-1 w-full mx-auto">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full py-14 md:py-20 mt-0 relative bg-cover bg-center min-h-[80vh]"
          style={{ backgroundImage: `url(${banniereTopeci})` }}
        ></motion.section>

        {/* BOUTIQUE SECTION */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full py-16 bg-white"
        >
          <div className="container mx-auto px-4 mt-[-30px] mb-[-60px]">
            <motion.div
              animate="animate"
              className="flex flex-col items-center text-center mb-5"
            >
              <img
                src={jouetFiere}
                alt="Jouet Fière"
                className="mb-4 h-24 w-auto object-contain"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-[-60px]"
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative"
                >
                  <Link to={`/produit/${product.id}`}>
                    <div className="h-80 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Animation ajout panier */}
                  {addedProductId === product.id && (
                    <div className="absolute inset-0  bg-opacity-90 flex items-center justify-center animate-fade-in">
                      <div className="text-[#BE356A] text-center">
                        <CheckCircle size={48} className="mx-auto mb-2" />
                        <p className="font-bold">Ajouté !</p>
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow text-center">
                    <Link
                      to={`/produit/${product.id}`}
                      className="hover:text-[#74C6C6] transition-colors"
                    >
                      <h3 className="text-lg text-black dark:text-white mb-1 font-glacial-indifference">
                        {product.name.split(" - ")[0]} <br />
                        {product.name.split(" - ")[1] || ""}
                      </h3>
                    </Link>
                    <p className="text-black dark:text-white mb-2 font-bold text-lg">
                      {product.priceDisplay}
                    </p>
                    <div className="mt-[-5px] pt-1">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-[#DCCC41] hover:bg-[#c4b33c] text-black font-bold font-waffle-soft py-3 px-4 rounded-full transition duration-300 text-sm uppercase"
                      >
                        AJOUTER AU PANIER
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION VIDÉO */}
        <div className="container mx-auto px-4">
          <motion.div
            animate="animate"
            className="flex flex-col items-center text-center mb-5 "
          >
            <img
              src={imgVideo}
              alt="Vidéo découverte"
              className="h-20 w-auto object-contain mb-4"
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                ref={videoRef}
                className="w-full h-auto max-h-96 object-cover"
                onClick={togglePlay}
                muted
                playsInline
              >
                <source src={VideoTopeci} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>

              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={togglePlay}
                      className="bg-white bg-opacity-90 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300"
                    >
                      <Play size={40} className="text-[#74C6C6] ml-2" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* SECTION AVIS CLIENTS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full py-20 bg-white"
        >
          <div className="container mx-auto px-4">
            <motion.div
              animate="animate"
              className="flex flex-col items-center text-center mb-5"
            >
              <img
                src={imgAvis}
                alt="Témoignages"
                className="h-20 w-auto object-contain mb-4"
              />
            </motion.div>

            <motion.div
              ref={reviewsContainerRef}
              className="relative mb-8 overflow-x-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="flex space-x-6 pb-4 min-w-max">
                {[...sampleReviews, ...sampleReviews].map((review, index) => (
                  <motion.div
                    key={`${review.id}-${index}`}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-[#74C6C6] rounded-full flex items-center justify-center text-white font-bold mr-4">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-base text-black dark:text-white">
                          {review.author}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? "text-yellow-400 fill-current mr-1"
                              : "text-gray-300 mr-1"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
                      {review.comment}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none dark:from-gray-900"></div>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none dark:from-gray-900"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowReviewForm(true)}
                className="bg-[#D68E54] hover:bg-[#c57f4a] text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
              >
                Écrire un avis
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION NOS ENGAGEMENTS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full py-20 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <motion.div
              animate="animate"
              className="flex flex-col items-center text-center mt-[-30px] mb-5"
            >
              <img
                src={imgEngagement}
                alt="Nos Engagements"
                className="h-20 w-auto object-contain mb-4"
              />
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-[#D68E54] rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Truck size={32} className="text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">
                  Livraison partout <br />
                  dans le monde
                </h3>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-[#D68E54] rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CreditCard size={32} className="text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">
                  Paiement sécurisé
                </h3>
              </motion.div>

              <motion.a
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                href="/salePoint"
                className="text-center block"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-[#D68E54] rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Store size={32} className="text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">
                  Nos points de <br />
                  vente
                </h3>
              </motion.a>

              <motion.a
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                href="/contact"
                className="text-center block"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-[#D68E54] rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <MessageCircle size={32} className="text-white" />
                </motion.div>
                <h3 className="text-lg font-semibold mb-2">
                  Assistance client <br />
                  WhatsApp / Email
                </h3>
              </motion.a>
            </motion.div>
          </div>
        </motion.section>

        {/* SECTION TOPECI OPEN CLASSROOM */}
        <motion.section
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full py-20 bg-white"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="max-w-2xl mx-auto bg-[#c2326c] rounded-3xl py-12 px-8 shadow-2xl"
            >
              <motion.h2
                animate="animate"
                className="text-2xl font-bold text-white mb-4 font-waffle-soft"
              >
                TOPECI Openclassroom arrive bientôt !
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-white mb-6 font-indie-flower text-lg"
              >
                Bientôt, une application pour apprendre de façon ludique
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white text-[#c2326c] hover:bg-gray-100 font-medium py-3 px-8 rounded-full transition duration-300 font-waffle-soft shadow-lg">
                  En savoir plus
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {showReviewForm && <ReviewForm />}
      <CookiesBanner />
      <FloatingGift />
      <Footer />
    </div>
  );
}

export default Index;
