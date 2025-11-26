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
  MessageSquare,
  ShoppingCart,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Crown,
  UserPlus,
  Ban,
  Trash2,
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
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Types
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  ordersCount: number;
  totalSpent: number;
  status: "active" | "inactive";
  customerType: "new" | "loyal" | "premium";
  registrationDate: string;
  lastOrderDate?: string;
  notes?: string;
}

// Données de démonstration
const mockCustomers: Customer[] = [
  {
    id: "CUST-001",
    name: "Mariam Koné",
    email: "mariam.kone@example.com",
    phone: "07 45 89 23 10",
    address: "Cocody Angré 8ᵉ tranche, Abidjan",
    avatar: "MK",
    ordersCount: 12,
    totalSpent: 165000,
    status: "active",
    customerType: "loyal",
    registrationDate: "24 nov. 2025",
    lastOrderDate: "25 nov. 2025",
    notes: "Client fidèle, préfère les paiements en ligne",
  },
  {
    id: "CUST-002",
    name: "Yao Koffi",
    email: "koffi.yao@example.com",
    phone: "05 22 33 11 90",
    address: "Yopougon Maroc, Abidjan",
    avatar: "YK",
    ordersCount: 3,
    totalSpent: 32500,
    status: "inactive",
    customerType: "new",
    registrationDate: "22 nov. 2025",
    lastOrderDate: "23 nov. 2025",
  },
  {
    id: "CUST-003",
    name: "Aïcha Bamba",
    email: "aicha.bamba@example.com",
    phone: "07 89 45 63 21",
    address: "Plateau Rue des Commerce, Abidjan",
    avatar: "AB",
    ordersCount: 25,
    totalSpent: 425000,
    status: "active",
    customerType: "premium",
    registrationDate: "15 nov. 2025",
    lastOrderDate: "24 nov. 2025",
    notes: "Client premium, commandes fréquentes",
  },
  {
    id: "CUST-004",
    name: "Jean Kouassi",
    email: "jean.kouassi@example.com",
    phone: "01 47 85 96 32",
    address: "Koumassi SICOGI, Abidjan",
    avatar: "JK",
    ordersCount: 8,
    totalSpent: 98000,
    status: "active",
    customerType: "loyal",
    registrationDate: "20 nov. 2025",
    lastOrderDate: "25 nov. 2025",
  },
  {
    id: "CUST-005",
    name: "Fatou Traoré",
    email: "fatou.traore@example.com",
    phone: "07 96 85 74 12",
    address: "Marcory Zone 3, Abidjan",
    avatar: "FT",
    ordersCount: 1,
    totalSpent: 12500,
    status: "inactive",
    customerType: "new",
    registrationDate: "21 nov. 2025",
    lastOrderDate: "21 nov. 2025",
  },
  {
    id: "CUST-006",
    name: "Mohamed Diarra",
    email: "mohamed.diarra@example.com",
    phone: "05 11 22 33 44",
    address: "Treichville Marché, Abidjan",
    avatar: "MD",
    ordersCount: 18,
    totalSpent: 275000,
    status: "active",
    customerType: "premium",
    registrationDate: "10 nov. 2025",
    lastOrderDate: "24 nov. 2025",
    notes: "Aime les produits high-tech",
  },
];

// Composants pour les statuts
const StatusBadge = ({ status }: { status: Customer["status"] }) => {
  const statusConfig = {
    active: { label: "Actif", variant: "default" as const },
    inactive: { label: "Inactif", variant: "secondary" as const },
  };

  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

const CustomerTypeBadge = ({ type }: { type: Customer["customerType"] }) => {
  const typeConfig = {
    new: {
      label: "Nouveau",
      icon: UserPlus,
      color: "bg-blue-100 text-blue-800",
    },
    loyal: {
      label: "Fidèle",
      icon: Star,
      color: "bg-green-100 text-green-800",
    },
    premium: {
      label: "Premium",
      icon: Crown,
      color: "bg-purple-100 text-purple-800",
    },
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
    >
      <IconComponent className="h-3 w-3" />
      {config.label}
    </span>
  );
};

// Composant pour formater le montant
const formatAmount = (amount: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Composant pour l'avatar
const CustomerAvatar = ({ name, avatar }: { name: string; avatar: string }) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
        {avatar}
      </AvatarFallback>
    </Avatar>
  );
};

