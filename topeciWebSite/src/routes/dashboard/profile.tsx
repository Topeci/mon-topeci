/**
 * La page "Profil"
 * Espace :Nom, Prénom, Email
 * fontionnalité : Modifier le profil (illustrer par l'icone stylo), un dialog avec l'arriere plan transparent
 * et une petite note sur le formulaire "Cette adresse e-mail est utilisée pour la connexion et les mises à jour des commandes."
 * bouton annuler et enregistrer
 *
 * Espace : Adresses
 * Adresses par défaut cote d'ivoire :
 * ajouter l'adresse : cliquer (ceci est mon adresse par défaut)
 * modifier l'adresse :
 * - (pays/région : NB: selection de tout les pays de A-Z)
 * - prénom , nom, entreprise, adresse, appartement (facultatif), code postal, ville, télphone(indicatif, choix du pays)
 * lien supprimer, annuler, bouton enregister
 */

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeaderDashboard } from "../../components/layout/headerDashboard";
import { FooterDashboard } from "../../components/layout/footerDashboard";

import { Pencil, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard/profile")({
  component: RouteComponent,
});

// Types pour les données
interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
}

interface Address {
  id: string;
  isDefault: boolean;
  country: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  apartment?: string;
  postalCode: string;
  city: string;
  phoneCode: string;
  phoneNumber: string;
}

