import { bookingQueryOptions } from "@/pages/home/api/query-options";
import { useQuery } from "@tanstack/react-query";
import CorporateBookingMiniItem from "./components/corporate-booking-mini-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarFlightItem from "@/entities/corporate-booking/flight/components/car-flight-item";
import { useAuth } from "@/app/providers/auth-provider";
import { useState } from "react";

export default function FlightDispatcherPage() {
  const context = useAuth();
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());
  const [sortBookingId, setSortBookingId] = useState<string | null>(null);

  const sortFlight = bookingData
    ?.find((booking) => booking._id === sortBookingId)
    ?.flight.filter(
      (flight) => flight.dispatcher === context?.user?.userData?._id,
    );
  console.log("sortFlight", sortFlight);

  return (
    <div className="grid justify-center px-12 max-w-full">
      <span>sortBookingId - {sortBookingId}</span>
      <Carousel className="w-full max-w-screen-xl">
        <CarouselContent className="-ml-1">
          {bookingData?.map((corporateBooking) => (
            <CarouselItem
              key={corporateBooking._id}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
              onClick={() => setSortBookingId(corporateBooking._id)}
            >
              <div className="p-1 h-full">
                <CorporateBookingMiniItem corporateBooking={corporateBooking} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="grid grid-cols-3 mt-4 gap-4 px-1">
        <div className="space-y-2 col-span-2">
          {sortFlight?.map((flight) => (
            <div className="space-y-2">
              LogisticianId - {flight.dispatcher}
              {flight.cars.map((car) => (
                <CarFlightItem car={car} />
              ))}
            </div>
          ))}
        </div>
        <div className="border rounded-lg h-[350px]"></div>
      </div>
    </div>
  );
}
