import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { lireSession } from "../../lib/admin/session";
import FormulaireConnexion from "./FormulaireConnexion";

export const metadata: Metadata = { title: "Connexion | Espace TOPECI", robots: { index: false, follow: false } };

export default async function ConnexionAdmin() {
  if (await lireSession().catch(() => null)) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-tp-creme px-4 py-10 text-tp-encre">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_-30px_rgba(78,111,167,0.45)]">
          <div className="relative h-44 bg-tp-sable">
            <Image
              src="/images/admin/mascottes.png"
              alt=""
              width={700}
              height={561}
              priority
              className="absolute bottom-0 left-1/2 h-40 w-auto -translate-x-1/2"
            />
          </div>
          <div className="px-7 pb-8 pt-7">
            <Image src="/images/admin/logo-topeci.png" alt="TOPECI" width={900} height={277} className="mx-auto h-9 w-auto" />
            <h1 className="mt-5 text-center font-title text-2xl font-extrabold">Espace équipe</h1>
            <p className="mt-2 text-center text-sm leading-6 text-slate-600">
              Pas de mot de passe : on t’envoie un lien par e-mail.
            </p>
            <div className="mt-6">
              <FormulaireConnexion />
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-slate-500">Accès réservé à l’équipe TOPECI.</p>
      </div>
    </main>
  );
}
