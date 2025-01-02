import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  NewMiniBookingCard,
  NewMiniBookingItem,
  PlaceholderBookingCard,
} from "@/entities/corporate-booking";
import { PlaceholderBookingCardInCarousel } from "@/entities/flight";
import { PlaceholderCard } from "@/shared";
import { IBookingDto } from "@/shared/model/types/booking";
import { Dispatch } from "react";

export default function CarouselBooking({
  sortBooking,
  setSortBookingId,
}: {
  sortBooking: IBookingDto[] | undefined;
  setSortBookingId: Dispatch<React.SetStateAction<string | null>>;
}) {
  console.log("sortBooking", sortBooking);
  return (
    <Carousel className="w-full max-w-screen-2xl">
      <CarouselContent className="pb-2">
        {sortBooking?.length === 0 ? (
          <CarouselItem>
            <div className="h-[124px] w-full">
              <PlaceholderCard
                url="https://i.pinimg.com/736x/81/22/4c/81224cb98444b2de74bab72e3984b5d0.jpg"
                // url="https://i.pinimg.com/736x/87/3d/29/873d29ec762ff8f8a4abd3cb38bb5f3c.jpg"
                title="Ох, похоже вы еще не выложили не одной заявки."
                description="Перейдите в Студию, там вы сможете это исправить"
                additionallyStylesForImagesBlock="h-[130px] w-[50%]"
                additionallyStylesForMainBlock="gap-16"
                additionallyStylesForImage=""
              />
              {/* <PlaceholderBookingCard /> */}
            </div>
          </CarouselItem>
        ) : sortBooking ? (
          <>
            {sortBooking?.map((corporateBooking) => (
              <CarouselItem
                key={corporateBooking._id}
                className="-mr-2 lg:basis-1/3"
                onClick={() =>
                  setSortBookingId(corporateBooking.corporateBookingData._id)
                }
              >
                <div className="h-full w-full">
                  <NewMiniBookingCard
                    booking={corporateBooking.corporateBookingData}
                  />
                </div>
              </CarouselItem>
            ))}
          </>
        ) : (
          <CarouselItem key={1}>
            <div className="p-1 h-full">Скелетон</div>
          </CarouselItem>
        )}

        {sortBooking && sortBooking?.length <= 2 && (
          <PlaceholderCard
            url="https://i.pinimg.com/736x/d7/03/f6/d703f601b731b14c08db3ec6b6cab0b3.jpg"
            // url="https://i.pinimg.com/736x/8c/91/e7/8c91e7e38c130b00a25731fdb0628d98.jpg"
            title="Больше заявок - больше денег!"
            description="Давай не ленись, взял и созвонился с заказчком, диспечерам тоже нужно на что-то жить"
            additionallyStylesForImagesBlock="h-[130px]"
            additionallyStylesForMainBlock="ml-4 pr-8"
            additionallyStylesForImage="top-4"
          />
        )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
