"use client";

import { AppSidebar } from "@/components/Sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@radix-ui/react-separator";
import { ToastContainer } from "react-toastify";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  return (
    <main className="ml-9">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    {user?.role === "professional" ? (
                      <BreadcrumbPage>Meus Pacientes</BreadcrumbPage>
                    ) : (
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    )
                    }
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
      <ToastContainer />
    </main>

  );
}
