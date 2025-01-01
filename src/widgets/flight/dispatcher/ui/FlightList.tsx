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
      {sortFlight ? (
        <>{sortFlightMapSlot}</>
      ) : (
        <PlaceholderCard
          // url="https://i.pinimg.com/736x/3b/b2/a6/3bb2a6b536138f60b797cc5e08523880.jpg"
          url="https://i.pinimg.com/736x/ed/9b/b1/ed9bb1a889d05659457cb93b751a61f1.jpg"
          title="Кликните по любой из карточек, чтобы рейсы отобразились на этом месте"
          description="Вы так-же можете поставить машины на рейс, для этого читайте наше
          руководство по использованию"
        />
      )}
    </div>
  );
}
