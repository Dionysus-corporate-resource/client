import { Card, CardContent } from "@/components/ui/card";
import {
  Trash,
  PencilRuler,
  MapPin,
  DollarSign,
  Truck,
  Calendar,
  Copy,
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
import { IUserDto } from "@/shared/model/types/user";
import { useAuth } from "@/app/providers/auth-provider";

function PaymentMethodComponent({
  paymentMethod,
}: {
  paymentMethod: IBookingDto["terms"]["paymentMethod"];
}) {
  switch (paymentMethod) {
    case "NDS":
      return <span>(НДС)</span>;
    case "without_NDS":
      return <span>(Без НДС)</span>;
    case "cash":
      return <span>(Наличкой)</span>;
    // case "NDS": return <p>НДС</p>
    default:
      return <span>(Уточнить у менеджера)</span>;
  }
}

function AdvancePeriod({
  period,
}: {
  period: IBookingDto["terms"]["advance"]["period"];
}) {
  switch (period) {
    case "loading":
      return <span>(при загрузке)</span>;
    case "un_loading":
      return <span>(при выгрузке)</span>;
  }
}
// function CarUsageCarPeriod({
//   period,
// }: {
//   period: IBookingDto["requiredTransport"]["carUsage"]["carPeriod"];
// }) {
//   switch (period) {
//     case "Каждый_день":
//       return <p>на каждый день</p>;
//     case "Общее":
//       return <p>всего</p>;
//   }
// }

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

type ICheckManagerProps = {
  booking: IBookingDto;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUserDto;
};

function CheckManager({ booking, user, setIsOpen }: ICheckManagerProps) {
  const context = useAuth();

  const sentence = `

  ${booking.generalInformation.icon} ${booking.generalInformation.cargoName} ${booking.generalInformation.cargoAmount}т ${booking.generalInformation.icon}
  ‼️${booking.terms.loadingType === "normal" ? "ПО НОРМЕ" : "ПО ПОЛНОЙ"} на ${booking.location.loadingLocationDate}‼️
  🏳️ ${booking.location.loadingLocation}
  🏁 ${booking.location.unloadingLocation}
  🛣 Дистанция: ${booking.location.distance} км
  🚚 Выгрузка: ${booking.requiredTransport.carTypeUnLoading}
  💰 ${booking.terms.price}₽/т ${booking.terms.paymentMethod === "NDS" ? "С НДС" : booking.terms.paymentMethod === "without_NDS" ? "Без НДС" : "Наличные"}
  ${booking.terms.advance && `💵 Аванс:  ${booking.terms.advance.percentage}% на погрузке`}
  ${context?.user?.phone && `Контакты: ${context?.user?.phone}`}
    `;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sentence);
    } catch (err) {
      console.error("Ошибка при копировании текста:", err);
    }
  };

  if (user._id !== booking?.manager?._id) {
    return (
      <div className="flex justify-end gap-2 w-full px-2 bg-gradient-to-r from-primary/5 to-primary/5">
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
          <Button
            onClick={() => handleCopy()}
            size="icon"
            variant="ghost"
            className="active:scale-90 transition-transform duration-200"
          >
            <Copy />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between gap-2 w-full px-2 bg-gradient-to-r from-primary/5 to-primary/5">
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
        <Button
          onClick={() => handleCopy()}
          size="icon"
          variant="ghost"
          className="active:scale-75 transition-transform duration-200"
        >
          <Copy />
        </Button>
      </div>
    </div>
  );
}

export default function BookingItem({ booking }: { booking: IBookingDto }) {
  const [user] = useAtom(userStorageAtom);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mx-auto rounded-xl flex-col justify-between  h-full mb-2 overflow-y-auto overflow-hidden transition-all hover:shadow-lg w-full">
      {/* Header Card */}
      {user?.roles.includes("manager") ? (
        <CheckManager booking={booking} user={user} setIsOpen={setIsOpen} />
      ) : (
        user?.roles.includes("dispatcher") && (
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
        )
      )}

      <Separator />

      <CardContent className="pt-4">
        <div className="flex gap-2 mb-4">
          <span className="text-lg">{booking?.generalInformation?.icon}</span>
          <span className="text-xl font-black">
            {booking?.generalInformation?.cargoName}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1 gap-8">
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

            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                Условия
              </h3>
              <p className="text-sm flex items-center gap-1">
                {/* <DollarSign className="h-3 w-3 mr-1" /> */}
                Ставка:
                <span className="font-semibold ml-1">
                  {booking?.terms?.price} ₽/т
                </span>
                <PaymentMethodComponent
                  paymentMethod={booking?.terms?.paymentMethod}
                />
              </p>
              {booking?.terms?.advance?.percentage !== 0 && (
                <p className="text-sm flex items-center gap-1">
                  {/* <CreditCard className="h-3 w-3 mr-1" /> */}
                  Аванс:
                  <span className="font-semibold ml-1">
                    {booking?.terms?.advance?.percentage}%{" "}
                  </span>
                  <AdvancePeriod period={booking?.terms?.advance?.period} />
                </p>
              )}{" "}
              {booking?.terms?.loadingType && (
                <p className="text-sm flex items-center gap-1">
                  {/* <Info className="h-3 w-3 mr-1" /> */}
                  Загрузка:{" "}
                  <span className="font-semibold ml-1">
                    <BadgeLoadType variant={booking?.terms?.loadingType} />
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Правая колонка */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                <Truck className="h-4 w-4 mr-2" />
                Требования к транспорту
              </h3>
              <div className="space-y-1">
                <div className="flex items-center flex-wrap space-x-1">
                  <p className="text-sm flex items-center">
                    {/* <Truck className="h-3 w-3 mr-1" /> */}
                    Тип:
                    <span className="font-semibold ml-1">
                      {booking?.requiredTransport?.carType}
                    </span>
                  </p>
                </div>
                <div className="flex items-center flex-wrap space-x-1">
                  <p className="text-sm flex items-center">
                    {/* <ArrowDown className="h-3 w-3 mr-1" /> */}
                    Выгрузка:
                  </p>
                  <span className="font-semibold ml-1">
                    {booking?.requiredTransport?.carTypeUnLoading}
                  </span>
                </div>

                {booking?.requiredTransport?.carHeightLimit !== 0 && (
                  <div className="flex items-center flex-wrap space-x-1">
                    <p className="text-sm flex items-center">
                      {/* <ArrowDown className="h-3 w-3 mr-1" /> */}
                      Ограничение по высоте:
                    </p>
                    <span className="font-semibold ml-1">
                      {booking?.requiredTransport?.carHeightLimit}м
                    </span>
                  </div>
                )}
              </div>
              {/* {booking?.requiredTransport?.carUsage?.count !== 0 && (
                <Badge variant="secondary" className="text-xs space-x-2">
                  {booking?.requiredTransport?.carUsage?.count}
                  <p>тс</p>
                  <CarUsageCarPeriod
                    period={booking?.requiredTransport?.carUsage?.carPeriod}
                  />
                </Badge>
              )} */}
            </div>
            {booking?.additionalInfo && (
              <>
                <Separator />

                <div className="space-y-2">
                  <h3 className="text-sm font-semibold flex items-center text-muted-foreground">
                    Дополнительная информация
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    {booking?.additionalInfo}
                  </p>
                </div>
              </>
            )}
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
