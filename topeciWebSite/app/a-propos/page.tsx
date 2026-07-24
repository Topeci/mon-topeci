import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BookOpen, Globe2, Heart, Sparkles, Users } from "lucide-react";

const values = [
  "Transmission culturelle",
  "Éducation ludique",
  "Engagement social",
  "Fierté culturelle",
  "Innovation",
];

export default function NotreHistoirePage() {
  return (
    <>
      <Header />

      <main className="bg-[#FFF9F1] pt-[88px] text-[#1E1E1E]">
        <section className="relative h-[260px] overflow-hidden bg-white sm:h-[300px] lg:h-[340px]">
          <Image
            src="/images/image baniere.png"
            alt="Notre histoire TOPECI"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h1 className="font-title text-4xl font-bold sm:text-5xl md:text-6xl">
              Notre histoire
            </h1>
            <p className="mt-4 text-lg sm:mt-5 sm:text-xl md:text-2xl">
              Une histoire de transmission.
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#D93B7B] sm:text-sm sm:tracking-[0.25em]">
                Ce qui nous motive
              </p>

              <h2 className="font-title text-3xl font-bold text-[#D98B5F] sm:text-4xl">
                TOPECI, une aventure née pour transmettre
              </h2>

              <div className="mt-6 space-y-5 text-base leading-7 sm:mt-8 sm:space-y-6 sm:text-lg sm:leading-8">
                <p>
                  TOPECI est né en{" "}
                  <strong className="font-semibold text-[#D93B7B]">2024</strong>{" "}
                  avec le désir profond de transmettre aux enfants la richesse
                  des langues, des cultures et des traditions africaines.
                </p>

                <p>
                  À travers nos jeux éducatifs modernes et interactifs, nous
                  contribuons à faire vivre cet héritage culturel précieux et à
                  renforcer le lien des nouvelles générations avec leurs racines.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#79C8C7] text-white sm:h-14 sm:w-14">
                  <Heart size={24} />
                </div>
                <p className="font-title text-base font-semibold text-[#5C7DB8] sm:text-lg">
                  Fondée avec passion en 2024
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-3 shadow-xl sm:p-4">
              <div className="relative h-[260px] overflow-hidden rounded-2xl sm:h-[320px] lg:h-[360px]">
                <Image
                  src="/images/jouet 5.jpg"
                  alt="TOPECI transmission culturelle"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 text-center sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-title text-3xl font-bold text-[#D98B5F] sm:text-4xl">
              Notre Mission
            </h2>

            <p className="mx-auto mt-6 max-w-4xl text-lg leading-8 sm:mt-7 sm:text-2xl sm:leading-10">
              Notre mission est de créer des outils éducatifs innovants qui
              permettent aux plus jeunes de découvrir et d’apprécier la richesse
              culturelle de la Côte d’Ivoire et du continent africain.
            </p>

            <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#79C8C7] text-white sm:h-20 sm:w-20">
                  <BookOpen size={30} />
                </div>
                <h3 className="mt-5 font-title text-xl font-bold text-[#D93B7B] sm:mt-6 sm:text-2xl">
                  Éducation ludique
                </h3>
                <p className="mt-3 text-base sm:mt-4 sm:text-lg">
                  Des livres audio interactifs pour apprendre en s’amusant.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D93B7B] text-white sm:h-20 sm:w-20">
                  <Globe2 size={30} />
                </div>
                <h3 className="mt-5 font-title text-xl font-bold text-[#D93B7B] sm:mt-6 sm:text-2xl">
                  Culture africaine
                </h3>
                <p className="mt-3 text-base sm:mt-4 sm:text-lg">
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
                <p className="mt-3 text-base sm:mt-4 sm:text-lg">
                  Connecter les enfants à leurs racines culturelles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="rounded-3xl bg-white p-3 shadow-xl sm:p-4 lg:order-2">
              <div className="relative h-[250px] overflow-hidden rounded-2xl sm:h-[320px] lg:h-[340px]">
                <Image
                  src="/images/jouet 4.jpg"
                  alt="Produits TOPECI"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="font-title text-3xl font-bold text-[#D98B5F] sm:text-4xl">
                Nos valeurs
              </h2>

              <div className="mt-7 grid gap-4 sm:mt-8">
                {values.map((value) => (
                  <div key={value} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2C94C] text-white sm:h-11 sm:w-11">
                      <Sparkles size={20} />
                    </div>
                    <p className="text-lg font-medium sm:text-xl">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-title text-3xl font-bold text-[#D98B5F] sm:text-4xl">
              Notre équipe
            </h2>
            <p className="mt-4 text-lg sm:text-xl">
              Les visionnaires derrière TOPECI
            </p>

            <div className="mt-10 grid gap-8 sm:mt-14 md:grid-cols-2 lg:gap-10">
              <div className="rounded-3xl bg-[#FFF9F1] px-5 py-10 shadow-sm sm:px-8 sm:py-12">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#79C8C7] sm:h-36 sm:w-36">
                  <Image
                    src="/images/jouet 5.jpg"
                    alt="Jean-Marc Bonny KOFFI"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 font-title text-2xl font-bold text-[#D93B7B] sm:mt-8 sm:text-3xl">
                  Jean-Marc Bonny KOFFI
                </h3>
                <p className="mt-3 text-lg font-semibold text-[#79C8C7] sm:text-xl">
                  Co-fondateur et Président
                </p>
              </div>

              <div className="rounded-3xl bg-[#FFF9F1] px-5 py-10 shadow-sm sm:px-8 sm:py-12">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-[#D93B7B] sm:h-36 sm:w-36">
                  <Image
                    src="/images/jouet 4.jpg"
                    alt="Cindy Ornella KOUAKOU"
                    fill
                    className="object-cover"
                  />
                </div>

                <h3 className="mt-6 font-title text-2xl font-bold text-[#D93B7B] sm:mt-8 sm:text-3xl">
                  Cindy Ornella KOUAKOU
                </h3>
                <p className="mt-3 text-lg font-semibold text-[#79C8C7] sm:text-xl">
                  Co-fondatrice et Directrice générale
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 text-center sm:px-6 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-title text-3xl font-bold text-[#5C7DB8] sm:text-4xl">
              Rejoignez l’aventure
            </h2>

            <p className="mt-5 text-lg leading-8 sm:mt-6 sm:text-xl">
              Parce que les langues et cultures africaines méritent d’être
              célébrées et transmises aux générations futures.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/boutique"
                className="rounded-xl bg-[#79C8C7] px-8 py-4 font-semibold text-white"
              >
                Découvrir nos produits
              </Link>

              <Link
                href="/contact"
                className="rounded-xl px-8 py-4 font-semibold text-[#79C8C7]"
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