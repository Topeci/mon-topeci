import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FormulaireInscription from "./FormulaireInscription";

export const metadata: Metadata = {
  title: "Inscris-toi | TOPECI",
  description:
    "Reçois en premier les offres et nouveautés TOPECI : jouets qui parlent baoulé, dioula et bété.",
};

export default function InscriptionPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen overflow-x-hidden bg-white pt-[72px] text-[#1F2533] sm:pt-[80px] lg:pt-[88px]">
        <section className="px-4 py-10 sm:px-6 sm:py-14">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="text-center lg:text-left">
              <Image
                src="/images/mascottes/mascottes.png"
                alt="Les deux enfants mascottes de TOPECI"
                width={1000}
                height={802}
                priority
                className="mx-auto h-[200px] w-auto sm:h-[260px] lg:mx-0"
              />
              <p className="font-title mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#BE356A]">
                Offre spéciale fêtes
              </p>
              <h1 className="font-fun mt-3 text-4xl font-bold leading-tight text-[#4E6FA7] sm:text-5xl">
                Sois prévenu·e
                <br />
                avant tout le monde
              </h1>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Les jouets qui parlent <strong>baoulé</strong>, <strong>dioula</strong> et{" "}
                <strong>bété</strong> à nos enfants. Inscris-toi : tu reçois nos offres et
                nouveautés en premier.
              </p>
            </div>

            <FormulaireInscription />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
