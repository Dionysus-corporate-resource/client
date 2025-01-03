import { useAuth } from "@/app/providers/auth-provider";
import { PlaceholderCard } from "@/shared";
import { IBookingDto } from "@/shared/model/types/booking";
import { BookmarkX, SquareMousePointer } from "lucide-react";
import { ReactNode } from "react";

export default function FlightList({
  sortFlight,
  sortFlightMapSlot,
}: {
  sortFlight: IBookingDto["flight"] | undefined;
  sortFlightMapSlot: ReactNode;
}) {
  const context = useAuth();
  console.log("sortFlight", sortFlight);

  if (context?.user?.corporateRoles?.find((role) => role === "dispatcher")) {
    return (
      <div className="space-y-4 col-span-3">
        {!sortFlight || sortFlight.length === 0 ? (
          <PlaceholderCard
            // url="https://i.pinimg.com/736x/cf/e6/8d/cfe68db07542442ccbbb71a9e11c7d6e.jpg"
            url="https://i.pinimg.com/736x/32/60/a3/3260a3de108cc2fd5c9096572e97dec4.jpg"
            title="Кликните по любой из карточек"
            description="Вы так-же можете поставить машины на рейс, для этого читайте наше
          руководство по использованию "
            additionallyStylesForImagesBlock="h-[150px]"
            additionallyStylesForMainBlock=" gap-4"
            Icon={SquareMousePointer}
          />
        ) : (
          sortFlight && sortFlight.length !== 0 && sortFlightMapSlot
        )}
      </div>
    );
  }

  if (context?.user?.corporateRoles?.find((role) => role === "manager")) {
    return (
      <div className="space-y-4 col-span-3">
        {!sortFlight ? (
          <PlaceholderCard
            // url="https://i.pinimg.com/736x/cf/e6/8d/cfe68db07542442ccbbb71a9e11c7d6e.jpg"
            url="https://i.pinimg.com/736x/32/60/a3/3260a3de108cc2fd5c9096572e97dec4.jpg"
            title="Кликните по любой из карточек"
            description="Вы так-же можете поставить машины на рейс, для этого читайте наше
          руководство по использованию "
            additionallyStylesForImagesBlock="h-[150px]"
            additionallyStylesForMainBlock=" gap-4"
            Icon={SquareMousePointer}
          />
        ) : sortFlight.length === 0 ? (
          <PlaceholderCard
            // url="https://i.pinimg.com/736x/cf/e6/8d/cfe68db07542442ccbbb71a9e11c7d6e.jpg"
            url="https://i.pinimg.com/736x/58/be/06/58be068d0b3f6168c516a5d7501aa0e6.jpg"
            title="Похоже на вашей заявке еще нет рейсов"
            description="Пришло время устроить наганяй на диспечеров"
            additionallyStylesForImagesBlock="h-[150px]"
            additionallyStylesForMainBlock=" gap-4"
            Icon={BookmarkX}
          />
        ) : (
          sortFlight && sortFlight.length !== 0 && sortFlightMapSlot
        )}
      </div>
    );
  }

  if (
    context?.user?.corporateRoles?.find((role) => role === "general_director")
  ) {
    return (
      <div className="space-y-4 col-span-3">
        {!sortFlight ? (
          <PlaceholderCard
            // url="https://i.pinimg.com/736x/cf/e6/8d/cfe68db07542442ccbbb71a9e11c7d6e.jpg"
            // url="https://i.pinimg.com/736x/32/60/a3/3260a3de108cc2fd5c9096572e97dec4.jpg"
            title="Кликните по любой из карточек"
            description="Это нужно, чтобы рейсы отобразились на этом месте "
            additionallyStylesForImagesBlock="h-[120px]"
            additionallyStylesForMainBlock="gap-4 p-6"
            Icon={SquareMousePointer}
          />
        ) : sortFlight.length === 0 ? (
          <PlaceholderCard
            // url="https://i.pinimg.com/736x/cf/e6/8d/cfe68db07542442ccbbb71a9e11c7d6e.jpg"
            url="https://i.pinimg.com/736x/35/b4/90/35b4903d3cccf70f1676ac30ba82611f.jpg"
            title="Похоже на заявке еще нет рейсов, как-же так ..."
            description="Не порядок, пришло время нагнать ужаса на диспечеров"
            additionallyStylesForImagesBlock="h-[100px]"
            additionallyStylesForMainBlock="gap-4"
            Icon={BookmarkX}
          />
        ) : (
          sortFlight && sortFlight.length !== 0 && sortFlightMapSlot
        )}
      </div>
    );
  }
}
