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
import SortBooking, { ISelectOptions } from "@/shared/components/sort-booking";
import { useAtom } from "jotai";
import {
  bookingAtom,
  sortBookingAtom,
} from "@/shared/model/atoms/booking-atom";

import { IBookingDto } from "@/shared/model/types/booking";
import { useAuth } from "../providers/auth-provider";
import { NavActions } from "@/components/nav-actions";
import { CorporateLogisticianDto } from "@/shared/model/types/user";

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

function copyAllBookingTemplate(
  sortBooking: IBookingDto[],
  user: CorporateLogisticianDto,
) {
  return sortBooking
    .map((booking) => {
      return `
    ${booking.corporateBookingData.generalInformation.icon} ${booking.corporateBookingData.generalInformation.cargoName} ${booking.corporateBookingData.generalInformation.cargoAmount}т ${booking.corporateBookingData.generalInformation.icon}
    ‼️${booking.corporateBookingData.terms.loadingType === "normal" ? "ПО НОРМЕ" : "ПО ПОЛНОЙ"} на ${booking.corporateBookingData.location.loadingLocationDate}‼️
    🏳️ ${booking.corporateBookingData.location.loadingLocation}
    🏁 ${booking.corporateBookingData.location.unloadingLocation}
    🛣 Дистанция: ${booking.corporateBookingData.location.distance} км
    🚚 Выгрузка: ${booking.corporateBookingData.requiredTransport.carTypeUnLoading}
    💰 ${booking.corporateBookingData.terms.price}₽/т ${booking.corporateBookingData.terms.paymentMethod === "NDS" ? "С НДС" : booking.corporateBookingData.terms.paymentMethod === "without_NDS" ? "Без НДС" : "Наличные"}
    ${booking.corporateBookingData.terms.advancePercentage && `💵 Аванс:  ${booking.corporateBookingData.terms.advancePercentage}% на погрузке`}
    ${user?.userData?.phone && `Контакты: ${user?.userData?.phone}`}
      `;
    })
    .join("\n --- \n");
}

export function AppLayout() {
  const context = useAuth();

  const location = useLocation();
  const [bookingData] = useAtom(bookingAtom); // Не отсортированные bookings
  const [sortBooking, setSortBooking] = useAtom(sortBookingAtom); // отсортированные bookings
  // console.log("bookingData", bookingData);
  let copyAllBookingTemplateArray = null;

  if (sortBooking && context?.user) {
    copyAllBookingTemplateArray = copyAllBookingTemplate(
      sortBooking,
      context?.user,
    );
  }

  const handleCopy = async () => {
    try {
      if (copyAllBookingTemplateArray)
        await navigator.clipboard.writeText(copyAllBookingTemplateArray);
    } catch (err) {
      console.error("Ошибка при копировании текста:", err);
    }
  };

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
                      {location.pathname === "/product" && bookingData && (
                        <SortBooking
                          bookings={bookingData}
                          setSortItems={setSortBooking}
                          selectOptions={selectOptions}
                        />
                      )}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-3">
              <NavActions setCopyBookingTemplate={handleCopy} />
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
