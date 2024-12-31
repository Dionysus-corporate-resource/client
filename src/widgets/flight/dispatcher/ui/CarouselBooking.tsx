import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PlaceholderBookingCard } from "@/entities/corporate-booking";
import { CorporateBookingMiniItem } from "@/entities/flight/dispatcher";
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
      <CarouselContent>
        {sortBooking?.length === 0 ? (
          <CarouselItem>
            <div className="h-[258px] w-full">
              <PlaceholderBookingCard />
            </div>
          </CarouselItem>
        ) : sortBooking ? (
          <>
            {sortBooking?.map((corporateBooking) => (
              <CarouselItem
                key={corporateBooking._id}
                className=" md:basis-1/2 lg:basis-1/3"
                // pl-1
                onClick={() => setSortBookingId(corporateBooking._id)}
              >
                <div className="p-1 h-full">
                  <CorporateBookingMiniItem
                    corporateBooking={corporateBooking}
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
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
