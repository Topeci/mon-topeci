"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopierNumeros({ numeros }: { numeros: string[] }) {
  const [fait, setFait] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(numeros.join("\n"));
        setFait(true);
        setTimeout(() => setFait(false), 2500);
      }}
      className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-black/10"
    >
      {fait ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />} {fait ? "Copiés" : "Copier les numéros"}
    </button>
  );
}
