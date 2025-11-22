/**
 * PAGE DE PAIEMENT TOPECI - VERSION AMÉLIORÉE
 *
 * Option de paiement : Carte bancaire, Mobile Money, PayPal, Payer comptant à la livraison
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useCountryConfiguration } from "../components/layout/header";

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
      zone5: {
        label: "France",
        price: currency === "XOF" ? 3000 : 5,
        cities: ["Toute la France"],
      },
    },
    cedeao: {
      zone5: {
        label: "CEDEAO",
        price: currency === "XOF" ? 5000 : 8,
        cities: ["Pays de la CEDEAO"],
      },
    },
    autre: {
      international: {
        label: "International",
        price: currency === "XOF" ? 10000 : 15,
        cities: ["Autres pays"],
      },
    },
  };

  // Formater les labels avec les prix
  const formattedZones = { ...baseZones };

  if (currency === "XOF") {
    formattedZones["cote-ivoire"].zone1.label = "Zone 1 - 1 000 FCFA";
    formattedZones["cote-ivoire"].zone2.label = "Zone 2 - 1 500 FCFA";
    formattedZones["cote-ivoire"].zone3.label = "Zone 3 - 2 500 FCFA";
    formattedZones["cote-ivoire"].zone4.label = "Zone 4 - 3 000 FCFA";
    formattedZones["cote-ivoire"].interieur.label = "Intérieur CI - 2 000 FCFA";
    formattedZones["france"].zone5.label = "France - 3 000 FCFA";
    formattedZones["cedeao"].zone5.label = "CEDEAO - 5 000 FCFA";
    formattedZones["autre"].international.label = "International - 10 000 FCFA";
  } else {
    formattedZones["cote-ivoire"].zone1.label = "Zone 1 - 2€";
    formattedZones["cote-ivoire"].zone2.label = "Zone 2 - 3€";
    formattedZones["cote-ivoire"].zone3.label = "Zone 3 - 4€";
    formattedZones["cote-ivoire"].zone4.label = "Zone 4 - 5€";
    formattedZones["cote-ivoire"].interieur.label = "Intérieur CI - 3€";
    formattedZones["france"].zone5.label = "France - 5€";
    formattedZones["cedeao"].zone5.label = "CEDEAO - 8€";
    formattedZones["autre"].international.label = "International - 15€";
  }

  return formattedZones;
};

function RouteComponent() {
  const { cart, getCartTotal } = useCart();
  const countryConfig = useCountryConfiguration();
  const subtotal = getCartTotal();

  // Déterminer le pays par défaut basé sur la configuration
  const getDefaultCountry = () => {
    if (countryConfig.country === "CI" || countryConfig.country === "CEDEAO") {
      return "cote-ivoire";
    } else if (countryConfig.country === "FR") {
      return "france";
    } else {
      return "autre";
    }
  };

  const [country, setCountry] = useState(getDefaultCountry());
  const [deliveryZone, setDeliveryZone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // États pour les champs de formulaire
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
  });

  // Fonction pour formater les prix avec la devise actuelle
  const formatPriceWithCurrentCurrency = (price: number) => {
    return formatPrice(
      price,
      countryConfig.currencySymbol,
      countryConfig.currency
    );
  };

  // Récupérer les zones de livraison selon la devise
  const deliveryZones = getDeliveryZones(countryConfig.currency);

  // Calculer les frais de livraison
  const getDeliveryPrice = () => {
    if (!deliveryZone) return 0;

    if (country === "cote-ivoire") {
      return deliveryZones["cote-ivoire"][deliveryZone]?.price || 0;
    } else if (country === "france") {
      return deliveryZones["france"].zone5.price;
    } else if (country === "autre") {
      return deliveryZones["autre"].international.price;
    }
    return 0;
  };

  const deliveryPrice = getDeliveryPrice();

  // Calcul des taxes en fonction de la devise
  const getTaxAmount = () => {
    if (countryConfig.currency === "XOF") {
      return 336; // Taxes en FCFA
    } else {
      // Approximation pour EUR
      return Math.round(subtotal * 0.01); // 1% de taxes
    }
  };

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
    setIsLoading(true);

    // Simulation du traitement du paiement
    setTimeout(() => {
      setIsLoading(false);
      alert(
        "Commande confirmée ! Redirection vers le traitement du paiement..."
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête simplifiée 
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-800 font-waffle-soft">
                TOPECI
              </span>
            </div>
            <div className="text-sm text-gray-600 font-glacial-indifference">
              Paiement sécurisé
            </div>
          </div>
        </div>
      </div>
*/}
      <div className="mx-10 px-4 py-8">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FORMULAIRE DE PAIEMENT - GAUCHE */}
            <div className="p-6 lg:p-8">
              <div className="mb-8">
                <div className="mb-4 items-center justify-center ">
                  <Link
                    to="/"
                    className="flex items-center hover:opacity-80 transition-opacity duration-300"
                  >
                    <img
                      src={TopeciLogo}
                      alt="Logo TOPECI"
                      className="h-10 w-auto md:h-12"
                    />
                  </Link>
                </div>

                <h1 className="text-xl lg:text-3xl font-bold text-gray-800 mb-2 font-waffle-soft">
                  Finalisez votre commande
                </h1>
                <p className="text-gray-600 font-glacial-indifference">
                  Remplissez vos informations pour finaliser votre achat
                </p>
              </div>

              {/* Indicateur de progression */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#74C6C6] text-white flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 font-glacial-indifference">
                    Panier
                  </span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#74C6C6] text-white flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 font-glacial-indifference">
                    Livraison
                  </span>
                </div>
                <div className="flex-1 h-1 bg-gray-200 mx-2"></div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#D68E54] text-white flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700 font-glacial-indifference">
                    Paiement
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {/* CONTACT */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-[#74C6C6] text-white flex items-center justify-center text-xs">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 font-waffle-soft">
                      Informations de contact
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1 font-glacial-indifference">
                        Email ou téléphone *
                      </label>
                      <input
                        type="text"
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                        focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                        transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        required
                      />
                    </div>

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
                    <div className="w-6 h-6 rounded-full bg-[#74C6C6] text-white flex items-center justify-center text-xs">
                      2
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 font-waffle-soft">
                      Adresse de livraison
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
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        >
                          <option value="cote-ivoire">Côte d'Ivoire</option>
                          <option value="france">France</option>
                          <option value="autre">Autre pays</option>
                        </select>
                      </div>

                      {/* Zones de livraison dynamiques */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 font-glacial-indifference">
                          Zone de livraison *
                        </label>
                        <select
                          value={deliveryZone}
                          onChange={(e) => setDeliveryZone(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
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
                            <option value="zone5">
                              {deliveryZones["france"].zone5.label}
                            </option>
                          )}
                          {country === "autre" && (
                            <option value="international">
                              {deliveryZones["autre"].international.label}
                            </option>
                          )}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Prénom */}
                      <div>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        />
                      </div>

                      {/* Nom */}
                      <div>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        />
                      </div>
                    </div>

                    {/* Entreprise */}
                    <div>
                      <input
                        type="text"
                        value={addressInfo.company}
                        placeholder="Entreprise (optionnel) "
                        onChange={(e) =>
                          setAddressInfo({
                            ...addressInfo,
                            company: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      {/* Ville */}
                      <div>
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        />
                      </div>

                      {/* Adresse complète */}
                      <div>
                        <input
                          type="text"
                          value={addressInfo.address}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              address: e.target.value,
                            })
                          }
                          placeholder="Rue, quartier, immeuble..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        />
                      </div>

                      {/* Code postal */}
                      <div>
                        <input
                          type="text"
                          value={addressInfo.postalCode}
                          onChange={(e) =>
                            setAddressInfo({
                              ...addressInfo,
                              postalCode: e.target.value,
                            })
                          }
                          placeholder="Code postal "
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl 
                          focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent 
                          transition-all duration-200 font-glacial-indifference text-sm bg-white"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* MÉTHODE DE PAIEMENT */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-[#74C6C6] text-white flex items-center justify-center text-xs">
                      3
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 font-waffle-soft">
                      Mode de paiement
                    </h2>
                  </div>

                  {/* Sélection méthode - Style shadcn */}
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

                    {/* Payer à la livraison */}
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
                          {countryConfig.currency === "XOF" ? "FCFA" : "EUR"} à
                          la réception
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Formulaire Carte bancaire */}
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

                  {/* Formulaire Mobile Money */}
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
                            <option value="mtn">MTN Money</option>
                            <option value="moov">Moov Money</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-700 mb-2 block font-glacial-indifference">
                            Numéro de téléphone
                          </label>
                          <input
                            type="tel"
                            placeholder={
                              country === "cote-ivoire"
                                ? "+225 07 12 34 56 78"
                                : "+33 6 12 34 56 78"
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent font-glacial-indifference text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal */}
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

                  {/* Paiement à la livraison */}
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

            {/* RÉSUMÉ DE COMMANDE - DROITE */}
            <div className="bg-[#74C6C6] rounded-2xl shadow-lg p-6 lg:p-8 h-fit sticky top-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2 font-waffle-soft">
                  Votre commande
                </h2>
                <p className="text-white text-opacity-80 font-glacial-indifference">
                  {cart.length} article{cart.length > 1 ? "s" : ""} dans votre
                  panier
                </p>
              </div>

              {/* Liste des produits */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 bg-opacity-20 rounded-xl p-3 backdrop-blur-sm"
                  >
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-lg border-2 border-white 
                        border-opacity-40 overflow-hidden"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div
                        className="absolute -top-1 -right-1 bg-[#D68A54] text-white rounded-full
                         w-5 h-5 flex items-center justify-center text-xs font-bold border border-white"
                      >
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
                        {formatPriceWithCurrentCurrency(
                          item.price * item.quantity
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Code promo */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Code de réduction"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="font-glacial-indifference flex-1 border border-white border-opacity-30 p-3 bg-white bg-opacity-20
                     text-white placeholder-white placeholder-opacity-70 focus:ring-2 focus:ring-white rounded-xl"
                    style={{ backdropFilter: "blur(10px)" }}
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-[#D68A54] text-white font-glacial-indifference rounded-xl
                     font-bold px-4 hover:bg-opacity-90 transition-all whitespace-nowrap"
                  >
                    Valider
                  </button>
                </div>
              </div>

              {/* Récapitulatif */}
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
                  <div className="flex justify-between">
                    <span className="font-glacial-indifference text-white">
                      Réduction
                    </span>
                    <span className="font-semibold text-green-300">
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
                  <span className="font-glacial-indifference text-white">
                    Taxes
                  </span>
                  <span className="font-semibold text-white">
                    {formatPriceWithCurrentCurrency(taxAmount)}
                  </span>
                </div>

                <div className="flex justify-between text-white text-xl font-bold border-t border-white border-opacity-30 pt-3">
                  <span className="font-glacial-indifference">Total</span>
                  <span>{formatPriceWithCurrentCurrency(total)}</span>
                </div>
              </div>

              {/* Sécurité et garanties */}
              <div className="mt-6 pt-4 border-t border-white border-opacity-30">
                <div className="flex flex-wrap justify-center gap-4 text-white text-opacity-80 text-xs">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Garantie satisfait</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Support 24/7</span>
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
