/**
 * Page Panier TOPECI
 * - Liste des produits et résumé sur la même ligne en grand écran
 * - Icônes de paiement en bas du résumé
 * - Pas de livraison gratuite (message retiré)
 * - Détails de livraison gérés dans la page checkout
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "../../contexts/CartContext";
import { useCountryConfiguration } from "../../components/layout/header";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import {
  //Gift,
  Clock,
  //Tag,
  ShieldCheck,
  MessageCircle,
  Phone,
} from "lucide-react";

import visa from "../../assets/images/visa.png";
import mastercard from "../../assets/images/mastercard.png";
import wave from "../../assets/images/wave.webp";
import paypal from "../../assets/images/paypal.png";
import orangeMoney from "../../assets/images/orange.webp";

export const Route = createFileRoute("/_home/panier")({
  component: CartPage,
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

function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const countryConfig = useCountryConfiguration();

  const total = getCartTotal();

  // Fonction pour formater les prix avec la devise actuelle
  const formatPriceWithCurrentCurrency = (price: number) => {
    return formatPrice(
      price,
      countryConfig.currencySymbol,
      countryConfig.currency
    );
  };

  // Calcul des taxes en fonction de la devise
  const getTaxAmount = () => {
    if (countryConfig.currency === "XOF") {
      return 336; // Taxes en FCFA
    } else {
      // Approximation pour EUR (336 FCFA ≈ 0.51€)
      return 1; // 1€ pour simplifier
    }
  };

  const taxAmount = getTaxAmount();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag size={64} className="text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4 font-waffle-soft">
              Votre panier est vide
            </h1>
            <p className="text-gray-600 mb-8 font-waffle-soft">
              Découvrez nos produits éducatifs et ajoutez-les à votre panier !
            </p>
            <Link
              to="/boutique"
              className="font-waffle-soft inline-flex items-center gap-2 bg-[#74C6C6] hover:bg-[#5fb3b3] text-white font-bold py-3 px-8 rounded-lg transition-colors"
            >
              <ArrowLeft size={18} />
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full py-5 px-4 sm:px-8">
      <div className="w-full mx-auto">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-waffle-soft">
                Mon Panier
              </h2>
              <p className="text-gray-600 font-glacial-indifference">
                {cart.length} article{cart.length > 1 ? "s" : ""} dans votre
                panier
              </p>
            </div>

            {/* Boutons à droite */}
            <div className="flex justify-center sm:justify-end">
              <Link
                to="/boutique"
                className="flex items-center gap-2 bg-[#74C6C6] hover:bg-[#5fb3b3] text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-full transition-colors font-glacial-indifference text-sm sm:text-base"
              >
                <ArrowLeft size={16} className="sm:w-5" />
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Liste des produits */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  {/* Image */}
                  <Link
                    to="/produit/$productId"
                    params={{ productId: item.id.toString() }}
                    className="flex justify-center sm:justify-start"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-cover"
                    />
                  </Link>

                  {/* Infos produit */}
                  <div className="flex-1 text-center sm:text-left">
                    <Link
                      to="/produit/$productId"
                      params={{ productId: item.id.toString() }}
                      className="hover:text-[#74C6C6] transition-colors"
                    >
                      <h3 className="font-bold text-sm sm:text-base mb-1 font-glacial-indifference">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-gray-500 text-sm">{item.priceDisplay}</p>
                  </div>

                  {/* Contrôles quantité */}
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 p-1 sm:p-2 transition-colors rounded-full"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} className="sm:w-4" />
                    </button>
                    <span className="font-semibold min-w-[20px] sm:min-w-[25px] text-center text-sm sm:text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 p-1 sm:p-2 transition-colors rounded-full"
                    >
                      <Plus size={14} className="sm:w-4" />
                    </button>
                  </div>

                  {/* Sous-total */}
                  <div className="text-center sm:text-right min-w-[80px] sm:min-w-[100px]">
                    <p className="font-bold text-sm sm:text-base text-gray-900">
                      {formatPriceWithCurrentCurrency(
                        item.price * item.quantity
                      )}
                    </p>
                  </div>

                  {/* Bouton supprimer */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 transition-colors self-center rounded-full"
                    title="Supprimer"
                  >
                    <Trash2 size={18} className="sm:w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé de la commande */}
          <div className="lg:w-1/4">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sticky top-4">
              <div className="space-y-4 mb-6">
                <div className="space-y-2">
                  {/* Ligne 1 */}
                  <div className="flex justify-between text-gray-600">
                    <span className="font-glacial-indifference text-sm sm:text-base">
                      Articles
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {formatPriceWithCurrentCurrency(total)}
                    </span>
                  </div>
                </div>

                {/* Estimation de livraison */}
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-[#74C6C6]" />
                    <span className="font-semibold text-sm">
                      Livraison estimée
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    📍{" "}
                    {countryConfig.country === "CI"
                      ? "Abidjan: 2-3 jours"
                      : "France: 5-7 jours"}
                    <br />
                    🌍{" "}
                    {countryConfig.country === "CI"
                      ? "Autres villes: 5-7 jours"
                      : "International: 10-14 jours"}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-gray-600">
                    <span className="text-base sm:text-lg font-glacial-indifference">
                      Sous-Total
                    </span>
                    <span className="font-semibold text-[#4E6FA7] text-sm sm:text-base">
                      {formatPriceWithCurrentCurrency(total)}
                    </span>
                  </div>

                  {/* Taxes */}
                  <div className="flex justify-between text-gray-600">
                    <span className="font-glacial-indifference text-sm sm:text-base">
                      Taxes incluses
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {formatPriceWithCurrentCurrency(taxAmount)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                to="/paiement"
                className="block w-full bg-[#D68A54] hover:bg-[#D68A54] text-white font-glacial-indifference text-center font-bold py-2 sm:py-3 transition-colors shadow-lg hover:shadow-xl mb-4 rounded-full text-sm sm:text-base"
              >
                Passer la commande
              </Link>

              {/* Sécurité */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={16} className="text-green-600" />
                  <span className="text-sm font-semibold">
                    Paiement 100% sécurisé
                  </span>
                </div>

                <div className="flex justify-center items-center gap-2 flex-wrap">
                  <img src={visa} alt="Visa" className="h-6 w-auto" />
                  <img
                    src={mastercard}
                    alt="Mastercard"
                    className="h-6 w-auto"
                  />
                  <img
                    src={orangeMoney}
                    alt="Orange Money"
                    className="h-6 w-auto"
                  />
                  <img src={wave} alt="Wave" className="h-6 w-auto" />
                  <img src={paypal} alt="PayPal" className="h-6 w-auto" />
                </div>
              </div>

              {/* Assistance rapide */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-600 mb-2">Besoin d'aide ?</p>
                  <div className="flex gap-2 justify-center">
                    <button className="text-xs bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1">
                      <MessageCircle size={12} />
                      WhatsApp
                    </button>
                    <button className="text-xs bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1">
                      <Phone size={12} />
                      Appeler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
