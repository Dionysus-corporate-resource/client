import { useAuth } from "@/app/providers/auth-provider";
import {
  ChartFakeComponent,
  FlightCarItem,
} from "@/entities/flight/dispatcher";
import { bookingQueryOptions } from "@/pages/home/api/query-options";
import { CarouselBooking, FlightList } from "@/widgets/flight/dispatcher";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function FlightManagerPage() {
  const context = useAuth();
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());
  const [sortBookingId, setSortBookingId] = useState<string | null>(null);

  const sortBooking = bookingData
    ?.filter((booking) => booking.corporateBookingData.status !== "inactive")
    .filter((booking) => {
      return (
        booking.corporateBookingData?.manager?._id ===
        context?.user?.userData?._id
      );
    });

  const sortFlight = sortBooking?.find(
    (booking) => booking.corporateBookingData._id === sortBookingId,
  )?.flight;

  // console.log("sortBooking", sortBooking, sortFlight);

  return (
    <div className="px-12 max-w-screen-2xl flex flex-col m-auto">
      <CarouselBooking
        sortBooking={sortBooking}
        setSortBookingId={setSortBookingId}
      />

      <div className="grid grid-cols-4 mt-4 gap-4 w-full">
        <FlightList
          sortFlight={sortFlight}
          sortFlightMapSlot={sortFlight?.map((flight) => (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between px-2">
                <span>{flight.organization} </span>
                <div className="flex gap-2 items-center">
                  <span>{flight.dispatcher.userName}</span>
                </div>
              </div>
              {flight.cars.map((car) => (
                <FlightCarItem car={car} />
              ))}
            </div>
          ))}
        />
        <ChartFakeComponent />
      </div>
    </div>
  );
}
