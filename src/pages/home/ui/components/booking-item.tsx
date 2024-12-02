import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Trash,
  PencilRuler,
  MapPin,
  Truck,
  Calendar,
  Copy,
  ArrowRight,
  Wallet,
  Scale,
  Info,
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
  variant: IBookingDto["terms"]["loadingType"];
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

export default function BookingItem({ booking }: { booking: IBookingDto }) {
  const [user] = useAtom(userStorageAtom);
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

  return (
    <Card className="mx-auto rounded-xl flex-col justify-between  h-full mb-2 overflow-y-auto overflow-hidden transition-all hover:shadow-lg w-full">
      {/* Header Card */}
      {user?.roles.includes("manager") ? (
        <CheckManager booking={booking} user={user} setIsOpen={setIsOpen} />
      ) : (
        user?.roles.includes("dispatcher") && (
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
            <span className="text-sm text-muted-foreground">ID: 12345</span>
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
              <Badge variant="secondary" className="ml-2">
                {booking?.location?.distance} км
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                Дата погрузки
              </div>
              <p className="font-medium">
                {booking?.location?.loadingLocationDate}
              </p>
            </div>

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
            {booking?.terms?.advance?.percentage !== 0 && (
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Wallet className="mr-2 h-4 w-4" />
                  Аванс
                </div>
                <p className="font-medium">
                  {booking?.terms?.advance?.percentage}%
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
              <div className="flex justify-between text-sm">
                <span>Ограничение высоты:</span>
                <span className="font-medium">
                  {booking?.requiredTransport?.carHeightLimit}м
                </span>
              </div>
            </div>
          </div>

          {booking?.additionalInfo && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Info className="mr-2 h-4 w-4" />
                  Дополнительная информация
                </div>
                <span>{booking?.additionalInfo}</span>
              </div>
            </>
          )}
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
