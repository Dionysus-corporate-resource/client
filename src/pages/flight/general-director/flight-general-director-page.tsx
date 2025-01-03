import { ChartFakeThree, ChartFakeTwo } from "@/entities/flight";
import { NewFlightCarItem } from "@/entities/flight/dispatcher";
import { bookingQueryOptions } from "@/pages/home/api/query-options";
import { CarouselBooking, FlightList } from "@/widgets/flight/dispatcher";
import { useQuery } from "@tanstack/react-query";
import { Building2 } from "lucide-react";
import { useState } from "react";

export default function FlightGeneralDirectorPage() {
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());
  const [sortBookingId, setSortBookingId] = useState<string | null>(null);

  const sortBooking = bookingData?.filter(
    (booking) => booking.corporateBookingData.status !== "inactive",
  );

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

      <div className="grid grid-cols-5 mt-4 gap-4 w-full">
        <FlightList
          sortFlight={sortFlight}
          sortFlightMapSlot={sortFlight?.map((flight) => (
            <div className="mx-auto">
              {/* Header Section */}
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-end px-1 justify-between">
                  {/* Company Info */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-600">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Организация</p>
                      <h1 className="text-sm font-medium text-gray-900">
                        {flight?.organization}
                      </h1>
                    </div>
                  </div>

                  {/* Dispatcher Info */}
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end ">
                      <p className="text-xs text-gray-500">Диспетчер</p>
                      <p className="text-sm font-medium text-gray-900">
                        {flight?.dispatcher?.userName}
                      </p>
                    </div>
                    {/* <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-50 text-green-600">
                      <User2 className="w-4 h-4" />
                    </div> */}
                  </div>
                </div>

                {/* <div className="border-t" /> */}

                {/* Transport Cards List */}
                <div className="space-y-2">
                  {flight.cars.map((car) => (
                    // <FlightCarItem car={car} />
                    <NewFlightCarItem car={car} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        />
        {/* <ChartFakeOne /> */}
        <ChartFakeTwo />
        <ChartFakeThree />
      </div>
    </div>
  );
}
