"use client";

// Section « Teste le Dino » : démo interactive du lecteur de cartes audio Bété–Français.
// La démo elle-même (page, photo, cartes, sons) est dans public/teste-le-dino/.
// Ce composant l'affiche dans un cadre qui prend automatiquement la bonne hauteur.

import { useEffect, useState } from "react";

type TesteLeDinoProps = {
  /** "haut" : sur la page produit, « Je le veux » remonte vers « Ajouter au panier ». */
  achat?: "haut";
};

export default function TesteLeDino({ achat }: TesteLeDinoProps) {
  const [hauteur, setHauteur] = useState(1250);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      const data = e.data as { topeciDemoHeight?: unknown; topeciDemoBuy?: unknown } | null;
      if (data && typeof data.topeciDemoHeight === "number") {
        setHauteur(Math.ceil(data.topeciDemoHeight));
      }
      if (data && data.topeciDemoBuy === true) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const src = achat === "haut" ? "/teste-le-dino/index.html?achat=haut" : "/teste-le-dino/index.html";

  return (
    <section id="teste-le-dino" aria-label="Teste le Dino avant de l'acheter" className="bg-white">
      <iframe
        src={src}
        title="Teste le Dino avant de l'acheter"
        loading="lazy"
        allow="autoplay"
        className="block w-full border-0"
        style={{ height: hauteur }}
      />
    </section>
  );
}