function UsersPage() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filtrage des données
  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    const matchesType =
      typeFilter === "all" || customer.customerType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewProfile = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDateFilter("all");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">
            Gérez vos clients, leurs informations et leur activité
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un client
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
                placeholder="Rechercher par nom, email ou téléphone"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Statut */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>

          {/* Type de client */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Type de client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="new">Nouveau client</SelectItem>
              <SelectItem value="loyal">Client fidèle</SelectItem>
              <SelectItem value="premium">Client premium</SelectItem>
            </SelectContent>
          </Select>

          {/* Date d'inscription */}
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Date d'inscription" />
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
                <TableHead>Client</TableHead>
                <TableHead>Téléphone</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead className="hidden md:table-cell">
                  Montant dépensé
                </TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="hidden md:table-cell">
                  Date d'inscription
                </TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CustomerAvatar
                        name={customer.name}
                        avatar={customer.avatar}
                      />
                      <div className="min-w-0">
                        <div className="font-medium truncate">
                          {customer.name}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                          {customer.email}
                        </div>
                        <div className="md:hidden text-xs mt-1">
                          <CustomerTypeBadge type={customer.customerType} />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{customer.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">
                        {customer.ordersCount}
                      </span>
                      <span className="text-sm text-muted-foreground hidden sm:inline">
                        commande{customer.ordersCount > 1 ? "s" : ""}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="font-medium text-green-600">
                      {formatAmount(customer.totalSpent)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {customer.registrationDate}
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
                        <DropdownMenuItem
                          onClick={() => handleViewProfile(customer)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Voir profil
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Voir commandes
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Envoyer un message
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Ban className="h-4 w-4 mr-2" />
                          {customer.status === "active"
                            ? "Désactiver"
                            : "Activer"}
                        </DropdownMenuItem>
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

      {/* Dialog Détails Client */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <CustomerAvatar
                    name={selectedCustomer.name}
                    avatar={selectedCustomer.avatar}
                  />
                  <div>
                    <div>Profil de {selectedCustomer.name}</div>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <CustomerTypeBadge type={selectedCustomer.customerType} />
                      <StatusBadge status={selectedCustomer.status} />
                    </DialogDescription>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Informations client */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <User className="h-5 w-5" />
                      Informations personnelles
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Email
                          </div>
                          <div>{selectedCustomer.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Téléphone
                          </div>
                          <div>{selectedCustomer.phone}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Adresse
                          </div>
                          <div>{selectedCustomer.address}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Date d'inscription
                          </div>
                          <div>{selectedCustomer.registrationDate}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes internes */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Notes internes
                    </h3>
                    <Textarea
                      placeholder="Ajouter des notes sur ce client..."
                      value={selectedCustomer.notes || ""}
                      className="min-h-24"
                    />
                  </div>
                </div>

                {/* Statistiques et historique */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                      <ShoppingCart className="h-5 w-5" />
                      Activité commerciale
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-primary">
                          {selectedCustomer.ordersCount}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Commandes
                        </div>
                      </div>
                      <div className="bg-muted rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatAmount(selectedCustomer.totalSpent)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total dépensé
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dernière commande */}
                  {selectedCustomer.lastOrderDate && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Dernière commande
                      </h3>
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">
                              Commande #
                              {selectedCustomer.id.replace("CUST", "CMD")}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Le {selectedCustomer.lastOrderDate}
                            </div>
                          </div>
                          <Badge variant="outline">Complétée</Badge>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions rapides */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Actions rapides</h3>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" className="justify-start">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Voir toutes les commandes
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Envoyer un message
                      </Button>
                      <Button className="justify-start">
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier le profil
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Route = createFileRoute("/_home/Users")({
  component: UsersPage,
});
