import Link from "next/link";

/* Petits éléments partagés par les écrans de l'espace admin */

export const STATUTS = {
  nouvelle: { libelle: "Nouvelle", classe: "bg-tp-fuchsia/12 text-tp-fuchsia" },
  confirmee: { libelle: "Confirmée", classe: "bg-tp-bleu/12 text-tp-bleu" },
  en_livraison: { libelle: "En livraison", classe: "bg-tp-orange/15 text-[#a85f27]" },
  livree: { libelle: "Livrée", classe: "bg-tp-turquoise/20 text-[#2f7f7f]" },
  annulee: { libelle: "Annulée", classe: "bg-slate-100 text-slate-500" },
} as const;
export type Statut = keyof typeof STATUTS;
export const ORDRE_STATUTS: Statut[] = ["nouvelle", "confirmee", "en_livraison", "livree", "annulee"];

export const CANAUX: Record<string, string> = {
  site: "Site web",
  whatsapp: "WhatsApp",
  salon: "Salon / marché",
  librairie: "Librairie",
  ambassadeur: "Ambassadeur",
  revendeur: "Revendeur",
  historique: "Historique",
  autre: "Autre",
};

export const LANGUES: Record<string, { nom: string; couleur: string }> = {
  baoule: { nom: "Baoulé", couleur: "var(--color-tp-bleu)" },
  dioula: { nom: "Dioula", couleur: "var(--color-tp-orange)" },
  bete: { nom: "Bété", couleur: "var(--color-tp-turquoise)" },
};

const nombre = new Intl.NumberFormat("fr-FR");
export const n = (v: number | string | null | undefined) => nombre.format(Number(v ?? 0));

export function argent(v: number | string | null | undefined, devise?: string | null) {
  const x = Number(v ?? 0);
  return devise === "EUR" ? `${nombre.format(x)} €` : `${nombre.format(x)} FCFA`;
}

export function date(v: string | null | undefined, avecHeure = false) {
  if (!v) return "—";
  return new Date(v).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...(avecHeure ? { hour: "2-digit", minute: "2-digit" } : {}),
    timeZone: "Africa/Abidjan",
  });
}

export function nomClient(c: { prenom?: string | null; nom?: string | null } | null | undefined) {
  const t = [c?.prenom, c?.nom].filter(Boolean).join(" ").trim();
  return t || "Client sans nom";
}

/** Lien WhatsApp direct (wa.me) avec un message prérempli. */
export function lienWhatsapp(telephone: string | null | undefined, message?: string) {
  if (!telephone) return null;
  const chiffres = telephone.replace(/\D/g, "");
  return `https://wa.me/${chiffres}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function PastilleStatut({ statut }: { statut: string }) {
  const s = STATUTS[statut as Statut] ?? STATUTS.nouvelle;
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${s.classe}`}>{s.libelle}</span>;
}

export function EnTete({ titre, sousTitre, action }: { titre: string; sousTitre?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        <h1 className="font-title text-2xl font-extrabold tracking-tight sm:text-3xl">{titre}</h1>
        {sousTitre && <p className="mt-1 text-sm text-slate-600">{sousTitre}</p>}
      </div>
      {action}
    </header>
  );
}

export function Carte({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`min-w-0 rounded-3xl bg-white p-5 shadow-[0_1px_0_rgba(30,30,30,0.04)] ring-1 ring-black/5 sm:p-6 ${className}`}>{children}</section>;
}

export function BoutonLien({ href, children, variante = "plein" }: { href: string; children: React.ReactNode; variante?: "plein" | "contour" }) {
  return (
    <Link
      href={href}
      className={
        variante === "plein"
          ? "inline-flex items-center gap-2 rounded-2xl bg-tp-bleu px-4 py-2.5 text-sm font-bold text-white transition hover:bg-tp-bleu/90"
          : "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-bold text-tp-bleu ring-1 ring-tp-bleu/30 transition hover:bg-tp-bleu/5"
      }
    >
      {children}
    </Link>
  );
}

export function Vide({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl bg-tp-sable/60 px-4 py-8 text-center text-sm text-slate-600">{children}</p>;
}

export const champ =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base outline-none transition focus:border-tp-bleu sm:text-sm";
export const etiquette = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500";
