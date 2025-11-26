import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  CheckCircle,
  RefreshCw,
  X,
  Calendar,
  User,
  Mail,
  CreditCard,
  Smartphone,
  Wallet,
  Landmark,
  Download,
  Link,
  Trash2,
  Clock,
  Ban,
  ArrowLeftRight,
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

export const Route = createFileRoute("/_home/Payments")({
  component: RouteComponent,
});



// Types pour les données
interface Payment {
  id: string;
  paymentId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  orderId: string;
  amount: number;
  currency: string;
  paymentMethod: "mobile" | "card" | "cash" | "transfer";
  status: "pending" | "success" | "failed" | "refunded";
  paymentDate: string;
  transactionId?: string;
  fees: number;
  netAmount: number;
  timeline: {
    status: Payment["status"];
    date: string;
    description: string;
  }[];
}

function RouteComponent() {
  // États pour la gestion des données
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("all");
  const [selectedDate, setSelectedDate] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [paymentsPerPage] = useState(8);

  // États pour les modales
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Données de démonstration
  const mockPayments: Payment[] = [
    {
      id: "1",
      paymentId: "PAY-2025-00891",
      customer: {
        name: "Mariam Koné",
        email: "mariam.kone@example.com",
        phone: "+225 07 12 34 56 78",
      },
      orderId: "CMD-2025-0012",
      amount: 16500,
      currency: "FCFA",
      paymentMethod: "mobile",
      status: "success",
      paymentDate: "2024-11-24T12:40:00",
      transactionId: "TXN-789123",
      fees: 250,
      netAmount: 16250,
      timeline: [
        {
          status: "pending",
          date: "2024-11-24T12:35:00",
          description: "Paiement initié",
        },
        {
          status: "success",
          date: "2024-11-24T12:40:00",
          description: "Paiement confirmé - Mobile Money",
        },
      ],
    },
    {
      id: "2",
      paymentId: "PAY-2025-00892",
      customer: {
        name: "Yao Koffi",
        email: "yao.koffi@example.com",
        phone: "+225 05 98 76 54 32",
      },
      orderId: "CMD-2025-0034",
      amount: 32000,
      currency: "FCFA",
      paymentMethod: "card",
      status: "failed",
      paymentDate: "2024-11-24T09:10:00",
      fees: 0,
      netAmount: 0,
      timeline: [
        {
          status: "pending",
          date: "2024-11-24T09:05:00",
          description: "Tentative de paiement par carte",
        },
        {
          status: "failed",
          date: "2024-11-24T09:10:00",
          description: "Paiement refusé - Fond insuffisant",
        },
      ],
    },
    {
      id: "3",
      paymentId: "PAY-2025-00893",
      customer: {
        name: "Sophie Traoré",
        email: "sophie.traore@example.com",
        phone: "+225 01 23 45 67 89",
      },
      orderId: "CMD-2025-0056",
      amount: 23900,
      currency: "FCFA",
      paymentMethod: "transfer",
      status: "pending",
      paymentDate: "2024-11-23T16:20:00",
      fees: 300,
      netAmount: 23600,
      timeline: [
        {
          status: "pending",
          date: "2024-11-23T16:20:00",
          description: "Virement bancaire en attente de confirmation",
        },
      ],
    },
    {
      id: "4",
      paymentId: "PAY-2025-00894",
      customer: {
        name: "Jean Dupont",
        email: "jean.dupont@example.com",
        phone: "+225 07 65 43 21 09",
      },
      orderId: "CMD-2025-0078",
      amount: 9800,
      currency: "FCFA",
      paymentMethod: "cash",
      status: "success",
      paymentDate: "2024-11-23T14:15:00",
      fees: 0,
      netAmount: 9800,
      timeline: [
        {
          status: "pending",
          date: "2024-11-23T14:10:00",
          description: "Paiement en espèces programmé",
        },
        {
          status: "success",
          date: "2024-11-23T14:15:00",
          description: "Paiement en espèces confirmé",
        },
      ],
    },
    {
      id: "5",
      paymentId: "PAY-2025-00895",
      customer: {
        name: "Alice Bamba",
        email: "alice.bamba@example.com",
        phone: "+225 04 56 78 90 12",
      },
      orderId: "CMD-2025-0091",
      amount: 45000,
      currency: "FCFA",
      paymentMethod: "mobile",
      status: "refunded",
      paymentDate: "2024-11-22T11:30:00",
      transactionId: "TXN-456789",
      fees: 500,
      netAmount: 0,
      timeline: [
        {
          status: "pending",
          date: "2024-11-22T11:25:00",
          description: "Paiement initié",
        },
        {
          status: "success",
          date: "2024-11-22T11:30:00",
          description: "Paiement confirmé",
        },
        {
          status: "refunded",
          date: "2024-11-23T10:00:00",
          description: "Remboursement effectué",
        },
      ],
    },
    {
      id: "6",
      paymentId: "PAY-2025-00896",
      customer: {
        name: "Paul Kouassi",
        email: "paul.kouassi@example.com",
        phone: "+225 08 76 54 32 10",
      },
      orderId: "CMD-2025-0102",
      amount: 18700,
      currency: "FCFA",
      paymentMethod: "card",
      status: "success",
      paymentDate: "2024-11-22T15:45:00",
      transactionId: "TXN-123456",
      fees: 280,
      netAmount: 18420,
      timeline: [
        {
          status: "pending",
          date: "2024-11-22T15:40:00",
          description: "Paiement par carte en cours",
        },
        {
          status: "success",
          date: "2024-11-22T15:45:00",
          description: "Paiement par carte confirmé",
        },
      ],
    },
  ];

  // Chargement initial des données
  useEffect(() => {
    setPayments(mockPayments);
    setFilteredPayments(mockPayments);
  }, []);

  // Filtrage des paiements
  useEffect(() => {
    let filtered = payments.filter(
      (payment) =>
        payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.customer.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (payment) => payment.status === selectedStatus
      );
    }

    if (selectedPaymentMethod !== "all") {
      filtered = filtered.filter(
        (payment) => payment.paymentMethod === selectedPaymentMethod
      );
    }

    // Filtre par date (simplifié)
    if (selectedDate !== "all") {
      const now = new Date();
      filtered = filtered.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate);
        switch (selectedDate) {
          case "today":
            return paymentDate.toDateString() === now.toDateString();
          case "week":
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return paymentDate >= weekAgo;
          case "month":
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return paymentDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredPayments(filtered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedStatus,
    selectedPaymentMethod,
    selectedDate,
    payments,
  ]);

  // Pagination
  const indexOfLastPayment = currentPage * paymentsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );
  const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

  // Gestion des actions
  const openPaymentDetails = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
  };

  const handleMarkAsSuccess = (payment: Payment) => {
    console.log("Marquer comme réussi:", payment.paymentId);
    // Implémenter la logique
  };

  const handleMarkAsRefunded = (payment: Payment) => {
    console.log("Marquer comme remboursé:", payment.paymentId);
    // Implémenter la logique
  };

  const handleDownloadReceipt = (payment: Payment) => {
    console.log("Télécharger reçu:", payment.paymentId);
    // Implémenter la logique
  };

  const handleAssociateOrder = (payment: Payment) => {
    console.log("Associer à une commande:", payment.paymentId);
    // Implémenter la logique
  };

  const handleDeletePayment = (payment: Payment) => {
    console.log("Supprimer paiement:", payment.paymentId);
    // Implémenter la logique
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setSelectedPaymentMethod("all");
    setSelectedDate("all");
  };

  const refreshData = () => {
    // Simuler un rafraîchissement des données
    setFilteredPayments([...mockPayments]);
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

  const getStatusConfig = (status: Payment["status"]) => {
    const configs = {
      pending: {
        label: "En attente",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: Clock,
      },
      success: {
        label: "Réussi",
        color: "bg-green-100 text-green-800 border-green-200",
        icon: CheckCircle,
      },
      failed: {
        label: "Échoué",
        color: "bg-red-100 text-red-800 border-red-200",
        icon: Ban,
      },
      refunded: {
        label: "Remboursé",
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: ArrowLeftRight,
      },
    };
    return configs[status];
  };

  const getPaymentMethodConfig = (method: Payment["paymentMethod"]) => {
    const configs = {
      mobile: { label: "Mobile Money", icon: Smartphone },
      card: { label: "Carte bancaire", icon: CreditCard },
      cash: { label: "Espèces", icon: Wallet },
      transfer: { label: "Virement", icon: Landmark },
    };
    return configs[method];
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Paiements</h2>
          <p className="text-gray-600">
            Suivez et gérez les transactions de vos clients
          </p>
        </div>

        <Button className="bg-[#BE356A] hover:bg-[#a52e5b] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Effectuer un paiement manuel
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
              placeholder="Rechercher par client, ID paiement ou commande..."
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
              <SelectItem value="success">Réussi</SelectItem>
              <SelectItem value="failed">Échoué</SelectItem>
              <SelectItem value="refunded">Remboursé</SelectItem>
            </SelectContent>
          </Select>

          {/* Filtre Méthode de paiement */}
          <Select
            value={selectedPaymentMethod}
            onValueChange={setSelectedPaymentMethod}
          >
            <SelectTrigger>
              <SelectValue placeholder="Méthode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les méthodes</SelectItem>
              <SelectItem value="mobile">Mobile Money</SelectItem>
              <SelectItem value="card">Carte bancaire</SelectItem>
              <SelectItem value="cash">Espèces</SelectItem>
              <SelectItem value="transfer">Virement</SelectItem>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              {payments.length}
            </p>
            <p className="text-gray-600 text-sm">Total paiements</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {payments.filter((p) => p.status === "success").length}
            </p>
            <p className="text-gray-600 text-sm">Paiements réussis</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">
              {payments.filter((p) => p.status === "pending").length}
            </p>
            <p className="text-gray-600 text-sm">En attente</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {payments.filter((p) => p.status === "failed").length}
            </p>
            <p className="text-gray-600 text-sm">Échoués</p>
          </div>
        </div>
      </div>

      {/* Tableau des paiements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* En-tête du tableau */}
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
            <div className="col-span-2 lg:col-span-2">ID Paiement</div>
            <div className="col-span-3 lg:col-span-2">Client</div>
            <div className="hidden lg:block lg:col-span-1">Commande</div>
            <div className="col-span-2 lg:col-span-1">Montant</div>
            <div className="hidden lg:block lg:col-span-1">Méthode</div>
            <div className="col-span-2 lg:col-span-2">Statut</div>
            <div className="hidden lg:block lg:col-span-2">Date</div>
            <div className="col-span-1 lg:col-span-1">Actions</div>
          </div>
        </div>

        {/* Corps du tableau */}
        <div className="divide-y divide-gray-200">
          {currentPayments.length > 0 ? (
            currentPayments.map((payment) => {
              const statusConfig = getStatusConfig(payment.status);
              const paymentMethodConfig = getPaymentMethodConfig(
                payment.paymentMethod
              );
              const StatusIcon = statusConfig.icon;
              const PaymentMethodIcon = paymentMethodConfig.icon;

              return (
                <div
                  key={payment.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  {/* ID Paiement */}
                  <div className="col-span-2 lg:col-span-2">
                    <p className="font-medium text-gray-900 text-sm">
                      {payment.paymentId}
                    </p>
                  </div>

                  {/* Client */}
                  <div className="col-span-3 lg:col-span-2">
                    <div className="space-y-1">
                      <p className="font-medium text-gray-900 truncate text-sm">
                        {payment.customer.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {payment.customer.email}
                      </p>
                    </div>
                  </div>

                  {/* Commande (masqué sur mobile) */}
                  <div className="hidden lg:block lg:col-span-1">
                    <p className="text-gray-600 text-sm">{payment.orderId}</p>
                  </div>

                  {/* Montant */}
                  <div className="col-span-2 lg:col-span-1">
                    <p className="font-semibold text-gray-900 text-sm">
                      {formatPrice(payment.amount, payment.currency)}
                    </p>
                  </div>

                  {/* Méthode (masqué sur mobile) */}
                  <div className="hidden lg:block lg:col-span-1">
                    <div className="flex items-center gap-2">
                      <PaymentMethodIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 text-sm">
                        {paymentMethodConfig.label}
                      </span>
                    </div>
                  </div>

                  {/* Statut */}
                  <div className="col-span-2 lg:col-span-2">
                    <Badge className={`text-xs ${statusConfig.color} border`}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusConfig.label}
                    </Badge>
                  </div>

                  {/* Date (masqué sur mobile) */}
                  <div className="hidden lg:block lg:col-span-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {formatDate(payment.paymentDate)}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 lg:col-span-1">
                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => openPaymentDetails(payment)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Voir détail
                          </DropdownMenuItem>
                          {payment.status !== "success" && (
                            <DropdownMenuItem
                              onClick={() => handleMarkAsSuccess(payment)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Marquer comme réussi
                            </DropdownMenuItem>
                          )}
                          {payment.status === "success" && (
                            <DropdownMenuItem
                              onClick={() => handleMarkAsRefunded(payment)}
                            >
                              <ArrowLeftRight className="h-4 w-4 mr-2" />
                              Marquer comme remboursé
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDownloadReceipt(payment)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Télécharger reçu PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAssociateOrder(payment)}
                          >
                            <Link className="h-4 w-4 mr-2" />
                            Associer à une commande
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeletePayment(payment)}
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
              <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucun paiement trouvé</p>
              <p className="text-gray-400 mt-2">
                {searchTerm ||
                selectedStatus !== "all" ||
                selectedPaymentMethod !== "all" ||
                selectedDate !== "all"
                  ? "Essayez de modifier vos critères de recherche"
                  : "Aucune transaction pour le moment"}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredPayments.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Affichage de {indexOfFirstPayment + 1} à{" "}
                {Math.min(indexOfLastPayment, filteredPayments.length)} sur{" "}
                {filteredPayments.length} paiements
              </p>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage((prev) => Math.max(prev - 1, 1));
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setCurrentPage(page);
                          }}
                          isActive={currentPage === page}
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
                        setCurrentPage((prev) =>
                          Math.min(prev + 1, totalPages)
                        );
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
      </div>

      {/* Modal de détails du paiement */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPayment && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <CreditCard className="h-6 w-6" />
                  Paiement {selectedPayment.paymentId}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Informations du paiement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Informations du paiement
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">ID Paiement:</span>
                        <span className="font-medium">
                          {selectedPayment.paymentId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Montant:</span>
                        <span className="font-semibold text-lg">
                          {formatPrice(
                            selectedPayment.amount,
                            selectedPayment.currency
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Frais:</span>
                        <span className="text-red-600">
                          -
                          {formatPrice(
                            selectedPayment.fees,
                            selectedPayment.currency
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-500 font-medium">
                          Net perçu:
                        </span>
                        <span className="font-semibold text-green-600">
                          {formatPrice(
                            selectedPayment.netAmount,
                            selectedPayment.currency
                          )}
                        </span>
                      </div>
                      {selectedPayment.transactionId && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Transaction ID:</span>
                          <span className="font-mono text-xs">
                            {selectedPayment.transactionId}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Statut et méthode
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Statut actuel
                        </p>
                        <Badge
                          className={`text-sm py-2 px-3 ${getStatusConfig(selectedPayment.status).color} border`}
                        >
                          {(() => {
                            const StatusIcon = getStatusConfig(
                              selectedPayment.status
                            ).icon;
                            return <StatusIcon className="h-4 w-4 mr-2" />;
                          })()}
                          {getStatusConfig(selectedPayment.status).label}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Méthode de paiement
                        </p>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          {(() => {
                            const PaymentMethodIcon = getPaymentMethodConfig(
                              selectedPayment.paymentMethod
                            ).icon;
                            return (
                              <PaymentMethodIcon className="h-5 w-5 text-gray-600" />
                            );
                          })()}
                          <span className="font-medium">
                            {
                              getPaymentMethodConfig(
                                selectedPayment.paymentMethod
                              ).label
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations du client */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Informations client
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Nom :</strong> {selectedPayment.customer.name}
                      </p>
                      <p>
                        <strong>Email :</strong>{" "}
                        {selectedPayment.customer.email}
                      </p>
                      <p>
                        <strong>Téléphone :</strong>{" "}
                        {selectedPayment.customer.phone}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">
                      Commande associée
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>ID Commande :</strong> {selectedPayment.orderId}
                      </p>
                      <p>
                        <strong>Date du paiement :</strong>{" "}
                        {formatDate(selectedPayment.paymentDate)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chronologie */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Historique du paiement
                  </h3>
                  <div className="space-y-3">
                    {selectedPayment.timeline.map((event, index) => (
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
                    onClick={() => handleDownloadReceipt(selectedPayment)}
                    className="flex-1"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger reçu PDF
                  </Button>
                  <Button
                    onClick={() => handleMarkAsSuccess(selectedPayment)}
                    variant="outline"
                    className="flex-1"
                    disabled={selectedPayment.status === "success"}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Marquer comme réussi
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


