import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CreateBookingItemDialog from "../home/ui/components/create-booking/create-booking-dialog";
import { bookingQueryOptions } from "../home/api/query-options";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/auth-provider";
import { IBookingDto } from "@/shared/model/types/booking";
import { IUserDto } from "@/shared/model/types/user";
import BookingItem from "../home/ui/components/booking-item";
import SortBooking, { ISelectOptions } from "@/shared/components/sort-booking";
import { useAtom } from "jotai";
import { bookingManagerAtom } from "@/shared/model/booking-atom";

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
];

function cortBookingByManager(
  bookings: IBookingDto[] | undefined,
  manager: IUserDto | undefined | null,
) {
  if (!manager?.roles?.includes("manager")) return [];

  if (bookings)
    return bookings.filter((booking) => booking.manager._id === manager._id);
}

export default function ManagerPage() {
  const { data: bookings } = useQuery(bookingQueryOptions.getAll());
  const context = useAuth();

  const [cortBooking, setSortBooking] = useState<IBookingDto[] | undefined>([]);

  // const cortBooking = cortBookingByManager(bookings, context?.user);

  const [isOpen, setIsOpen] = useState(false);
  const [sortItems, setSortItems] = useAtom<IBookingDto[]>(bookingManagerAtom);

  console.log("Render ManagerPage");

  useEffect(() => {
    setSortBooking(cortBookingByManager(bookings, context?.user));
  }, [bookings]);

  return (
    <div className="container mx-auto">
      <div className="pb-12 flex flex-col items-start gap-2 border-b border-border/40 dark:border-border md:pb-10 lg:pb-12">
        <div className="container">
          <NavLink
            className="group mb-2 inline-flex items-center px-0.5 text-sm font-medium"
            to="/docs/components/sidebar"
          >
            <span className="underline-offset-4 group-hover:underline">
              Новый компонент боковой панели
            </span>
          </NavLink>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] pb-2">
            Создай заявку
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            Добро пожаловать на страницу, предназначенную для управления
            заявками. Здесь вы можете создать новую заявку, отредактировать
            существующую или удалить ненужную.
          </p>
          <div className="flex w-full items-center mt-6">
            {cortBooking && (
              <SortBooking
                bookings={cortBooking}
                setSortItems={setSortItems}
                selectOptions={selectOptions}
              />
            )}

            <Button
              className="h-8"
              style={{ borderRadius: "0 8px 8px 0" }}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <PackagePlus />
              Создать заявку
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-8">
          {/* <Button className="h-8" onClick={() => setIsOpen((prev) => !prev)}>
            <PackagePlus />
            Создать заявку
          </Button> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {sortItems?.map((booking: IBookingDto) => (
            <BookingItem key={booking._id} booking={booking} />
          ))}
        </div>
      </div>
      <CreateBookingItemDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
