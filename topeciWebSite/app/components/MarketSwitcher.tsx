"use client";

import { MARKETS, type Market, useMarket } from "../lib/market";

type MarketSwitcherProps = {
  /** "compact" pour l'en-tête, "full" pour la boutique et le panier */
  variant?: "compact" | "full";
  className?: string;
};

const ORDER: Market[] = ["CI", "EUR"];

export default function MarketSwitcher({
  variant = "compact",
  className = "",
}: MarketSwitcherProps) {
  const [market, setMarket] = useMarket();

  if (variant === "compact") {
    return (
      <div
        role="radiogroup"
        aria-label="Pays de commande"
        className={`flex shrink-0 overflow-hidden rounded-full border border-[#79C8C7]/60 bg-white text-xs font-bold ${className}`}
      >
        {ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={market === key}
            aria-label={`Commander depuis ${MARKETS[key].label}`}
            onClick={() => setMarket(key)}
            className={`flex items-center gap-1 px-2.5 py-1.5 transition sm:px-3 ${
              market === key
                ? "bg-[#79C8C7] text-white"
                : "text-slate-600 hover:bg-[#79C8C7]/15"
            }`}
          >
            <span aria-hidden>{MARKETS[key].flag}</span>
            {MARKETS[key].short}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="text-sm font-semibold text-slate-600">
        Je commande depuis :
      </p>
      <div
        role="radiogroup"
        aria-label="Pays de commande"
        className="mt-2 grid grid-cols-2 gap-2"
      >
        {ORDER.map((key) => (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={market === key}
            onClick={() => setMarket(key)}
            className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition sm:text-base ${
              market === key
                ? "border-[#79C8C7] bg-[#79C8C7]/10 text-[#1E1E1E]"
                : "border-slate-200 bg-white text-slate-600 hover:border-[#79C8C7]/50"
            }`}
          >
            <span aria-hidden className="text-lg">
              {MARKETS[key].flag}
            </span>
            <span className="text-left leading-tight">
              {MARKETS[key].label}
              <span className="block text-xs font-semibold text-slate-500">
                Prix en {MARKETS[key].currency}
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
