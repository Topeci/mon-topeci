"use client";

import * as React from "react";
import { LucideIcon } from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import LogoTopeci from "@/assets/images/logotopeci.png";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

type Item = {
  title: string;
  url: string;
  icon: LucideIcon;
};

// Données utilisateur par défaut
const defaultUser = {
  name: "Kengani Alphonse",
  email: "kenganialphonse@example.com",
  avatar: "/avatars/shadcn.jpg",
};

type Props = {
  items: Item[];
  sidebar?: React.ComponentProps<typeof Sidebar>;
};

export function AppSidebar({ items, sidebar }: Props) {
  // const { user } = useAuth(); // Décommentez quand vous aurez votre AuthContext
  const user = defaultUser; // Utilisez les données par défaut pour l'instant

  return (
    <Sidebar
      collapsible="icon"
      className="from-[#018a8cff] to-[#016a6cff] shadow-lg"
      {...sidebar}
    >
      <SidebarHeader className="flex items-center justify-center p-4 group mb-4 mt-3">
        <img
          src={LogoTopeci}
          alt="Topeci Logo"
          className="
      h-12 w-auto 
      transition-all duration-300 object-contain
      group-[.collapsed]:h-10 group-[.collapsed]:w-10 
      group-[.collapsed]:group-hover:h-12 group-[.collapsed]:group-hover:w-12
    "
        />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
