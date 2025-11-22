import { createFileRoute } from "@tanstack/react-router";
import imgContact from "../../assets/images/imgContact.png";
import React from "react";

void React;
export const Route = createFileRoute("/_home/contact")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex-grow w-full bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center text-center px-3">
          <img
            src={imgContact}
            alt="Jouet Fière"
            className="mb-4 h-20 w-auto sm:h-32 md:h-40 lg:h-48 object-contain"
          />
        </div>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 .font-glacial-indifference text-lg mt-[-36px]">
          Une question ? Un besoin ? Notre équipe MON-TOPECI vous répond du
          lundi au vendredi, de 8 h à 18 h (UTC+0).
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Infos de contact */}
          <div className="space-y-8">
            <div className="flex items-start gap-5 p-6 rounded-xl bg-[#F8FAFC] border border-gray-100 shadow-sm">
              <div className="text-blue flex-shrink-0 mt-1">
                <span className="flex w-12 h-12 bg-[#74C6C6] bg-opacity-20 rounded-full items-center justify-center text-xl">
                  📍
                </span>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-[#4E6FA7]">
                  Localisation
                </h4>
                <p className="text-gray-600 font-['Glacial_Indifference']">
                  MON-TOPECI
                  <br />
                  Abidjan – Cocody (face Palm Club),
                  <br />
                  à 200 m du Lycée Technique
                  <br />
                  BP 1532 Abidjan, Côte d'Ivoire
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 rounded-xl bg-[#F8FAFC] border border-gray-100 shadow-sm">
              <div className="text-green flex-shrink-0 mt-1">
                <span className="flex w-12 h-12 bg-[#D68E54] bg-opacity-20 rounded-full items-center justify-center text-xl">
                  ✉️
                </span>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-[#4E6FA7]">
                  E-mail
                </h4>
                <p className="text-gray-600 mb-2 font-['Glacial_Indifference']">
                  contact@mon-topeci.com
                </p>
                <a
                  href="mailto:contact@mon-topeci.com"
                  className="inline-block mt-3 px-5 py-2 bg-[#74C6C6] hover:bg-[#5cb4b4] text-white text-sm rounded-full transition-colors font-medium"
                >
                  Envoyer un email
                </a>
              </div>
            </div>

            <div className="flex items-start gap-5 p-6 rounded-xl bg-[#F8FAFC] border border-gray-100 shadow-sm">
              <div className="text-green-600 flex-shrink-0 mt-1">
                <span className="flex w-12 h-12 bg-[#BE356A] bg-opacity-20 rounded-full items-center justify-center text-xl">
                  📞
                </span>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-[#4E6FA7]">
                  Téléphone / WhatsApp
                </h4>
                <p className="text-gray-600 mb-2 font-['Glacial_Indifference']">
                  +225 07 48 316 544
                </p>
                <a
                  href="https://wa.me/2250748316544"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-5 py-2 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full transition-colors font-medium"
                >
                  💬 Écrire sur WhatsApp
                </a>
              </div>
            </div>

            <div className="mt-10 p-6 rounded-xl bg-[#F8FAFC] border border-gray-100 shadow-sm">
              <h4 className="font-bold text-lg mb-4 text-[#4E6FA7]">
                Suivez-nous
              </h4>
              <div className="flex items-center gap-5">
                <a
                  href="#"
                  className="text-blue-600 text-2xl hover:scale-110 transition-transform"
                  aria-label="Facebook"
                >
                  📘
                </a>
                <a
                  href="#"
                  className="text-pink-600 text-2xl hover:scale-110 transition-transform"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="#"
                  className="text-black text-2xl hover:scale-110 transition-transform"
                  aria-label="X"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="text-black text-2xl hover:scale-110 transition-transform"
                  aria-label="TikTok"
                >
                  🎵
                </a>
                <a
                  href="#"
                  className="text-red-600 text-2xl hover:scale-110 transition-transform"
                  aria-label="YouTube"
                >
                  ▶️
                </a>
              </div>
            </div>
          </div>

          {/* Formulaire (mailto) */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold mb-2 text-[#4E6FA7] font-['Waffle_soft']">
              Envoyez-nous un message
            </h2>
            <p className="text-gray-600 mb-6 font-['Glacial_Indifference']">
              Ce formulaire ouvre votre client e-mail pour l'envoi. Pour un
              traitement automatisé, on pourra brancher une route API plus tard.
            </p>

            <form
              className="space-y-5"
              action="mailto:contact@mon-topeci.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="grid gap-2">
                  <label htmlFor="nom" className="font-medium text-[#4E6FA7]">
                    Nom
                  </label>
                  <input
                    id="nom"
                    name="Nom"
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>

                <div className="grid gap-2">
                  <label htmlFor="email" className="font-medium text-[#4E6FA7]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="Email"
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent"
                    placeholder="exemple@domaine.com"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label htmlFor="sujet" className="font-medium text-[#4E6FA7]">
                  Sujet
                </label>
                <input
                  id="sujet"
                  name="Sujet"
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent"
                  placeholder="Objet de votre demande"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="message" className="font-medium text-[#4E6FA7]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="Message"
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-[#74C6C6] focus:border-transparent"
                  placeholder="Décrivez votre besoin (livres, commandes, partenariats, délais, budget estimé, etc.)"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#74C6C6] hover:bg-[#5cb4b4] text-white font-medium rounded-full transition-colors shadow-md"
                  title="Ouvrira votre client e-mail"
                >
                  Envoyer le message
                </button>

                <a
                  href="mailto:contact@mon-topeci.com"
                  className="text-sm text-[#74C6C6] hover:underline font-['Glacial_Indifference']"
                >
                  Ou écrivez-nous directement
                </a>
              </div>
            </form>
          </div>
        </div>

        {/* Carte */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-6 text-center text-[#4E6FA7] font-['Waffle_soft']">
            Notre localisation
          </h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3973.8532328897017!2d-4.012354284650065!3d5.353760496102847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ec73a70e6dbd%3A0x28b870c2a6efeb63!2sLyc%C3%A9e%20Technique%20d%E2%80%99Abidjan!5e0!3m2!1sfr!2sci!4v1657314901324!5m2!1sfr!2sci"
              width="100%"
              height="400"
              className="border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localisation de MON-TOPECI"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
