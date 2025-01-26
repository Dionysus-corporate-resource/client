import { MapPin, Info } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";
// import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { ReactNode } from "react";
import { IBooking } from "@/shared/model/types/booking";

export default function BookingCard({
  booking,
  bookingDetailSlot,
}: {
  booking: IBooking;
  bookingDetailSlot: ReactNode;
}) {
  return (
    <Card className="w-full max-w-md relative">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-lg">
                {booking?.basicInfo?.loadingLocation?.name}
              </h3>
              <p className="text-sm text-muted-foreground">region</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 ml-6">
            <Badge variant="secondary" className="rounded-full">
              {booking?.basicInfo?.distance}
            </Badge>
            <Badge variant="secondary" className="rounded-full">
              {booking?.basicInfo?.culture}
            </Badge>
          </div>

          {/* Unloading Location */}
          <div className="">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <h3 className="font-medium text-lg">Место выгрузки не указано</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {booking?.basicInfo?.unLoadingLocation}
            </p>
            <div className="border-l h-16 border-dashed absolute top-14 left-8" />
          </div>

          {/* Destination & Seller */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-medium">NameCompany</p>
              <Badge variant="outline" className="text-muted-foreground">
                Нет оценок
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="border-b" />
      <CardFooter className="flex items-center justify-between pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Цена:</p>
          <p className="text-lg font-semibold text-primary">
            {booking?.detailTransportation?.ratePerTon}
          </p>
        </div>
        {bookingDetailSlot}
      </CardFooter>
    </Card>
  );
}
