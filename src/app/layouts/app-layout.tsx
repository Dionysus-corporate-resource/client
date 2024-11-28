import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

// import { NavActions } from "@/components/nav-actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BookingCreateItemDialog } from "@/pages/home";
import { PackagePlus } from "lucide-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";
import PERMISSIONS from "@/shared/api/permissions";

export function AppLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const contextAuth = useAuth();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <header className="flex h-14 shrink-0 items-center gap-2">
            <div className="flex flex-1 items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage className=" line-clamp-1">
                      Project Management & Task Tracking
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="ml-auto px-3">
              {/* <NavActions /> */}
              {contextAuth?.user?.roles.includes(
                PERMISSIONS.CAN_VIEW_MANAGER,
              ) && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  <PackagePlus />
                  Создать заявку
                </Button>
              )}
            </div>
          </header>
          <div className="flex-1 flex-wrap px-4 py-10 overflow-y-auto space-y-4">
            <Outlet />
            <BookingCreateItemDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            <Toaster />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
