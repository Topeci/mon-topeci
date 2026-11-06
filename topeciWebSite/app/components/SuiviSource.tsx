"use client";

import { useEffect } from "react";
import { capturerSuivi } from "../lib/suivi";

/** Mémorise ?src= et ?amb= dès l'arrivée sur n'importe quelle page. */
export default function SuiviSource() {
  useEffect(() => {
    capturerSuivi();
  }, []);
  return null;
}
