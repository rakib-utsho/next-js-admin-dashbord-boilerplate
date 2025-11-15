"use client"

import type { LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    onClick?: () => void
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.url || item.isActive

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={item.onClick}
                className={`flex items-center gap-4 rounded-2xl py-6 w-full cursor-pointer ${
                  active
                    ? "bg-gradient-to-b from-transparent from-0% via-[#1E1E24] via-10% to-[#1E1E24] to-100% text-[#CFFD4C] hover:bg-[#68182E]/60 shadow-2xl hover:text-[#CFFD4C]"
                    : "text-[black] hover:bg-gradient-to-b hover:from-transparent from-0% via-[#1E1E24] via-10% to-[#1E1E24] to-100% hover:text-[#CFFD4C]"
                }`}
              >
                <a href={item.url} className="flex items-center gap-3">
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span className="font-medium">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
