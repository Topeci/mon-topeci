/**
 * En-tête du site avec navigation responsive
 * Inclut une option qui permet de selectionner le pays (Côte d'Ivoire, CEDEAO, France, Canada, USA, Suisse, Belgique, Royaume-Uni)
 * Italie, Espagne, Allemagne, Pays-Bas, Luxembourg) avec le drapeau correspondant
 */

import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  CircleUser,
  ShoppingCart,
  ChevronDown,
  Globe,
} from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { Link } from "@tanstack/react-router";
import ReactCountryFlag from "react-country-flag";

import TopeciLogo from "../../assets/images/logotopeci.png";

const navItems = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Notre Histoire", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

// Liste des pays avec leurs codes ISO et configurations
const countries = [
  {
    code: "CI",
    name: "Côte d'Ivoire",
    currency: "XOF",
    currencySymbol: "FCFA",
  },
  {
    code: "CEDEAO",
    name: "CEDEAO",
    currency: "XOF",
    currencySymbol: "FCFA",
    customIcon: true,
  },
  { code: "FR", name: "France", currency: "EUR", currencySymbol: "€" },
  { code: "CA", name: "Canada", currency: "CAD", currencySymbol: "$" },
  { code: "US", name: "USA", currency: "USD", currencySymbol: "$" },
  { code: "CH", name: "Suisse", currency: "CHF", currencySymbol: "CHF" },
  { code: "BE", name: "Belgique", currency: "EUR", currencySymbol: "€" },
  { code: "GB", name: "Royaume-Uni", currency: "GBP", currencySymbol: "£" },
  { code: "IT", name: "Italie", currency: "EUR", currencySymbol: "€" },
  { code: "ES", name: "Espagne", currency: "EUR", currencySymbol: "€" },
  { code: "DE", name: "Allemagne", currency: "EUR", currencySymbol: "€" },
  { code: "NL", name: "Pays-Bas", currency: "EUR", currencySymbol: "€" },
  { code: "LU", name: "Luxembourg", currency: "EUR", currencySymbol: "€" },
];

// Configuration des prix par pays
const getPriceConfiguration = (countryCode: string) => {
  switch (countryCode) {
    case "CI":
    case "CEDEAO":
      return {
        basePrice: 16500,
        currency: "XOF",
        currencySymbol: "FCFA",
        shippingCost: 0,
        shippingMessage: "Frais de livraison selon votre zone",
      };
    case "FR":
      return {
        basePrice: 30,
        currency: "EUR",
        currencySymbol: "€",
        shippingCost: 5,
        shippingMessage: "Frais de livraison: 5€",
      };
    default:
      return {
        basePrice: 30,
        currency: "EUR",
        currencySymbol: "€",
        shippingCost: 14.95,
        shippingMessage: "Frais de livraison: 14,95€",
      };
  }
};

// Configuration des frais de livraison détaillés
const getShippingConfiguration = (countryCode: string) => {
  switch (countryCode) {
    case "CI":
      return {
        cost: 0,
        message: "Livraison en Côte d'Ivoire (frais variables selon la zone)",
        zones: [
          { name: "Abidjan", cost: 1000 },
          { name: "Grand Abidjan", cost: 2000 },
          { name: "Autres villes", cost: 5000 },
        ],
      };
    case "CEDEAO":
      return {
        cost: 0,
        message: "Livraison dans l'espace CEDEAO",
        countries: [
          "Sénégal",
          "Mali",
          "Burkina Faso",
          "Bénin",
          "Togo",
          "Ghana",
          "Niger",
          "Guinée",
          "Guinée-Bissau",
          "Sierra Leone",
          "Liberia",
        ],
      };
    case "FR":
      return {
        cost: 5,
        message: "Livraison standard en France métropolitaine",
        deliveryTime: "3-5 jours ouvrés",
      };
    default:
      return {
        cost: 14.95,
        message: "Livraison internationale",
        deliveryTime: "7-14 jours ouvrés",
      };
  }
};

