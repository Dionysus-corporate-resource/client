import { ArrowDownRight, CornerRightUp, Package } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { ReactNode } from "react";
import { IBookingDto } from "@/shared/model/types/booking";

export default function BookingCardLong({
  bookingDetailSlot,
  booking,
}: {
  bookingDetailSlot?: ReactNode;
  orderNumber?: number;
  booking: IBookingDto;
}) {
  return (
    <Card className="relative max-w-xl h-fit bg-card shadow-md hover:shadow-lg transition-shadow duration-200">
      {/* Left section with ID and culture */}
      <div className="border-dashed border-b p-2 w-full flex items-center justify-between">
        <div className="flex items-center ">
          <Badge variant="outline" className="space-x-2 w-full border-none">
            <Package className="w-4 h-4 shrink-0" />
            <p className="text-xs font-medium">
              {booking?.basicInfo?.culture || "Уточнить"}
            </p>
          </Badge>
        </div>

        <div className="text-xs text-muted-foreground mr-2">
          {new Date(booking.createdAt).toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "long",
          })}{" "}
          {new Date(booking?.createdAt).toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
        {/* <div className="text-xs text-muted-foreground">
          ID: {booking?._id.slice(Math.floor(booking._id.length / 2))}
        </div> */}
      </div>

      <div className="flex">
        {/* Middle section with route info */}
        <div className="w-[120px] border-dashed border-r border-border p-4 flex flex-col justify-between">
          <div className="grid grid-cols-1 gap-2">
            <div className="text-start">
              <p className="text-sm font-medium">
                {booking?.basicInfo?.distance ? (
                  <>{booking?.basicInfo?.distance} км</>
                ) : (
                  "-"
                )}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Расстояние</p>
            </div>
            <div className="text-start">
              <p className="text-sm font-medium">
                {booking?.basicInfo?.tonnage ? (
                  <>{booking?.basicInfo?.tonnage} тонн</>
                ) : (
                  "-"
                )}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Вес</p>
            </div>
            <div className="text-start">
              <p className="text-sm font-medium">
                {booking?.detailTransportation?.ratePerTon ? (
                  <>{booking?.detailTransportation?.ratePerTon} ₽/т</>
                ) : (
                  "-"
                )}
              </p>
              <p className="text-xs text-muted-foreground mb-1">Ставка</p>
            </div>
          </div>

          {/* <div className="flex justify-end mt-4">{bookingDetailSlot}</div> */}
        </div>

        {/* Right section with stats */}
        <div className="flex-1 p-4 pr-0 mr-12">
          <div className="flex flex-col gap-8 h-full">
            <div className="flex gap-2">
              <ArrowDownRight className="w-4 h-4 mt-[2px]" />
              <div>
                <p className="text-sm font-medium">
                  {booking?.basicInfo?.loadingLocation?.name || "-"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Место погрузки
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {booking?.conditionsTransportation?.loadingDate
                    ? new Date(
                        booking?.conditionsTransportation?.loadingDate,
                      ).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "long",
                      })
                    : "Уточнить"}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <CornerRightUp className="w-4 h-4 mt-[2px]" />
              <div>
                <p className="text-sm font-medium">
                  {booking?.basicInfo?.unLoadingLocation || "-"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Место выгрузки
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 h-[calc(100%-38px)]">
          {bookingDetailSlot}
        </div>
      </div>
    </Card>
  );
}

{
  /* Детали груза */
}
// <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
//   <div className="grid grid-cols-2 gap-4">
//     <div className="flex items-center gap-2">
//       <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
//         <Package className="w-4 h-4 text-primary" />
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground">Груз</p>
//         <p className="font-medium">
//           {booking?.basicInfo?.culture
//             ? booking?.basicInfo?.culture
//             : "-"}
//         </p>
//       </div>
//     </div>

//     <div className="flex items-center gap-2">
//       <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
//         <Truck className="w-4 h-4 text-primary" />
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground">Тип ТС</p>
//         <p className="font-medium">Тент</p>
//       </div>
//     </div>

//     <div className="flex items-center gap-2">
//       <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
//         <Wallet className="w-4 h-4 text-primary" />
//       </div>
//       <div>
//         <p className="text-sm text-muted-foreground">Тип Оплаты</p>
//         <p className="font-medium">
//           {booking?.detailTransportation?.paymentType
//             ? getPaymentMethodLabel(
//                 booking?.detailTransportation?.paymentType,
//               )
//             : "-"}
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
