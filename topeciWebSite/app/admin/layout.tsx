import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Espace TOPECI", template: "%s | Espace TOPECI" },
  robots: { index: false, follow: false },
};

export default function AdminRacine({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-tp-creme text-tp-encre">{children}</div>;
}