// Composant pour afficher le drapeau
const CountryFlagIcon = ({ countryCode, customIcon, size = "1.5em" }) => {
  if (customIcon) {
    // Pour CEDEAO, utiliser une icône Globe
    return (
      <Globe size={size === "1.5em" ? 24 : 20} className="text-[#4E6FA7]" />
    );
  }

  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: size,
        height: size,
        borderRadius: "4px",
        objectFit: "cover",
      }}
      title={countryCode}
    />
  );
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]); // Côte d'Ivoire par défaut
  const countryMenuRef = useRef(null);

  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  // Gérer le scroll pour l'effet d'ombre
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Fermer le menu pays lors du clic en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryMenuRef.current &&
        !countryMenuRef.current.contains(event.target)
      ) {
        setIsCountryMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Charger le pays depuis localStorage au montage
  useEffect(() => {
    const savedCountry = localStorage.getItem("selectedCountry");
    if (savedCountry) {
      try {
        const country = JSON.parse(savedCountry);
        const foundCountry = countries.find((c) => c.code === country.code);
        if (foundCountry) {
          setSelectedCountry(foundCountry);
          applyCountryConfiguration(foundCountry);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du pays:", error);
      }
    }
  }, []);

  // Fonction pour appliquer la configuration du pays
  const applyCountryConfiguration = (country: (typeof countries)[0]) => {
    const priceConfig = getPriceConfiguration(country.code);
    const shippingConfig = getShippingConfiguration(country.code);

    // Mettre à jour les prix dans le contexte du panier
    // Note: Vous devrez ajouter cette fonction dans votre CartContext
    // if (updatePrices) {
    //   updatePrices({
    //     currency: priceConfig.currency,
    //     currencySymbol: priceConfig.currencySymbol,
    //     basePrice: priceConfig.basePrice,
    //     shippingCost: shippingConfig.cost
    //   });
    // }

    // Sauvegarder la configuration dans le localStorage
    localStorage.setItem(
      "countryConfiguration",
      JSON.stringify({
        country: country.code,
        currency: priceConfig.currency,
        currencySymbol: priceConfig.currencySymbol,
        shippingCost: shippingConfig.cost,
        shippingMessage: shippingConfig.message,
        lastUpdated: new Date().toISOString(),
      })
    );

    // Émettre un événement personnalisé pour notifier les autres composants
    window.dispatchEvent(
      new CustomEvent("countryChanged", {
        detail: {
          country: country.code,
          countryName: country.name,
          currency: priceConfig.currency,
          currencySymbol: priceConfig.currencySymbol,
          priceConfig,
          shippingConfig,
        },
      })
    );

    console.log(`Configuration appliquée pour ${country.name}:`, {
      prix: `${priceConfig.basePrice} ${priceConfig.currencySymbol}`,
      fraisLivraison:
        shippingConfig.cost > 0
          ? `${shippingConfig.cost} ${priceConfig.currencySymbol}`
          : shippingConfig.message,
    });
  };

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setIsCountryMenuOpen(false);
    setIsMenuOpen(false); // Fermer le menu mobile si ouvert

    // Sauvegarder le pays dans le localStorage
    localStorage.setItem("selectedCountry", JSON.stringify(country));

    // Appliquer la configuration du pays
    applyCountryConfiguration(country);

    // Afficher une notification toast (optionnel)
    showCountryChangeNotification(country);
  };

  // Fonction pour afficher une notification de changement de pays
  const showCountryChangeNotification = (country: (typeof countries)[0]) => {
    const priceConfig = getPriceConfiguration(country.code);
    const shippingConfig = getShippingConfiguration(country.code);

    // Vous pouvez utiliser votre système de notifications ici
    console.log(`Pays changé vers: ${country.name}`);
    console.log(`Devise: ${priceConfig.currencySymbol}`);
    console.log(`Frais de livraison: ${shippingConfig.message}`);

    // Exemple avec un toast (si vous avez un système de toast)
    // toast.success(`Pays changé: ${country.name} - ${priceConfig.currencySymbol}`);
  };

  return (
    <header
      className={`bg-white dark:bg-gray-900 w-full mx-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="w-full py-3">
        <div className="flex items-center justify-between px-4">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center px-4 py-2 rounded-full font-waffle-soft font-light text-[#BE356A]
                 dark:text-white hover:bg-[#74C6C6] hover:bg-opacity-10 hover:text-white dark:hover:text-white transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Icônes d'actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Sélecteur de pays */}
            <div className="relative" ref={countryMenuRef}>
              <button
                onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 text-[#BE356A] hover:bg-opacity-10 
                hover:text-[#4E6FA7] transition-all duration-300 dark:border-gray-700"
                aria-label="Sélectionner un pays"
                title={`${selectedCountry.name} - ${getPriceConfiguration(selectedCountry.code).currencySymbol}`}
              >
                <CountryFlagIcon
                  countryCode={selectedCountry.code}
                  customIcon={selectedCountry.customIcon}
                  size="1.5em"
                />
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isCountryMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Menu déroulant des pays */}
              {isCountryMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg 
                shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 animate-slide-down">
                  <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                      Sélectionnez votre pays pour adapter les prix et frais de
                      livraison
                    </p>
                  </div>
                  <div className="py-2 max-h-96 overflow-y-auto scrollbar-custom">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#74C6C6]/10 
                          hover:bg-opacity-10 transition-colors duration-200 ${
                          selectedCountry.code === country.code
                            ? "bg-[#74C6C6]/10 bg-opacity-20 text-[#4E6FA7] font-semibold"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <CountryFlagIcon
                            countryCode={country.code}
                            customIcon={country.customIcon}
                            size="1.8em"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="text-sm font-medium block">
                            {country.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getPriceConfiguration(country.code).currencySymbol}
                          </span>
                        </div>
                        {selectedCountry.code === country.code && (
                          <div className="w-2 h-2 rounded-full bg-[#4E6FA7] animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Icône panier */}
            <Link
              to="/panier"
              className="relative text-[#BE356A] hover:text-[#4E6FA7] transition-colors duration-300"
            >
              <ShoppingCart size={24} strokeWidth={2.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold 
                rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Icône utilisateur */}
            <Link
              to="/auth/login"
              className="text-[#BE356A] hover:text-[#4E6FA7] transition-colors duration-300"
            >
              <CircleUser size={24} strokeWidth={2.5} />
            </Link>

            {/* Élément décoratif */}
            <div className="h-8 w-1 bg-gradient-to-b from-[#BE356A] to-[#DCCC41] rounded-full opacity-70"></div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#DCCC41] hover:text-[#BE356A] transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white dark:bg-gray-900 rounded-lg shadow-xl border
           border-gray-100 dark:border-gray-800 mx-4 animate-slide-down">
            <nav className="flex flex-col space-y-2 p-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center px-4 py-3 rounded-lg font-waffle-soft text-[#BE356A]
                   dark:text-gray-100 hover:bg-[#74C6C6]/10 hover:bg-opacity-10 hover:text-[#4E6FA7] dark:hover:text-[#74C6C6] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Sélecteur de pays mobile */}
              <div className="px-2 py-3">
                <div className="flex items-center justify-between px-3 py-2 bg-gray-50
                 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <Globe size={18} className="text-[#4E6FA7]" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Pays:
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCountryMenuOpen(!isCountryMenuOpen)}
                    className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-200
                     dark:hover:bg-gray-700 transition-colors"
                  >
                    <CountryFlagIcon
                      countryCode={selectedCountry.code}
                      customIcon={selectedCountry.customIcon}
                      size="1.3em"
                    />
                    <span className="text-sm font-medium text-[#4E6FA7]">
                      {selectedCountry.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-[#4E6FA7] transition-transform duration-300 ${
                        isCountryMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Liste des pays mobile */}
                {isCountryMenuOpen && (
                  <div className="mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg border
                   border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto scrollbar-custom">
                    <div className="p-2 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-xs text-gray-500 dark:text-gray-400 px-1">
                        Sélectionnez votre pays
                      </p>
                    </div>
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => {
                          handleCountrySelect(country);
                        }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-[#74C6C6]/10 hover:bg-opacity-10 transition-colors duration-200 ${
                          selectedCountry.code === country.code
                            ? "bg-[#74C6C6]/10 bg-opacity-20 text-[#4E6FA7] font-semibold"
                            : "text-gray-700 dark:text-gray-200"
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <CountryFlagIcon
                            countryCode={country.code}
                            customIcon={country.customIcon}
                            size="1.5em"
                          />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="text-sm font-medium block">
                            {country.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {getPriceConfiguration(country.code).currencySymbol}
                          </span>
                        </div>
                        {selectedCountry.code === country.code && (
                          <div className="w-2 h-2 rounded-full bg-[#4E6FA7] animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions mobiles */}
              <div className="flex items-center justify-around pt-3 mt-3 border-t border-gray-200 dark:border-gray-700">
                {/* Panier mobile avec badge */}
                <Link
                  to="/panier"
                  className="flex flex-col items-center p-2 text-[#4E6FA7] hover:text-[#D68E54] transition-colors duration-300 relative"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="relative">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-xs mt-1 font-semibold">
                    Panier {cartCount > 0 && `(${cartCount})`}
                  </span>
                </Link>

                {/* Connexion mobile */}
                <Link
                  to="/auth/login"
                  className="flex flex-col items-center p-2 text-[#4E6FA7] hover:text-[#D68E54] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CircleUser size={24} />
                  <span className="text-xs mt-1 font-semibold">Connexion</span>
                </Link>
              </div>
            </nav>

            {/* Élément décoratif */}
            <div className="h-1 mx-4 bg-gradient-to-r from-[#DCCC41] via-[#74C6C6] to-[#BE356A] rounded-full mt-4"></div>
          </div>
        )}
      </div>
    </header>
  );
}

// Hook personnalisé pour utiliser la configuration du pays dans d'autres composants
export const useCountryConfiguration = () => {
  const [configuration, setConfiguration] = useState(() => {
    const saved = localStorage.getItem("countryConfiguration");
    if (saved) {
      return JSON.parse(saved);
    }
    return getPriceConfiguration("CI");
  });

  useEffect(() => {
    const handleCountryChange = (event: CustomEvent) => {
      setConfiguration({
        country: event.detail.country,
        countryName: event.detail.countryName,
        currency: event.detail.currency,
        currencySymbol: event.detail.currencySymbol,
        ...event.detail.priceConfig,
        ...event.detail.shippingConfig,
      });
    };

    window.addEventListener(
      "countryChanged",
      handleCountryChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "countryChanged",
        handleCountryChange as EventListener
      );
    };
  }, []);

  return configuration;
};

export default Header;
