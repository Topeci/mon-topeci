"use client";

import { FormEvent, useState } from "react";
import { lireSuivi } from "../lib/suivi";

const LANGUES = [
  { id: "baoule", label: "Baoulé" },
  { id: "dioula", label: "Dioula" },
  { id: "bete", label: "Bété" },
];

const PAYS = [
  { id: "Côte d’Ivoire", marche: "CI" },
  { id: "France", marche: "EUR" },
  { id: "Autre pays", marche: "EUR" },
] as const;

const champ =
  "mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 text-base outline-none transition focus:border-[#79C8C7]";
const etiquette = "font-title text-sm font-semibold text-[#5C7DB8]";

export default function FormulaireInscription() {
  const [envoi, setEnvoi] = useState<"idle" | "envoi" | "ok">("idle");
  const [erreur, setErreur] = useState<string | null>(null);
  const [langues, setLangues] = useState<string[]>([]);
  const [pays, setPays] = useState<(typeof PAYS)[number]["id"]>("Côte d’Ivoire");

  const basculerLangue = (id: string) =>
    setLangues((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));

  const envoyer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErreur(null);
    const f = new FormData(event.currentTarget);
    const suivi = lireSuivi();
    const params = new URLSearchParams(window.location.search);

    setEnvoi("envoi");
    try {
      const reponse = await fetch("/api/inscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: f.get("prenom"),
          telephone: f.get("telephone"),
          email: f.get("email"),
          ville: f.get("ville"),
          pays,
          marche: PAYS.find((p) => p.id === pays)?.marche ?? "CI",
          langues,
          ages_enfants: f.get("ages_enfants"),
          consent_whatsapp: f.get("consent_whatsapp") === "on",
          consent_email: f.get("consent_email") === "on",
          source: params.get("src") ?? suivi.source ?? "inscription",
          ambassadeur: params.get("amb") ?? suivi.ambassadeur,
          site_web: f.get("site_web"),
        }),
      });
      const data = (await reponse.json().catch(() => ({}))) as { ok?: boolean; erreur?: string };
      if (!reponse.ok || !data.ok) {
        setErreur(data.erreur ?? "Oups, ça n’a pas marché. Réessaie dans un instant.");
        setEnvoi("idle");
        return;
      }
      setEnvoi("ok");
    } catch {
      setErreur("Pas de connexion. Réessaie dans un instant.");
      setEnvoi("idle");
    }
  };

  if (envoi === "ok") {
    return (
      <div className="rounded-3xl bg-[#74C6C6] p-8 text-center text-[#1F2533] shadow-md sm:p-10">
        <h2 className="font-fun text-4xl font-bold">C’est noté !</h2>
        <p className="mt-4 text-base leading-7 sm:text-lg">
          Tu fais partie des premiers. Pour bien recevoir nos messages WhatsApp, enregistre
          notre numéro dans ton téléphone.
        </p>
        <a
          href="https://wa.me/2250172616133?text=Bonjour%20TOPECI%20!%20Je%20viens%20de%20m%E2%80%99inscrire%20%F0%9F%A6%96"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-bold text-[#4E6FA7] shadow-sm transition hover:bg-[#FFF9F1]"
        >
          Dire bonjour sur WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={envoyer}
      className="space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-md sm:p-8"
    >
      {/* Piège à robots, invisible pour les humains */}
      <input type="text" name="site_web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ins-prenom" className={etiquette}>Prénom</label>
          <input id="ins-prenom" name="prenom" required autoComplete="given-name" className={champ} />
        </div>
        <div>
          <label htmlFor="ins-tel" className={etiquette}>Numéro WhatsApp</label>
          <input
            id="ins-tel"
            name="telephone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="07 00 00 00 00"
            className={champ}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ins-email" className={etiquette}>
            Email <span className="font-normal text-slate-400">(facultatif)</span>
          </label>
          <input id="ins-email" name="email" type="email" autoComplete="email" className={champ} />
        </div>
        <div>
          <label htmlFor="ins-ville" className={etiquette}>Ville</label>
          <input id="ins-ville" name="ville" autoComplete="address-level2" className={champ} />
        </div>
      </div>

      <div>
        <span className={etiquette}>Tu vis…</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {PAYS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPays(p.id)}
              aria-pressed={pays === p.id}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                pays === p.id
                  ? "border-[#4E6FA7] bg-[#4E6FA7] text-white"
                  : "border-slate-300 text-slate-600 hover:border-[#4E6FA7]"
              }`}
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className={etiquette}>Quelle langue t’intéresse ?</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {LANGUES.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => basculerLangue(l.id)}
              aria-pressed={langues.includes(l.id)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                langues.includes(l.id)
                  ? "border-[#BE356A] bg-[#BE356A] text-white"
                  : "border-slate-300 text-slate-600 hover:border-[#BE356A]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="ins-ages" className={etiquette}>
          Âge de ton ou tes enfants <span className="font-normal text-slate-400">(facultatif)</span>
        </label>
        <input id="ins-ages" name="ages_enfants" placeholder="ex : 3 ans et 6 ans" className={champ} />
      </div>

      <fieldset className="space-y-2 rounded-2xl bg-[#FFF9F1] p-4 text-sm leading-6 text-slate-600">
        <legend className="sr-only">Comment te prévenir</legend>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent_whatsapp" className="mt-1 h-4 w-4 shrink-0 accent-[#79C8C7]" />
          <span>J’accepte de recevoir les offres et nouveautés TOPECI sur WhatsApp.</span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent_email" className="mt-1 h-4 w-4 shrink-0 accent-[#79C8C7]" />
          <span>J’accepte de les recevoir par email.</span>
        </label>
        <p className="text-xs text-slate-500">
          Désinscription à tout moment, en un message. Tes données restent chez TOPECI.
        </p>
      </fieldset>

      {erreur && (
        <p role="alert" className="rounded-xl bg-[#FCE8EF] px-4 py-3 text-sm font-semibold text-[#BE356A]">
          {erreur}
        </p>
      )}

      <button
        type="submit"
        disabled={envoi === "envoi"}
        className="w-full rounded-xl bg-[#79C8C7] px-7 py-4 text-base font-bold text-white transition hover:bg-[#66b8b7] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {envoi === "envoi" ? "Inscription…" : "Je m’inscris"}
      </button>
    </form>
  );
}
