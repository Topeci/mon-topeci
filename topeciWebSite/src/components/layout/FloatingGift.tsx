/**
 * Composant FloatingGift : Bouton cadeau flottant avec formulaire d'email pour obtenir un code de réduction.
 * un champ email/ numéro de Téléphone et un bouton "Je reçois mon code"
 * l'indicatif pays pour le numéro de téléphone doit être par défaut +225 (Côte d'Ivoire)
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X, ChevronDown } from "lucide-react";
import ReactCountryFlag from "react-country-flag";

// Liste des indicatifs pays les plus courants
const countryCodes = [
  { code: "CI", name: "Côte d'Ivoire", dialCode: "+225", flag: "CI" },
  { code: "FR", name: "France", dialCode: "+33", flag: "FR" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "CA" },
  { code: "US", name: "USA", dialCode: "+1", flag: "US" },
  { code: "CH", name: "Suisse", dialCode: "+41", flag: "CH" },
  { code: "BE", name: "Belgique", dialCode: "+32", flag: "BE" },
  { code: "GB", name: "Royaume-Uni", dialCode: "+44", flag: "GB" },
  { code: "IT", name: "Italie", dialCode: "+39", flag: "IT" },
  { code: "ES", name: "Espagne", dialCode: "+34", flag: "ES" },
  { code: "DE", name: "Allemagne", dialCode: "+49", flag: "DE" },
  { code: "NL", name: "Pays-Bas", dialCode: "+31", flag: "NL" },
  { code: "LU", name: "Luxembourg", dialCode: "+352", flag: "LU" },
  { code: "SN", name: "Sénégal", dialCode: "+221", flag: "SN" },
  { code: "ML", name: "Mali", dialCode: "+223", flag: "ML" },
  { code: "BF", name: "Burkina Faso", dialCode: "+226", flag: "BF" },
  { code: "BJ", name: "Bénin", dialCode: "+229", flag: "BJ" },
  { code: "TG", name: "Togo", dialCode: "+228", flag: "TG" },
  { code: "GH", name: "Ghana", dialCode: "+233", flag: "GH" },
];

const FloatingGift = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // Côte d'Ivoire par défaut
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Afficher le bouton cadeau après un délai
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation : au moins un des deux champs doit être rempli
    if (!email && !phoneNumber) {
      alert("Veuillez remplir au moins un champ (email ou téléphone)");
      return;
    }

    // Si le téléphone est rempli, valider qu'il a au moins 8 chiffres
    if (phoneNumber && phoneNumber.replace(/\D/g, "").length < 8) {
      alert(
        "Veuillez entrer un numéro de téléphone valide (au moins 8 chiffres)"
      );
      return;
    }

    // Si l'email est rempli, validation basique
    if (email && !email.includes("@")) {
      alert("Veuillez entrer une adresse email valide");
      return;
    }

    // Formater le numéro complet avec l'indicatif si le téléphone est fourni
    const fullPhoneNumber = phoneNumber
      ? `${selectedCountry.dialCode}${phoneNumber}`
      : null;

    // Ici vous pouvez ajouter la logique pour envoyer les données à votre API
    console.log("Données soumises:", {
      email: email || null,
      phone: fullPhoneNumber,
      country: selectedCountry.name,
    });

    setIsSubmitted(true);

    // Rediriger vers la boutique après un délai
    setTimeout(() => {
      // Vous pouvez rediriger vers la boutique ici
      // window.location.href = "/boutique";
      setShowForm(false);
      setIsSubmitted(false);
      setEmail("");
      setPhoneNumber("");
    }, 3000);
  };

  const handleClose = () => {
    setShowForm(false);
    setIsSubmitted(false);
    setEmail("");
    setPhoneNumber("");
    setShowCountryDropdown(false);
  };

  const handleCountrySelect = (country: (typeof countryCodes)[0]) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Bouton cadeau flottant */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowForm(true)}
        className="fixed left-6 bottom-6 z-40 bg-[#BE356A] text-white p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm hover:shadow-3xl transition-all duration-300"
        style={{ zIndex: 9999 }}
        aria-label="Obtenir un code de réduction"
      >
        <Gift size={24} />
      </motion.button>

      {/* Overlay et formulaire */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Overlay flouté */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              style={{ zIndex: 10000 }}
            />

            {/* Formulaire centré */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[400px]"
              style={{ zIndex: 10001 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* En-tête */}
                <div className="bg-[#b7cc43] p-6 text-center relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={20} />
                  </motion.button>

                  <h3 className="text-2xl font-bold text-white font-waffle-soft">
                    {isSubmitted ? "Code envoyé ! 🎉" : "10 % de réduction 🧡"}
                  </h3>
                  <p className="text-white/90 mt-1 font-glacial-indifference text-sm">
                    {isSubmitted
                      ? "Vérifiez votre boîte mail ou SMS"
                      : "sur votre première commande"}
                  </p>
                </div>

                {/* Contenu du formulaire */}
                <div className="p-6">
                  {!isSubmitted ? (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Champ Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-1 font-glacial-indifference"
                        >
                          Email (optionnel)
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre@email.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D68E54] focus:border-transparent transition-all duration-200 font-glacial-indifference"
                        />
                      </div>

                      {/* Séparateur OU */}
                      {(email || phoneNumber) && (
                        <div className="relative flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative bg-white px-3">
                            <span className="text-sm text-gray-500 font-glacial-indifference">
                              OU
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Champ Téléphone avec indicatif */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-1 font-glacial-indifference"
                        >
                          Numéro de téléphone (optionnel)
                        </label>
                        <div className="flex gap-2">
                          {/* Sélecteur d'indicatif */}
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setShowCountryDropdown(!showCountryDropdown)
                              }
                              className="flex items-center gap-2 px-3 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <ReactCountryFlag
                                countryCode={selectedCountry.flag}
                                svg
                                style={{
                                  width: "1.5em",
                                  height: "1.5em",
                                  borderRadius: "2px",
                                }}
                              />
                              <span className="text-sm font-medium font-glacial-indifference">
                                {selectedCountry.dialCode}
                              </span>
                              <ChevronDown
                                size={16}
                                className={`transition-transform ${
                                  showCountryDropdown ? "rotate-180" : ""
                                }`}
                              />
                            </button>

                            {/* Dropdown des pays */}
                            {showCountryDropdown && (
                              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                                {countryCodes.map((country) => (
                                  <button
                                    key={country.code}
                                    type="button"
                                    onClick={() => handleCountrySelect(country)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${
                                      selectedCountry.code === country.code
                                        ? "bg-[#74C6C6] bg-opacity-10"
                                        : ""
                                    }`}
                                  >
                                    <ReactCountryFlag
                                      countryCode={country.flag}
                                      svg
                                      style={{
                                        width: "1.5em",
                                        height: "1.5em",
                                        borderRadius: "2px",
                                      }}
                                    />
                                    <div className="flex-1">
                                      <div className="text-sm font-medium font-glacial-indifference">
                                        {country.name}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {country.dialCode}
                                      </div>
                                    </div>
                                    {selectedCountry.code === country.code && (
                                      <div className="w-2 h-2 rounded-full bg-[#4E6FA7]"></div>
                                    )}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Champ numéro */}
                          <input
                            type="tel"
                            id="phone"
                            value={phoneNumber}
                            onChange={(e) => {
                              // Ne garder que les chiffres
                              const value = e.target.value.replace(/\D/g, "");
                              setPhoneNumber(value);
                            }}
                            placeholder="XX XX XX XX XX"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D68E54] focus:border-transparent transition-all duration-200 font-glacial-indifference"
                          />
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-[#BE356A] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl font-waffle-soft hover:bg-[#a02e5a]"
                      >
                        Je reçois mon code
                      </motion.button>

                      <p className="text-xs text-gray-500 text-center font-glacial-indifference">
                        Remplissez au moins un champ. En cliquant ci-dessus,
                        vous acceptez de recevoir des messages électroniques ou
                        SMS de notre part. Vous pourrez vous désinscrire à tout
                        moment.
                      </p>
                    </motion.form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-4"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl mb-4"
                      >
                        🎁
                      </motion.div>
                      <p className="text-green-600 font-semibold font-glacial-indifference">
                        Votre code de réduction a été envoyé !
                      </p>
                      {email && (
                        <p className="text-gray-600 text-sm mt-2 font-glacial-indifference">
                          Email : {email}
                        </p>
                      )}
                      {phoneNumber && (
                        <p className="text-gray-600 text-sm font-glacial-indifference">
                          Téléphone : {selectedCountry.dialCode}
                          {phoneNumber}
                        </p>
                      )}
                      <p className="text-gray-600 text-sm mt-3 font-glacial-indifference">
                        Redirection vers la boutique...
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingGift;
