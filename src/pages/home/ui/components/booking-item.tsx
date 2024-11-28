import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PackagePlus,
  WalletMinimal,
  Asterisk,
  Trash,
  PencilRuler,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { IBookingDto } from "@/shared/model/types/booking";
import { Button } from "@/components/ui/button";
import RemoveBookingDialogSure from "./remove-booking/remove-booking-dialog";
import BookingToogleItemDialog from "./toggle-booking/toggle-booking-dialog";
import { useState } from "react";

function PaymentMethodComponent({
  paymentMethod,
}: {
  paymentMethod: IBookingDto["terms"]["paymentMethod"];
}) {
  switch (paymentMethod) {
    case "NDS":
      return <p>(НДС)</p>;
    case "without NDS":
      return <p>(Без НДС)</p>;
    case "cash":
      return <p>(Наличкой)</p>;
    // case "NDS": return <p>НДС</p>
    default:
      return <p>(Уточнить у менеджера)</p>;
  }
}

const BadgeLoadType = ({ variant }: { variant: IBookingDto["loadType"] }) => {
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full mx-auto rounded-xl flex-col justify-between h-fit mb-2 overflow-y-auto overflow-hidden transition-all hover:shadow-lg">
      {/* Header Card */}
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
            {booking?.cargoAmount ? (
              <p>{booking?.cargoAmount} т</p>
            ) : (
              <p>Неизвесто</p>
            )}
          </Badge>
          <Badge variant="outline" className="bg-white">
            {booking?.manager?.userName}
          </Badge>
        </div>
      </div>
      <Separator />
      {/* Content Card */}
      <CardHeader className="">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex items-center space-x-2 w-full">
            <CardTitle className="flex gap-2 text-2xl font-bold">
              {booking?.cargoName}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-start space-x-2">
          <div className="ml-2">
            <div className="flex items-center">
              {/* <MapPin className="h-4 w-4 mr-1" /> */}
              <p>{booking?.location?.loadingLocation}</p>
            </div>
            <div className="flex items-center">
              {/* <ArrowBigRight className="h-4 w-4 mr-1" /> */}
              <p>{booking?.location?.unloadingLocation}</p>
            </div>
            <div className="flex items-center mt-1">
              {/* <Road className="h-4 w-4 text-muted-foreground mr-1" /> */}
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
          {/* <Truck className="max-h-5 max-w-5 text-muted-foreground" /> */}
          <p className="text-sm text-muted-foreground ">
            {booking?.terms?.truckType}
          </p>
        </div>
      </CardContent>

      {/* Дополнительная информация */}
      {booking?.additionalInfo && (
        <div
          className="flex items-center space-x-2 bg-yellow-100 p-2 px-4 rounded-md w-full"
          style={{ borderRadius: "0 0 0 0" }}
        >
          <Asterisk className="max-h-5 max-w-5 text-yellow-600" />
          <p className="text-sm font-medium text-yellow-600">
            {booking?.additionalInfo}
          </p>
        </div>
      )}
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
