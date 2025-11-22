import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Phone, Lock } from "lucide-react";

import TopeciLogo from "../../assets/images/logotopeci.png";
import { useState } from "react";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [step, setStep] = useState(1); // 1: Saisie email/tel, 2: Code de vérification
  const [loginMethod, setLoginMethod] = useState("email"); // "email" ou "phone"
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    verificationCode: "",
    acceptTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      // Envoyer le code de vérification
      console.log(
        "Envoi du code à:",
        loginMethod === "email" ? formData.email : formData.phone
      );
      setStep(2);
    } else {
      // Vérifier le code et connecter l'utilisateur
      console.log("Vérification du code:", formData.verificationCode);
      // Logique de connexion ici
    }
  };

  const switchToEmail = () => {
    setLoginMethod("email");
    setFormData((prev) => ({ ...prev, phone: "" }));
  };

  const switchToPhone = () => {
    setLoginMethod("phone");
    setFormData((prev) => ({ ...prev, email: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9f9] to-[#eaeaea] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-sm md:max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        {/* En-tête */}
        <a
          href="/"
          className="flex items-center justify-center mt-5 hover:opacity-80 transition-opacity duration-300"
        >
          <img
            src={TopeciLogo}
            alt="Logo topeci"
            className="h-10 w-auto md:h-12"
          />
        </a>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-glacial-indifference">
              {step === 1 ? "Se Connecter" : "Code de Vérification"}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2 font-glacial-indifference">
              {step === 1
                ? "Saisissez votre adresse e-mail ou numéro de téléphone pour recevoir un code de vérification"
                : "Entrez le code de vérification envoyé à votre " +
                  (loginMethod === "email" ? "e-mail" : "téléphone")}
            </p>
          </div>

          {step === 1 ? (
            <>
              {/* Sélection de la méthode de connexion */}
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={switchToEmail}
                  className={`flex-1 py-2 text-center font-medium ${
                    loginMethod === `email`
                      ? `text-[#4E6FA7] border-b-2 border-[#4E6FA7]`
                      : `text-gray-500 dark:text-gray-400`
                  }`}
                >
                  E-mail
                </button>
                <button
                  type="button"
                  onClick={switchToPhone}
                  className={`flex-1 py-2 text-center font-medium ${
                    loginMethod === `phone`
                      ? `text-[#4E6FA7] border-b-2 border-[#4E6FA7]`
                      : `text-gray-500 dark:text-gray-400`
                  }`}
                >
                  Téléphone
                </button>
              </div>

              {/* Champ email ou téléphone */}
              <div>
                <label
                  htmlFor={loginMethod}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 font-glacial-indifference"
                >
                  {loginMethod === "email"
                    ? "Adresse e-mail"
                    : "Numéro de téléphone"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {loginMethod === "email" ? (
                      <Mail size={18} className="text-gray-400" />
                    ) : (
                      <Phone size={18} className="text-gray-400" />
                    )}
                  </div>
                  <input
                    id={loginMethod}
                    name={loginMethod}
                    type={loginMethod === "email" ? "email" : "tel"}
                    required
                    value={
                      loginMethod === "email" ? formData.email : formData.phone
                    }
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4E6FA7] focus:border-[#4E6FA7] outline-none transition font-glacial-indifference bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder={
                      loginMethod === "email"
                        ? "Adresse e-mail"
                        : "Numéro de téléphone"
                    }
                  />
                </div>
              </div>

              {/* Checkbox conditions d'utilisation */}
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    required
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#4E6FA7] border-gray-300 rounded focus:ring-[#74C6C6]"
                  />
                </div>
                <label
                  htmlFor="acceptTerms"
                  className="ml-3 block text-sm text-gray-700 dark:text-gray-300 font-glacial-indifference"
                >
                  J'accepte les{" "}
                  <Link
                    to="/legal/cgu"
                    className="text-[#4E6FA7] hover:text-[#74C6C6]"
                  >
                    Conditions d'utilisation
                  </Link>{" "}
                  et la{" "}
                  <Link
                    to="/legal/privacy"
                    className="text-[#4E6FA7] hover:text-[#74C6C6]"
                  >
                    politique de confidentialité
                  </Link>
                </label>
              </div>
            </>
          ) : (
            /* Étape 2: Code de vérification */
            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 font-glacial-indifference"
              >
                Code de vérification
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-[#4E6FA7] focus:border-[#4E6FA7] outline-none transition font-glacial-indifference bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Saisissez le code reçu"
                  maxLength={6}
                />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-glacial-indifference">
                Vous n'avez pas reçu le code?{" "}
                <button
                  type="button"
                  className="text-[#4E6FA7] hover:text-[#74C6C6]"
                  onClick={() => console.log("Renvoyer le code")}
                >
                  Renvoyer
                </button>
              </p>
            </div>
          )}

          {/* Bouton de soumission */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r bg-[#BE356A] text-white py-3 px-4 rounded-lg font-semibold transition shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 font-glacial-indifference"
          >
            {step === 1 ? "Continuer" : "Soumettre"}
          </button>

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-[#4E6FA7] py-2 px-4 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition font-glacial-indifference"
            >
              ← Retour
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