function RouteComponent() {
  // États pour les données utilisateur
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "jeanmarc.koffi@topecishop.com",
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      isDefault: true,
      country: "CI",
      firstName: "Jean-Marc",
      lastName: "KOFFI",
      company: "TOPECI Shop",
      address: "Plateau, Rue des Commerce",
      apartment: "Bâtiment A, étage 2",
      postalCode: "01 BP",
      city: "Abidjan",
      phoneCode: "+225",
      phoneNumber: "0708070908",
    },
  ]);

  // États pour les modales
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, "id">>({
    isDefault: false,
    country: "CI",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    postalCode: "",
    city: "",
    phoneCode: "+225",
    phoneNumber: "",
  });

  // Liste des pays (exemple)
  const countries = [
    { code: "CI", name: "Côte d'Ivoire" },
    { code: "FR", name: "France" },
    { code: "US", name: "États-Unis" },
    { code: "CA", name: "Canada" },
    { code: "BE", name: "Belgique" },
    { code: "CH", name: "Suisse" },
    { code: "SN", name: "Sénégal" },
    { code: "ML", name: "Mali" },
    { code: "BF", name: "Burkina Faso" },
    { code: "GN", name: "Guinée" },
    // Ajouter tous les pays A-Z...
  ];

  const phoneCodes = [
    { code: "+225", country: "Côte d'Ivoire" },
    { code: "+33", country: "France" },
    { code: "+1", country: "États-Unis/Canada" },
    { code: "+32", country: "Belgique" },
    { code: "+41", country: "Suisse" },
    { code: "+221", country: "Sénégal" },
    { code: "+223", country: "Mali" },
    { code: "+226", country: "Burkina Faso" },
    { code: "+224", country: "Guinée" },
    // Ajouter tous les indicatifs...
  ];

  // Gestionnaires pour le profil
  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = () => {
    // Ici, on ferait un appel API pour sauvegarder
    setIsEditProfileOpen(false);
  };

  // Gestionnaires pour les adresses
  const handleAddAddress = () => {
    setNewAddress({
      isDefault: addresses.length === 0,
      country: "CI",
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      company: "",
      address: "",
      apartment: "",
      postalCode: "",
      city: "",
      phoneCode: "+225",
      phoneNumber: "",
    });
    setIsAddAddressOpen(true);
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      // Modification d'une adresse existante
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress.id ? editingAddress : addr
        )
      );
      setEditingAddress(null);
    } else {
      // Ajout d'une nouvelle adresse
      const addressToAdd: Address = {
        ...newAddress,
        id: Date.now().toString(),
      };
      setAddresses([...addresses, addressToAdd]);
      setIsAddAddressOpen(false);
    }
  };

  const handleDeleteAddress = (addressId: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== addressId));
  };

  const handleSetDefaultAddress = (addressId: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeaderDashboard />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <h2 className="font-bold text-2xl md:text-3xl font-waffle-soft mb-6 md:mb-8 text-[#BE356A]">
          Profil
        </h2>

        {/* Section Profil */}
        <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 md:mb-8">
          {/* Ligne Nom */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-indie-flower font-medium text-gray-500 dark:text-gray-400">
                Nom
              </span>
              <button
                onClick={handleEditProfile}
                className="flex items-center space-x-1 text-[#BE356A] transition-colors p-1"
                title="Modifier le profil"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Ligne Email */}
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-indie-flower font-medium text-gray-500 dark:text-gray-400">
                E-mail
              </span>
            </div>
          </div>
          <span className="text-sm font-indie-flower text-gray-900 dark:text-white font-medium">
            {userProfile.email}
          </span>
        </div>

        {/* Section Adresses - LAISSÉE EXACTEMENT COMME DANS LE CODE ORIGINAL */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mr-15">
              Adresses
            </h2>
            <button
              onClick={handleAddAddress}
              className="flex items-center space-x-2 text-[#BE356A] px-2 py-2 rounded-lg font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter</span>
            </button>
          </div>

          <div className="space-y-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="hover:bg-gray-100 rounded-2xl w-60"
              >
                <div
                  className="flex justify-between items-center"
                  onClick={() => handleEditAddress(address)}
                >
                  {address.isDefault && (
                    <div className="inline-flex items-center space-x-2 py-1 mr-9 text-gray-400 font-indie-flower text-sm font-medium">
                      <span>Adresse par défaut</span>
                      <button className="flex items-center space-x-2 text-[#D68E54] transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-1">
                  <div>
                    <p className="">
                      {countries.find((c) => c.code === address.country)?.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {!address.isDefault && (
                    <>
                      <button
                        onClick={() => handleSetDefaultAddress(address.id)}
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        Définir comme adresse par défaut
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <FooterDashboard />

      {/* Modal d'édition du profil */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg md:text-xl font-indie-flower font-extrabold text-gray-900 dark:text-white mb-4">
              Modifier le profil
            </h3>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="prénom"
                  value={userProfile.firstName}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full font-indie-flower px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#BE356A] focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="nom"
                  value={userProfile.lastName}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, lastName: e.target.value })
                  }
                  className="w-full font-indie-flower px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D68E54] focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="E-mail"
                  value={userProfile.email}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, email: e.target.value })
                  }
                  className="w-full font-indie-flower px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#D68E54] focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs font-indie-flower text-gray-500 dark:text-gray-400 mt-2">
                  Cette adresse e-mail est utilisée pour la connexion et les
                  mises à jour des commandes.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors order-2 sm:order-1"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-[#BE356A] text-white rounded-lg font-medium transition-colors order-1 sm:order-2"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'ajout/modification d'adresse */}
      {(isAddAddressOpen || editingAddress) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-4 md:p-6 w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
              {editingAddress ? "Modifier l'adresse" : "Ajouter une adresse"}
            </h3>
            {!editingAddress && (
              <div className="md:col-span-2 mb-3 font-indie-flower">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newAddress.isDefault}
                    onChange={(e) =>
                      setNewAddress({
                        ...newAddress,
                        isDefault: e.target.checked,
                      })
                    }
                    className="rounded border-gray-300 text-[#D68E54] focus:ring-[#D68E54]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Ceci est mon adresse par défaut
                  </span>
                </label>
              </div>
            )}

            <div className="relative mb-3">
              {/* Texte fixe à l'intérieur du champ */}
              <span className="absolute left-3 top-1.5 text-gray-500 text-xs pointer-events-none font-indie-flower">
                Pays/région *
              </span>

              <select
                value={editingAddress?.country || newAddress.country}
                onChange={(e) =>
                  editingAddress
                    ? setEditingAddress({
                        ...editingAddress,
                        country: e.target.value,
                      })
                    : setNewAddress({
                        ...newAddress,
                        country: e.target.value,
                      })
                }
                className="w-full appearance-none px-3 pt-6 pb-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                            focus:outline-none focus:ring-1 focus:ring-[#BE356A] focus:border-[#BE356A] 
                            dark:bg-gray-700 dark:text-white transition-all duration-200 font-indie-flower text-sm"
              >
                <option value="" disabled hidden>
                  Sélectionnez un pays
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>

              {/* Flèche déroulante */}
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="grid md:grid-cols-2 gap-2 mb-3">
              {/* Champ : Prénom */}
              <div>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={editingAddress?.firstName || newAddress.firstName}
                  onChange={(e) =>
                    editingAddress
                      ? setEditingAddress({
                          ...editingAddress,
                          firstName: e.target.value,
                        })
                      : setNewAddress({
                          ...newAddress,
                          firstName: e.target.value,
                        })
                  }
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:outline-none focus:ring-1 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 transition-all duration-200 font-indie-flower text-sm"
                />
              </div>

              {/* Champ : Nom */}
              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  value={editingAddress?.lastName || newAddress.lastName}
                  onChange={(e) =>
                    editingAddress
                      ? setEditingAddress({
                          ...editingAddress,
                          lastName: e.target.value,
                        })
                      : setNewAddress({
                          ...newAddress,
                          lastName: e.target.value,
                        })
                  }
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:outline-none focus:ring-1 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 transition-all duration-200 font-indie-flower text-sm"
                />
              </div>
            </div>

            {/* Champ : Entreprise */}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Entreprise (facultatif)"
                value={editingAddress?.company || newAddress.company}
                onChange={(e) =>
                  editingAddress
                    ? setEditingAddress({
                        ...editingAddress,
                        company: e.target.value,
                      })
                    : setNewAddress({
                        ...newAddress,
                        company: e.target.value,
                      })
                }
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:outline-none focus:ring-1 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 transition-all duration-200 font-indie-flower text-sm"
              />
            </div>

            {/* Champ : Adresse*/}
            <div className="mb-3">
              <input
                type="text"
                placeholder="Adresse"
                value={editingAddress?.address || newAddress.address}
                onChange={(e) =>
                  editingAddress
                    ? setEditingAddress({
                        ...editingAddress,
                        address: e.target.value,
                      })
                    : setNewAddress({
                        ...newAddress,
                        address: e.target.value,
                      })
                }
                className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:outline-none focus:ring-1 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 transition-all duration-200 font-indie-flower text-sm"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-2 mb-3">
              {/* Champ : Code postal */}
              <div>
                <input
                  type="text"
                  placeholder="Code postal"
                  value={editingAddress?.postalCode || newAddress.postalCode}
                  onChange={(e) =>
                    editingAddress
                      ? setEditingAddress({
                          ...editingAddress,
                          postalCode: e.target.value,
                        })
                      : setNewAddress({
                          ...newAddress,
                          postalCode: e.target.value,
                        })
                  }
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:outline-none focus:ring-1 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 transition-all duration-200 font-indie-flower text-sm"
                />
              </div>

              {/* Champ : Ville*/}
              <div>
                <input
                  type="text"
                  placeholder="Ville"
                  value={editingAddress?.city || newAddress.city}
                  onChange={(e) =>
                    editingAddress
                      ? setEditingAddress({
                          ...editingAddress,
                          city: e.target.value,
                        })
                      : setNewAddress({
                          ...newAddress,
                          city: e.target.value,
                        })
                  }
                  className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                          focus:outline-none focus:ring-1 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 transition-all duration-200 font-indie-flower text-sm"
                />
              </div>
            </div>

            <div className="md:col-span-2 relative">
              <div
                className="flex flex-col border border-gray-300 dark:border-gray-600 rounded-lg 
               focus-within:ring-2 focus-within:ring-[#BE356A] focus-within:border-[#BE356A]
               dark:bg-gray-700 dark:text-white transition-all duration-200 px-3 py-2"
              >
                {/* Titre à l'intérieur du champ */}
                <span className="text-gray-500 text-sm mb-1 font-indie-flower">
                  Téléphone *
                </span>

                <div className="flex items-center space-x-2">
                  {/* Sélecteur pays + indicatif */}
                  <select
                    value={editingAddress?.phoneCode || newAddress.phoneCode}
                    onChange={(e) => {
                      const selectedCode = e.target.value;
                      const selectedCountry =
                        phoneCodes.find((phone) => phone.code === selectedCode)
                          ?.country || "";

                      if (editingAddress) {
                        setEditingAddress({
                          ...editingAddress,
                          phoneCode: selectedCode,
                          country: selectedCountry,
                        });
                      } else {
                        setNewAddress({
                          ...newAddress,
                          phoneCode: selectedCode,
                          country: selectedCountry,
                        });
                      }
                    }}
                    className="bg-transparent text-sm font-indie-flower outline-none cursor-pointer w-[15%]"
                  >
                    {phoneCodes.map((phone) => (
                      <option
                        key={phone.code}
                        value={phone.country}
                        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        {phone.country} ({phone.code})
                      </option>
                    ))}
                  </select>

                  {/* Barre séparatrice */}
                  <span className="text-gray-400">|</span>

                  {/* Champ numéro */}
                  <input
                    type="tel"
                    placeholder="6 12 34 56 78"
                    value={
                      editingAddress?.phoneNumber || newAddress.phoneNumber
                    }
                    onChange={(e) =>
                      editingAddress
                        ? setEditingAddress({
                            ...editingAddress,
                            phoneNumber: e.target.value,
                          })
                        : setNewAddress({
                            ...newAddress,
                            phoneNumber: e.target.value,
                          })
                    }
                    className="flex-1 bg-transparent outline-none placeholder-gray-400 
                   font-indie-flower text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 mt-6">
              {editingAddress && (
                <button
                  onClick={() => handleDeleteAddress(editingAddress.id)}
                  className="text-red-600 hover:text-red-700 font-medium font-indie-flower transition-colors w-full sm:w-auto text-center"
                >
                  Supprimer
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setIsAddAddressOpen(false);
                    setEditingAddress(null);
                  }}
                  className="px-4 py-2 text-gray-600 font-indie-flower dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors w-full sm:w-auto text-center"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="px-6 py-2 bg-[#BE356A] font-indie-flower text-white rounded-lg font-medium transition-colors w-full sm:w-auto text-center"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
