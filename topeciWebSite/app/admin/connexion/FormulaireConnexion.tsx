"use client";

import { useActionState } from "react";
import { Mail } from "lucide-react";
import { demanderLien, type EtatConnexion } from "./actions";

const depart: EtatConnexion = { etat: "attente" };

export default function FormulaireConnexion() {
  const [etat, envoyer, enCours] = useActionState(demanderLien, depart);

  if (etat.etat === "envoye") {
    return (
      <div className="rounded-2xl bg-tp-turquoise/15 p-5 text-center">
        <p className="font-title text-lg font-bold text-tp-encre">Regarde ta boîte mail</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">
          Si cette adresse fait partie de l’équipe, un lien de connexion vient d’arriver.
          Ouvre-le sur cet appareil. Pense à vérifier les spams.
        </p>
      </div>
    );
  }

  return (
    <form action={envoyer} className="space-y-4">
      <label className="block">
        <span className="text-sm font-bold text-tp-bleu">Ton adresse e-mail</span>
        <span className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 focus-within:border-tp-bleu">
          <Mail size={18} className="text-slate-400" aria-hidden />
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="prenom@exemple.com"
            className="w-full bg-transparent py-3.5 text-base outline-none"
          />
        </span>
      </label>
      {etat.etat === "erreur" && <p className="text-sm text-tp-fuchsia">{etat.message}</p>}
      <button
        type="submit"
        disabled={enCours}
        className="w-full rounded-2xl bg-tp-bleu py-3.5 font-title font-bold text-white transition hover:bg-tp-bleu/90 disabled:opacity-60"
      >
        {enCours ? "Envoi…" : "Recevoir mon lien de connexion"}
      </button>
    </form>
  );
}
