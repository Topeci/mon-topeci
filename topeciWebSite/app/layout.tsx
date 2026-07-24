import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TOPECI - Jouets éducatifs africains",
  description:
    "TOPECI crée des jouets éducatifs et supports audio interactifs pour transmettre les langues, cultures et traditions africaines aux enfants.",
  keywords: [
    "TOPECI",
    "jouets éducatifs africains",
    "livres audio africains",
    "langues africaines",
    "baoulé",
    "dioula",
    "bété",
    "culture africaine",
    "jouets éducatifs Côte d’Ivoire",
  ],
  authors: [{ name: "TOPECI" }],
  creator: "TOPECI",
  publisher: "TOPECI",
  openGraph: {
    title: "TOPECI - Jouets éducatifs africains",
    description:
      "Des jouets audio interactifs pour apprendre les langues africaines, découvrir les cultures locales et grandir connecté à ses racines.",
    siteName: "TOPECI",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/GIF POUR LA SITE DE TOPECI.gif",
        width: 1200,
        height: 630,
        alt: "TOPECI - Grandir connecté à ses racines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TOPECI - Jouets éducatifs africains",
    description:
      "TOPECI propose des jouets éducatifs et livres audio interactifs pour transmettre les langues et cultures africaines aux enfants.",
    images: ["/images/GIF POUR LA SITE DE TOPECI.gif"],
  },
  icons: {
    icon: "/images/Nouveau_Logo_TOPECI_Nouvelle_Couleurs 2.png",
    apple: "/images/Nouveau_Logo_TOPECI_Nouvelle_Couleurs 2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}