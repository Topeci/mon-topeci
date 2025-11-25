import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeaderDashboard } from "../../components/layout/headerDashboard";
import { FooterDashboard } from "../../components/layout/footerDashboard";
import ReactCountryFlag from "react-country-flag";
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
    email: "",
  });

  const [addresses, setAddresses] = useState<Address[]>([]);

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

  // Liste des pays avec codes et drapeaux
  const countries = [
    { code: "CI", name: "Côte d'Ivoire", flag: "CI" },
    { code: "FR", name: "France", flag: "FR" },
    { code: "CEDEAO", name: "CEDEAO", flag: "CEDEAO" },
    { code: "CA", name: "Canada", flag: "CA" },
    { code: "US", name: "USA", flag: "US" },
    { code: "CH", name: "Suisse", flag: "CH" },
    { code: "BE", name: "Belgique", flag: "BE" },
    { code: "GB", name: "Royaume-Uni", flag: "GB" },
    { code: "IT", name: "Italie", flag: "IT" },
    { code: "ES", name: "Espagne", flag: "ES" },
    { code: "DE", name: "Allemagne", flag: "DE" },
    { code: "NL", name: "Pays-Bas", flag: "NL" },
    { code: "LU", name: "Luxembourg", flag: "LU" },
  ];

  const phoneCodes = [
    { code: "+225", country: "CI", countryName: "Côte d'Ivoire" },
    { code: "+33", country: "FR", countryName: "France" },
    { code: "+1", country: "US", countryName: "États-Unis/Canada" },
    { code: "+32", country: "BE", countryName: "Belgique" },
    { code: "+41", country: "CH", countryName: "Suisse" },
    { code: "+44", country: "GB", countryName: "Royaume-Uni" },
    { code: "+39", country: "IT", countryName: "Italie" },
    { code: "+34", country: "ES", countryName: "Espagne" },
    { code: "+49", country: "DE", countryName: "Allemagne" },
    { code: "+31", country: "NL", countryName: "Pays-Bas" },
    { code: "+352", country: "LU", countryName: "Luxembourg" },
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

  // Fonction pour obtenir le code pays à partir du code téléphonique
  const getCountryFromPhoneCode = (phoneCode: string) => {
    const phoneInfo = phoneCodes.find((phone) => phone.code === phoneCode);
    return phoneInfo ? phoneInfo.country : "CI";
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
              <span className="text-sm font-glacial-indifference font-medium text-gray-500 dark:text-gray-400">
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
              <span className="text-sm font-glacial-indifference font-medium text-gray-500 dark:text-gray-400">
                E-mail
              </span>
            </div>
          </div>
          <span className="text-sm font-glacial-indifference text-gray-900 dark:text-white font-medium">
            {userProfile.email}
          </span>
        </div>

        {/* Section Adresses */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Adresses
            </h2>
            <button
              onClick={handleAddAddress}
              className="flex items-center space-x-2 bg-[#BE356A] text-white px-4 py-2 rounded-lg font-medium transition-colors hover:bg-[#a52e5b]"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une adresse</span>
            </button>
          </div>

          <div className="space-y-6">
            {addresses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 font-glacial-indifference">
                  Aucune adresse enregistrée
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Ajoutez votre première adresse pour faciliter vos achats
                </p>
              </div>
            ) : (
              addresses.map((address) => (
                <div
                  key={address.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      {address.isDefault && (
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Adresse par défaut
                        </span>
                      )}
                      <button
                        onClick={() => handleEditAddress(address)}
                        className="flex items-center space-x-1 text-[#BE356A] transition-colors p-1"
                        title="Modifier l'adresse"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <ReactCountryFlag
                        countryCode={address.country}
                        svg
                        style={{
                          width: "20px",
                          height: "15px",
                        }}
                      />
                      <p className="font-medium text-gray-900 dark:text-white">
                        {
                          countries.find((c) => c.code === address.country)
                            ?.name
                        }
                      </p>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300">
                      {address.firstName} {address.lastName}
                    </p>

                    {address.company && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {address.company}
                      </p>
                    )}

                    <p className="text-gray-700 dark:text-gray-300">
                      {address.address}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300">
                      {address.postalCode} {address.city}
                    </p>

                    <p className="text-gray-700 dark:text-gray-300">
                      {address.phoneCode} {address.phoneNumber}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                    {!address.isDefault && (
                      <>
                        <button
                          onClick={() => handleSetDefaultAddress(address.id)}
                          className="text-sm font-medium text-[#BE356A] hover:text-[#a52e5b] transition-colors"
                        >
                          Définir comme adresse par défaut
                        </button>
                        <span className="text-gray-300">•</span>
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
              ))
            )}
          </div>
        </div>
      </main>

      <FooterDashboard />

      {/* Modal d'édition du profil */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4">
              Modifier le profil
            </h3>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Prénom"
                  value={userProfile.firstName}
                  onChange={(e) =>
                    setUserProfile({
                      ...userProfile,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#BE356A] focus:border-transparent dark:bg-gray-700 dark:text-white font-glacial-indifference"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Nom"
                  value={userProfile.lastName}
                  onChange={(e) =>
                    setUserProfile({ ...userProfile, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#BE356A] focus:border-transparent dark:bg-gray-700 dark:text-white font-glacial-indifference"
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
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#BE356A] focus:border-transparent dark:bg-gray-700 dark:text-white font-glacial-indifference"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-glacial-indifference">
                  Cette adresse e-mail est utilisée pour la connexion et les
                  mises à jour des commandes.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors font-glacial-indifference"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2 bg-[#BE356A] text-white rounded-lg font-medium transition-colors font-glacial-indifference"
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
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">
              {editingAddress ? "Modifier l'adresse" : "Ajouter une adresse"}
            </h3>

            {!editingAddress && (
              <div className="mb-4">
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
                    className="rounded border-gray-300 text-[#BE356A] focus:ring-[#BE356A]"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300 font-glacial-indifference">
                    Définir comme adresse par défaut
                  </span>
                </label>
              </div>
            )}

            <div className="space-y-4">
              {/* Pays avec drapeau */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-glacial-indifference">
                  Pays/région *
                </label>
                <div className="relative">
                  <select
                    value={editingAddress?.country || newAddress.country}
                    onChange={(e) => {
                      const selectedCountry = e.target.value;
                      const countryPhoneCode =
                        phoneCodes.find(
                          (phone) => phone.country === selectedCountry
                        )?.code || "+225";

                      if (editingAddress) {
                        setEditingAddress({
                          ...editingAddress,
                          country: selectedCountry,
                          phoneCode: countryPhoneCode,
                        });
                      } else {
                        setNewAddress({
                          ...newAddress,
                          country: selectedCountry,
                          phoneCode: countryPhoneCode,
                        });
                      }
                    }}
                    className="w-full px-3 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg 
                              focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                              dark:bg-gray-700 dark:text-white appearance-none font-glacial-indifference"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>

                  {/* Drapeau du pays sélectionné */}
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <ReactCountryFlag
                      countryCode={
                        editingAddress?.country || newAddress.country
                      }
                      svg
                      style={{
                        width: "20px",
                        height: "15px",
                      }}
                    />
                  </div>

                  {/* Flèche déroulante */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Prénom et Nom */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Prénom *"
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
                            focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                            dark:bg-gray-700 dark:text-white placeholder-gray-400 font-glacial-indifference"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Nom *"
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
                            focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                            dark:bg-gray-700 dark:text-white placeholder-gray-400 font-glacial-indifference"
                  />
                </div>
              </div>

              {/* Entreprise */}
              <div>
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
                          focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 font-glacial-indifference"
                />
              </div>

              {/* Adresse */}
              <div>
                <input
                  type="text"
                  placeholder="Adresse *"
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
                          focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                          dark:bg-gray-700 dark:text-white placeholder-gray-400 font-glacial-indifference"
                />
              </div>

              {/* Code postal et Ville */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Code postal *"
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
                            focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                            dark:bg-gray-700 dark:text-white placeholder-gray-400 font-glacial-indifference"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Ville *"
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
                            focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                            dark:bg-gray-700 dark:text-white placeholder-gray-400 font-glacial-indifference"
                  />
                </div>
              </div>

              {/* Téléphone avec drapeau et indicatif */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-glacial-indifference">
                  Téléphone *
                </label>
                  {/* Champ numéro de téléphone */}
                  <div className="flex-1">
                    <input
                      type="tel"
                      placeholder="Numéro de téléphone *"
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
                      className="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                              focus:outline-none focus:ring-2 focus:ring-[#BE356A] focus:border-[#BE356A] 
                              dark:bg-gray-700 dark:text-white placeholder-gray-400 font-glacial-indifference"
                    />
                  </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-glacial-indifference">
                  Incluez l'indicatif de votre pays. Exemple: +225 pour la Côte
                  d'Ivoire
                </p>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-3 mt-8">
              {editingAddress && (
                <button
                  onClick={() => handleDeleteAddress(editingAddress.id)}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors w-full sm:w-auto text-center font-glacial-indifference"
                >
                  Supprimer l'adresse
                </button>
              )}

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setIsAddAddressOpen(false);
                    setEditingAddress(null);
                  }}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors w-full sm:w-auto text-center font-glacial-indifference hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveAddress}
                  className="px-6 py-2 bg-[#BE356A] text-white rounded-lg font-medium transition-colors w-full sm:w-auto text-center font-glacial-indifference hover:bg-[#a52e5b]"
                >
                  {editingAddress ? "Modifier" : "Ajouter l'adresse"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
