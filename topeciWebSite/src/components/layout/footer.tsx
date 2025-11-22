/**
 * Footer avec inscription à la newsletter
 */

import React, { useState } from "react";
import { Facebook, Linkedin, Instagram, Music2 } from "lucide-react";
import TopeciLogo from "../../assets/images/logotopeci.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // 'success', 'error', ou ''
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setStatus("error");
      setMessage("Veuillez entrer une adresse email valide");
      return;
    }

    setIsSubmitting(true);
    setStatus("");
    setMessage("");

    try {
      // TODO: Remplacer par votre endpoint d'API
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Merci ! Votre inscription a été prise en compte.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#74C6C6] text-black w-full mx-0 mt-auto mb-0 dark:bg-[#2a2a2a] dark:text-white">
      <div className="w-full py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {/* Colonne 1 : LA MARQUE */}
          <div>
            <h3 className="font-waffle-soft text-base font-bold mb-1 text-[#BE356A] dark:text-[#FFD700]">
              LA MARQUE
            </h3>
            <ul className="space-y-2 font-glacial-indifference">
              <li>
                <a
                  href="/about"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="/boutique"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  Boutique
                </a>
              </li>
              <li>
                <a
                  href="/espace-rev"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  Partenaires & Distributeurs
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 2 : Besoin d'aide ? */}
          <div>
            <h3 className="font-waffle-soft text-base font-bold mb-1 text-[#BE356A] dark:text-[#BE356A]">
              BESOIN D'AIDE ?
            </h3>

            <ul className="space-y-2 font-glacial-indifference">
              <li>
                <a
                  href="/legal/faq"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-gray-200 dark:hover:text-orange-300"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-gray-200 dark:hover:text-orange-300"
                >
                  Nous contacter
                </a>
              </li>
              <li>
                <a
                  href="/legal/livraison"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-gray-200 dark:hover:text-orange-300"
                >
                  Politique de livraison
                </a>
              </li>

              <li>
                <a
                  href="/legal/remboursement"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-gray-200 dark:hover:text-orange-300"
                >
                  Politique remboursement & retour
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Légal */}
          <div>
            <h3 className="font-waffle-soft text-base font-bold mb-1 text-[#BE356A] dark:text-[#BE356A]">
              LEGAL
            </h3>
            <ul className="space-y-2 font-glacial-indifference">
              <li>
                <a
                  href="/legal/cgv"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  CGV
                </a>
              </li>
              <li>
                <a
                  href="/legal/cgu"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  CGU
                </a>
              </li>
              <li>
                <a
                  href="/legal/cookies"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  Politique cookies
                </a>
              </li>
              <li>
                <a
                  href="/legal/mentions-legales"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  Mentions légales
                </a>
              </li>

              <li>
                <a
                  href="/legal/privacy"
                  className="hover:text-[#D68E54] transition-colors text-base dark:text-pink-400 dark:hover:text-orange-300"
                >
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : contact et newsletter */}
          <div>
            <h3 className="font-waffle-soft text-base font-bold mb-1 text-[#BE356A] dark:text-[#BE356A]">
              CONTACT
            </h3>
            <ul className="text-white space-y-2 font-glacial-indifference mb-4 dark:text-gray-200">
              <li className="text-base">SAV & autres questions ?</li>
              <li className="text-base">Email : contact@mon-topeci.com</li>
              <li className="text-base">Du lundi au vendredi de 8h à 18h</li>
            </ul>

            {/* Newsletter */}
            <div className="mb-4">
              <h4 className="font-waffle-soft text-sm font-semibold mb-2 text-white dark:text-gray-200">
                Inscrivez-vous à notre newsletter
              </h4>
              <form onSubmit={handleNewsletterSubmit}>
                <div className="flex items-center gap-2 flex-wrap">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                    className="font-glacial-indifference text-gray-700 px-3 py-2 bg-white rounded focus:outline-none focus:ring-2 focus:ring-[#BE356A] text-sm max-w-[250px] dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#BE356A] text-white font-semibold px-4 py-2 rounded hover:bg-[#9e2b58] transition duration-300 text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed dark:bg-[#BE356A] dark:hover:bg-[#9e2b58]"
                  >
                    {isSubmitting ? "En cours..." : "S'inscrire"}
                  </button>
                </div>
              </form>

              {/* Messages de feedback */}
              {message && (
                <p
                  className={`mt-2 text-sm font-glacial-indifference ${
                    status === "success"
                      ? "text-green-700 dark:text-green-400"
                      : "text-red-700 dark:text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>

            {/* Réseaux sociaux */}
            <div className="flex space-x-3 mb-[-15px]">
              <a
                href="https://www.facebook.com/share/1Nv84yCbEV/?mibextid=wwXIfr"
                className="text-[#BE356A] bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.linkedin.com/company/topeci/"
                className="text-[#BE356A] bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://www.instagram.com/topeci__?igsh=MTd5ZjljOGF2Z3JxMw=="
                className="text-[#BE356A] bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/share/1Nv84yCbEV/?mibextid=wwXIfr"
                className="text-[#BE356A] bg-opacity-20 p-2 rounded-full hover:bg-opacity-30 transition flex items-center justify-center dark:bg-gray-700 dark:hover:bg-gray-600"
                aria-label="TikTok"
              >
                <Music2 size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-black border-opacity-20 py-4 w-full dark:border-gray-600">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4">
          {/* Logo et slogan à gauche */}
          <div className="flex items-center mb-3 sm:mb-0">
            <a
              href="/"
              className="flex items-center hover:opacity-80 transition-opacity duration-300"
            >
              <img
                src={TopeciLogo}
                alt="Logo topeci"
                className="h-8 w-auto mr-3"
              />
              <p className="font-indie-flower text-sm text-black dark:text-gray-200">
                Un jeu, une culture, un monde à découvrir
              </p>
            </a>
          </div>

          {/* Copyright à droite */}
          <p className="font-glacial-indifference text-xs text-black dark:text-gray-400">
            &copy; {new Date().getFullYear()} TOPECI. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
