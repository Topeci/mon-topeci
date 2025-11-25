/**
 * PAGE DE PAIEMENT TOPECI - VERSION 2
 *
 * Lorsque la page est responsive, le resumé de la commande apparait en dessous du logo TOPECI
 * sous forme d'un deplient.
 * avec le titre "Resumé de la commande" et une icone qui indique l'état (ouvert/fermé).
 * ainsi que le prix total.
 *
 * Le formulaire de paiement est divisé en sections claires avec des titres en gras.
 * Chaque section est espacée pour une meilleure lisibilité.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useCountryConfiguration } from "../components/layout/header";

import { Handbag, ChevronDown, ChevronUp } from "lucide-react";

import TopeciLogo from "../assets/images/logotopeci.png";
import visa from "../assets/images/visa.png";
import mastercard from "../assets/images/mastercard.png";
import wave from "../assets/images/wave.webp";
import paypal from "../assets/images/paypal.png";
import orangeMoney from "../assets/images/orange.webp";

export const Route = createFileRoute("/paiement")({
  component: RouteComponent,
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

// Zones de livraison avec prix adaptés selon la devise
const getDeliveryZones = (currency: string) => {
  const baseZones = {
    "cote-ivoire": {
      zone1: {
        label: "Zone 1",
        price: currency === "XOF" ? 1000 : 2,
        cities: ["Cocody", "Dokui", "Adjamé"],
      },
      zone2: {
        label: "Zone 2",
        price: currency === "XOF" ? 1500 : 3,
        cities: [
          "Plateau",
          "Bingerville",
          "Koumassi",
          "Marcory",
          "Zone 4",
          "Abobo",
          "Yopougon",
          "Attécoubé",
        ],
      },
      zone3: {
        label: "Zone 3",
        price: currency === "XOF" ? 2500 : 4,
        cities: ["Ayaman", "Port-Bouët", "Gonzague", "KM17"],
      },
      zone4: {
        label: "Zone 4",
        price: currency === "XOF" ? 3000 : 5,
        cities: ["Bassam", "Bonoua", "Dabou"],
      },
      interieur: {
        label: "Intérieur CI",
        price: currency === "XOF" ? 2000 : 3,
        cities: ["Autres villes de Côte d'Ivoire"],
      },
    },
    france: {
      standard: {
        label: "France",
        price: currency === "XOF" ? 3000 : 5,
        cities: ["Toute la France"],
      },
    },
    cedeao: {
      standard: {
        label: "CEDEAO",
        price: currency === "XOF" ? 5000 : 8,
        cities: ["Pays de la CEDEAO (hors Côte d'Ivoire)"],
      },
    },
    international: {
      standard: {
        label: "International",
        price: currency === "XOF" ? 10000 : 15,
        cities: ["Livraison internationale"],
      },
    },
  };

  const formattedZones = { ...baseZones };
  if (currency === "XOF") {
    formattedZones["cote-ivoire"].zone1.label = "Zone 1 - 1 000 FCFA";
    formattedZones["cote-ivoire"].zone2.label = "Zone 2 - 1 500 FCFA";
    formattedZones["cote-ivoire"].zone3.label = "Zone 3 - 2 500 FCFA";
    formattedZones["cote-ivoire"].zone4.label = "Zone 4 - 3 000 FCFA";
    formattedZones["cote-ivoire"].interieur.label = "Intérieur CI - 2 000 FCFA";
    formattedZones["france"].standard.label = "France - 3 000 FCFA";
    formattedZones["cedeao"].standard.label = "CEDEAO - 5 000 FCFA";
    formattedZones["international"].standard.label =
      "International - 10 000 FCFA";
  } else {
    formattedZones["cote-ivoire"].zone1.label = "Zone 1 - 2€";
    formattedZones["cote-ivoire"].zone2.label = "Zone 2 - 3€";
    formattedZones["cote-ivoire"].zone3.label = "Zone 3 - 4€";
    formattedZones["cote-ivoire"].zone4.label = "Zone 4 - 5€";
    formattedZones["cote-ivoire"].interieur.label = "Intérieur CI - 3€";
    formattedZones["france"].standard.label = "France - 5€";
    formattedZones["cedeao"].standard.label = "CEDEAO - 8€";
    formattedZones["international"].standard.label = "International - 15€";
  }

  return formattedZones;
};

function RouteComponent() {
  const { cart, getCartTotal } = useCart();
  const countryConfig = useCountryConfiguration();
  const subtotal = getCartTotal();

  // État pour le dépliant du résumé de commande en responsive
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);

  // Déterminer le pays par défaut
  const getDefaultCountry = () => {
    const map: Record<string, string> = {
      CI: "cote-ivoire",
      CEDEAO: "cedeao",
      FR: "france",
      CA: "canada",
      US: "usa",
      CH: "suisse",
      BE: "belgique",
      GB: "royaume-uni",
      IT: "italie",
      ES: "espagne",
      DE: "allemagne",
      NL: "pays-bas",
      LU: "luxembourg",
    };
    return map[countryConfig.country] || "cote-ivoire";
  };

  const [country, setCountry] = useState(getDefaultCountry());
  const [deliveryZone, setDeliveryZone] = useState("");
  const [customCountry, setCustomCountry] = useState(""); // Pour CEDEAO et autres
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    newsletter: false,
  });
  const [addressInfo, setAddressInfo] = useState({
    firstName: "",
    lastName: "",
    city: "",
    address: "",
    postalCode: "",
    company: "",
    phone: "",
  });
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);

  const formatPriceWithCurrentCurrency = (price: number) =>
    formatPrice(price, countryConfig.currencySymbol, countryConfig.currency);
  const deliveryZones = getDeliveryZones(countryConfig.currency);

  // Calculer les frais de livraison
  const getDeliveryPrice = () => {
    if (!deliveryZone) return 0;
    if (country === "cote-ivoire")
      return deliveryZones["cote-ivoire"][deliveryZone]?.price || 0;
    if (country === "france") return deliveryZones["france"].standard.price;
    if (country === "cedeao") return deliveryZones["cedeao"].standard.price;
    return deliveryZones["international"].standard.price;
  };

  const deliveryPrice = getDeliveryPrice();
  const getTaxAmount = () =>
    countryConfig.currency === "XOF" ? 336 : Math.round(subtotal * 0.01);
  const taxAmount = getTaxAmount();
  const total = subtotal + deliveryPrice + taxAmount - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === "TOPECI10") {
      setDiscount(subtotal * 0.1);
      alert("Code promo appliqué ! -10%");
    } else if (promoCode) {
      alert("Code promo invalide");
      setPromoCode("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (country === "cedeao" && !customCountry.trim()) {
      alert("Veuillez préciser votre pays CEDEAO");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const countryName =
        country === "cedeao"
          ? customCountry
          : internationalCountries.find((c) => c.value === country)?.label ||
            country;

      alert(
        `Merci pour votre achat ! 
        Pays de livraison : ${countryName}
        Votre commande a bien été enregistrée. Vous recevrez un message dès qu'elle sera expédiée.
        
        Redirection vers la page commande...`
      );

      // Redirection vers la page d'accueil (vous pouvez changer l'URL selon vos besoins)
      window.location.href = "/dashboard/commande";
    }, 2000);
  };

  // Liste des pays avec frais internationaux
  const internationalCountries = [
    { value: "canada", label: "Canada" },
    { value: "usa", label: "USA" },
    { value: "suisse", label: "Suisse" },
    { value: "belgique", label: "Belgique" },
    { value: "royaume-uni", label: "Royaume-Uni" },
    { value: "italie", label: "Italie" },
    { value: "espagne", label: "Espagne" },
    { value: "allemagne", label: "Allemagne" },
    { value: "pays-bas", label: "Pays-Bas" },
    { value: "luxembourg", label: "Luxembourg" },
  ];

  // Composant pour le résumé de commande
  const OrderSummary = () => (
    <div className="bg-[#74C6C6]/80 rounded-2xl shadow-lg p-6 lg:p-8 h-fit sticky top-8">
      <div className="text-center mb-2">
        <h3 className="text-xl font-bold text-white mb-2 font-waffle-soft">
          Votre résumé de commande
        </h3>
      </div>

      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-opacity-20 rounded-xl p-3 backdrop-blur-sm"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-lg border-2 border-white border-opacity-40 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1 bg-[#D68A54] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold border border-white">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="font-bold text-sm mb-1 truncate font-glacial-indifference"
                title={item.name}
              >
                {item.name}
              </h4>
              <p className="text-white text-opacity-80 text-xs font-glacial-indifference">
                {item.quantity} × {item.priceDisplay}
              </p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-white text-sm font-glacial-indifference">
                {formatPriceWithCurrentCurrency(item.price * item.quantity)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Code de réduction"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="font-glacial-indifference flex-1 border border-white border-opacity-30 p-3 bg-white bg-opacity-20 text-gray-400 focus:ring-2 focus:ring-white rounded-xl"
            style={{ backdropFilter: "blur(10px)" }}
          />
          <button
            onClick={applyPromoCode}
            className="bg-[#D68A54] text-white font-glacial-indifference rounded-xl font-bold px-4 hover:bg-opacity-90 transition-all whitespace-nowrap"
          >
            Valider
          </button>
        </div>
      </div>

      <div className="space-y-3 border-t border-white border-opacity-30 pt-4">
        <div className="flex justify-between">
          <span className="font-glacial-indifference text-white">
            Sous-total
          </span>
          <span className="font-semibold text-white">
            {formatPriceWithCurrentCurrency(subtotal)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-300">
            <span className="font-glacial-indifference">Réduction</span>
            <span className="font-glacial-indifference">
              -{formatPriceWithCurrentCurrency(discount)}
            </span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-glacial-indifference text-white">
            Livraison
          </span>
          <span className="font-semibold text-white">
            {deliveryPrice > 0
              ? formatPriceWithCurrentCurrency(deliveryPrice)
              : "À calculer"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-glacial-indifference text-white">Taxes</span>
          <span className="font-semibold text-white">
            {formatPriceWithCurrentCurrency(taxAmount)}
          </span>
        </div>
        <div className="flex justify-between text-white text-xl font-bold border-t border-white border-opacity-30 pt-3">
          <span className="font-glacial-indifference">Total</span>
          <span>{formatPriceWithCurrentCurrency(total)}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white border-opacity-30">
        <div className="flex flex-wrap justify-center gap-4 text-white text-opacity-80 text-xs">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Garantie satisfait</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>Support 24/7</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* En-tête avec logo et résumé dépliant en responsive */}
          <div className="mb-8 lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <Link to="/" className="flex items-center">
                <img
                  src={TopeciLogo}
                  alt="Logo TOPECI"
                  className="h-10 w-auto md:h-12"
                />
              </Link>
              <Link to="/panier" className="flex">
                <Handbag className="h-5 w-5 text-gray-700" />
              </Link>
            </div>

            {/* Dépliant du résumé de commande pour mobile */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => setIsOrderSummaryOpen(!isOrderSummaryOpen)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div>
                  <h3 className="font-bold text-gray-800 font-waffle-soft">
                    Résumé de la commande
                  </h3>
                  <p className="text-sm text-gray-600 font-glacial-indifference">
                    {cart.length} article{cart.length > 1 ? "s" : ""} •{" "}
                    {formatPriceWithCurrentCurrency(total)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#D68A54] font-glacial-indifference">
                    {formatPriceWithCurrentCurrency(total)}
                  </span>
                  {isOrderSummaryOpen ? (
                    <ChevronUp className="h-5 w-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-600" />
                  )}
                </div>
              </button>

              {isOrderSummaryOpen && (
                <div className="border-t border-gray-200 p-4 bg-[#74C6C6]/10">
                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-lg border border-gray-300 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute -top-1 -right-1 bg-[#D68A54] text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate font-glacial-indifference">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-xs font-glacial-indifference">
                            {item.quantity} × {item.priceDisplay}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm font-glacial-indifference">
                            {formatPriceWithCurrentCurrency(
                              item.price * item.quantity
                            )}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="mb-6">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Code de réduction"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="font-glacial-indifference flex-1 border border-[#74C6C6] border-opacity-30 p-2 bg-white bg-opacity-20 text-gray-400 focus:ring-2 focus:ring-[#74C6C6] rounded-xl"
                          style={{ backdropFilter: "blur(10px)" }}
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-[#D68A54] text-white font-glacial-indifference rounded-xl font-bold px-4 hover:bg-opacity-90 transition-all whitespace-nowrap"
                        >
                          Valider
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-glacial-indifference">
                        Sous-total
                      </span>
                      <span className="font-glacial-indifference">
                        {formatPriceWithCurrentCurrency(subtotal)}
                      </span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span className="font-glacial-indifference">
                          Réduction
                        </span>
                        <span className="font-glacial-indifference">
                          -{formatPriceWithCurrentCurrency(discount)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="font-glacial-indifference">
                        Livraison
                      </span>
                      <span className="font-glacial-indifference">
                        {deliveryPrice > 0
                          ? formatPriceWithCurrentCurrency(deliveryPrice)
                          : "À calculer"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-glacial-indifference">
                        Taxes incluses
                      </span>
                      <span className="font-glacial-indifference">
                        {formatPriceWithCurrentCurrency(taxAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between font-bold text-base border-t border-gray-300 pt-2">
                      <span className="font-glacial-indifference">Total</span>
                      <span className="font-glacial-indifference">
                        {formatPriceWithCurrentCurrency(total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FORMULAIRE DE PAIEMENT - GAUCHE */}
            <div className="p-6 lg:p-8">
              {/* En-tête pour desktop - caché en mobile */}
              <div className="mb-8 hidden lg:block">
                <div className="mb-4 flex items-center justify-center">
                  <Link to="/" className="flex items-center">
                    <img
                      src={TopeciLogo}
                      alt="Logo TOPECI"
                      className="h-10 w-auto md:h-12"
                    />
                  </Link>
                  <Link to="/panier" className="flex ml-4">
                    <Handbag className="h-5 w-5 text-gray-700" />
                  </Link>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* CONTACT */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800 font-waffle-soft">
                      Contact
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Adresse Email"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          email: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                      required
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={contactInfo.newsletter}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            newsletter: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-[#74C6C6]"
                      />
                      <label
                        htmlFor="newsletter"
                        className="text-sm text-gray-600 font-glacial-indifference"
                      >
                        Envoyez-moi des nouvelles et des offres par e-mail
                      </label>
                    </div>
                  </div>
                </div>

                {/* LIVRAISON */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-bold text-gray-800 font-waffle-soft">
                      Livraison
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-glacial-indifference">
                          Pays/région *
                        </label>
                        <select
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                            setDeliveryZone("");
                            setCustomCountry("");
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        >
                          <option value="cote-ivoire">Côte d'Ivoire</option>
                          <option value="cedeao">CEDEAO (hors CI)</option>
                          <option value="france">France</option>
                          {internationalCountries.map((c) => (
                            <option key={c.value} value={c.value}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-glacial-indifference">
                          Zone de livraison *
                        </label>
                        <select
                          value={deliveryZone}
                          onChange={(e) => setDeliveryZone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        >
                          <option value="" disabled hidden>
                            Sélectionner une zone
                          </option>
                          {country === "cote-ivoire" &&
                            Object.entries(deliveryZones["cote-ivoire"]).map(
                              ([key, zone]) => (
                                <option key={key} value={key}>
                                  {zone.label} ({zone.cities.join(", ")})
                                </option>
                              )
                            )}
                          {country === "france" && (
                            <option value="standard">
                              {deliveryZones["france"].standard.label}
                            </option>
                          )}
                          {country === "cedeao" && (
                            <option value="standard">
                              {deliveryZones["cedeao"].standard.label}
                            </option>
                          )}
                          {internationalCountries.some(
                            (c) => c.value === country
                          ) && (
                            <option value="standard">
                              {deliveryZones["international"].standard.label}
                            </option>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Champ pays CEDEAO */}
                    {country === "cedeao" && (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-glacial-indifference">
                          Précisez votre pays CEDEAO *
                        </label>
                        <input
                          type="text"
                          value={customCountry}
                          onChange={(e) => setCustomCountry(e.target.value)}
                          placeholder="Ex: Sénégal, Mali, Burkina Faso, Bénin, Togo, Ghana..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        />
                        <p className="text-xs text-amber-700 mt-2 font-glacial-indifference">
                          📦 Frais de livraison :{" "}
                          {formatPriceWithCurrentCurrency(
                            deliveryZones["cedeao"].standard.price
                          )}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={addressInfo.firstName}
                        placeholder="Prénom *"
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        required
                      />
                      <input
                        type="text"
                        value={addressInfo.lastName}
                        placeholder="Nom *"
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        required
                      />
                    </div>

                    <input
                      type="text"
                      value={addressInfo.company}
                      placeholder="Entreprise (optionnel)"
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          company: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                    />

                    {/* Champ adresse */}
                    <input
                      type="text"
                      value={addressInfo.address}
                      onChange={(e) =>
                        setAddressInfo({
                          ...addressInfo,
                          address: e.target.value,
                        })
                      }
                      placeholder="Adresse ( rue, quartier, immeuble...)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                      required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Champ ville */}
                      <input
                        type="text"
                        value={addressInfo.city}
                        placeholder="Ville *"
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            city: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        required
                      />

                      {/* Champ code postal */}
                      <input
                        type="text"
                        value={addressInfo.postalCode}
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            postalCode: e.target.value,
                          })
                        }
                        placeholder="Code postal"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="relative w-full">
                        {/* Champ téléphone */}
                        <input
                          type="tel"
                          value={addressInfo.phone}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Téléphone (avec indicatif, ex: +225 07 12 34 56 78) *"
                          className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        />

                        {/* Bouton info intégré dans le champ */}
                        <button
                          type="button"
                          onClick={() => setShowPhoneTooltip(!showPhoneTooltip)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-[#74C6C6] text-[#74C6C6] flex items-center justify-center hover:bg-[#74C6C6] hover:text-white transition-all duration-200 font-bold text-sm"
                          aria-label="Information sur le téléphone"
                        >
                          ?
                        </button>

                        {/* Tooltip */}
                        {showPhoneTooltip && (
                          <div className="absolute right-0 top-full mt-2 z-50 w-72 bg-white border-2 border-[#74C6C6] rounded-xl shadow-xl p-4">
                            <ul className="text-xs text-gray-600 space-y-1 font-glacial-indifference">
                              <li>
                                • Ajoutez l'indicatif de votre pays (ex : +225,
                                +33...)
                              </li>
                              <li>
                                • Ce numéro sera utilisé pour vous contacter si
                                nécessaire
                              </li>
                              <li>• Vérifiez qu'il est correct et actif</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* MÉTHODE DE PAIEMENT */}
                <div className="mb-8">
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <div>
                        <h2 className="text-xl font-bold text-gray-800 font-waffle-soft">
                          Paiement
                        </h2>
                        <p className="text-sm text-gray-600 font-glacial-indifference">
                          Toutes les transactions sont sécurisées et chiffrées.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {/* Carte bancaire */}
                    <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-[#74C6C6] border-gray-300 focus:ring-[#74C6C6]"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 font-glacial-indifference">
                            Carte bancaire
                          </span>
                          <div className="flex gap-2">
                            <img src={visa} alt="Visa" className="h-5" />
                            <img
                              src={mastercard}
                              alt="Mastercard"
                              className="h-5"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-glacial-indifference">
                          Paiement sécurisé par carte Visa ou Mastercard
                        </p>
                      </div>
                    </label>

                    {/* Mobile Money */}
                    <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="mobile"
                          checked={paymentMethod === "mobile"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-[#74C6C6] border-gray-300 focus:ring-[#74C6C6]"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 font-glacial-indifference">
                            Mobile Money
                          </span>
                          <div className="flex gap-2">
                            <img
                              src={orangeMoney}
                              alt="Orange Money"
                              className="h-5"
                            />
                            <img src={wave} alt="Wave" className="h-5" />
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-glacial-indifference">
                          Orange Money, Wave et autres services mobiles
                        </p>
                      </div>
                    </label>

                    {/* PayPal */}
                    <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex items-center h-5 mt-0.5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-[#74C6C6] border-gray-300 focus:ring-[#74C6C6]"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900 font-glacial-indifference">
                            PayPal
                          </span>
                          <img src={paypal} alt="PayPal" className="h-5" />
                        </div>
                        <p className="text-sm text-gray-500 mt-1 font-glacial-indifference">
                          Paiement via votre compte PayPal
                        </p>
                      </div>
                    </label>

                    {/* Payer à la livraison - CI uniquement */}
                    {country === "cote-ivoire" && (
                      <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-4 h-4 text-[#74C6C6] border-gray-300 focus:ring-[#74C6C6]"
                          />
                        </div>
                        <div className="flex-1">
                          <span className="font-medium text-gray-900 font-glacial-indifference">
                            Payer à la livraison
                          </span>
                          <p className="text-sm text-gray-500 mt-1 font-glacial-indifference">
                            {countryConfig.currency === "XOF" ? "FCFA" : "EUR"}{" "}
                            à la réception (Côte d'Ivoire uniquement)
                          </p>
                        </div>
                      </label>
                    )}
                  </div>

                  {/* Formulaires de paiement conditionnels */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                      <div className="grid gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block font-glacial-indifference">
                            Numéro de carte
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent font-glacial-indifference text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block font-glacial-indifference">
                              Date d'expiration
                            </label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              maxLength={5}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent font-glacial-indifference text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block font-glacial-indifference">
                              CVV
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              maxLength={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent font-glacial-indifference text-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block font-glacial-indifference">
                            Nom sur la carte
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent font-glacial-indifference text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "mobile" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg border">
                      <div className="grid gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block font-glacial-indifference">
                            Opérateur
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent font-glacial-indifference text-sm">
                            <option value="">Sélectionner un opérateur</option>
                            <option value="orange">Orange Money</option>
                            <option value="wave">Wave</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block font-glacial-indifference">
                            Numéro de téléphone
                          </label>
                          <input
                            type="tel"
                            placeholder="+225 07 12 34 56 78"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent font-glacial-indifference text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="p-4 bg-gray-50 rounded-lg border text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <img src={paypal} alt="PayPal" className="h-6" />
                        <span className="font-medium text-gray-900 font-glacial-indifference">
                          PayPal
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-glacial-indifference">
                        Vous serez redirigé vers PayPal pour finaliser votre
                        paiement de manière sécurisée.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "cash" && (
                    <div className="p-4 bg-gray-50 rounded-lg border text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <span className="font-medium text-gray-900 font-glacial-indifference">
                          Paiement à la livraison
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 font-glacial-indifference">
                        Vous paierez en{" "}
                        {countryConfig.currency === "XOF" ? "FCFA" : "EUR"}{" "}
                        lorsque vous recevrez votre commande.
                      </p>
                      <p className="text-xs text-gray-500 mt-1 font-glacial-indifference">
                        Le livreur vous remettra un reçu après le paiement.
                      </p>
                    </div>
                  )}
                </div>

                {/* BOUTON DE VALIDATION */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full ${
                    isLoading
                      ? "bg-gray-400"
                      : "bg-[#D68E54] hover:bg-[#c57f4a]"
                  } text-white font-bold py-4 transition-all shadow-lg hover:shadow-xl text-lg rounded-xl font-waffle-soft flex items-center justify-center`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Traitement en cours...
                    </>
                  ) : paymentMethod === "cash" ? (
                    `Confirmer la commande - ${formatPriceWithCurrentCurrency(total)}`
                  ) : (
                    `Payer maintenant - ${formatPriceWithCurrentCurrency(total)}`
                  )}
                </button>
              </form>
            </div>

            {/* RÉSUMÉ DE COMMANDE - DROITE (Desktop seulement) */}
            <div className="hidden lg:block">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
