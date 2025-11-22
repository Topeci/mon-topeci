import { createFileRoute } from "@tanstack/react-router";
import { HeaderDashboard } from "../../components/layout/headerDashboard";
import { FooterDashboard } from "../../components/layout/footerDashboard";
import { LockIcon } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeaderDashboard />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="font-bold text-2xl md:text-3xl font-waffle-soft mb-8 text-[#BE356A]">
          Paramètres
        </h2>

        {/* Bloc principal */}
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start md:items-center gap-4">
            <div className="bg-[#BE356A]/10 p-3 rounded-full">
              <LockIcon className="text-[#BE356A] w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                Se déconnecter sur tous les appareils
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1 max-w-lg leading-relaxed">
                Si vous avez perdu un appareil ou si vous avez des problèmes de
                sécurité, déconnectez-vous partout pour assurer la sécurité de
                votre compte.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2">
            <button className="bg-[#BE356A] hover:bg-[#A52A5A] text-white font-medium rounded-full px-6 py-2 transition-colors shadow-md hover:shadow-lg">
              Se déconnecter partout
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vous serez également déconnecté sur cet appareil.
            </p>
          </div>
        </div>
      </main>

      <FooterDashboard />
    </div>
  );
}
