import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";
import CreateProposalsDevelopmentDialog from "@/pages/proposals-development/ui/components/create-proposals-development/create-proposals-development-dialog";
import SortBooking, { ISelectOptions } from "@/shared/components/sort-booking";
import { useAtom } from "jotai";
import { bookingAtom, sortBookingAtom } from "@/shared/model/booking-atom";
import { useEffect } from "react";

const selectOptions: ISelectOptions[] = [
  {
    label: "Название груза",
    value: "cargoName",
  },
  {
    label: "Адрес погрузки",
    value: "loadingLocation",
  },
  {
    label: "Адрес выгрузки",
    value: "unloadingLocation",
  },
  {
    label: "Менеджер",
    value: "userName",
  },
];

export function AppLayout() {
  const [bookingData] = useAtom(bookingAtom);
  // const contextAuth = useAuth();
  const location = useLocation();

  const [, setSortBooking] = useAtom(sortBookingAtom);

  useEffect(() => {
    console.log("bookingData", bookingData);
  }, [bookingData]);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen ">
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
              {location.pathname === "/product" && (
                <>
                  {bookingData && (
                    <SortBooking
                      bookings={bookingData}
                      setSortItems={setSortBooking}
                      selectOptions={selectOptions}
                    />
                  )}
                </>
              )}
              <Separator orientation="vertical" className=" h-4" />
              <CreateProposalsDevelopmentDialog />
            </div>
          </header>
          <div className="flex-1 flex-wrap px-4 py-10 overflow-y-auto space-y-4">
            <Outlet />
            <Toaster />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
