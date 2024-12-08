import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trash,
  PencilRuler,
  MapPin,
  Calendar,
  Copy,
  ArrowRight,
  Wallet,
  Scale,
  Info,
  // Eye,
  Truck,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { IBookingDto } from "@/shared/model/types/booking";
import { Button } from "@/components/ui/button";
import RemoveBookingDialogSure from "./remove-booking/remove-booking-dialog";
import BookingToogleItemDialog from "./toggle-booking/toggle-booking-dialog";
import { useState } from "react";
import { useAtom } from "jotai";
import { corporateLogisticianStorageAtom } from "@/shared/model/atoms/user-atom";
import { useAuth } from "@/app/providers/auth-provider";
import { CorporateLogisticianDto } from "@/shared/model/types/user";
// import { SheetCorporateBookingDetails } from "@/entities/sheet-corporate-booking-details/sheet-corporate-booking-details";

function PaymentMethodComponent({
  paymentMethod,
}: {
  paymentMethod: IBookingDto["corporateBookingData"]["terms"]["paymentMethod"];
}) {
  switch (paymentMethod) {
    case "NDS":
      return <span>НДС</span>;
    case "without_NDS":
      return <span>Без НДС</span>;
    case "cash":
      return <span>Наличкой</span>;
    // case "NDS": return <p>НДС</p>
    default:
      return <span>Уточнить у менеджера</span>;
  }
}

const BadgeLoadType = ({
  variant,
}: {
  variant: IBookingDto["corporateBookingData"]["terms"]["loadingType"];
}) => {
  switch (variant) {
    case "normal":
      return "ПО НОРМЕ";
    case "full":
      return "ПО ПОЛНОЙ";

    default:
      return null;
  }
};

