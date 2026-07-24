"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, CircleUserRound, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Boutique", href: "/boutique" },
  { label: "Notre Histoire", href: "/notre-histoire" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

type CartProduct = {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const updateCartQuantity = () => {
    const savedCart = localStorage.getItem("topeci_cart_items");
    const cart: CartProduct[] = savedCart ? JSON.parse(savedCart) : [];

    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartQuantity(totalQuantity);
  };

  useEffect(() => {
    updateCartQuantity();

    window.addEventListener("topeci-cart-updated", updateCartQuantity);
    window.addEventListener("storage", updateCartQuantity);

    return () => {
      window.removeEventListener("topeci-cart-updated", updateCartQuantity);
      window.removeEventListener("storage", updateCartQuantity);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-white shadow-sm">
      <div className="flex h-[88px] items-center justify-between px-5 lg:px-10">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="relative h-[80px] w-[240px] shrink-0"
          aria-label="Accueil TOPECI"
        >
          <Image
            src="/images/Nouveau_Logo_TOPECI_Nouvelle_Couleurs.png"
            alt="Logo TOPECI"
            fill
            priority
            className="object-contain object-left scale-110"
          />
        </Link>

        <nav className="hidden items-center gap-9 font-title text-base font-bold text-[#c72f73] lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#D98B5F]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 text-[#dfcf2c] md:flex">
          <Link href="/mon-panier" aria-label="Mon panier" className="relative">
            <ShoppingCart size={29} strokeWidth={2.5} />

            {cartQuantity > 0 && (
              <span className="absolute -right-3 -top-3 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#D93B7B] px-1.5 text-xs font-bold text-white">
                {cartQuantity}
              </span>
            )}
          </Link>

          <Link href="/connexion" aria-label="Connexion">
            <CircleUserRound size={29} strokeWidth={2.5} />
          </Link>

          <div className="h-9 w-[4px] rounded-full bg-[#df8b57]" />
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF9F1] text-[#D93B7B] lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-black/10 bg-white px-5 py-5 shadow-md lg:hidden">
          <nav className="grid gap-4 font-title text-base font-bold text-[#c72f73]">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl bg-[#FFF9F1] px-4 py-3 transition hover:text-[#D98B5F]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-5 flex items-center gap-4 text-[#dfcf2c]">
            <Link
              href="/mon-panier"
              onClick={() => setOpen(false)}
              className="relative flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#F2C94C] px-4 py-3 font-semibold"
            >
              <ShoppingCart size={22} />
              Panier

              {cartQuantity > 0 && (
                <span className="ml-1 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#D93B7B] px-1.5 text-xs font-bold text-white">
                  {cartQuantity}
                </span>
              )}
            </Link>

            <Link
              href="/connexion"
              onClick={() => setOpen(false)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#F2C94C] px-4 py-3 font-semibold"
            >
              <CircleUserRound size={22} />
              Connexion
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}