import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CreateBookingItemDialog from "../home/ui/components/create-booking/create-booking-dialog";
import { bookingQueryOptions } from "../home/api/query-options";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/auth-provider";
import { IBookingDto } from "@/shared/model/types/booking";
import { CorporateLogisticianDto } from "@/shared/model/types/user";
import BookingItem from "../home/ui/components/booking-item";
import SortBooking, { ISelectOptions } from "@/shared/components/sort-booking";
import { useAtom } from "jotai";
import { bookingManagerAtom } from "@/shared/model/atoms/booking-atom";
import {
  DetailInfoBookingDialog,
  NewBookingCard,
} from "@/entities/corporate-booking";
import { ChartFakeOne, ChartFakeTwo } from "@/entities/flight";
import { Checkbox } from "@/components/ui/checkbox";
import { SheetCreateBooking } from "@/widgets";

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
  manager: CorporateLogisticianDto | undefined | null,
) {
  if (manager?.corporateRoles?.includes("dispatcher")) return [];

  if (bookings)
    return bookings.filter(
      (booking) =>
        booking.corporateBookingData.manager._id === manager?.userData?._id,
    );
}

export default function ManagerPage() {
  // состояние checkboxs
  const [activeChecked, setActiveChecked] = useState(true);
  const [inProgressChecked, setInProgressChecked] = useState(true);
  const [closedChecked, setClosedChecked] = useState(true);
  // управление модальным окном, детальной информации заявки
  const [isOpenDetailBookind, setIsOpenDetailBookind] = useState(false);
  const [detailBooking, setDetailBooking] = useState<
    IBookingDto["corporateBookingData"] | null
  >(null);
  const changeIsOpenStateAndGetDetailBooking = (
    booking: IBookingDto["corporateBookingData"],
  ) => {
    setIsOpenDetailBookind(true);
    setDetailBooking(booking);
  };
  // получение заявок
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
      <div className="flex items-center gap-6 pb-12">
        <img
          src="https://i.pinimg.com/736x/53/f9/af/53f9afd0fe0e61eb74f87dec247d02e2.jpg"
          alt="Иллюстрация пустого состояния"
          className="object-contain h-1/6 w-1/6"
        />
        <div className="container">
          <NavLink
            className="group mb-2 inline-flex items-center px-0.5 text-sm font-medium"
            to="/docs/components/sidebar"
          >
            <NavLink to="/product">
              <span className="underline-offset-4 group-hover:underline">
                Смотреть все заявки компании
              </span>
            </NavLink>
          </NavLink>
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] pb-2">
            Создай заявку
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            Добро пожаловать на страницу, предназначенную для управления
            заявками. Здесь вы можете создать новую заявку, отредактировать
            существующую или удалить ненужную.
          </p>
          <div className="flex gap-2 w-full items-center mt-6">
            {cortBooking && (
              <SortBooking
                bookings={cortBooking}
                setSortItems={setSortItems}
                selectOptions={selectOptions}
              />
            )}

            <Button
              className="h-8"
              size="sm"
              // style={{ borderRadius: "0 8px 8px 0" }}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <PackagePlus />
              Создать заявку
            </Button>
          </div>
          {/* блок checkboxs */}
          <div className="mt-2 flex gap-4 border w-fit px-4 py-2 rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={activeChecked}
                onCheckedChange={(checked) => setActiveChecked(!!checked)}
              />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Активные
              </label>
            </div>
            <div className="border border-b" />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inProgress"
                checked={inProgressChecked}
                onCheckedChange={(checked) => setInProgressChecked(!!checked)}
              />
              <label
                htmlFor="inProgress"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                В работе
              </label>
            </div>
            <div className="border border-b" />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="closed"
                checked={closedChecked}
                onCheckedChange={(checked) => setClosedChecked(!!checked)}
              />
              <label
                htmlFor="closed"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Закрытые
              </label>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-3 gap-4">
          <div className="grid grid-cols-2 col-span-2 gap-4 h-fit">
            {activeChecked &&
              sortItems
                ?.filter(
                  (booking) =>
                    booking?.corporateBookingData?.status === "inProgress",
                )
                ?.map((booking: IBookingDto) => (
                  <NewBookingCard
                    key={booking._id}
                    booking={booking.corporateBookingData}
                    changeIsOpenStateAndGetDetailBooking={
                      changeIsOpenStateAndGetDetailBooking
                    }
                  />
                ))}
            {inProgressChecked &&
              sortItems
                ?.filter(
                  (booking) =>
                    booking?.corporateBookingData?.status === "active",
                )
                ?.map((booking: IBookingDto) => (
                  <NewBookingCard
                    key={booking._id}
                    booking={booking.corporateBookingData}
                    changeIsOpenStateAndGetDetailBooking={
                      changeIsOpenStateAndGetDetailBooking
                    }
                  />
                ))}
            {closedChecked &&
              sortItems
                ?.filter(
                  (booking) =>
                    booking?.corporateBookingData?.status === "inactive",
                )
                ?.map((booking: IBookingDto) => (
                  <NewBookingCard
                    key={booking._id}
                    booking={booking.corporateBookingData}
                    changeIsOpenStateAndGetDetailBooking={
                      changeIsOpenStateAndGetDetailBooking
                    }
                  />
                ))}
          </div>
          <div className="space-y-4">
            <div className="flex gap-2">
              <ChartFakeOne />
              <ChartFakeTwo />
            </div>
            <ChartFakeTwo />
          </div>
        </div>
      </div>
      {/* <CreateBookingItemDialog isOpen={isOpen} setIsOpen={setIsOpen} /> */}
      <SheetCreateBooking isOpen={isOpen} setIsOpen={setIsOpen} />
      <DetailInfoBookingDialog
        isOpen={isOpenDetailBookind}
        setIsOpen={setIsOpenDetailBookind}
        detailBooking={detailBooking as IBookingDto["corporateBookingData"]}
      />
    </div>
  );
}
