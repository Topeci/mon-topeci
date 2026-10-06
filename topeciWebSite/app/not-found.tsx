import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="bg-[#DCCC41] pt-[88px] text-[#1F2533]">
        <section className="mx-auto flex max-w-xl flex-col items-center px-5 pb-14 pt-10 text-center sm:pt-14">
          <p
            className="font-fun flex items-center text-[110px] font-bold leading-none text-[#4E6FA7] sm:text-[150px]"
            aria-label="Erreur 404"
          >
            <span aria-hidden>4</span>
            <Image
              src="/images/mascottes/soleil.png"
              alt=""
              width={324}
              height={399}
              className="tp-spin mx-1 h-[104px] w-auto sm:h-[140px]"
            />
            <span aria-hidden>4</span>
          </p>

          <div className="relative mt-6 flex h-[300px] w-full max-w-[380px] items-end justify-center sm:h-[340px]">
            <p className="tp-bubble tp-bob absolute right-0 top-0 z-20 max-w-[190px] text-left text-[19px] sm:text-[22px]">
              Hé ! Cette page s’est cachée…
            </p>

            <Image
              src="/images/mascottes/fille.png"
              alt="La petite fille mascotte de TOPECI, bras croisés"
              width={510}
              height={802}
              priority
              className="relative z-10 mr-24 h-[280px] w-auto sm:h-[320px]"
            />

            <Image
              src="/images/mascottes/elephant.png"
              alt="L’éléphant du logo TOPECI"
              width={313}
              height={400}
              className="absolute bottom-0 right-6 z-10 h-[120px] w-auto rotate-[8deg] sm:h-[140px]"
            />
          </div>

          <h1 className="font-fun mt-6 text-4xl font-bold sm:text-5xl">
            Oups, perdu !
          </h1>

          <p className="mt-3 max-w-sm text-base font-semibold leading-7 sm:text-lg">
            Même l’éléphant ne la trouve pas. Reviens à l’accueil, les livres
            t’attendent.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/" className="tp-btn bg-[#BE356A] text-white">
              Retour à l’accueil
            </Link>
            <Link href="/boutique" className="tp-btn bg-white text-[#1F2533]">
              Voir la boutique
            </Link>
          </div>

          <p className="font-hand mt-10 text-xl sm:text-2xl">
            Un jeu, une culture, un monde à découvrir.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
