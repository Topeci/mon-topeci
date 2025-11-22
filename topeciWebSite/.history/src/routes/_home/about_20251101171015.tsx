/**
 * Page À propos de TOPECI
 * Composant avec animations fluides et design créatif
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imgAbout from "../../assets/images/imgAbout.png";
import imgChildFondateur from "../../assets/images/imgChildFondateur.jpg";
import imgOlduser from "../../assets/images/imgOlduser.jpg";
import imgTwoAsso from "../../assets/images/imgTwoAsso.jpg";
import imgFondateur from "../../assets/images/imgFondateur.jpg";
import imgSchema from "../../assets/images/imgSchema.jpg";
import imgValeur from "../../assets/images/imgValeur.png";

export const Route = createFileRoute("/_home/about")({
  component: RouteComponent,
});

// Animations réutilisables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const floatingAnimation = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

function RouteComponent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showAudioButton, setShowAudioButton] = useState(true);
  const speechSynth = useRef<SpeechSynthesisUtterance | null>(null);
  const isSpeechSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;

  // Texte complet de la page à lire
  const pageText = `
    Notre histoire. TOPECI est né d'un rêve partagé : celui de transmettre, à travers les jouets, la beauté et la richesse des cultures africaines. 
    Nous avons grandi entourés d'histoire, de chants, de proverbes, de repas et de traditions qui façonnent qui nous sommes.
    
    Avec le temps, installés à l'étranger, nous avons réalisé combien ces trésors de notre enfance disparaissent peu à peu, 
    emportés par la modernité, la mondialisation et le manque de transmission.
    
    Cette prise de conscience s'est transformée en mission. Nous voulions créer un pont : entre les générations, entre les villages et les villes, 
    entre le continent africain et la diaspora, entre les enfants et leurs racines.
    
    TOPECI est né de cette envie profonde, celle de redonner vie à nos langues, à nos symboles, à nos héros et à nos valeurs, 
    à travers le jeu, le divertissement et l'apprentissage.
    
    Notre premier livre audio a marqué le début de cette belle aventure. En voyant nos ouvrages dans les mains des enfants — 
    les entendre écouter, répéter, s'émerveiller — leurs sourires ont confirmé que nous étions sur la bonne voie.
    
    Depuis, notre mission résonne encore plus fort dans nos cœurs : éduquer, divertir et inspirer. Pour nous, TOPECI est bien plus qu'une marque. 
    C'est une promesse — celle de célébrer notre identité, de la partager avec fierté et de la transmettre, un jeu à la fois.
    
    Notre vision: Un monde où la diversité culturelle et linguistique est célébrée et transmise de manière innovante et inclusive, 
    tant à l'échelle nationale qu'internationale.
    
    Notre mission: Promouvoir et préserver les langues et cultures locales africaines, notamment en Côte d'Ivoire, 
    à travers des outils éducatifs innovants. TOPECI vise à reconnecter les jeunes générations à leur patrimoine culturel 
    et linguistique tout en les ouvrant au monde.
  `;

  const toggleSpeech = () => {
    if (!isSpeechSupported) return;

    if (isPlaying) {
      // Arrêter la lecture
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      // Démarrer la lecture
      speechSynth.current = new SpeechSynthesisUtterance(pageText);
      speechSynth.current.lang = "fr-FR";
      speechSynth.current.rate = 0.9;
      speechSynth.current.pitch = 1;
      speechSynth.current.volume = 1;

      speechSynth.current.onstart = () => {
        setIsPlaying(true);
        setShowAudioButton(false);
      };

      speechSynth.current.onend = () => {
        setIsPlaying(false);
        setTimeout(() => setShowAudioButton(true), 1000);
      };

      speechSynth.current.onerror = () => {
        setIsPlaying(false);
        setShowAudioButton(true);
      };

      window.speechSynthesis.speak(speechSynth.current);
    }
  };

  // Nettoyer la synthèse vocale quand le composant est démonté
  useEffect(() => {
    return () => {
      if (isSpeechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Bouton audio flottant créatif */}
      <AnimatePresence>
        {isSpeechSupported && showAudioButton && (
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <motion.button
              variants={floatingAnimation}
              animate="animate"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleSpeech}
              className="group relative"
            >
              {/* Effet de halo */}
              <div className="absolute inset-0 bg-[#DCCC41] rounded-full blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

              {/* Bouton principal */}
              <div className="relative bg-gradient-to-br from-[#DCCC41] to-[#D68E54] text-white p-4 rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                <svg
                  className="w-8 h-8 transform group-hover:scale-110 transition-transform duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                    clipRule="evenodd"
                  />
                </svg>

                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                    Écouter la page
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900 dark:border-l-white"></div>
                  </div>
                </div>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Indicateur de lecture en cours */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-2xl backdrop-blur-sm border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                      className="w-2 h-2 bg-[#DCCC41] rounded-full"
                    />
                  ))}
                </div>
                <span className="font-medium text-sm">Lecture en cours...</span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleSpeech}
                  className="ml-2 p-1 hover:bg-white/10 dark:hover:bg-gray-900/10 rounded-full transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conteneur principal avec marges latérales */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête avec image */}
        <motion.section
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-16 md:py-24 bg-cover bg-center min-h-[350px] md:min-h-[450px] mb-12 mt-5  overflow-hidden "
          style={{ backgroundImage: `url(${imgAbout})` }}
        >
          {/* Overlay avec titre */}
          <div className="absolute inset-0 bg-black/20 flex items-end pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="container mx-auto px-4 text-center"
            ></motion.div>
          </div>
        </motion.section>

        {/* Section NOTRE HISTOIRE */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 gap-12 mb-16 items-center"
        >
          {/* Texte principal */}
          <motion.div
            variants={fadeInUp}
            className="space-y-6 text-black dark:text-white leading-relaxed"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-block-bold">
              Notre histoire
            </h2>
            <p className="text-xl md:text-2xl font-glacial-indifference">
              TOPECI est né d'un rêve partagé : <br />
              celui de transmettre, à travers les jouets, la beauté et la
              richesse des cultures africaines. Nous avons grandi entourés
              d'histoire, de chants, de proverbes, de repas et de traditions qui
              façonnent qui nous sommes.
            </p>
          </motion.div>

          {/* Image enfant fondateur */}
          <motion.div
            variants={scaleIn}
            className="flex justify-center md:justify-end"
          >
            <img
              src={imgChildFondateur}
              alt="Enfants avec des jouets"
              className="w-full max-w-[500px] h-[400px] object-cover "
            />
          </motion.div>
        </motion.div>

        {/* Texte continuation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xl md:text-2xl font-glacial-indifference text-black dark:text-white max-w-5xl mt-[-55px] leading-relaxed">
            Avec le temps, installés à l'étranger, nous avons réalisé combien
            ces trésors de notre enfance disparaissent peu à peu, emportés par
            la modernité, la mondialisation et le manque de transmission.
          </p>
        </motion.div>

        {/* Section 2 - Image à gauche, texte à droite */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 gap-12 mb-16 items-center"
        >
          {/* Image ancien utilisateur */}
          <motion.div
            variants={fadeInUp}
            className="flex justify-center md:justify-start order-1 md:order-1"
          >
            <img
              src={imgOlduser}
              alt="Famille heureuse"
              className="w-full max-w-[500px] h-[400px] object-cover"
            />
          </motion.div>

          {/* Texte 2 */}
          <motion.div
            variants={fadeInUp}
            className="font-glacial-indifference text-xl md:text-2xl text-black dark:text-white order-2 md:order-2 space-y-6 leading-relaxed"
          >
            <p>
              Cette prise de conscience s'est transformée en mission. Nous
              voulions créer un pont : entre les générations, entre les villages
              et les villes, entre le continent africain et la diaspora, entre
              les enfants et leurs racines.
            </p>
          </motion.div>
        </motion.div>

        {/* Section 3 - Texte à gauche, image à droite */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 gap-12 mb-16 items-center"
        >
          {/* Texte 3 */}
          <motion.div
            variants={fadeInUp}
            className="leading-relaxed font-glacial-indifference text-xl md:text-2xl text-black dark:text-white space-y-6"
          >
            <p>
              TOPECI est né de cette envie profonde, celle de redonner vie à nos
              langues, à nos symboles, à nos héros et à nos valeurs, à travers
              le jeu, le divertissement et l'apprentissage.
            </p>

            <p>
              <span className="italic">Mon premier livre audio</span>  a marqué le début de cette belle
              aventure. En voyant nos ouvrages dans les mains des enfants — les
              entendre écouter, répéter, s'émerveiller — leurs sourires ont
              confirmé que nous étions sur la bonne voie.
            </p>
          </motion.div>

          {/* Image deux associations */}
          <motion.div
            variants={scaleIn}
            className="flex justify-center md:justify-end"
          >
            <img
              src={imgTwoAsso}
              alt="Enfant souriant"
              className="w-full max-w-[500px] h-[550px] object-cover "
            />
          </motion.div>
        </motion.div>

        {/* Texte mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-16 max-w-5xl"
        >
          <p className="text-xl md:text-2xl font-glacial-indifference text-black dark:text-white  leading-relaxed">
            Depuis, notre mission résonne encore plus fort dans nos cœurs :
            éduquer, divertir et inspirer. Pour nous, TOPECI est bien plus
            qu'une marque.{" "}
            <span className="font-bold text-[#D68E54] dark:text-[#DCCC41]">
              C'est une promesse — celle de célébrer notre identité, de la
              partager avec fierté et de la transmettre, un jeu à la fois.
            </span>
          </p>
        </motion.div>

        {/* Image fondateur centrée */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex justify-center mb-20"
        >
          <div className="text-center">
            <img
              src={imgFondateur}
              alt="Fondateur TOPECI"
              className="w-full max-w-[550px] h-auto object-cover  mx-auto"
            />
            <p className="font-glacial-indifference font-bold text-xl mt-0 text-black dark:text-white">
              Jean-Marc KOFFI et Cindy Ornella KOUAKOU
            </p>
          </div>
        </motion.div>

        {/* Section vision et mission */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-2 gap-16 items-start mt-8 mb-20"
        >
          {/* Colonne texte */}
          <motion.div variants={fadeInUp} className="space-y-12">
            {/* Notre vision */}
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-black dark:text-white leading-relaxed"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-block-bold">
                Notre vision
              </h2>
              <p className="text-xl md:text-2xl font-glacial-indifference">
                Un monde où la diversité culturelle et linguistique est célébrée
                et transmise de manière innovante et inclusive, tant à l'échelle
                nationale qu'internationale.
              </p>
            </motion.div>

            {/* Notre mission */}
            <motion.div
              variants={fadeInUp}
              className="space-y-6 text-black dark:text-white leading-relaxed"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-block-bold">
                Notre mission
              </h2>
              <p className="text-xl md:text-2xl font-glacial-indifference">
                Promouvoir et préserver les langues et cultures locales
                africaines, notamment en Côte d'Ivoire, à travers des outils
                éducatifs innovants. TOPECI vise à reconnecter les jeunes
                générations à leur patrimoine culturel et linguistique tout en
                les ouvrant au monde.
              </p>
            </motion.div>
          </motion.div>

          {/* Colonne images - imgSchema en premier, imgValeur en dessous comme titre */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Image Valeur - comme titre/description en dessous */}
            <motion.div
              variants={scaleIn}
              className="flex justify-center md:justify-end"
            >
              <img
                src={imgValeur}
                alt="Valeurs et principes TOPECI"
                className="w-full max-w-[500px] h-auto object-contain transform hover:scale-105 transition-transform duration-300"
              />
            </motion.div>
            {/* Image Schema - principale */}
            <motion.div
              variants={scaleIn}
              className="flex justify-center md:justify-end p-6"
            >
              <img
                src={imgSchema}
                alt="Schéma organisationnel TOPECI"
                className="w-full max-w-[500px] h-auto object-contain mt-[-65px]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
