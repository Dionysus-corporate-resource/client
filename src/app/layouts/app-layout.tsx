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
import { CircleX, PackagePlus } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../providers/auth-provider";
import PERMISSIONS from "@/shared/api/permissions";
import CreateProposalsDevelopmentDialog from "@/pages/proposals-development/ui/components/create-proposals-development/create-proposals-development-dialog";
import CreateBookingItemDialog from "@/pages/home/ui/components/create-booking/create-booking-dialog";
import { useState } from "react";

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
                      Dionysus-corporate-resource
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-3">
              {/* <NavActions /> */}
              {contextAuth?.user?.roles.some(
                (role: string) =>
                  role === PERMISSIONS.CAN_VIEW_MANAGER ||
                  role === PERMISSIONS.CAN_VIEW_DISPATCHER ||
                  role === PERMISSIONS.CAN_VIEW_SUPERADMIN,
              ) && (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <PackagePlus />
                    Создать заявку
                  </Button>
                  <Separator orientation="vertical" className=" h-4" />
                </>
              )}
              <CreateProposalsDevelopmentDialog>
                <Button size="sm" variant="ghost">
                  <CircleX />
                  Нашли ошибку?
                </Button>
              </CreateProposalsDevelopmentDialog>
            </div>
          </header>
          <div className="flex-1 flex-wrap px-4 py-10 overflow-y-auto space-y-4">
            <Outlet />
            <CreateBookingItemDialog isOpen={isOpen} setIsOpen={setIsOpen} />
            <Toaster />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
