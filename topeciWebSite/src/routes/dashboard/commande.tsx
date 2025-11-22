import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HeaderDashboard } from "../../components/layout/headerDashboard";
import { FooterDashboard } from "../../components/layout/footerDashboard";

export const Route = createFileRoute("/dashboard/commande")({
  component: RouteComponent,
});

// Types
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  trackingNumber?: string;
}

function RouteComponent() {
  const [orders, /*setOrder*/] = useState<Order[]>([
    /*
    {
      id: "CMD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 156.5,
      shippingAddress: "123 Rue de Paris, 75001 Paris",
      trackingNumber: "TRK123456789",
      items: [
        {
          id: "1",
          name: "T-shirt Coton Bio",
          quantity: 2,
          price: 29.99,
          image: "/images/tshirt.jpg",
        },
        {
          id: "2",
          name: "Casquette Sport",
          quantity: 1,
          price: 24.99,
          image: "/images/casquette.jpg",
        },
      ],
    },
    {
      id: "CMD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 89.99,
      shippingAddress: "456 Avenue des Champs, 69002 Lyon",
      trackingNumber: "TRK987654321",
      items: [
        {
          id: "3",
          name: "Sac à Dos Éco",
          quantity: 1,
          price: 89.99,
          image: "/images/sac.jpg",
        },
      ],
    },
    {
      id: "CMD-2024-003",
      date: "2024-01-05",
      status: "pending",
      total: 45.5,
      shippingAddress: "789 Boulevard Maritime, 13008 Marseille",
      items: [
        {
          id: "4",
          name: "Gourde Inox",
          quantity: 1,
          price: 25.5,
          image: "/images/gourde.jpg",
        },
        {
          id: "5",
          name: "Stylo Recyclé",
          quantity: 4,
          price: 5.0,
          image: "/images/stylo.jpg",
        },
      ],
    },*/
  ]);

  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // Filtrer les commandes par statut
  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  // Obtenir le libellé du statut
  const getStatusLabel = (status: Order["status"]) => {
    const labels = {
      pending: "En attente",
      confirmed: "Confirmée",
      shipped: "Expédiée",
      delivered: "Livrée",
      cancelled: "Annulée",
    };
    return labels[status];
  };

  // Obtenir la couleur du statut
  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      shipped: "bg-purple-100 text-purple-800 border-purple-200",
      delivered: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status];
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeaderDashboard />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
          <h2 className="font-bold text-2xl md:text-3xl font-waffle-soft text-[#BE356A] mb-4 md:mb-0 font-glacial-indifference">
            Commandes
          </h2>

          {/* Filtres */}
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filtrer par statut :
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#BE356A]"
            >
              <option value="all">Toutes les commandes</option>
              <option value="pending">En attente</option>
              <option value="confirmed">Confirmées</option>
              <option value="shipped">Expédiées</option>
              <option value="delivered">Livrées</option>
              <option value="cancelled">Annulées</option>
            </select>
          </div>
        </div>

        {/* Liste des commandes */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-waffle-soft">
                Aucune commande pour l'instant
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 font-glacial-indifference">
                {selectedStatus === "all"
                  ? "Accédez à la boutique pour passer une commande."
                  : `Aucune commande avec le statut "${getStatusLabel(selectedStatus as Order["status"])}".`}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* En-tête de la commande */}
                <div className="px-4 md:px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-center space-x-4 mb-3 md:mb-0">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Commande
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {order.id}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-gray-200 dark:bg-gray-600"></div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Date
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatDate(order.date)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                      >
                        {getStatusLabel(order.status)}
                      </span>
                      <p className="text-lg font-bold text-[#BE356A]">
                        {order.total.toFixed(2)} €
                      </p>
                    </div>
                  </div>
                </div>

                {/* Articles de la commande */}
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-gray-400"
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
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Quantité: {item.quantity} × {item.price.toFixed(2)}{" "}
                            €
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {(item.quantity * item.price).toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Informations supplémentaires */}
                  <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Adresse de livraison
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {order.shippingAddress}
                      </p>
                    </div>
                    {order.trackingNumber && (
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Numéro de suivi
                        </p>
                        <p className="text-sm text-[#BE356A] font-medium">
                          {order.trackingNumber}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      Voir les détails
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-[#BE356A] bg-white dark:bg-gray-700 border border-[#BE356A] rounded-lg hover:bg-[#BE356A] hover:text-white transition-colors">
                      Télécharger la facture
                    </button>
                    {order.status === "delivered" && (
                      <button className="px-4 py-2 text-sm font-medium text-white bg-[#BE356A] rounded-lg hover:bg-[#a52e5b] transition-colors">
                        Commander à nouveau
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FooterDashboard />
    </div>
  );
}
