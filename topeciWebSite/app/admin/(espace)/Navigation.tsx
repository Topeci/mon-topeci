"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, PlusCircle, Users, MessageCircle, Award } from "lucide-react";

const LIENS = [
  { href: "/admin", libelle: "Accueil", icone: Home, exact: true },
  { href: "/admin/commandes", libelle: "Commandes", icone: Package },
  { href: "/admin/commandes/nouvelle", libelle: "Nouvelle vente", icone: PlusCircle, exact: true },
  { href: "/admin/clients", libelle: "Clients", icone: Users },
  { href: "/admin/whatsapp", libelle: "Liste WhatsApp", icone: MessageCircle },
  { href: "/admin/ambassadeurs", libelle: "Ambassadeurs", icone: Award },
];

export default function Navigation({ aTraiter }: { aTraiter: number }) {
  const chemin = usePathname();
  const actif = (l: (typeof LIENS)[number]) =>
    l.exact ? chemin === l.href : chemin.startsWith(l.href) && !(l.href === "/admin/commandes" && chemin === "/admin/commandes/nouvelle");

  return (
    <nav aria-label="Espace TOPECI" className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
      {LIENS.map((l) => {
        const Icone = l.icone;
        const estActif = actif(l);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={estActif ? "page" : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-bold transition ${
              estActif ? "bg-tp-bleu text-white" : "text-slate-600 hover:bg-white hover:text-tp-encre"
            }`}
          >
            <Icone size={18} aria-hidden />
            <span>{l.libelle}</span>
            {l.href === "/admin/commandes" && aTraiter > 0 && (
              <span className={`ml-auto rounded-full px-2 text-xs ${estActif ? "bg-white/25" : "bg-tp-fuchsia text-white"}`}>{aTraiter}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
