import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Lock, Mail, UserRound } from "lucide-react";

export default function ConnexionPage() {
  return (
    <>
      <Header />

      <main className="bg-[#FFF9F1] pt-[88px] text-[#1E1E1E]">
        <section className="px-6 py-16">
          <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-sm">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#79C8C7] text-white">
                <UserRound size={30} />
              </div>

              <h1 className="mt-6 font-title text-3xl font-bold text-[#5C7DB8]">
                Connexion
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                L’espace client TOPECI sera bientôt disponible.
              </p>
            </div>

            <form className="mt-8 space-y-5">
              <div>
                <label className="text-sm font-semibold text-[#5C7DB8]">
                  Email
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Mail size={18} className="text-[#D98B5F]" />
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    disabled
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#5C7DB8]">
                  Mot de passe
                </label>

                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Lock size={18} className="text-[#D98B5F]" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    disabled
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled
                className="w-full rounded-xl bg-slate-300 px-6 py-4 font-semibold text-white"
              >
                Se connecter — À venir
              </button>
            </form>

            <div className="mt-6 rounded-2xl bg-[#FFF9F1] p-5 text-center">
              <p className="text-sm leading-6 text-slate-600">
                La connexion, l’espace client, le suivi des commandes et le
                paiement en ligne seront ajoutés dans une prochaine version.
              </p>
            </div>

            <div className="mt-7 text-center">
              <Link
                href="/boutique"
                className="font-semibold text-[#D93B7B]"
              >
                Retour à la boutique
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}