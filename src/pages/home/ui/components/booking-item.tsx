import { Card, CardContent } from "@/components/ui/card";
import {
  Trash,
  PencilRuler,
  MapPin,
  DollarSign,
  Info,
  Truck,
  Calendar,
  CreditCard,
  ArrowDown,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { IBookingDto } from "@/shared/model/types/booking";
import { Button } from "@/components/ui/button";
import RemoveBookingDialogSure from "./remove-booking/remove-booking-dialog";
import BookingToogleItemDialog from "./toggle-booking/toggle-booking-dialog";
import { useState } from "react";
import { useAtom } from "jotai";
import { userStorageAtom } from "@/shared/model/user-atom";

function PaymentMethodComponent({
  paymentMethod,
}: {
  paymentMethod: IBookingDto["terms"]["paymentMethod"];
}) {
  switch (paymentMethod) {
    case "NDS":
      return <p>(НДС)</p>;
    case "without_NDS":
      return <p>(Без НДС)</p>;
    case "cash":
      return <p>(Наличкой)</p>;
    // case "NDS": return <p>НДС</p>
    default:
      return <p>(Уточнить у менеджера)</p>;
  }
}

function AdvancePeriod({
  period,
}: {
  period: IBookingDto["terms"]["advance"]["period"];
}) {
  switch (period) {
    case "loading":
      return <p>(при загрузке)</p>;
    case "un_loading":
      return <p>(при выгрузке)</p>;
  }
}
function CarUsageCarPeriod({
  period,
}: {
  period: IBookingDto["requiredTransport"]["carUsage"]["carPeriod"];
}) {
  switch (period) {
    case "Каждый_день":
      return <p>на каждый день</p>;
    case "Общее":
      return <p>всего</p>;
  }
}

const BadgeLoadType = ({
  variant,
}: {
  variant: IBookingDto["terms"]["loadingType"];
}) => {
  switch (variant) {
    case "normal":
      return <p>ПО НОРМЕ</p>;
    case "full":
      return <p>ПО ПОЛНОЙ</p>;

    default:
      return null;
  }
};

export default function BookingItem({ booking }: { booking: IBookingDto }) {
  const [user] = useAtom(userStorageAtom);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full mx-auto rounded-xl flex-col justify-between h-fit mb-2 overflow-y-auto overflow-hidden transition-all hover:shadow-lg">
      {/* Header Card */}
      {user?.roles.includes("manager") ? (
        <div className="flex justify-between gap-2 w-full px-4 bg-gradient-to-r from-primary/5 to-primary/5">
          <div className="flex items-center">
            <RemoveBookingDialogSure booking={booking}>
              <Button size="icon" variant="ghost">
                <Trash />
              </Button>
            </RemoveBookingDialogSure>

            <Separator orientation="vertical" className="h-4" />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <PencilRuler />
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="secondary">
              {booking?.generalInformation?.cargoAmount ? (
                <p>{booking?.generalInformation?.cargoAmount} т</p>
              ) : (
                <p>Неизвесто</p>
              )}
            </Badge>
            <Badge variant="outline" className="bg-white">
              {booking?.manager?.userName}
            </Badge>
          </div>
        </div>
      ) : (
        <div className="flex justify-end gap-2 w-full px-4 py-2 bg-gradient-to-r from-primary/5 to-primary/5">
          <div className="flex items-center gap-1">
            <Badge variant="secondary">
              {booking?.generalInformation?.cargoAmount ? (
                <p>{booking?.generalInformation?.cargoAmount} т</p>
              ) : (
                <p>Неизвесто</p>
              )}
            </Badge>
            <Badge variant="outline" className="bg-white">
              {booking?.manager?.userName}
            </Badge>
          </div>
        </div>
      )}

      <Separator />
      {/* Content Card */}
      {/* <CardHeader className="">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex items-center space-x-2 w-full">
            <CardTitle className="flex gap-2 text-2xl font-bold">
              {booking?.cargoName}
            </CardTitle>
          </div>
        </div>
      </CardHeader> */}
      {/* <CardContent className="grid gap-6">
        <div className="flex items-start space-x-2">
          <div className="ml-2">
            <div className="flex items-center">
              <p>{booking?.location?.loadingLocation}</p>
            </div>
            <div className="flex items-center">
              <p>{booking?.location?.unloadingLocation}</p>
            </div>
            <div className="flex items-center mt-1">
              <p className="text-sm text-muted-foreground ">
                Дистанция: {booking?.location?.distance} км
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-2">
          <div>
            <p className="font-medium mb-2">Условия:</p>
            <div className="ml-2">
              <div className="flex items-center mt-1">
                <WalletMinimal className="h-4 w-4 mr-1" />
                <p className="flex gap-2">
                  {booking?.terms?.price} ₽/т
                  <PaymentMethodComponent
                    paymentMethod={booking?.terms?.paymentMethod}
                  />
                </p>
              </div>
              <div className="flex items-center mt-1">
                <PackagePlus className="h-4 w-4  mr-1" />
                <p className="flex gap-2 ">
                  Загрузка: <BadgeLoadType variant={booking.loadType} />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center  w-full space-x-2">
          <p className="text-sm text-muted-foreground ">
            {booking?.terms?.truckType}
          </p>
        </div>
      </CardContent> */}

      <CardContent className="pt-4">
        <div className="flex gap-2 mb-4">
          <span className="text-lg">{booking?.generalInformation?.icon}</span>
          <span className="text-lg">
            {booking?.generalInformation?.cargoName}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {/* Левая колонка */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                {/* <MapPin className="h-4 w-4 mr-2" /> */}
                Местоположение
              </h3>
              <p className="text-sm">{booking?.location?.loadingLocation}</p>
              <p className="text-sm">{booking?.location?.unloadingLocation}</p>

              <p className="text-xs text-muted-foreground flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Дистанция: {booking?.location?.distance} км
              </p>
              {booking?.location?.loadingLocationDate && (
                <p className="text-xs text-muted-foreground flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Дата погрузки: {booking?.location?.loadingLocationDate}
                </p>
              )}
            </div>
            {/* <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Дата погрузки
              </h3>
              <p className="text-sm">20 декабря 2023</p>
            </div> */}
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                {/* <DollarSign className="h-4 w-4 mr-2" /> */}
                Условия
              </h3>
              <p className="text-sm flex items-center gap-1">
                <DollarSign className="h-3 w-3 mr-1" />
                {booking?.terms?.price} <span>₽/т</span>
                <PaymentMethodComponent
                  paymentMethod={booking?.terms?.paymentMethod}
                />
              </p>
              {booking?.terms?.advance?.percentage !== 0 && (
                <p className="text-sm flex items-center gap-1">
                  <CreditCard className="h-3 w-3 mr-1" />
                  Аванс: {booking?.terms?.advance?.percentage}%{" "}
                  <AdvancePeriod period={booking?.terms?.advance?.period} />
                </p>
              )}{" "}
              {booking?.terms?.loadingType && (
                <p className="text-sm flex items-center gap-1">
                  <Info className="h-3 w-3 mr-1" />
                  Загрузка:{" "}
                  <BadgeLoadType variant={booking?.terms?.loadingType} />
                </p>
              )}
            </div>
          </div>

          {/* Правая колонка */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                {/* <Truck className="h-4 w-4 mr-2" /> */}
                Требования к транспорту
              </h3>
              <div className="space-y-1">
                <div className="flex items-center flex-wrap space-x-1">
                  <p className="text-sm flex items-center">
                    <Truck className="h-3 w-3 mr-1" />
                    <p>Тип:</p>
                  </p>
                  {booking?.requiredTransport?.carType}
                </div>
                <div className="flex items-center flex-wrap space-x-1">
                  <p className="text-sm flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    Выгрузка:
                  </p>
                  {booking?.requiredTransport?.carTypeUnLoading}
                </div>

                {booking?.requiredTransport?.carHeightLimit !== 0 && (
                  <div className="flex items-center flex-wrap space-x-1">
                    <p className="text-sm flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      Ограничение по высоте:
                    </p>
                    {booking?.requiredTransport?.carHeightLimit}
                    <p>м</p>
                  </div>
                )}
              </div>
              {booking?.requiredTransport?.carUsage?.count !== 0 && (
                <Badge variant="secondary" className="text-xs space-x-2">
                  {booking?.requiredTransport?.carUsage?.count}
                  <p>тс</p>
                  <CarUsageCarPeriod
                    period={booking?.requiredTransport?.carUsage?.carPeriod}
                  />
                </Badge>
              )}
            </div>
            <Separator />
            <div className="space-y-2">
              {/* <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                Дополнительная информация
              </h3> */}
              {booking?.additionalInfo && (
                <p className="text-sm text-muted-foreground">
                  {booking?.additionalInfo}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>

      {/* Дополнительная информация */}
      {/* {booking?.additionalInfo && (
        <div
          className="flex items-center space-x-2 bg-yellow-100 p-2 px-4 rounded-md w-full"
          style={{ borderRadius: "0 0 0 0" }}
        >
          <Asterisk className="max-h-5 max-w-5 text-yellow-600" />
          <p className="text-sm font-medium text-yellow-600">
            {booking?.additionalInfo}
          </p>
        </div>
      )} */}
      <BookingToogleItemDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        bookingId={booking._id}
      />
    </Card>
  );
}

// <Button variant="ghost" size="icon" onClick={toggleCardInfo}>
//   {isOpenInfo ? <ChevronUp /> : <ChevronDown />}
// </Button>
// - - -
// className={` ${
//   isOpenInfo ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
// }`}
// - - -
// <Separator orientation="vertical" className="h-4" />
// - - -
// <div className="flex-shrink-0">
//   <div className="bg-primary/5 p-3 rounded-full">
//     <Wheat className="h-6 w-6 text-primary" />
//   </div>
// </div>
