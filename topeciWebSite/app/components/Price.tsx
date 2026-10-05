"use client";

import { formatPrice, getProductPrice, useMarket } from "../lib/market";

type PriceProps = {
  productId: string;
  className?: string;
};

/** Affiche le prix d'un produit dans la devise du client (FCFA ou €). */
export default function Price({ productId, className }: PriceProps) {
  const [market] = useMarket();

  return (
    <span className={className}>
      {formatPrice(getProductPrice(productId, market), market)}
    </span>
  );
}
