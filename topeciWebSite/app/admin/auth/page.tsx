"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Page d'arrivée du lien e-mail. Supabase place le jeton dans l'ancre de l'adresse (#access_token=...),
 * qui n'est visible que dans le navigateur : on l'envoie au serveur, qui vérifie la personne et ouvre la session.
 */
export default function ArriveeLien() {
  const [erreur, setErreur] = useState<string | null>(null);

  useEffect(() => {
    const ancre = new URLSearchParams(window.location.hash.slice(1));
    window.history.replaceState(null, "", window.location.pathname);
    const jeton = ancre.get("access_token");

    async function ouvrirSession(): Promise<string | null> {
      if (!jeton) {
        return ancre.get("error_code") === "otp_expired" ? "Ce lien a expiré ou a déjà servi." : "Ce lien n’est pas valide.";
      }
      try {
        const r = await fetch("/api/admin/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: jeton }),
        });
        if (r.ok) {
          window.location.replace("/admin");
          return null;
        }
        return (await r.json().catch(() => null))?.erreur ?? "Connexion refusée.";
      } catch {
        return "Connexion impossible. Vérifie ta connexion internet.";
      }
    }

    ouvrirSession().then((message) => message && setErreur(message));
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-tp-creme px-4 text-center text-tp-encre">
      {erreur ? (
        <div className="max-w-sm rounded-3xl bg-white p-8 shadow-sm">
          <p className="font-title text-xl font-bold">{erreur}</p>
          <Link href="/admin/connexion" className="mt-6 inline-block rounded-2xl bg-tp-bleu px-6 py-3 font-bold text-white">
            Demander un nouveau lien
          </Link>
        </div>
      ) : (
        <p className="font-title text-lg font-bold text-tp-bleu">Connexion en cours…</p>
      )}
    </main>
  );
}
