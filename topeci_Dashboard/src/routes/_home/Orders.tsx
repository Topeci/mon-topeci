import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Truck,
  Download,
  Trash2,
  RefreshCw,
  X,
  Calendar,
  User,
  Mail,
  MapPin,
  Package,
  CreditCard,
  Smartphone,
  Wallet,
  CheckCircle,
  Clock,
  Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

export const Route = createFileRoute("/_home/Orders")({
  component: RouteComponent,
});

// Types pour les données
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  totalAmount: number;
  currency: string;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "mobile" | "card" | "cash";
  orderDate: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
    deliveryZone?: string;
  };
  timeline: {
    status: Order["status"];
    date: string;
    description: string;
  }[];
}

function RouteComponent() {
  // États pour la gestion des données
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPayment, setSelectedPayment] = useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);

  // États pour les modales
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Données de démonstration
  const mockOrders: Order[] = [
    {
      id: "1",
      orderNumber: "CMD-2025-0012",
      customer: {
        name: "Mariam Koné",
        email: "mariam.kone@example.com",
        phone: "+225 07 12 34 56 78",
      },
      items: [
        {
          id: "1",
          name: "Mon Premier Livre Audio Dioula - Français",
          price: 16500,
          quantity: 1,
          image: "/api/placeholder/60/60",
        },
        {
          id: "2",
          name: "Guide de Conversation Baoulé",
          price: 8900,
          quantity: 1,
          image: "/api/placeholder/60/60",
        },
      ],
      totalAmount: 25400,
      currency: "FCFA",
      status: "paid",
      paymentMethod: "mobile",
      orderDate: "2024-11-23T14:30:00",
      shippingAddress: {
        street: "Rue des Jardins, Cocody Angré",
        city: "Abidjan",
        postalCode: "00225",
        country: "Côte d'Ivoire",
        deliveryZone: "Zone 1",
      },
      timeline: [
        {
          status: "pending",
          date: "2024-11-23T14:30:00",
          description: "Commande créée",
        },
        {
          status: "paid",
          date: "2024-11-23T14:35:00",
          description: "Paiement confirmé",
        },
      ],
    },
    {
      id: "2",
      orderNumber: "CMD-2025-0013",
      customer: {
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        phone: "+225 05 98 76 54 32",
      },
      items: [
        {
          id: "3",
          name: "Cours de Français Débutant",
          price: 12500,
          quantity: 1,
          image: "/api/placeholder/60/60",
        },
      ],
      totalAmount: 12500,
      currency: "FCFA",
      status: "shipped",
      paymentMethod: "card",
      orderDate: "2024-11-22T10:15:00",
      shippingAddress: {
        street: "Av. Marché, Plateau",
        city: "Abidjan",
        postalCode: "00225",
        country: "Côte d'Ivoire",
        deliveryZone: "Zone 2",
      },
      timeline: [
        {
          status: "pending",
          date: "2024-11-22T10:15:00",
          description: "Commande créée",
        },
        {
          status: "paid",
          date: "2024-11-22T10:20:00",
          description: "Paiement confirmé",
        },
        {
          status: "shipped",
          date: "2024-11-23T09:00:00",
          description: "Commande expédiée",
        },
      ],
    },
    {
      id: "3",
      orderNumber: "CMD-2025-0014",
      customer: {
        name: "Sophie Traoré",
        email: "sophie.traore@example.com",
        phone: "+225 01 23 45 67 89",
      },
      items: [
        {
          id: "4",
          name: "Cahier d'Exercices Mathématiques",
          price: 7500,
          quantity: 2,
          image: "/api/placeholder/60/60",
        },
        {
          id: "5",
          name: "Dictionnaire Dioula-Français",
          price: 8900,
          quantity: 1,
          image: "/api/placeholder/60/60",
        },
      ],
      totalAmount: 23900,
      currency: "FCFA",
      status: "delivered",
      paymentMethod: "mobile",
      orderDate: "2024-11-20T16:45:00",
      shippingAddress: {
        street: "Boulevard du Commerce",
        city: "Bouaké",
        postalCode: "00225",
        country: "Côte d'Ivoire",
        deliveryZone: "Intérieur CI",
      },
      timeline: [
        {
          status: "pending",
          date: "2024-11-20T16:45:00",
          description: "Commande créée",
        },
        {
          status: "paid",
          date: "2024-11-20T16:50:00",
          description: "Paiement confirmé",
        },
        {
          status: "shipped",
          date: "2024-11-21T08:30:00",
          description: "Commande expédiée",
        },
        {
          status: "delivered",
          date: "2024-11-23T14:00:00",
          description: "Commande livrée",
        },
      ],
    },
    {
      id: "4",
      orderNumber: "CMD-2025-0015",
      customer: {
        name: "Paul Yao",
        email: "paul.yao@example.com",
        phone: "+225 07 65 43 21 09",
      },
      items: [
        {
          id: "6",
          name: "Cuisine Ivoirienne Traditionnelle",
          price: 9800,
          quantity: 1,
          image: "/api/placeholder/60/60",
        },
      ],
      totalAmount: 9800,
      currency: "FCFA",
      status: "pending",
      paymentMethod: "cash",
      orderDate: "2024-11-24T09:20:00",
      shippingAddress: {
        street: "Rue des Fleurs, Yopougon",
        city: "Abidjan",
        postalCode: "00225",
        country: "Côte d'Ivoire",
        deliveryZone: "Zone 2",
      },
      timeline: [
        {
          status: "pending",
          date: "2024-11-24T09:20:00",
          description: "Commande créée - Paiement à la livraison",
        },
      ],
    },
    {
      id: "5",
      orderNumber: "CMD-2025-0016",
      customer: {
        name: "Alice Bamba",
        email: "alice.bamba@example.com",
        phone: "+225 04 56 78 90 12",
      },
      items: [
        {
          id: "7",
          name: "Cours d'Anglais Business",
          price: 18900,
          quantity: 1,
          image: "/api/placeholder/60/60",
        },
        {
          id: "8",
          name: "Histoire de la Côte d'Ivoire",
          price: 11200,
          quantity: 1,
          image: "/api/placeholder/60/60",
        },
      ],
      totalAmount: 30100,
      currency: "FCFA",
      status: "cancelled",
      paymentMethod: "card",
      orderDate: "2024-11-19T11:30:00",
      shippingAddress: {
        street: "Av. des Banques, Zone 4",
        city: "Marcory",
        postalCode: "00225",
        country: "Côte d'Ivoire",
        deliveryZone: "Zone 2",
      },
      timeline: [
        {
          status: "pending",
          date: "2024-11-19T11:30:00",
          description: "Commande créée",
        },
        {
          status: "cancelled",
          date: "2024-11-19T12:00:00",
          description: "Commande annulée par le client",
        },
      ],
    },
  ];

  // Chargement initial des données
  useEffect(() => {
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filtrage des commandes
  useEffect(() => {
    let filtered = orders.filter(
      (order) =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (selectedPayment !== "all") {
      filtered = filtered.filter(
        (order) => order.paymentMethod === selectedPayment
      );
    }

    // Filtre par date (simplifié)
    if (selectedDate !== "all") {
      const now = new Date();
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.orderDate);
        switch (selectedDate) {
          case "today":
            return orderDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return orderDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return orderDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredOrders(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedPayment, selectedDate, orders]);

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Gestion des actions
  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    console.log("Modifier commande:", order.orderNumber);
    // Implémenter la logique d'édition
  };

  const handleChangeStatus = (order: Order) => {
    console.log("Changer statut:", order.orderNumber);
    // Implémenter la logique de changement de statut
  };

  const handleDownloadInvoice = (order: Order) => {
    console.log("Télécharger facture:", order.orderNumber);
    // Implémenter la logique de téléchargement
  };

  const handleDeleteOrder = (order: Order) => {
    console.log("Supprimer commande:", order.orderNumber);
    // Implémenter la logique de suppression
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedPayment("all");
    setSelectedDate("all");
  };

  const refreshData = () => {
    // Simuler un rafraîchissement des données
    setFilteredOrders([...mockOrders]);
  };

  // Formateurs
  const formatPrice = (price: number, currency: string) => {
    return price.toLocaleString("fr-FR") + " " + currency;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusConfig = (status: Order["status"]) => {
    const configs = {
      pending: {
        label: "En attente",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      paid: {
        label: "Payée",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      shipped: {
        label: "Expédiée",
        color: "bg-violet-100 text-violet-800 border-violet-200",
      },
      delivered: {
        label: "Livrée",
        color: "bg-green-100 text-green-800 border-green-200",
      },
      cancelled: {
        label: "Annulée",
        color: "bg-red-100 text-red-800 border-red-200",
      },
    };
    return configs[status];
  };

  const getPaymentMethodConfig = (method: Order["paymentMethod"]) => {
    const configs = {
      mobile: { label: "Mobile Money", icon: Smartphone },
      card: { label: "Carte bancaire", icon: CreditCard },
      cash: { label: "Espèces", icon: Wallet },
    };
    return configs[method];
  };

  const getStatusIcon = (status: Order["status"]) => {
    const icons = {
      pending: Clock,
      paid: CheckCircle,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: Ban,
    };
    return icons[status];
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Commandes</h2>
          <p className="text-gray-600">
            Suivez, gérez et traitez les commandes de vos clients
          </p>
        </div>

        <Button className="bg-[#BE356A] hover:bg-[#a52e5b] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Créer une commande
        </Button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* Recherche */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Rechercher par client, ID ou numéro de commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filtre Statut */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="paid">Payée</SelectItem>
              <SelectItem value="shipped">Expédiée</SelectItem>
              <SelectItem value="delivered">Livrée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>

          {/* Filtre Paiement */}
          <Select value={selectedPayment} onValueChange={setSelectedPayment}>
            <SelectTrigger>
              <SelectValue placeholder="Paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les paiements</SelectItem>
              <SelectItem value="mobile">Mobile Money</SelectItem>
              <SelectItem value="card">Carte bancaire</SelectItem>
              <SelectItem value="cash">Espèces</SelectItem>
            </SelectContent>
          </Select>

          {/* Filtre Date */}
          <Select value={selectedDate} onValueChange={setSelectedDate}>
            <SelectTrigger>
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les dates</SelectItem>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>

          {/* Boutons d'action */}
          <div className="flex gap-2">
            <Button
              onClick={resetFilters}
              variant="outline"
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={refreshData}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pt-4 border-t border-gray-200">
          {(
            ["pending", "paid", "shipped", "delivered", "cancelled"] as const
          ).map((status) => (
            <div key={status} className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((order) => order.status === status).length}
              </p>
              <p className="text-gray-600 text-sm capitalize">
                {getStatusConfig(status).label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Tableau des commandes */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* En-tête du tableau */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
            <div className="col-span-2">ID Commande</div>
            <div className="col-span-2">Client</div>
            <div className="col-span-1">Produits</div>
            <div className="col-span-1">Montant</div>
            <div className="col-span-1">Statut</div>
            <div className="col-span-2">Paiement</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Corps du tableau */}
        <div className="divide-y divide-gray-200">
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => {
              const statusConfig = getStatusConfig(order.status);
              const paymentConfig = getPaymentMethodConfig(order.paymentMethod);
              const PaymentIcon = paymentConfig.icon;
              const StatusIcon = getStatusIcon(order.status);

              return (
                <div
                  key={order.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* ID Commande */}
                  <div className="col-span-2">
                    <p className="font-medium text-gray-900">
                      {order.orderNumber}
                    </p>
                  </div>

                  {/* Client */}
                  <div className="col-span-2">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900 truncate">
                        {order.customer.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {order.customer.email}
                      </p>
                    </div>
                  </div>

                  {/* Produits */}
                  <div className="col-span-1">
                    <p className="text-gray-600">
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )}{" "}
                      article
                      {order.items.reduce(
                        (total, item) => total + item.quantity,
                        0
                      ) > 1
                        ? "s"
                        : ""}
                    </p>
                  </div>

                  {/* Montant */}
                  <div className="col-span-1">
                    <p className="font-semibold text-gray-900">
                      {formatPrice(order.totalAmount, order.currency)}
                    </p>
                  </div>

                  {/* Statut */}
                  <div className="col-span-1">
                    <Badge className={`${statusConfig.color} border`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>

                  {/* Paiement */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <PaymentIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        {paymentConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {formatDate(order.orderDate)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => openOrderDetails(order)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditOrder(order)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleChangeStatus(order)}
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            Changer le statut
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDownloadInvoice(order)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger facture
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteOrder(order)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucune commande trouvée</p>
              <p className="text-gray-400 mt-2">
                {searchTerm ||
                selectedStatus !== "all" ||
                selectedPayment !== "all" ||
                selectedDate !== "all"
                  ? "Essayez de modifier vos critères de recherche"
                  : "Commencez par créer votre première commande"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Affichage de {indexOfFirstOrder + 1} à{" "}
                {Math.min(indexOfLastOrder, filteredOrders.length)} sur{" "}
                {filteredOrders.length} commandes
              </p>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      } }
                      className={currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""} size={undefined}                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          } }
                          isActive={currentPage === page} size={undefined}                        >
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
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages)
                        );
                      } }
                      className={currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""} size={undefined}                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>

      {/* Modal de détails de la commande */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  Commande {selectedOrder.orderNumber}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Informations client */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Informations client
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Nom :</strong> {selectedOrder.customer.name}
                      </p>
                      <p>
                        <strong>Email :</strong> {selectedOrder.customer.email}
                      </p>
                      <p>
                        <strong>Téléphone :</strong>{" "}
                        {selectedOrder.customer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Adresse de livraison
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>
                        {selectedOrder.shippingAddress.postalCode}{" "}
                        {selectedOrder.shippingAddress.city}
                      </p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                      {selectedOrder.shippingAddress.deliveryZone && (
                        <p>
                          <strong>Zone :</strong>{" "}
                          {selectedOrder.shippingAddress.deliveryZone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Produits */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Produits commandés
                  </h3>
                  <div className="border rounded-lg">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 border-b last:border-b-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatPrice(item.price, selectedOrder.currency)} ×{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {formatPrice(
                            item.price * item.quantity,
                            selectedOrder.currency
                          )}
                        </p>
                      </div>
                    ))}
                    <div className="p-4 bg-gray-50 border-t">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total</span>
                        <span className="text-lg">
                          {formatPrice(
                            selectedOrder.totalAmount,
                            selectedOrder.currency
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paiement et statut */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Moyen de paiement
                    </h3>
                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      {(() => {
                        const PaymentIcon = getPaymentMethodConfig(
                          selectedOrder.paymentMethod
                        ).icon;
                        return (
                          <PaymentIcon className="h-6 w-6 text-gray-600" />
                        );
                      })()}
                      <span className="font-medium">
                        {
                          getPaymentMethodConfig(selectedOrder.paymentMethod)
                            .label
                        }
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Statut actuel
                    </h3>
                    <Badge
                      className={`text-sm py-2 px-3 ${getStatusConfig(selectedOrder.status).color} border`}
                    >
                      {(() => {
                        const StatusIcon = getStatusIcon(selectedOrder.status);
                        return <StatusIcon className="h-4 w-4 mr-2" />;
                      })()}
                      {getStatusConfig(selectedOrder.status).label}
                    </Badge>
                  </div>
                </div>

                {/* Chronologie */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Chronologie</h3>
                  <div className="space-y-3">
                    {selectedOrder.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${
                            getStatusConfig(event.status).color.split(" ")[0]
                          }`}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">
                            {event.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(event.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-6 border-t">
                  <Button
                    onClick={() => handleChangeStatus(selectedOrder)}
                    className="flex-1"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Modifier le statut
                  </Button>
                  <Button
                    onClick={() => handleDownloadInvoice(selectedOrder)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger facture
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
