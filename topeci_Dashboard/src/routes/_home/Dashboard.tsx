/** 
 * Statistiques clés

Nombre de commandes du jour / semaine / mois

Chiffre d'affaires

Nombre de visiteurs

Produits en rupture de stock

🗂️ Widgets rapides

Dernières commandes
Derniers paiements
Derniers clients

Alertes (ex : stocks bas)
*/

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createFileRoute } from "@tanstack/react-router";
import {
  ShoppingCart,
  Eye,
  Package,
} from "lucide-react";

export const Route = createFileRoute("/_home/Dashboard")({
  component: RouteComponent,
});

function RouteComponent() {

  const recentOrders = [
    {
      id: "#CMD-001",
      customer: "Jean Dupont",
      amount: 149.99,
      status: "Livré",
      date: "2024-01-15",
    },
    {
      id: "#CMD-002",
      customer: "Marie Martin",
      amount: 89.5,
      status: "En cours",
      date: "2024-01-15",
    },
    {
      id: "#CMD-003",
      customer: "Pierre Lambert",
      amount: 234.0,
      status: "Expédié",
      date: "2024-01-14",
    },
    {
      id: "#CMD-004",
      customer: "Sophie Bernard",
      amount: 67.99,
      status: "En cours",
      date: "2024-01-14",
    },
  ];

  const recentPayments = [
    {
      id: "#PAY-001",
      customer: "Jean Dupont",
      amount: 149.99,
      method: "Carte",
      status: "Payé",
      date: "2024-01-15",
    },
    {
      id: "#PAY-002",
      customer: "Marie Martin",
      amount: 89.5,
      method: "PayPal",
      status: "Payé",
      date: "2024-01-15",
    },
    {
      id: "#PAY-003",
      customer: "Pierre Lambert",
      amount: 234.0,
      method: "À la livraison",
      status: "En attente",
      date: "2024-01-14",
    },
  ];



 

  

  const StatusBadge = ({ status }: { status: string }) => {
    const getVariant = (status: string) => {
      switch (status) {
        case "Livré":
        case "Payé":
          return "default";
        case "En cours":
        case "Expédié":
          return "secondary";
        case "En attente":
          return "outline";
        default:
          return "secondary";
      }
    };

    return <Badge variant={getVariant(status)}>{status}</Badge>;
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Grille des statistiques principales */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Commandes Card */}
        <Card className=" from-green-50 to-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <p className="text-center text-xl font-bold">
              {recentOrders.length ?? 0}
            </p>
            <p className="text-center text-muted-foreground ">
              Commandes enregistrés
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visiteurs</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <p className="text-center text-xl font-bold ">
              {recentOrders.length ?? 0}
            </p>
            <p className="text-center text-muted-foreground ">
              Visiteurs enregistrés
            </p>
          </CardContent>
        </Card>

        {/* Rupture de stock Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Stock actuel
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <p className="text-center text-xl font-bold">
              {recentOrders.length ?? 0}
            </p>
            <p className="text-center text-muted-foreground mb-5">
              Stock actuel
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Section Widgets rapides et Alertes */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Dernières commandes */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Dernières commandes</CardTitle>
            <CardDescription>
              Les commandes récentes de votre boutique
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.customer}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">
                      {order.amount} FCFA
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Derniers paiements */}
        <Card>
          <CardHeader>
            <CardTitle>Derniers paiements</CardTitle>
            <CardDescription>Transactions récentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{payment.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.customer}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {payment.method}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">
                      {payment.amount} FCFA
                    </span>
                    <StatusBadge status={payment.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
