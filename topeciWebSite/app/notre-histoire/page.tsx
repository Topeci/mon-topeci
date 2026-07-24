import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BookOpen, Globe2, Heart, Sparkles, Users } from "lucide-react";

const values = [
  "Transmission de l’héritage culturel",
  "Ouverture au monde",
  "Préservation culturelle",
  "Engagement social",
  "Cultiver la fierté",
  "Innover",
];

export default function NotreHistoirePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-x-hidden bg-[#FFF9F1] pt-[72px] text-[#1E1E1E] sm:pt-[80px] lg:pt-[88px]">
        <section
          className="relative w-full overflow-hidden bg-white"
          aria-label="Notre histoire TOPECI"
        >
          <Image
            src="/images/Bannière notre histoire.png"
            alt="Découvrez l’histoire de TOPECI"
            width={1920}
            height={650}
            priority
            sizes="100vw"
            className="block h-auto w-full object-contain object-center"
          />
        </section>

        <section className="px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D93B7B] sm:mb-5 sm:text-base sm:tracking-[0.25em]">
                Ce qui nous motive
              </p>

              <h2 className="font-title text-2xl font-bold leading-tight text-[#D98B5F] sm:text-3xl lg:text-4xl">
                TOPECI, une aventure née pour transmettre
              </h2>

              <div className="mt-6 space-y-4 text-sm leading-7 sm:mt-8 sm:space-y-5 sm:text-lg sm:leading-8">
                <p>
                  TOPECI est né en{" "}
                  <strong className="font-semibold text-[#D93B7B]">2024</strong>{" "}
                  avec le désir profond de transmettre aux enfants la richesse
                  des langues, des cultures et des traditions africaines.
                </p>

                <p>
                  À travers nos jeux éducatifs modernes et interactifs, nous
                  contribuons à faire vivre cet héritage culturel précieux et à
                  renforcer le lien des nouvelles générations avec leurs
                  racines.
                </p>
              </div>

              <div className="mt-7 flex items-center gap-3 sm:mt-8 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white sm:h-14 sm:w-14">
                  <Heart size={23} />
                </div>

                <p className="font-title text-base font-semibold text-[#5C7DB8] sm:text-lg">
                  Fondée avec passion en 2024
                </p>
              </div>
            </div>

            <div className="min-w-0 rounded-3xl bg-white p-3 shadow-xl sm:p-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/image notre mission.png"
                  alt="Notre mission TOPECI"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-3 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl lg:text-4xl">
              Notre Mission
            </h2>

            <p className="mx-auto mt-5 max-w-4xl text-base leading-7 sm:mt-7 sm:text-xl sm:leading-9 lg:text-2xl lg:leading-10">
              Notre mission est de créer des outils éducatifs innovants qui
              permettent aux plus jeunes d’apprendre les richesses culturelles
              de la Côte d’Ivoire et du continent africain.
            </p>

            <div className="mt-10 grid gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#79C8C7] text-white sm:h-20 sm:w-20">
                  <BookOpen size={30} />
                </div>

                <h3 className="mt-5 font-title text-xl font-bold text-[#D93B7B] sm:mt-6 sm:text-2xl">
                  Éducation ludique
                </h3>

                <p className="mt-3 text-base leading-7 sm:mt-4 sm:text-lg">
                  Des jouets audio interactifs pour apprendre en s’amusant.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D93B7B] text-white sm:h-20 sm:w-20">
                  <Globe2 size={30} />
                </div>

                <h3 className="mt-5 font-title text-xl font-bold text-[#D93B7B] sm:mt-6 sm:text-2xl">
                  Culture africaine
                </h3>

                <p className="mt-3 text-base leading-7 sm:mt-4 sm:text-lg">
                  Préservation des langues, traditions et identités locales.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D98B5F] text-white sm:h-20 sm:w-20">
                  <Users size={30} />
                </div>

                <h3 className="mt-5 font-title text-xl font-bold text-[#D93B7B] sm:mt-6 sm:text-2xl">
                  Nouvelle génération
                </h3>

                <p className="mt-3 text-base leading-7 sm:mt-4 sm:text-lg">
                  Connecter les enfants à leurs racines culturelles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto grid min-w-0 max-w-7xl items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="min-w-0 rounded-3xl bg-white p-3 shadow-xl sm:p-4 lg:order-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/image nos valeurs.png"
                  alt="Nos valeurs TOPECI"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>

            <div>
              <h2 className="font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl lg:text-4xl">
                Nos valeurs
              </h2>

              <div className="mt-6 grid gap-4 sm:mt-8">
                {values.map((value) => (
                  <div key={value} className="flex items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2C94C] text-white sm:h-11 sm:w-11">
                      <Sparkles size={20} />
                    </div>

                    <p className="text-base font-medium sm:text-xl">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-3 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-title text-2xl font-bold text-[#D98B5F] sm:text-3xl lg:text-4xl">
              Notre équipe
            </h2>

            <div className="mt-10 grid gap-6 sm:mt-14 md:grid-cols-2 md:gap-10">
              <div className="rounded-3xl bg-[#FFF9F1] px-5 py-8 shadow-sm sm:px-8 sm:py-12">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#79C8C7] sm:h-36 sm:w-36">
                  <Image
                    src="/images/Photo JM.png"
                    alt="Jean-Marc Bonny Koffi"
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 break-words font-title text-xl font-bold text-[#D93B7B] sm:mt-8 sm:text-2xl lg:text-3xl">
                  Jean-Marc Bonny Koffi
                </h3>

                <p className="mt-3 text-base font-semibold text-[#79C8C7] sm:text-xl">
                  Cofondateur
                </p>
              </div>

              <div className="rounded-3xl bg-[#FFF9F1] px-5 py-8 shadow-sm sm:px-8 sm:py-12">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#D93B7B] sm:h-36 sm:w-36">
                  <Image
                    src="/images/Photo Cindy.png"
                    alt="Cindy Ornella Kouakou"
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 break-words font-title text-xl font-bold text-[#D93B7B] sm:mt-8 sm:text-2xl lg:text-3xl">
                  Cindy Ornella Kouakou
                </h3>

                <p className="mt-3 text-base font-semibold text-[#79C8C7] sm:text-xl">
                  Cofondatrice
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-title text-2xl font-bold text-[#5C7DB8] sm:text-3xl lg:text-4xl">
              Rejoignez l’aventure
            </h2>

            <p className="mt-5 text-base leading-7 sm:mt-6 sm:text-xl sm:leading-8">
              Parce que les langues et cultures africaines méritent d’être
              célébrées et transmises aux générations futures.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
              <Link
                href="/boutique"
                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#79C8C7] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#66b8b7] focus:outline-none focus:ring-2 focus:ring-[#79C8C7] focus:ring-offset-2 sm:w-auto sm:px-8 sm:py-4 sm:text-base"
              >
                Découvrir nos produits
              </Link>

              <Link
                href="/contact"
                className="flex min-h-12 w-full items-center justify-center rounded-xl border border-[#79C8C7] px-7 py-3.5 text-sm font-semibold text-[#79C8C7] transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#79C8C7] focus:ring-offset-2 sm:w-auto sm:text-base"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}