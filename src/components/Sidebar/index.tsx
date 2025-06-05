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
import { useAuth } from "@/contexts/AuthContext"

const navItemsProfessional = [
  {
    title: "Meus Pacientes",
    url: "/dashboard/professional",
    icon: Users,
    isActive: false,
    items: [],
  },
]

const navItemsPatient = [
  {
    title: "Dashboard",
    url: "/dashboard/patient",
    icon: Users,
    isActive: false,
    items: [],
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const userDetails = {
    name: getProfessionalName() || "Profissional",
    email: getProfessionalEmail() || "",
    avatar: "/default-avatar.png",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={user?.role === "professional" ? navItemsProfessional : navItemsPatient} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userDetails} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
