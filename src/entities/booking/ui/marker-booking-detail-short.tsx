import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { IBookingDto } from "@/shared/model/types/booking";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { ArrowUpRight, Package } from "lucide-react";

export default function MarkerBookingDetailShort({
  group,
}: {
  group: { coordinates: [number, number]; places: IBookingDto[] };
}) {
  return (
    <div className="">
      <h3>Количество заявок: {group.places.length}</h3>
      <div
        className={cn(
          "w-[150px] overflow-y-auto",
          group.places.length > 1 && "grid grid-cols-2 w-[280px] h-[150px]",
          group.places.length > 2 && "h-[305px]",
        )}
      >
        {group.places.map((place) => (
          <div key={place._id} className="pb-2 space-y-2 w-[130px]">
            {/* <p>ID: {place._id}</p>
            <p>Описание: {place?.basicInfo?.culture}</p>{" "} */}
            <div className="space-y-0 flex flex-col gap-0">
              <div className="flex gap-2 place-items-center">
                <Package className="w-4 h-4" />
                <p className="font-bold text-sm">{place?.basicInfo?.culture}</p>
              </div>

              <p className="font-medium text-xs">
                Дистанция -{" "}
                {place?.basicInfo?.distance ? (
                  <>{place?.basicInfo?.distance} км</>
                ) : (
                  "Уточнить"
                )}
              </p>

              <p className="font-medium text-xs">
                Объем -{" "}
                {place?.basicInfo?.tonnage ? (
                  <>{place?.basicInfo?.tonnage} тонн</>
                ) : (
                  "Уточнить"
                )}
              </p>

              <p className="font-medium text-xs">
                Ставка -{" "}
                {place?.detailTransportation?.ratePerTon ? (
                  <>{place?.detailTransportation?.ratePerTon} ₽/т</>
                ) : (
                  "Уточнить"
                )}
              </p>
            </div>

            <BookingDetailSheet
              bookingId={place?._id}
              actionSlot={
                <Button
                  size="sm"
                  variant="default"
                  className="bg-[hsl(var(--access-primary))] text-white p-"
                >
                  Подробнее
                  {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
