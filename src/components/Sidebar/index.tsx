"use client"

import * as React from "react"
import { Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { getProfessionalEmail, getProfessionalName } from "@/utils/tokenUtil"

const navItems = [
  {
    title: "Meus Pacientes",
    url: "/dashboard/professional",
    icon: Users,
    isActive: false,
    items: [],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = {
    name: getProfessionalName() || "Profissional",
    email: getProfessionalEmail() || "",
    avatar: "/default-avatar.png",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
