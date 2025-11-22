"use client";

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift() || null;
  return null;
}

function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${value}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
}

export default function CookiesBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    setCookie("cookie_consent", "accepted", 180); // 6 mois
    setVisible(false);
  };

  const decline = () => {
    setCookie("cookie_consent", "declined", 180);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[1000]">
      <div className="mx-auto max-w-screen-xl px-4 py-4">
        <div className="rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-xl border border-black/10 dark:border-white/10 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm sm:text-base">
            Nous utilisons des cookies pour améliorer votre expérience.{" "}
            <Link href="/cookies" className="underline" to={"."}>
              En savoir plus
            </Link>
            .
          </p>
          <div className="flex items-center gap-3 sm:ml-auto">
            <button
              onClick={decline}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Refuser
            </button>
            <button
              onClick={accept}
              className="px-4 py-2 text-sm rounded-md bg-teal-600 text-white hover:bg-teal-700 transition"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
