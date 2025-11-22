import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import carteBete from "../../../assets/images/cartebete.png";
import livreBaoule from "../../../assets/images/livrebaoule.png";
import livreDioula from "../../../assets/images/livredioula.png";
import kid1 from "../../../assets/images/kid1.jpg";
import { useState } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  HeadphonesIcon,
  Shield,
  Check,
  Plus,
  Minus,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../../../contexts/CartContext";
import { useCountryConfiguration } from "../../../components/layout/header";

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

// Configuration des prix par type de produit (SÉPARÉE de la fonction du composant)
const calculateProductPrice = (
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

// Base de données des produits avec prix de base en XOF
const productsData = {
  "1": {
    id: 1,
    name: "Cartes Parlantes Bété - Français",
    description:
      "Découvrez plus de 100 cartes illustrées avec des mots traduits en Bété et en Français, accompagnées d'histoires et de chansons audio pour un apprentissage ludique et interactif.",
    longDescription: `
Ces cartes parlantes innovantes combinent tradition et technologie pour offrir une expérience d'apprentissage immersive. Chaque carte est enrichie d'audio natif de qualité qui aide à la mémorisation naturelle du vocabulaire.

**Caractéristiques principales :**
- Plus de 100 cartes illustrées colorées
- Audio natif de qualité studio
- Histoires et chansons traditionnelles bété
- Pas besoin d'application ni de téléphone
- Batterie rechargeable via USB
- Matériel durable et adapté aux enfants
- Autonomie de 5 à 6 heures d'écoute
    `,
    basePriceXOF: 20000,
    type: "carte" as const,
    image: carteBete,
    images: [carteBete, carteBete, carteBete, carteBete],
    category: "Cartes Parlantes",
    rating: 4.9,
    reviewCount: 52,
    inStock: true,
    stock: 12,
    features: [
      "Plus de 100 cartes illustrées",
      "Audio natif de qualité studio",
      "Histoires et chansons incluses",
      "Batterie rechargeable USB",
      "Autonomie 5-6 heures",
      "Aucune application nécessaire",
    ],
  },
  "2": {
    id: 2,
    name: "Mon Premier Livre Audio Baoulé - Français",
    description:
      "Découvrez la beauté de la langue baoulé à travers ce livre audio interactif. Chaque page prend vie avec des illustrations colorées et des narrations authentiques par des locuteurs natifs.",
    longDescription: `
Ce livre audio innovant combine tradition et technologie pour offrir une expérience d'apprentissage immersive. Chaque histoire est enrichie de chants traditionnels et de dialogues quotidiens qui aident à la mémorisation naturelle du vocabulaire.

Caractéristiques principales :
- 40 pages illustrées avec des dessins vibrants
- 2 heures d'audio natif de qualité studio
- 15 chansons traditionnelles baoulé
- 10 activités interactives
- Guide de prononciation inclus
- Matériel durable et adapté aux enfants
    `,
    basePriceXOF: 16500,
    type: "livre" as const,
    image: livreBaoule,
    images: [livreBaoule, livreBaoule, livreBaoule, livreBaoule],
    category: "Livre Audio",
    rating: 4.8,
    reviewCount: 47,
    inStock: true,
    stock: 15,
    features: [
      "40 pages illustrées colorées",
      "Audio natif de qualité studio",
      "15 chansons traditionnelles",
      "10 activités interactives",
      "Guide de prononciation",
      "Papier résistant et écologique",
    ],
  },
  "3": {
    id: 3,
    name: "Mon Premier Livre Audio Dioula - Français",
    description:
      "Découvrez la richesse de la langue dioula à travers ce livre audio interactif. Des illustrations captivantes et des narrations authentiques pour un apprentissage naturel et amusant.",
    longDescription: `
Ce livre audio innovant combine tradition et technologie pour offrir une expérience d'apprentissage immersive. Chaque histoire est enrichie de chants traditionnels et de dialogues quotidiens qui aident à la mémorisation naturelle du vocabulaire.

**Caractéristiques principales :**
- 40 pages illustrées avec des dessins vibrants
- 2 heures d'audio natif de qualité studio
- 15 chansons traditionnelles dioula
- 10 activités interactives
- Guide de prononciation inclus
- Matériel durable et adapté aux enfants
    `,
    basePriceXOF: 16500,
    type: "livre" as const,
    image: livreDioula,
    images: [livreDioula, livreDioula, livreDioula, kid1],
    category: "Livre Audio",
    rating: 4.7,
    reviewCount: 43,
    inStock: true,
    stock: 18,
    features: [
      "40 pages illustrées colorées",
      "Audio natif de qualité studio",
      "15 chansons traditionnelles",
      "10 activités interactives",
      "Guide de prononciation",
      "Papier résistant et écologique",
    ],
  },
};

export const Route = createFileRoute("/_home/produit/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  const baseProduct = productsData[productId];
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const countryConfig = useCountryConfiguration();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Si le produit n'existe pas
  if (!baseProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Produit introuvable
          </h1>
          <p className="text-gray-600 mb-6">
            Le produit que vous recherchez n'existe pas.
          </p>
          <Link
            to="/boutique"
            className="bg-[#74C6C6] hover:bg-[#5fb3b3] text-white py-3 px-8 rounded-lg transition-colors inline-block"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  // Calculer le prix actuel du produit
  const currentPrice = calculateProductPrice(
    baseProduct.basePriceXOF,
    baseProduct.type,
    countryConfig.currency
  );

  // Fonction pour obtenir le prix affiché
  const getProductPriceDisplay = () => {
    return formatPrice(
      currentPrice,
      countryConfig.currencySymbol,
      countryConfig.currency
    );
  };

  // Produit avec prix calculés selon la devise actuelle
  const product = {
    ...baseProduct,
    price: currentPrice,
    priceDisplay: getProductPriceDisplay(),
  };

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        priceDisplay: product.priceDisplay,
        image: product.image,
      },
      quantity
    );

    // Afficher le message de succès
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    // Réinitialiser la quantité
    setQuantity(1);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Rediriger vers la page panier
    navigate({ to: "/panier" });
  };

  // Calcul du sous-total
  const subtotal = product.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Message de succès */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#D68E54] text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
          <CheckCircle size={24} />
          <div>
            <p className="font-bold">Produit ajouté au panier !</p>
            <p className="text-sm">
              {quantity} × {product.name}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div
            className="flex items-center space-x-2 text-sm text-gray-600"
            style={{ fontFamily: "Glacial Indifference" }}
          >
            <Link to="/" className="hover:text-[#74C6C6] transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link
              to="/boutique"
              className="hover:text-[#74C6C6] transition-colors"
            >
              Boutique
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Produit principal */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Galerie d'images */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`bg-white rounded-lg p-2 border-2 transition-all hover:shadow-md ${
                    selectedImage === index
                      ? "border-[#74C6C6] shadow-md"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Vue ${index + 1}`}
                    className="w-full h-20 object-contain rounded"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div>
            <div className="mb-6">
              <div className="mb-3">
                <span className="bg-[#74C6C6] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
                {/* Indicateur de devise */}
                <span className="ml-2 bg-[#4E6FA7] text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {countryConfig.currencySymbol}
                </span>
              </div>
              <h1
                className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: "WAFFLE-SOFT" }}
              >
                {product.name}
              </h1>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span
                    className="ml-2 text-sm text-gray-600"
                    style={{ fontFamily: "Glacial Indifference" }}
                  >
                    {product.rating} ({product.reviewCount} avis)
                  </span>
                </div>
              </div>

              <div className="flex items-center mb-6">
                <span className="text-3xl font-bold text-[#4E6FA7]">
                  {product.priceDisplay}
                </span>
                
              </div>

              <div className="mb-6">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <Check size={20} className="mr-2" />
                    <span className="font-semibold">
                      En stock ({product.stock} disponibles)
                    </span>
                  </div>
                ) : (
                  <div className="text-red-600 font-semibold">
                    Rupture de stock
                  </div>
                )}
              </div>
            </div>

            <p
              className="text-gray-600 mb-6 leading-relaxed font-glacial-indifference"
            >
              {product.description}
            </p>

            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h3
                className="font-bold mb-3 text-lg font-waffle-soft"
                
              >
                Ce produit comprend :
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      size={18}
                      className="text-[#74C6C6] mr-2 mt-1 flex-shrink-0"
                    />
                    <span
                      className="text-gray-700"
                      style={{ fontFamily: "Glacial Indifference" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <label
                className="block font-bold mb-3 text-lg"
                style={{ fontFamily: "WAFFLE-SOFT" }}
              >
                Quantité :
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 hover:bg-gray-300 p-3 rounded-l-lg transition-colors"
                  disabled={quantity <= 1}
                >
                  <Minus size={18} />
                </button>
                <span className="bg-white px-6 py-3 border-y border-gray-200 font-semibold min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="bg-gray-200 hover:bg-gray-300 p-3 rounded-r-lg transition-colors"
                  disabled={quantity >= product.stock}
                >
                  <Plus size={18} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Sous-total :{" "}
                {formatPrice(
                  subtotal,
                  countryConfig.currencySymbol,
                  countryConfig.currency
                )}
              </p>
            </div>

            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#74C6C6] hover:bg-[#5fb3b3] text-white py-4 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                style={{ fontFamily: "WAFFLE-SOFT" }}
                disabled={!product.inStock}
              >
                <ShoppingCart size={22} className="mr-2" />
                Ajouter au panier
              </button>
              <button className="p-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-lg transition-all hover:border-[#BE356A]">
                <Heart size={22} className="text-gray-600" />
              </button>
              <button className="p-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-lg transition-all hover:border-[#4E6FA7]">
                <Share2 size={22} className="text-gray-600" />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-[#D68E54] hover:bg-[#c57f4a] text-white py-4 px-6 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl mb-6"
              style={{ fontFamily: "WAFFLE-SOFT" }}
              disabled={!product.inStock}
            >
              Acheter maintenant - {product.priceDisplay}
            </button>

            <div className="grid grid-cols-3 gap-4 p-5 bg-gradient-to-br from-[#74C6C6]/10 to-[#4E6FA7]/10 rounded-xl">
              <div className="text-center">
                <Truck size={28} className="text-[#4E6FA7] mx-auto mb-2" />
                <p
                  className="text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "Glacial Indifference" }}
                >
                  Livraison rapide
                </p>
                <p className="text-xs text-gray-600">
                  {countryConfig.country === "CI" ? "1-2 jours" : "3-5 jours"}
                </p>
              </div>
              <div className="text-center">
                <HeadphonesIcon
                  size={28}
                  className="text-[#4E6FA7] mx-auto mb-2"
                />
                <p
                  className="text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "Glacial Indifference" }}
                >
                  Support 7j/7
                </p>
                <p className="text-xs text-gray-600">À votre écoute</p>
              </div>
              <div className="text-center">
                <Shield size={28} className="text-[#4E6FA7] mx-auto mb-2" />
                <p
                  className="text-sm font-semibold text-gray-700"
                  style={{ fontFamily: "Glacial Indifference" }}
                >
                  Garantie qualité
                </p>
                <p className="text-xs text-gray-600">Produits certifiés</p>
              </div>
            </div>

            {/* Informations sur la devise */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700 text-center">
                <strong>Devise actuelle :</strong>{" "}
                {countryConfig.currencySymbol} ({countryConfig.currency})
                {countryConfig.countryName && ` - ${countryConfig.countryName}`}
              </p>
              <p className="text-xs text-blue-600 text-center mt-1">
                Les prix sont affichés dans la devise de votre pays
              </p>
            </div>
          </div>
        </div>

        {/* Description détaillée */}
        

        {/* Section Avis */}
       
      </div>
    </div>
  );
}
