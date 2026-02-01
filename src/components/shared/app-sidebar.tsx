"use client"

import * as React from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Route } from "@/types"

import { adminRoutes } from "@/routes/adminRoutes"
import { userRoutes } from "@/routes/userRoutes"
import { sellerRoutes } from "@/routes/sellerRoutes"
import { Role } from "@/constants/roles"
import { Button } from "../ui/button"

const Sidebar = dynamic(() => import("@/components/ui/sidebar").then(m => m.Sidebar), { ssr: false })
const SidebarContent = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarContent), { ssr: false })
const SidebarGroup = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarGroup), { ssr: false })
const SidebarGroupLabel = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarGroupLabel), { ssr: false })
const SidebarGroupContent = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarGroupContent), { ssr: false })
const SidebarMenu = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarMenu), { ssr: false })
const SidebarMenuItem = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarMenuItem), { ssr: false })
const SidebarMenuButton = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarMenuButton), { ssr: false })
const SidebarRail = dynamic(() => import("@/components/ui/sidebar").then(m => m.SidebarRail), { ssr: false })

interface AppSidebarProps {
  user: { role: string }
}

export function AppSidebar({
  user,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {

  const routes: Route[] = React.useMemo(() => {
    switch (user.role) {
      case Role.admin:
        return adminRoutes
      case Role.seller:
        return sellerRoutes
      case Role.user:
        return userRoutes
      default:
        return []
    }
  }, [user.role])

  return (
    <Sidebar {...props}>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items?.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        {item.title}
                      </Link>
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
