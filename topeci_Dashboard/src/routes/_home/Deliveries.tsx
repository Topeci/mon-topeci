import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Truck,
  Download,
  Trash2,
  Calendar,
  MapPin,
  User,
  Package,
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Types
interface Delivery {
  id: string;
  orderId: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  address: string;
  deliveryMode: "standard" | "express" | "relay" | "pickup";
  carrier: string;
  status: "preparation" | "transit" | "delivered" | "failed" | "returned";
  shipmentDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

// Données de démonstration
const mockDeliveries: Delivery[] = [
  {
    id: "LIV-2025-0045",
    orderId: "CMD-2025-0012",
    customer: {
      name: "Mariam Koné",
      phone: "07 45 89 23 10",
      email: "mariam.kone@example.com",
    },
    address: "Cocody Angré 8ᵉ tranche, Abidjan",
    deliveryMode: "express",
    carrier: "Topeci Express",
    status: "transit",
    shipmentDate: "24 nov. 2025 – 14:10",
    estimatedDelivery: "25 nov. 2025 – 16:00",
    trackingNumber: "TRK789456123",
  },
  {
    id: "LIV-2025-0046",
    orderId: "CMD-2025-0041",
    customer: {
      name: "Yao Koffi",
      phone: "05 32 78 45 12",
      email: "yao.koffi@example.com",
    },
    address: "Yopougon Maroc, Abidjan",
    deliveryMode: "standard",
    carrier: "Partenaire Local",
    status: "delivered",
    shipmentDate: "23 nov. 2025 – 09:20",
    estimatedDelivery: "25 nov. 2025 – 18:00",
  },
  {
    id: "LIV-2025-0047",
    orderId: "CMD-2025-0038",
    customer: {
      name: "Aïcha Bamba",
      phone: "07 89 45 63 21",
      email: "aicha.bamba@example.com",
    },
    address: "Plateau Rue des Commerce, Abidjan",
    deliveryMode: "relay",
    carrier: "Topeci Express",
    status: "preparation",
    shipmentDate: "25 nov. 2025 – 10:32",
  },
  {
    id: "LIV-2025-0048",
    orderId: "CMD-2025-0025",
    customer: {
      name: "Jean Kouassi",
      phone: "01 47 85 96 32",
      email: "jean.kouassi@example.com",
    },
    address: "Koumassi SICOGI, Abidjan",
    deliveryMode: "pickup",
    carrier: "Livraison Interne",
    status: "failed",
    shipmentDate: "22 nov. 2025 – 15:45",
  },
  {
    id: "LIV-2025-0049",
    orderId: "CMD-2025-0018",
    customer: {
      name: "Fatou Traoré",
      phone: "07 96 85 74 12",
      email: "fatou.traore@example.com",
    },
    address: "Marcory Zone 3, Abidjan",
    deliveryMode: "express",
    carrier: "Topeci Express",
    status: "returned",
    shipmentDate: "21 nov. 2025 – 11:20",
  },
];

// Composants pour les statuts
const StatusBadge = ({ status }: { status: Delivery["status"] }) => {
  const statusConfig = {
    preparation: { label: "En préparation", variant: "secondary" as const },
    transit: { label: "En transit", variant: "default" as const },
    delivered: { label: "Livrée", variant: "default" as const },
    failed: { label: "Échouée", variant: "destructive" as const },
    returned: { label: "Retournée", variant: "outline" as const },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const DeliveryModeBadge = ({ mode }: { mode: Delivery["deliveryMode"] }) => {
  const modeConfig = {
    standard: { label: "Standard", color: "bg-blue-100 text-blue-800" },
    express: { label: "Express", color: "bg-orange-100 text-orange-800" },
    relay: { label: "Point relais", color: "bg-green-100 text-green-800" },
    pickup: { label: "Retrait agence", color: "bg-purple-100 text-purple-800" },
  };

  const config = modeConfig[mode];
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
};

// Composant Timeline pour les détails
const DeliveryTimeline = ({ status }: { status: Delivery["status"] }) => {
  const steps = [
    { key: "preparation", label: "Commande confirmée" },
    { key: "preparation", label: "En préparation" },
    { key: "transit", label: "Expédiée" },
    { key: "transit", label: "En transit" },
    { key: "delivered", label: "Livrée" },
  ];

  const getStatusIndex = (status: Delivery["status"]) => {
    const statusOrder = [
      "preparation",
      "transit",
      "delivered",
      "failed",
      "returned",
    ];
    return statusOrder.indexOf(status);
  };

  const currentIndex = getStatusIndex(status);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.label} className="flex items-center space-x-3">
            <div
              className={`flex-shrink-0 w-3 h-3 rounded-full border-2 ${
                isCompleted
                  ? "bg-green-500 border-green-500"
                  : "bg-gray-200 border-gray-300"
              }`}
            />
            <div
              className={`text-sm ${
                isCompleted ? "text-green-600 font-medium" : "text-gray-500"
              }`}
            >
              {step.label}
              {isCurrent && (
                <span className="ml-2 text-xs text-orange-600">(En cours)</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

function DeliveriesPage() {
  const [deliveries] = useState<Delivery[]>(mockDeliveries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modeFilter, setModeFilter] = useState<string>("all");
  const [carrierFilter, setCarrierFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filtrage des données
  const filteredDeliveries = deliveries.filter((delivery) => {
    const matchesSearch =
      delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.customer.phone.includes(searchTerm) ||
      delivery.customer.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || delivery.status === statusFilter;
    const matchesMode =
      modeFilter === "all" || delivery.deliveryMode === modeFilter;
    const matchesCarrier =
      carrierFilter === "all" || delivery.carrier === carrierFilter;

    return matchesSearch && matchesStatus && matchesMode && matchesCarrier;
  });

  // Pagination
  const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);
  const paginatedDeliveries = filteredDeliveries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    setIsDetailsOpen(true);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setModeFilter("all");
    setCarrierFilter("all");
    setDateFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Livraisons</h1>
          <p className="text-muted-foreground">
            Gérez l'expédition et le suivi des commandes clients
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Créer une livraison
        </Button>
      </div>

      {/* Filtres */}
      <div className="bg-card rounded-lg border p-4 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Recherche */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par client, commande ou ID livraison"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetFilters}>
              <Filter className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Filtres avancés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Statut */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut livraison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="preparation">En préparation</SelectItem>
              <SelectItem value="transit">En transit</SelectItem>
              <SelectItem value="delivered">Livrée</SelectItem>
              <SelectItem value="failed">Échouée</SelectItem>
              <SelectItem value="returned">Retournée</SelectItem>
            </SelectContent>
          </Select>

          {/* Mode de livraison */}
          <Select value={modeFilter} onValueChange={setModeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Mode livraison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les modes</SelectItem>
              <SelectItem value="standard">Livraison standard</SelectItem>
              <SelectItem value="express">Livraison express</SelectItem>
              <SelectItem value="relay">Point relais</SelectItem>
              <SelectItem value="pickup">Retrait en agence</SelectItem>
            </SelectContent>
          </Select>

          {/* Transporteur */}
          <Select value={carrierFilter} onValueChange={setCarrierFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Transporteur" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les transporteurs</SelectItem>
              <SelectItem value="Topeci Express">Topeci Express</SelectItem>
              <SelectItem value="Partenaire Local">Partenaire Local</SelectItem>
              <SelectItem value="Livraison Interne">
                Livraison Interne
              </SelectItem>
            </SelectContent>
          </Select>

          {/* Date */}
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-card rounded-lg border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Livraison</TableHead>
                <TableHead>Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Transporteur</TableHead>
                <TableHead>Date expédition</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.id}</TableCell>
                  <TableCell>{delivery.orderId}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {delivery.customer.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {delivery.customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className="max-w-[200px] truncate"
                      title={delivery.address}
                    >
                      {delivery.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DeliveryModeBadge mode={delivery.deliveryMode} />
                  </TableCell>
                  <TableCell>{delivery.carrier}</TableCell>
                  <TableCell>{delivery.shipmentDate}</TableCell>
                  <TableCell>
                    <StatusBadge status={delivery.status} />
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
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(delivery)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir détails
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="h-4 w-4 mr-2" />
                          Changer le statut
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Télécharger bordereau
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" />
                          Assigner un livreur
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
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.max(prev - 1, 1));
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={currentPage === page}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Dialog Détails */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDelivery && (
            <>
              <DialogHeader>
                <DialogTitle>
                  Détails de la livraison {selectedDelivery.id}
                </DialogTitle>
                <DialogDescription>
                  Commande {selectedDelivery.orderId} •{" "}
                  {selectedDelivery.customer.name}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations client */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations client
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Nom :</span>{" "}
                      {selectedDelivery.customer.name}
                    </div>
                    <div>
                      <span className="font-medium">Téléphone :</span>{" "}
                      {selectedDelivery.customer.phone}
                    </div>
                    <div>
                      <span className="font-medium">Email :</span>{" "}
                      {selectedDelivery.customer.email}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold flex items-center gap-2 mt-6">
                    <MapPin className="h-5 w-5" />
                    Adresse de livraison
                  </h3>
                  <p>{selectedDelivery.address}</p>

                  {selectedDelivery.trackingNumber && (
                    <>
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Suivi
                      </h3>
                      <div>
                        <span className="font-medium">N° de suivi :</span>{" "}
                        {selectedDelivery.trackingNumber}
                      </div>
                    </>
                  )}
                </div>

                {/* Chronologie et statut */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Statut actuel</h3>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={selectedDelivery.status} />
                    <Button variant="outline" size="sm">
                      Modifier le statut
                    </Button>
                  </div>

                  <h3 className="text-lg font-semibold mt-6">
                    Chronologie de livraison
                  </h3>
                  <DeliveryTimeline status={selectedDelivery.status} />

                  <h3 className="text-lg font-semibold flex items-center gap-2 mt-6">
                    <Truck className="h-5 w-5" />
                    Transporteur
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Transporteur :</span>{" "}
                      {selectedDelivery.carrier}
                    </div>
                    <div>
                      <span className="font-medium">Mode :</span>{" "}
                      <DeliveryModeBadge mode={selectedDelivery.deliveryMode} />
                    </div>
                    <div>
                      <span className="font-medium">Date d'expédition :</span>{" "}
                      {selectedDelivery.shipmentDate}
                    </div>
                    {selectedDelivery.estimatedDelivery && (
                      <div>
                        <span className="font-medium">Livraison estimée :</span>{" "}
                        {selectedDelivery.estimatedDelivery}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger bordereau
                </Button>
                <Button>Modifier la livraison</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Route = createFileRoute("/_home/Deliveries")({
  component: DeliveriesPage,
});
