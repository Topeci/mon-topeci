import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";


//import parisKid from "../../assets/images/pariskid.jpg";
import jeanMarc from "../../assets/images/jeanMarc.jpg";
import imgJournal from "../../assets/images/imgjournal.png";
import imgMedi1TV from "../../assets/images/imgMedi1TV.png";
import imgWam from "../../assets/images/imgWam.png";
import imgTv5 from "../../assets/images/imgTv5.png";
import imgKedjevara from "../../assets/images/imgKedjevara.jpg"

export const Route = createFileRoute("/_home/blog")({
  component: RouteComponent,
});

// Données des articles de blog
const blogArticles = [
  {
    id: 1,
    date: "29/09/2025 16:08",
    image: jeanMarc,
    title: "« Mon premier livre audio » présenté sur RTI 1",
    content:
      "Jean-Marc Koffi Bonny dévoile un jeu éducatif pour initier les enfants à leur langue maternelle.",
    link: "https://www.facebook.com/share/1CLynWuBKD/?mibextid=wwXIfr",
    type: "facebook",
    color: "#4E6FA7",
  },
  {
    id: 2,
    date: "29/09/2025 16:09",
    image: imgMedi1TV,
    title: "Interview sur Medi1TV",
    content: "Zoom sur le livre audio de Jean-Marc Bonny",
    link: "https://www.medi1tv.com/fr/reportage/358935/Initier-les-tout-petits-au-Baoul%C3%A9-et-Malink%C3%A9--Zoom-sur-le-livre-audio-de-Jean-Marc-Bonny",
    type: "article",
    color: "#D68E54",
  },
  {
    id: 3,
    date: "29/09/2025 16:09",
    image: jeanMarc,
    title: "Découverte de nos livres audio",
    content: "Vidéo YouTube exclusive de présentation",
    link: "https://m.youtube.com/watch?v=n4x9jofBpBM",
    type: "youtube",
    color: "#BE356A",
  },
  {
    id: 4,
    date: "29/09/2025 16:10",
    image: imgWam,
    title: "Topeci à Willy à Midi",
    content: `
Aujourd'hui, c’était le premier numéro de WAM KIDS.
Le présentateur Touma Le Wé recevait Jean-Marc BONI, auteur de Topeci, un livre audio pour enfants dédié à l’apprentissage des langues maternelles.`,
    link: "https://www.facebook.com/share/v/19wcxa9T9K/?mibextid=wwXIfr",
    type: "facebook",
    color: "#4E6FA7",
  },

  {
    id: 5,
    date: "29/09/2025 16:12",
    image: imgTv5,
    title: "Francophonie : Topeci des livres audio sur TV5 Monde",
    content:
      "Au Village de la Francophonie, Cindy Kouakou, fondatrice de Topeci, a présenté sa maison d’édition de livres audio lors d’un entretien avec Laure de Matos.",
    link: "https://information.tv5monde.com/economie/video/francophonie-topeci-des-livres-audio-francais-langues-locales-2742819",
    type: "media",
    color: "#74C6C6",
  },
  {
    id: 6,
    date: "18/09/2025 16:13",
    image: imgKedjevara,
    title: "Nouveau partage sur Facebook",
    content: "Découvrez la publication de l'artiste ivoirien Dj Kedjevra",
    link: "https://www.facebook.com/share/v/1GVnZkUiLY/?mibextid=wwXIfr",
    type: "facebook",
    color: "#4E6FA7",
  },
];

// Variants d'animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      delay: 0.3,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// Bulles flottantes avec les couleurs de la charte
const floatingBubbles = [
  {
    id: 1,
    size: "w-4 h-4",
    color: "bg-[#D68E54]",
    top: "top-20",
    left: "left-10",
    delay: 0,
  },
  {
    id: 2,
    size: "w-6 h-6",
    color: "bg-[#BE356A]",
    top: "top-40",
    left: "left-20",
    delay: 0.5,
  },
  {
    id: 3,
    size: "w-3 h-3",
    color: "bg-[#4E6FA7]",
    top: "top-60",
    left: "left-5",
    delay: 1,
  },
  {
    id: 4,
    size: "w-5 h-5",
    color: "bg-[#74C6C6]",
    top: "top-80",
    left: "left-15",
    delay: 1.5,
  },
  {
    id: 5,
    size: "w-4 h-4",
    color: "bg-[#D68E54]",
    top: "top-20",
    right: "right-10",
    delay: 0.2,
  },
  {
    id: 6,
    size: "w-6 h-6",
    color: "bg-[#BE356A]",
    top: "top-40",
    right: "right-20",
    delay: 0.7,
  },
  {
    id: 7,
    size: "w-3 h-3",
    color: "bg-[#4E6FA7]",
    top: "top-60",
    right: "right-5",
    delay: 1.2,
  },
  {
    id: 8,
    size: "w-5 h-5",
    color: "bg-[#74C6C6]",
    top: "top-80",
    right: "right-15",
    delay: 1.7,
  },
];

function RouteComponent() {
  const handleCardClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white py-8 relative overflow-hidden">
      {/* Bulles flottantes en arrière-plan */}
      {floatingBubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className={`absolute rounded-full opacity-20 ${bubble.size} ${bubble.color} ${bubble.top} ${bubble.left} ${bubble.right}`}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        {/* En-tête animée */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <motion.img
            src={imgJournal}
            alt="Titre Blog"
            className="mb-6 h-24 w-auto object-contain"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.p
            className="text-gray-600 mt-2 max-w-2xl text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Découvrez les dernières nouvelles, articles et partages de la
            communauté Topeci
          </motion.p>
        </motion.div>

        {/* Grille des articles de blog */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogArticles.map((article) => (
            <motion.div
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer group"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleCardClick(article.link)}
            >
              <motion.div
                className="relative overflow-hidden"
                variants={imageVariants}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div
                  className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: article.color }}
                >
                  {article.type.toUpperCase()}
                </div>
              </motion.div>

              <div className="p-6">
                <span className="text-xs text-gray-500 font-medium">
                  {article.date}
                </span>
                <h3 className="font-bold text-lg mb-3 text-gray-800 line-clamp-2 group-hover:text-[#BE356A] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {article.content}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: `${article.color}15`,
                      color: article.color,
                    }}
                  >
                    Lire plus →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section commentaires */}
        <motion.div
          className="max-w-2xl mx-auto bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            Laisser un commentaire
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-transparent transition-all font-indie-flower"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Votre courriel"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-transparent transition-all font-indie-flower"
              />
            </div>
          </div>

          <div className="mb-6">
            <textarea
              placeholder="Votre commentaire"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-transparent transition-all resize-none font-indie-flower"
            />
          </div>

          <p className="text-xs text-gray-700 mb-6 text-center leading-relaxed">
            Ce site est protégé par ???, et{" "}
            <Link
              to="/legal/cgu"
              className="text-[#4E6FA7] hover:text-[#74C6C6]"
            >
              Politique de confidentialité
            </Link>{" "}
            et les{" "}
            <Link
              to="/legal/cgu"
              className="text-[#4E6FA7] hover:text-[#74C6C6]"
            >
              les Conditions d'utilisation
            </Link>{" "}
            de ??? s'appliquent. Veuillez noter que les commentaires doivent
            être approuvés avant d'être affichés.
          </p>

          <div className="text-center">
            <motion.button
              className="font-indie-flower text-white bg-[#BE356A] rounded-full px-8 py-3 text-lg hover:bg-[#A52A5A] transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              PUBLIER LE COMMENTAIRE
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
