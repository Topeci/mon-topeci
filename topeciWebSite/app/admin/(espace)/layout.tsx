import Image from "next/image";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { lire } from "../../lib/admin/base";
import { exigerAdmin } from "../../lib/admin/session";
import { seDeconnecter } from "./actions";
import Navigation from "./Navigation";

export default async function EspaceAdmin({ children }: { children: React.ReactNode }) {
  const admin = await exigerAdmin();
  const aTraiter = (await lire<{ id: string }[]>("commandes?select=id&statut=eq.nouvelle").catch(() => [])).length;

  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col lg:flex-row">
      <aside className="sticky top-0 z-20 border-b border-black/5 bg-tp-creme/95 px-4 pb-3 pt-4 backdrop-blur lg:h-screen lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:px-5 lg:py-7">
        <div className="mb-3 flex items-center justify-between gap-3 lg:mb-8 lg:block">
          <Link href="/admin" className="block">
            <Image src="/images/admin/logo-topeci.png" alt="TOPECI" width={900} height={277} priority className="h-7 w-auto lg:h-9" />
            <span className="mt-1 hidden text-sm text-tp-fuchsia lg:block" style={{ fontFamily: "'Indie Flower', cursive" }}>
              l’espace de l’équipe
            </span>
          </Link>
          <form action={seDeconnecter} className="lg:hidden">
            <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500" title="Se déconnecter">
              {admin.nom} <LogOut size={14} aria-hidden />
            </button>
          </form>
        </div>
        <Navigation aTraiter={aTraiter} />
        <div className="absolute bottom-7 left-5 right-5 hidden lg:block">
          <p className="text-xs text-slate-500">Connecté·e : <b className="text-tp-encre">{admin.nom}</b></p>
          <form action={seDeconnecter}>
            <button className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-tp-fuchsia">
              <LogOut size={14} aria-hidden /> Se déconnecter
            </button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">{children}</main>
    </div>
  );
}
