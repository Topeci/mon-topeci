import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import {
  ChartNoAxesCombined,
  User2Icon,
  ShieldPlus,
  HeartHandshakeIcon,
  Settings2Icon,
} from "lucide-react";

export const Route = createFileRoute("/_home")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const pathname = location.pathname;

  // Déclaration des éléments de navigation
  const navMain = [
    {
      title: "Tableau de bord",
      url: "/Dashboard",
      icon: ChartNoAxesCombined,
      isActive: true,
    },
    {
      title: "Clients",
      url: "/Users",
      icon: HeartHandshakeIcon,
    },
    {
      title: "Produits",
      url: "/Products",
      icon: User2Icon,
    },
    {
      title: "Commandes",
      url: "/Orders",
      icon: ShieldPlus,
    },
    {
      title: "Paiements",
      url: "/Payments",
      icon: ShieldPlus,
    },
    {
      title: "Livraisons",
      url: "/Deliveries",
      icon: ShieldPlus,
    },
    {
      title: "Marketing & Contenu",
      url: "/Marketing",
      icon: ShieldPlus,
    },
    {
      title: "Paramètres",
      url: "/setting",
      icon: Settings2Icon,
    },
  ];

  // Fonction pour déterminer le Breadcrumb en fonction de l'URL
  const renderBreadcrumb = () => {
    const breadcrumbs: Record<string, string> = {
      "/Dashboard": "Tableau de bord",
      "/Users": "Clients",
      "/Products": "Produits",
      "/Orders": "Commandes",
      "/setting": "Paramètres",
      "/profil": "Profil",
    };

    const currentTitle = breadcrumbs[pathname] || "Accueil";

    return (
      <>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        {currentTitle !== "Accueil" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-black">
                {currentTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </>
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar items={navMain} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>{renderBreadcrumb()}</BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        {/* Le contenu des pages enfants s'affiche ici */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
