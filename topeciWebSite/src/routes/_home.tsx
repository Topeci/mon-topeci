import { createFileRoute, Outlet } from "@tanstack/react-router";
import FloatingGift from "../components/layout/FloatingGift";

import { Header } from "../components/layout/header";
import { Footer } from "../components/layout/footer";
import CookiesBanner from "../components/layout/CookieBanner";

export const Route = createFileRoute("/_home")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <Outlet />
      <CookiesBanner />
      <FloatingGift />
      <Footer />
    </div>
  );
}
