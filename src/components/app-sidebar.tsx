"use client";

import type * as React from "react";
import {
  Users,
  User,
  LayoutGrid,
  Codesandbox,
  Trophy,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { TeamSwitcher } from "./team-switcher";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: LayoutGrid,
      isActive: true,
    },
    {
      title: "User list",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Task Category",
      url: "/dashboard/category",
      icon: Codesandbox,
    },
    {
      title: "Challenges",
      url: "/dashboard/challenges",
      icon: Trophy,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
;

  return (
    <Sidebar
      collapsible= "offcanvas" 
      {...props}
    >
      <SidebarContent className="px-4">
        {/* Top: Logo */}
        <TeamSwitcher
          teams={[
            { name: "Main", logo: () => null }, // placeholder, logo already inside TeamSwitcher
          ]}
        />
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            isActive:
              pathname === item.url ||
              (item.url === "/dashboard" && pathname === "/"),
          }))}
        />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
