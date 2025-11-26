import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Copy,
  Trash2,
  Image,
  FileText,
  Video,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface Campaign {
  id: string;
  name: string;
  type: "push" | "email" | "ads" | "partnership";
  status: "active" | "scheduled" | "completed";
  duration: string;
  performance: string;
  budget?: number;
  targetAudience?: string;
}

interface Banner {
  id: string;
  title: string;
  image: string;
  displayPage: "home" | "shop" | "product" | "category";
  createdAt: string;
  clicks: number;
  link?: string;
}

interface Content {
  id: string;
  title: string;
  type: "article" | "video" | "post";
  author: string;
  publishedAt: string;
  status: "published" | "draft";
  views?: number;
}

interface PromoCode {
  id: string;
  name: string;
  code: string;
  discountType: "percentage" | "fixed";
  value: number;
  usage: {
    current: number;
    limit: number;
  };
  expirationDate: string;
  status: "active" | "expired" | "disabled";
}

// Données de démonstration
const mockCampaigns: Campaign[] = [
  {
    id: "CAMP-001",
    name: "Soldes de Noël",
    type: "email",
    status: "active",
    duration: "15 déc - 31 déc",
    performance: "+23% ventes",
    budget: 500000,
    targetAudience: "Clients fidèles",
  },
  {
    id: "CAMP-002",
    name: "Lancement Nouveaux Produits",
    type: "push",
    status: "scheduled",
    duration: "01 jan - 15 jan",
    performance: "Planifiée",
    budget: 300000,
  },
  {
    id: "CAMP-003",
    name: "Campagne Partenaires",
    type: "partnership",
    status: "completed",
    duration: "01 nov - 30 nov",
    performance: "+15% ventes",
    budget: 750000,
  },
];

const mockBanners: Banner[] = [
  {
    id: "BAN-001",
    title: "Bannière Accueil - Soldes",
    image: "/banners/soldes-home.jpg",
    displayPage: "home",
    createdAt: "15 déc 2024",
    clicks: 1245,
    link: "/soldes",
  },
  {
    id: "BAN-002",
    title: "Promo Électronique",
    image: "/banners/tech-promo.jpg",
    displayPage: "category",
    createdAt: "10 déc 2024",
    clicks: 876,
    link: "/categories/electronique",
  },
];

const mockContents: Content[] = [
  {
    id: "CONT-001",
    title: "Guide d'achat smartphone 2024",
    type: "article",
    author: "Marie Koné",
    publishedAt: "20 nov 2024",
    status: "published",
    views: 1240,
  },
  {
    id: "CONT-002",
    title: "Tutoriel utilisation application",
    type: "video",
    author: "Jean Traoré",
    publishedAt: "15 nov 2024",
    status: "published",
    views: 2560,
  },
  {
    id: "CONT-003",
    title: "Nouveautés à venir",
    type: "post",
    author: "Aïcha Bamba",
    publishedAt: "25 déc 2024",
    status: "draft",
  },
];

const mockPromoCodes: PromoCode[] = [
  {
    id: "PROMO-001",
    name: "Remise de bienvenue",
    code: "BIENVENUE15",
    discountType: "percentage",
    value: 15,
    usage: { current: 42, limit: 100 },
    expirationDate: "31 jan 2025",
    status: "active",
  },
  {
    id: "PROMO-002",
    name: "Soldes été",
    code: "ETE2024",
    discountType: "fixed",
    value: 5000,
    usage: { current: 89, limit: 200 },
    expirationDate: "15 juil 2024",
    status: "expired",
  },
  {
    id: "PROMO-003",
    name: "Promo flash",
    code: "FLASH20",
    discountType: "percentage",
    value: 20,
    usage: { current: 15, limit: 50 },
    expirationDate: "30 déc 2024",
    status: "active",
  },
];

// Composants pour les statuts et types
const CampaignTypeBadge = ({ type }: { type: Campaign["type"] }) => {
  const typeConfig = {
    push: { label: "Push", color: "bg-blue-100 text-blue-800" },
    email: { label: "Email", color: "bg-green-100 text-green-800" },
    ads: { label: "Publicité", color: "bg-orange-100 text-orange-800" },
    partnership: {
      label: "Partenariat",
      color: "bg-purple-100 text-purple-800",
    },
  };

  const config = typeConfig[type];
  return <Badge className={config.color}>{config.label}</Badge>;
};

