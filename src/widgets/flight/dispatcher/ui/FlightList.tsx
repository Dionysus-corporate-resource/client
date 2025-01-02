import { EmptyDriverCard } from "@/entities/flight/dispatcher";
import { PlaceholderCard } from "@/shared";
import { IBookingDto } from "@/shared/model/types/booking";
import { ReactNode } from "react";

export default function FlightList({
  sortFlight,
  sortFlightMapSlot,
}: {
  sortFlight: IBookingDto["flight"] | undefined;
  sortFlightMapSlot: ReactNode;
}) {
  return (
    <div className="space-y-4 col-span-3">
      {sortFlight && sortFlight.length === 0 ? (
        <PlaceholderCard
          url="https://i.pinimg.com/736x/fa/dd/a3/fadda32204726a51d4a61f7f26d56653.jpg"
          // url="https://i.pinimg.com/736x/53/11/31/53113170660453e2c6097d2d79876125.jpg"
          title="Похоже на вашей заявке еще нет рейсов"
          description="Время раздать шапалахов диспечерам, может быть они вообще не работают?"
          additionallyStylesForImagesBlock="h-[150px]"
          additionallyStylesForMainBlock=" gap-4"
          additionallyStylesForImage=""
        />
      ) : (
        sortFlightMapSlot
      )}

      {!sortFlight && (
        <PlaceholderCard
          // url="https://i.pinimg.com/736x/cf/e6/8d/cfe68db07542442ccbbb71a9e11c7d6e.jpg"
          url="https://i.pinimg.com/736x/32/60/a3/3260a3de108cc2fd5c9096572e97dec4.jpg"
          title="Кликните по любой из карточек, чтобы рейсы отобразились на этом месте"
          description="Вы так-же можете поставить машины на рейс, для этого читайте наше
          руководство по использованию"
          additionallyStylesForImagesBlock="h-[150px]"
          additionallyStylesForMainBlock=" gap-4"
        />
      )}
    </div>
  );
}
