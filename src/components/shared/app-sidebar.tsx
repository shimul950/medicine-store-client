"use client" // IMPORTANT: make this file client-side only

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Route } from "@/types"

// Import Sidebar components dynamically to avoid SSR issues
const Sidebar = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.Sidebar), { ssr: false })
const SidebarContent = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarContent), { ssr: false })
const SidebarGroup = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarGroup), { ssr: false })
const SidebarGroupLabel = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarGroupLabel), { ssr: false })
const SidebarGroupContent = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarGroupContent), { ssr: false })
const SidebarMenu = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarMenu), { ssr: false })
const SidebarMenuItem = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarMenuItem), { ssr: false })
const SidebarMenuButton = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarMenuButton), { ssr: false })
const SidebarRail = dynamic(() => import("@/components/ui/sidebar").then(mod => mod.SidebarRail), { ssr: false })

import { adminRoutes } from "@/routes/adminRoutes"
import { userRoutes } from "@/routes/userRoutes"

interface AppSidebarProps {
  user: { role: string }
}

export function AppSidebar({ user, ...props }: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  // UseMemo to prevent recalculation on each render
  const routes: Route[] = React.useMemo(() => {
    switch (user.role) {
      case "admin":
        return adminRoutes
      case "user":
        return userRoutes
      default:
        return []
    }
  }, [user.role])

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {(item.items ?? []).map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton asChild>
                      <Link href={subItem.url}>{subItem.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
