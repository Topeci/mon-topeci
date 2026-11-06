"use client";

import { useEffect } from "react";
import { capturerSuivi } from "../lib/suivi";

/** Mémorise ?src= et ?amb= dès l'arrivée sur n'importe quelle page. */
export default function SuiviSource() {
  useEffect(() => {
    capturerSuivi();
    // Lien de connexion admin arrivé sur une autre page (adresse de retour par défaut de Supabase)
    const ancre = window.location.hash;
    if (!window.location.pathname.startsWith("/admin") && /(access_token=|error_code=otp_expired)/.test(ancre)) {
      window.location.replace(`/admin/auth${ancre}`);
    }
  }, []);
  return null;
}
