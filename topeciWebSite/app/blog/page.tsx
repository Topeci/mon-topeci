import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowRight, ExternalLink } from "lucide-react";

const articles = [
  {
    title: "Vidéo TOPECI – Présentation officielle",
    category: "Vidéo",
    source: "YouTube",
    description:
      "Découvrez TOPECI à travers une vidéo de présentation de ses livres audio et supports éducatifs.",
    url: "https://m.youtube.com/watch?v=qKfgQsuhTrk&t=2s",
    embedUrl: "https://www.youtube.com/embed/qKfgQsuhTrk",
  },
  {
    title: "Francophonie : TOPECI fait découvrir la Côte d’Ivoire à Paris",
    category: "Presse",
    source: "Le Banco",
    description:
      "Un article consacré à l’initiative TOPECI et à la valorisation de la culture ivoirienne.",
    url: "https://lebanco.net/news/49082-francophonie-des-lunettes-pour-decouvrir-la-cote-divoire-a-paris.html",
  },
  {
    title: "TOPECI sur Facebook",
    category: "Réseaux sociaux",
    source: "Facebook",
    description:
      "Retrouvez une vidéo partagée sur Facebook autour de l’univers TOPECI.",
    url: "https://www.facebook.com/share/v/1QXax8ULJ5/?mibextid=wwXIfr",
  },
  {
    title: "Vidéo TOPECI – Découverte des livres audio",
    category: "Vidéo",
    source: "YouTube",
    description:
      "Une vidéo autour des livres audio TOPECI et de leur rôle dans la transmission culturelle.",
    url: "https://m.youtube.com/watch?v=HzPm7tpHBTU",
    embedUrl: "https://www.youtube.com/embed/HzPm7tpHBTU",
  },
  {
    title: "TOPECI – Reportage Facebook",
    category: "Réseaux sociaux",
    source: "Facebook",
    description:
      "Une publication vidéo présentant les activités et initiatives de TOPECI.",
    url: "https://www.facebook.com/share/v/1GVnZkUiLY/?mibextid=wwXIfr",
  },
  {
    title: "Francophonie : TOPECI, des livres audio français-langues locales",
    category: "Média",
    source: "TV5 Monde",
    description:
      "Un reportage de TV5 Monde sur TOPECI et ses livres audio en français et langues locales.",
    url: "https://information.tv5monde.com/economie/video/francophonie-topeci-des-livres-audio-francais-langues-locales-2742819",
  },
  {
    title: "TOPECI – Vidéo Facebook",
    category: "Réseaux sociaux",
    source: "Facebook",
    description:
      "Une vidéo supplémentaire autour de TOPECI et de ses supports éducatifs.",
    url: "https://www.facebook.com/share/v/19wcxa9T9K/?mibextid=wwXIfr",
  },
  {
    title: "TOPECI – Vidéo YouTube",
    category: "Vidéo",
    source: "YouTube",
    description:
      "Une vidéo YouTube dédiée à l’univers TOPECI et à ses créations éducatives.",
    url: "https://m.youtube.com/watch?v=n4x9jofBpBM",
    embedUrl: "https://www.youtube.com/embed/n4x9jofBpBM",
  },
  {
    title: "Initier les tout-petits au Baoulé et Malinké",
    category: "Média",
    source: "Medi1TV",
    description:
      "Reportage sur le livre audio de Jean-Marc Bonny et l’apprentissage des langues africaines.",
    url: "https://www.medi1tv.com/fr/reportage/358935/Initier-les-tout-petits-au-Baoul%C3%A9-et-Malink%C3%A9--Zoom-sur-le-livre-audio-de-Jean-Marc-Bonny",
  },
  {
    title: "TOPECI sur Facebook",
    category: "Réseaux sociaux",
    source: "Facebook",
    description:
      "Une autre publication Facebook autour de TOPECI et de ses activités.",
    url: "https://www.facebook.com/share/1CLynWuBKD/?mibextid=wwXIfr",
  },
  {
    title: "TOPECI à VivaTech Paris 2026",
    category: "Presse",
    source: "RTI",
    description:
      "L’innovation ivoirienne TOPECI au rendez-vous mondial des technologies.",
    url: "https://rti.info/topeci-a-vivatech-paris-2026-linnovation-ivoirienne-au-rendez-vous-mondial-des-technologies/",
  },
  {
    title: "TOPECI – Vidéo YouTube",
    category: "Vidéo",
    source: "YouTube",
    description:
      "Une vidéo complémentaire sur les produits et l’univers TOPECI.",
    url: "https://youtu.be/IRXsZZfA7XI?is=JynUjFS1wC-uIDiA",
    embedUrl: "https://www.youtube.com/embed/IRXsZZfA7XI",
  },
  {
    title: "TOPECI – Vidéo YouTube",
    category: "Vidéo",
    source: "YouTube",
    description:
      "Une vidéo supplémentaire autour de TOPECI et de ses activités.",
    url: "https://youtu.be/exREma4QCLk?feature=shared",
    embedUrl: "https://www.youtube.com/embed/exREma4QCLk",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-x-hidden bg-white pt-[72px] text-[#1E1E1E] sm:pt-[80px] lg:pt-[88px]">
        <section
          className="relative w-full overflow-hidden bg-[#FFF9F1]"
          aria-label="TOPECI dans les médias"
        >
          <Image
            src="/images/bannière page actualité.png"
            alt="TOPECI dans les médias et l’actualité"
            width={1920}
            height={650}
            priority
            sizes="100vw"
            className="block h-auto w-full object-contain object-center"
          />
        </section>

        <section className="px-3 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 px-1 text-center sm:mb-10">
              <h1 className="font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl lg:text-4xl">
                TOPECI dans les médias
              </h1>

              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
                Cliquez sur un contenu pour ouvrir directement la vidéo,
                l’article ou la publication dans un nouvel onglet.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
              {articles.map((article) => (
                <a
                  key={article.url}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#79C8C7] focus:ring-offset-2"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-[#FFF9F1]">
                    {article.embedUrl ? (
                      <iframe
                        src={article.embedUrl}
                        title={article.title}
                        className="pointer-events-none h-full w-full"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center px-4 text-center sm:px-5">
                        <ExternalLink className="text-[#D93B7B]" size={32} />

                        <p className="mt-3 font-title text-base font-bold text-[#5C7DB8] sm:text-lg">
                          {article.source}
                        </p>

                        <p className="mt-2 line-clamp-2 max-w-full break-all text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
                          {article.url}
                        </p>
                      </div>
                    )}

                    <span className="absolute left-3 top-3 rounded-full bg-[#79C8C7] px-3 py-1.5 text-xs font-semibold text-white sm:left-4 sm:top-4 sm:px-4 sm:text-sm">
                      {article.category}
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5 lg:p-6">
                    <p className="mb-3 text-xs font-semibold text-slate-500 sm:mb-4 sm:text-sm">
                      {article.source}
                    </p>

                    <h2 className="break-words font-title text-lg font-bold leading-snug text-[#5C7DB8] sm:text-xl">
                      {article.title}
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
                      {article.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#D93B7B] sm:pt-6 sm:text-base">
                      Découvrir le contenu
                      <ArrowRight
                        size={18}
                        className="shrink-0 transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#FFF9F1] px-3 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-title text-xl font-bold text-[#5C7DB8] sm:text-2xl lg:text-3xl">
              Vous souhaitez collaborer avec TOPECI ?
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
              Vous êtes une école, une association, un média ou une entreprise ?
              Collaborons afin de faire découvrir la richesse des langues et
              cultures africaines aux nouvelles générations.
            </p>

            <a
              href="/contact"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#79C8C7] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#66b8b7] focus:outline-none focus:ring-2 focus:ring-[#79C8C7] focus:ring-offset-2 min-[390px]:w-auto sm:mt-8 sm:px-8 sm:text-base"
            >
              Contactez-nous
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}