type ICheckManagerProps = {
  booking: IBookingDto["corporateBookingData"];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: CorporateLogisticianDto;
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
  ${booking.terms.advancePercentage && `💵 Аванс:  ${booking.terms.advancePercentage}% на погрузке`}
  ${context?.user?.userData?.phone && `Контакты: ${context?.user?.userData?.phone}`}
    `;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sentence);
    } catch (err) {
      console.error("Ошибка при копировании текста:", err);
    }
  };

  if (user?.userData?._id !== booking?.manager?._id) {
    return (
      <div
        className="flex justify-end gap-2 w-full px-2  from-primary/5 to-primary/5"
        style={{ backgroundColor: "hsl(0, 0%, 98%)" }}
      >
        <div className="flex items-center gap-1">
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
    <div
      className="flex justify-between gap-2 w-full px-2  from-primary/5 to-primary/5"
      style={{ backgroundColor: "hsl(0, 0%, 98%)" }}
    >
      <div className="flex items-center">
        {/* <SheetCorporateBookingDetails>
          <Button size="icon" variant="ghost">
            <Eye />
          </Button>
        </SheetCorporateBookingDetails>
        <Separator orientation="vertical" className="h-4" /> */}
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

export default function BookingItem({
  booking,
}: {
  booking: IBookingDto["corporateBookingData"];
}) {
  console.log("booking", booking);
  const [user] = useAtom(corporateLogisticianStorageAtom);
  const [isOpen, setIsOpen] = useState(false);

  const context = useAuth();

  const sentence = `

  ${booking.generalInformation.icon} ${booking.generalInformation.cargoName} ${booking.generalInformation.cargoAmount}т ${booking.generalInformation.icon}
  ‼️${booking.terms.loadingType === "normal" ? "ПО НОРМЕ" : "ПО ПОЛНОЙ"} на ${booking.location.loadingLocationDate}‼️
  🏳️ ${booking.location.loadingLocation}
  🏁 ${booking.location.unloadingLocation}
  🛣 Дистанция: ${booking.location.distance} км
  🚚 Выгрузка: ${booking.requiredTransport.carTypeUnLoading}
  💰 ${booking.terms.price}₽/т ${booking.terms.paymentMethod === "NDS" ? "С НДС" : booking.terms.paymentMethod === "without_NDS" ? "Без НДС" : "Наличные"}
  ${booking.terms.advancePercentage && `💵 Аванс:  ${booking.terms.advancePercentage}% на погрузке`}
  ${context?.user?.userData?.phone && `Контакты: ${context?.user?.userData?.phone}`}
    `;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sentence);
    } catch (err) {
      console.error("Ошибка при копировании текста:", err);
    }
  };

  return (
    <Card className="mx-auto rounded-xl flex-col justify-between  h-full mb-2 overflow-y-auto overflow-hidden transition-all hover:shadow-lg w-full">
      {/* Header Card */}

      {user?.corporateRoles.includes("general_director") && (
        <CheckManager booking={booking} user={user} setIsOpen={setIsOpen} />
      )}
      {user?.corporateRoles.includes("manager") ? (
        <CheckManager booking={booking} user={user} setIsOpen={setIsOpen} />
      ) : (
        user?.corporateRoles.includes("dispatcher") && (
          <div
            className="flex justify-end gap-2 w-full px-4 from-primary/5 to-primary/5"
            style={{ backgroundColor: "hsl(0, 0%, 98%)" }}
          >
            <div className="flex items-center gap-1">
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
        )
      )}

      <Separator />

      <div
        className="w-full"
        // style={{
        //   borderRadius: "12px 12px 0 0 ",
        // }}
      >
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Badge
              variant="default"
              className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-500 flex items-center pl-6"
              style={{ boxShadow: "none", position: "relative" }}
            >
              <div
                className="mr-1 h-3 w-3"
                style={{ position: "absolute", left: "6px", top: "2px" }}
              >
                {booking?.generalInformation?.icon}
              </div>
              {/* <Package className="mr-1 h-3 w-3" /> */}
              {booking?.generalInformation?.cargoName}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {/* {booking?.location?.distance} км */}
              <Badge variant="secondary" className="ml-2">
                {booking?.location?.distance} км
              </Badge>
            </span>
          </div>
          <CardTitle className="flex items-center justify-between">
            <span className="text-xl font-semibold">
              {booking?.generalInformation?.cargoAmount ? (
                <>{booking?.generalInformation?.cargoAmount}т</>
              ) : (
                "Уточнить"
              )}
            </span>
            <Badge variant="outline" className="ml-2">
              <PaymentMethodComponent
                paymentMethod={booking?.terms?.paymentMethod}
              />
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-2 h-4 w-4" />
              Маршрут
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                {booking?.location?.loadingLocation}
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {booking?.location?.unloadingLocation}
              </span>
              {/* <Badge variant="secondary" className="ml-2">
                {booking?.location?.distance} км
              </Badge> */}
            </div>
          </div>

          {booking?.additionalInfo && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground mt-2">
                  <Info className="mr-2 h-4 w-4" />
                  Дополнительная информация
                </div>
                <span>{booking?.additionalInfo}</span>
              </div>
            </>
          )}

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            {booking?.location?.loadingLocationDate && (
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  Дата погрузки
                </div>
                <p className="font-medium">
                  {booking?.location?.loadingLocationDate}
                </p>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Wallet className="mr-2 h-4 w-4" />
                Ставка
              </div>
              <p className="font-medium">{booking?.terms?.price} ₽/т</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Scale className="mr-2 h-4 w-4" />
                Тип загрузки
              </div>
              <p className="font-medium">
                <BadgeLoadType variant={booking?.terms?.loadingType} />
              </p>
            </div>
            {booking?.terms?.advancePercentage !== 0 && (
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Wallet className="mr-2 h-4 w-4" />
                  Аванс
                </div>
                <p className="font-medium">
                  {booking?.terms?.advancePercentage}%
                </p>
              </div>
            )}
          </div>

          <Separator />

          <div className="space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Truck className="mr-2 h-4 w-4" />
              Требования к транспорту
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Тип:</span>
                <span className="font-medium">
                  {booking?.requiredTransport?.carType}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Выгрузка:</span>
                <span className="font-medium">
                  {booking?.requiredTransport?.carTypeUnLoading}
                </span>
              </div>
              {booking?.requiredTransport?.carHeightLimit !== 0 && (
                <div className="flex justify-between text-sm">
                  <span>Ограничение высоты:</span>
                  <span className="font-medium">
                    {booking?.requiredTransport?.carHeightLimit}м
                  </span>
                </div>
              )}{" "}
            </div>
          </div>
        </CardContent>
      </div>
      <BookingToogleItemDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        bookingId={booking._id}
      />
    </Card>
  );
}
