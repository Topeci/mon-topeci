import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Save,
  Upload,
  Eye,
  EyeOff,
  Building,
  User,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/_home/setting")({
  component: SettingsPage,
});

function SettingsPage() {
  // États pour le formulaire
  const [profile, setProfile] = useState({
    fullName: "Marie Koné",
    email: "marie.kone@topeci.com",
  });

  const [company, setCompany] = useState({
    name: "Topeci CI",
    currency: "XOF",
    logo: null as File | null,
  });

  const [preferences, setPreferences] = useState({
    language: "fr",
    theme: "auto",
  });

  // États pour le changement de mot de passe
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompanyChange = (field: string, value: string) => {
    setCompany((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferencesChange = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCompany((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleSave = () => {
    // Simulation de sauvegarde
    console.log("Sauvegarde des paramètres:", {
      profile,
      company,
      preferences,
    });
    alert("Paramètres enregistrés avec succès!");
  };

  const handlePasswordChange = () => {
    if (password.new !== password.confirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    console.log("Changement de mot de passe:", password);
    alert("Mot de passe changé avec succès!");
    setPassword({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez les informations essentielles de votre compte
        </p>
      </div>

      {/* Contenu en disposition horizontale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section Profil */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profil
            </CardTitle>
            <CardDescription>
              Informations personnelles de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input
                id="fullName"
                value={profile.fullName}
                onChange={(e) =>
                  handleProfileChange("fullName", e.target.value)
                }
                placeholder="Votre nom complet"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                placeholder="votre@email.com"
              />
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Changer le mot de passe
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Changer le mot de passe</DialogTitle>
                  <DialogDescription>
                    Entrez votre mot de passe actuel et le nouveau mot de passe
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPasswords.current ? "text" : "password"}
                        value={password.current}
                        onChange={(e) =>
                          setPassword((prev) => ({
                            ...prev,
                            current: e.target.value,
                          }))
                        }
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            current: !prev.current,
                          }))
                        }
                      >
                        {showPasswords.current ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPasswords.new ? "text" : "password"}
                        value={password.new}
                        onChange={(e) =>
                          setPassword((prev) => ({
                            ...prev,
                            new: e.target.value,
                          }))
                        }
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            new: !prev.new,
                          }))
                        }
                      >
                        {showPasswords.new ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirmer le nouveau mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showPasswords.confirm ? "text" : "password"}
                        value={password.confirm}
                        onChange={(e) =>
                          setPassword((prev) => ({
                            ...prev,
                            confirm: e.target.value,
                          }))
                        }
                        placeholder="••••••••"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowPasswords((prev) => ({
                            ...prev,
                            confirm: !prev.confirm,
                          }))
                        }
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setPassword({ current: "", new: "", confirm: "" })
                    }
                  >
                    Annuler
                  </Button>
                  <Button onClick={handlePasswordChange}>
                    Changer le mot de passe
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Section Entreprise */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Entreprise
            </CardTitle>
            <CardDescription>
              Informations relatives à votre entreprise
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nom de l'entreprise</Label>
              <Input
                id="companyName"
                value={company.name}
                onChange={(e) => handleCompanyChange("name", e.target.value)}
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo de l'entreprise</Label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center border">
                  {company.logo ? (
                    <img
                      src={URL.createObjectURL(company.logo)}
                      alt="Logo"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG jusqu'à 2MB
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currency">Devise par défaut</Label>
              <Select
                value={company.currency}
                onValueChange={(value) =>
                  handleCompanyChange("currency", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="XOF">Franc CFA (XOF)</SelectItem>
                  <SelectItem value="EUR">Euro (EUR)</SelectItem>
                  <SelectItem value="USD">Dollar US (USD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Section Préférences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Préférences
            </CardTitle>
            <CardDescription>Personnalisez votre expérience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) =>
                  handlePreferencesChange("language", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Mode d'affichage</Label>
              <Select
                value={preferences.theme}
                onValueChange={(value) =>
                  handlePreferencesChange("theme", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Clair</SelectItem>
                  <SelectItem value="dark">Sombre</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end pt-6">
        <Button onClick={handleSave} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
