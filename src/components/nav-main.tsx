"use client";

import type { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    onClick?: () => void;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.url || item.isActive;

          return (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={item.onClick}
                  className={`flex items-center gap-4 rounded-2xl py-6 w-full cursor-pointer text-center ${
                    active
                      ? "text-white bg-[#AD651D]/80 rounded-xl py-6 w-full text-base sm:text-muted font-medium hover:bg-[#AD651D] cursor-pointer hover:text-white"
                      : "text-black hover:bg-[#AD651D] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span className="font-medium">{item.title}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
