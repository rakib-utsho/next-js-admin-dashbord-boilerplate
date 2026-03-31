"use client";

import {
  CircleDollarSign,
  CircleUser,
  Codesandbox,
  LayoutGrid,
  MessageCircleMore,
  MonitorCog,
  ReceiptText,
  ShieldAlert,
  User,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { TeamSwitcher } from "./team-switcher";

const data = {
  main: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutGrid,
      isActive: true,
    },
    {
      title: "Customers",
      url: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Merchants",
      url: "/dashboard/category",
      icon: Codesandbox,
    },
    {
      title: "Invoices",
      url: "/dashboard/invoices",
      icon: ReceiptText,
    },
    {
      title: "Payments & Payouts",
      url: "/dashboard/challenges",
      icon: Wallet,
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: MessageCircleMore,
    },
  ],
  other: [
    {
      title: "Risk Monitoring",
      url: "/dashboard/profile",
      icon: ShieldAlert,
    },
    {
      title: "System Configuration",
      url: "/dashboard/system-configuration",
      icon: MonitorCog,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: CircleUser,
    },
    {
      title: "Access Management",
      url: "/dashboard/access-management",
      icon: UserCog,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="[--sidebar-primary:#10A34B] [--sidebar-primary-foreground:#FFFFFF]"
      {...props}
    >
      <SidebarContent className="px-3 pt-2">
        {/* Top: Logo */}
        <TeamSwitcher
          teams={[
            { name: "Main", logo: () => null }, // placeholder, logo already inside TeamSwitcher
          ]}
        />
        <NavMain
          title="Main"
          items={data.main.map((item) => ({
            ...item,
            isActive:
              pathname === item.url ||
              (item.url === "/dashboard" && pathname === "/"),
          }))}
        />
        <NavMain
          title="Other"
          items={data.other.map((item) => ({
            ...item,
            isActive: pathname === item.url,
          }))}
        />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
