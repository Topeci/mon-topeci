import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { UserCircle } from "lucide-react"; // Icône Lucide
import TopeciLogo from "../../assets/images/logotopeci.png";

export function HeaderDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = {
    name: "Jean-Marc KOFFI",
    email: "jeanmarc.koffi@topecishop.com",
    phone: "+225 07 08 07 09 08",
  };

  const navItems = [
    { label: "Boutique", href: "/boutique" },
    { label: "Commandes", href: "/dashboard/commande" },
  ];

  return (
    <header
      className={`bg-white dark:bg-gray-900 w-full mx-0 relative top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-lg" : "shadow-md"
      }`}
    >
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center hover:opacity-80 transition-opacity duration-300"
          >
            <img
              src={TopeciLogo}
              alt="Logo Topeci"
              className="h-10 w-auto md:h-12"
            />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-3 justify-center items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center px-4 py-2 rounded-full font-waffle-soft font-light text-[#BE356A] dark:text-white hover:bg-[#74C6C6] hover:bg-opacity-10 hover:text-white dark:hover:text-white transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Côté droit desktop : profil */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <UserCircle className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              <svg
                className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                ></div>
                <div className="absolute right-0 top-full mt-2 w-68 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <Link
                      to="/dashboard/profile"
                      className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-indie-flower"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profil
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-indie-flower"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Paramètres
                    </Link>
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="px-3 py-2 text-gray-700 font-indie-flower text-sm hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left w-full"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Menu burger mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <nav className="flex flex-col space-y-2 px-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-[#D68E54] dark:hover:text-[#DCCC41] font-medium transition-colors py-2 px-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <hr className="my-2 border-gray-300 dark:border-gray-700" />

              <div className="flex flex-col space-y-1">
                <Link
                  to="/dashboard/profile"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#D68E54] dark:hover:text-[#DCCC41] font-medium transition-colors py-2 px-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profil
                </Link>
                <Link
                  to="/dashboard/settings"
                  className="text-gray-700 dark:text-gray-300 hover:text-[#D68E54] dark:hover:text-[#DCCC41] font-medium transition-colors py-2 px-3 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Paramètres
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors py-2 px-3 rounded-lg text-left"
                >
                  Se déconnecter
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
