import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Filter,
  Grid,
  List,
  Star,
  ShoppingCart,
  Eye,
  ChevronDown,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useCountryConfiguration } from "../../components/layout/header";

import LivreBaoule from "../../assets/images/livrebaoule.png";
import LivreDioula from "../../assets/images/livredioula.png";
import carteBete from "../../assets/images/cartebete.png";

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

// Données de produits avec prix de base en XOF et type de produit
const baseProducts = [
  {
    id: 1,
    name: "Cartes Parlantes Bété - Français",
    description: "Cartes éducatives pour apprendre le bété de façon ludique",
    basePriceXOF: 20000,
    type: "carte" as const,
    image: carteBete,
    category: "carte",
    isNew: true,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Mon Premier Livre Audio Baoulé - Français",
    description: "Livre interactif avec audio pour apprendre le baoulé",
    basePriceXOF: 16500,
    type: "livre" as const,
    image: LivreBaoule,
    category: "livre-audio",
    isNew: false,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Mon Premier Livre Audio Dioula - Français",
    description: "Livre interactif avec audio pour apprendre le dioula",
    basePriceXOF: 16500,
    type: "livre" as const,
    image: LivreDioula,
    category: "livre-audio",
    isNew: false,
    rating: 4.7,
  },
];

const categories = [
  { id: "all", name: "Tous les produits" },
  { id: "livre-audio", name: "Livres Audio" },
  { id: "carte", name: "Cartes Parlantes" },
];

const sortOptions = [
  { id: "newest", name: "Nouveautés" },
  { id: "price-asc", name: "Prix croissant" },
  { id: "price-desc", name: "Prix décroissant" },
  { id: "popular", name: "Populaires" },
];

export const Route = createFileRoute("/_home/boutique")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);

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

  // Produits avec prix calculés selon la devise actuelle
  const products = baseProducts.map((product) => ({
    ...product,
    price: getProductPrice(
      product.basePriceXOF,
      product.type,
      countryConfig.currency
    ),
    priceDisplay: getProductPriceDisplay(product.basePriceXOF, product.type),
  }));

  const filteredProducts = products
    .filter(
      (product) =>
        selectedCategory === "all" || product.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "popular":
          return b.rating - a.rating;
        case "newest":
          return b.isNew ? 1 : -1;
        default:
          return a.id - b.id;
      }
    });

  const handleAddToCart = (product: (typeof products)[0]) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        priceDisplay: product.priceDisplay,
        image: product.image,
      },
      1
    );

    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Message de succès global */}
      {addedProductId && (
        <div className="fixed top-4 right-4 z-50 bg-[#D68E54] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
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

      {/* Filtres et tri */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          {/* ... filtres et catégories (identique) */}
        </div>

        {/* Grille de produits */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                viewMode === "list" ? "flex flex-col md:flex-row" : ""
              }`}
            >
              {/* Image du produit */}
              <div
                className={`relative ${viewMode === "list" ? "md:w-1/3" : "w-full h-74"} overflow-hidden group`}
              >
                <Link
                  to="/produit/$productId"
                  params={{ productId: product.id.toString() }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover`}
                  />
                </Link>
                {/* Badges */}
                <div className="absolute top-3 left-3 space-y-2">
                  {product.isNew && (
                    <span className="bg-[#BE356A] text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      Nouveau
                    </span>
                  )}
                </div>
                {/* Rating */}
                <div className="absolute top-3 right-3 bg-white bg-opacity-95 px-2 py-1 rounded-full flex items-center shadow-md">
                  <Star
                    size={14}
                    className="text-yellow-400 fill-current mr-1"
                  />
                  <span className="text-sm font-semibold">
                    {product.rating}
                  </span>
                </div>

                {/* Animation ajout panier */}
                {addedProductId === product.id && (
                  <div className="absolute inset-0 bg-opacity-90 flex items-center justify-center animate-fade-in">
                    <div className="text-[#BE356A] text-center">
                      <CheckCircle size={48} className="mx-auto mb-2" />
                      <p className="font-bold">Ajouté !</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Contenu du produit */}
              <div
                className={`p-5 ${viewMode === "list" ? "md:w-2/3 flex flex-col justify-between" : ""}`}
              >
                <div>
                  <Link
                    to="/produit/$productId"
                    params={{ productId: product.id.toString() }}
                    className="hover:text-[#74C6C6] transition-colors"
                  >
                    <h3 className="font-semibold text-lg mb-1 text-gray-800 font-waffle-soft">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-2 font-glacial-indifference">
                    {product.description}
                  </p>
                </div>
                <div>
                  <div className="mb-4">
                    <span className="text-[#4E6FA7] font-bold text-xl">
                      {product.priceDisplay}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-[#DCCC41] hover:bg-[#c9bb3a] text-gray-800 py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center font-medium shadow-md hover:shadow-lg"
                    >
                      <ShoppingCart
                        size={18}
                        className="mr-2 font-glacial-indifference "
                      />
                      Ajouter
                    </button>
                    <Link
                      to="/produit/$productId"
                      params={{ productId: product.id.toString() }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                      aria-label={`Voir détails de ${product.name}`}
                    >
                      <Eye size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun produit */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg font-glacial-indifference">
              Aucun produit trouvé dans cette catégorie.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