const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<
    string,
    {
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
    }
  > = {
    active: { label: "Actif", variant: "default" },
    scheduled: { label: "Planifiée", variant: "secondary" },
    completed: { label: "Terminée", variant: "outline" },
    published: { label: "Publié", variant: "default" },
    draft: { label: "Brouillon", variant: "secondary" },
    expired: { label: "Expiré", variant: "destructive" },
    disabled: { label: "Désactivé", variant: "outline" },
  };

  const config = statusConfig[status] || {
    label: status,
    variant: "outline" as const,
  };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const ContentTypeIcon = ({ type }: { type: Content["type"] }) => {
  const iconConfig = {
    article: FileText,
    video: Video,
    post: FileText,
  };

  const IconComponent = iconConfig[type];
  return <IconComponent className="h-4 w-4" />;
};

function MarketingContentPage() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [banners] = useState<Banner[]>(mockBanners);
  const [contents] = useState<Content[]>(mockContents);
  const [promoCodes] = useState<PromoCode[]>(mockPromoCodes);

  // États pour les dialogs
  const [isCampaignDialogOpen, setIsCampaignDialogOpen] = useState(false);
  const [isBannerDialogOpen, setIsBannerDialogOpen] = useState(false);
  const [isContentDialogOpen, setIsContentDialogOpen] = useState(false);
  const [isPromoCodeDialogOpen, setIsPromoCodeDialogOpen] = useState(false);

  // État pour le formulaire de code promo
  const [promoCodeForm, setPromoCodeForm] = useState({
    name: "",
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    value: 0,
    usageLimit: 100,
    expirationDate: "",
    active: true,
  });

  const handleCreatePromoCode = () => {
    // Ici, on ajouterait la logique pour créer le code promo
    console.log("Création du code promo:", promoCodeForm);
    setIsPromoCodeDialogOpen(false);
    // Reset du formulaire
    setPromoCodeForm({
      name: "",
      code: "",
      discountType: "percentage",
      value: 0,
      usageLimit: 100,
      expirationDate: "",
      active: true,
    });
  };

  const generatePromoCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPromoCodeForm((prev) => ({ ...prev, code }));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Marketing & Contenu
          </h1>
          <p className="text-muted-foreground">
            Gérez les campagnes, bannières, articles et codes promotionnels
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Créer une campagne
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="campaigns">Campagnes</TabsTrigger>
          <TabsTrigger value="banners">Bannières</TabsTrigger>
          <TabsTrigger value="content">Contenu</TabsTrigger>
          <TabsTrigger value="promo-codes">Codes Promo</TabsTrigger>
        </TabsList>

        {/* Onglet Campagnes */}
        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Campagnes Marketing</h2>
            <Button onClick={() => setIsCampaignDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle campagne
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de la campagne</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Durée</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">
                        {campaign.name}
                      </TableCell>
                      <TableCell>
                        <CampaignTypeBadge type={campaign.type} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={campaign.status} />
                      </TableCell>
                      <TableCell>{campaign.duration}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-green-600">
                          <TrendingUp className="h-4 w-4" />
                          {campaign.performance}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Dupliquer
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Bannières */}
        <TabsContent value="banners" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              Bannières Promotionnelles
            </h2>
            <Button onClick={() => setIsBannerDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter bannière
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aperçu</TableHead>
                    <TableHead>Titre</TableHead>
                    <TableHead>Page d'affichage</TableHead>
                    <TableHead>Date d'ajout</TableHead>
                    <TableHead>Clics</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {banners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>
                        <div className="w-16 h-10 bg-muted rounded flex items-center justify-center">
                          <Image className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {banner.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {banner.displayPage}
                        </Badge>
                      </TableCell>
                      <TableCell>{banner.createdAt}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          {banner.clicks.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Contenu */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Contenu Éducatif</h2>
            <Button onClick={() => setIsContentDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer un contenu
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Titre du contenu</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Auteur</TableHead>
                    <TableHead>Date de publication</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contents.map((content) => (
                    <TableRow key={content.id}>
                      <TableCell className="font-medium">
                        {content.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <ContentTypeIcon type={content.type} />
                          <span className="capitalize">{content.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{content.author}</TableCell>
                      <TableCell>{content.publishedAt}</TableCell>
                      <TableCell>
                        <StatusBadge status={content.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Onglet Codes Promo */}
        <TabsContent value="promo-codes" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Codes Promotionnels</h2>
            <Button onClick={() => setIsPromoCodeDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer un code promo
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Type de réduction</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Utilisations</TableHead>
                    <TableHead>Date d'expiration</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promoCodes.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-mono font-bold">
                        {promo.code}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {promo.discountType === "percentage"
                            ? "Pourcentage"
                            : "Montant fixe"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {promo.discountType === "percentage"
                          ? `-${promo.value}%`
                          : `-${promo.value.toLocaleString()} FCFA`}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${(promo.usage.current / promo.usage.limit) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm">
                            {promo.usage.current}/{promo.usage.limit}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {promo.expirationDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={promo.status} />
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              Voir détails
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog pour créer un code promo */}
      <Dialog
        open={isPromoCodeDialogOpen}
        onOpenChange={setIsPromoCodeDialogOpen}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Créer un code promo</DialogTitle>
            <DialogDescription>
              Configurez un nouveau code promotionnel pour vos clients
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom du code</Label>
                <Input
                  id="name"
                  placeholder="Ex: Remise de bienvenue"
                  value={promoCodeForm.name}
                  onChange={(e) =>
                    setPromoCodeForm((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Code promo</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    placeholder="Ex: BIENVENUE15"
                    value={promoCodeForm.code}
                    onChange={(e) =>
                      setPromoCodeForm((prev) => ({
                        ...prev,
                        code: e.target.value.toUpperCase(),
                      }))
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generatePromoCode}
                  >
                    Générer
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discountType">Type de remise</Label>
                <Select
                  value={promoCodeForm.discountType}
                  onValueChange={(value: "percentage" | "fixed") =>
                    setPromoCodeForm((prev) => ({
                      ...prev,
                      discountType: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Pourcentage (%)</SelectItem>
                    <SelectItem value="fixed">Montant fixe (FCFA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">
                  Valeur de la remise
                  {promoCodeForm.discountType === "percentage"
                    ? " (%)"
                    : " (FCFA)"}
                </Label>
                <Input
                  id="value"
                  type="number"
                  min="0"
                  value={promoCodeForm.value}
                  onChange={(e) =>
                    setPromoCodeForm((prev) => ({
                      ...prev,
                      value: Number(e.target.value),
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="usageLimit">Limite d'utilisation</Label>
                <Input
                  id="usageLimit"
                  type="number"
                  min="1"
                  value={promoCodeForm.usageLimit}
                  onChange={(e) =>
                    setPromoCodeForm((prev) => ({
                      ...prev,
                      usageLimit: Number(e.target.value),
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expirationDate">Date d'expiration</Label>
                <Input
                  id="expirationDate"
                  type="date"
                  value={promoCodeForm.expirationDate}
                  onChange={(e) =>
                    setPromoCodeForm((prev) => ({
                      ...prev,
                      expirationDate: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={promoCodeForm.active}
                onCheckedChange={(checked) =>
                  setPromoCodeForm((prev) => ({ ...prev, active: checked }))
                }
              />
              <Label htmlFor="active">Activer immédiatement</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPromoCodeDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button onClick={handleCreatePromoCode}>Créer le code promo</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogs simplifiés pour les autres onglets */}
      <Dialog
        open={isCampaignDialogOpen}
        onOpenChange={setIsCampaignDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle campagne</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Formulaire de création de campagne
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isBannerDialogOpen} onOpenChange={setIsBannerDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une bannière</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Formulaire d'upload de bannière
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isContentDialogOpen} onOpenChange={setIsContentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un contenu</DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Éditeur de contenu</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Route = createFileRoute("/_home/Marketing")({
  component: MarketingContentPage,
});
