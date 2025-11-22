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
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  Package,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export const Route = createFileRoute("/_home/Dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  // Données simulées - À remplacer par vos appels API
  const statsData = {
    orders: {
      today: 24,
      week: 156,
      month: 642,
      trend: 12, // pourcentage
    },
    revenue: {
      today: 2840,
      week: 18500,
      month: 75200,
      trend: 8, // pourcentage
    },
    visitors: {
      today: 1240,
      week: 8450,
      month: 34200,
      trend: -5, // pourcentage
    },
    outOfStock: 12,
  };

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
      method: "Virement",
      status: "En attente",
      date: "2024-01-14",
    },
  ];

  const recentCustomers = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean@email.com",
      joinDate: "2024-01-15",
      orders: 3,
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie@email.com",
      joinDate: "2024-01-15",
      orders: 1,
    },
    {
      id: 3,
      name: "Pierre Lambert",
      email: "pierre@email.com",
      joinDate: "2024-01-14",
      orders: 7,
    },
  ];

  const stockAlerts = [
    { product: "Smartphone X", stock: 2, minStock: 5 },
    { product: "Casque Audio Pro", stock: 3, minStock: 10 },
    { product: "Souris Gaming", stock: 1, minStock: 8 },
  ];

  const TrendIndicator = ({ value }: { value: number }) => {
    const isPositive = value >= 0;
    return (
      <div
        className={`flex items-center text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
      >
        {isPositive ? (
          <ArrowUp className="h-4 w-4" />
        ) : (
          <ArrowDown className="h-4 w-4" />
        )}
        <span>{Math.abs(value)}%</span>
      </div>
    );
  };

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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Commandes Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.orders.today}</div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
              <TrendIndicator value={statsData.orders.trend} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              <span className="text-muted-foreground">Semaine:</span>
              <span className="font-medium">{statsData.orders.week}</span>
              <span className="text-muted-foreground">Mois:</span>
              <span className="font-medium">{statsData.orders.month}</span>
            </div>
          </CardContent>
        </Card>

        {/* Chiffre d'affaires Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d'affaires
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsData.revenue.today.toLocaleString()} €
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
              <TrendIndicator value={statsData.revenue.trend} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              <span className="text-muted-foreground">Semaine:</span>
              <span className="font-medium">
                {statsData.revenue.week.toLocaleString()} €
              </span>
              <span className="text-muted-foreground">Mois:</span>
              <span className="font-medium">
                {statsData.revenue.month.toLocaleString()} €
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Visiteurs Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Visiteurs</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statsData.visitors.today.toLocaleString()}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">Aujourd'hui</p>
              <TrendIndicator value={statsData.visitors.trend} />
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              <span className="text-muted-foreground">Semaine:</span>
              <span className="font-medium">
                {statsData.visitors.week.toLocaleString()}
              </span>
              <span className="text-muted-foreground">Mois:</span>
              <span className="font-medium">
                {statsData.visitors.month.toLocaleString()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Rupture de stock Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rupture de stock
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {statsData.outOfStock}
            </div>
            <p className="text-xs text-muted-foreground">Produits en rupture</p>
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
                      {order.amount} €
                    </span>
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alertes stocks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertes Stocks
            </CardTitle>
            <CardDescription>Produits avec stock faible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stockAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{alert.product}</p>
                    <p className="text-xs text-muted-foreground">
                      Stock: {alert.stock} (min: {alert.minStock})
                    </p>
                  </div>
                  <Badge variant="destructive" className="whitespace-nowrap">
                    Stock bas
                  </Badge>
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
                      {payment.amount} €
                    </span>
                    <StatusBadge status={payment.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Derniers clients */}
        <Card>
          <CardHeader>
            <CardTitle>Derniers clients</CardTitle>
            <CardDescription>Nouveaux clients inscrits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between border-b pb-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {customer.orders} commande(s)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      Inscrit le{" "}
                      {new Date(customer.joinDate).toLocaleDateString()}
                    </p>
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
