import { bookingQueryOptions } from "@/pages/home/api/query-options";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/auth-provider";
import { useState } from "react";
import { CarouselBooking, FlightList } from "@/widgets/flight/dispatcher";
import { ChartFakeComponent } from "@/entities/flight/dispatcher";
import { SheetEditFlight } from "@/widgets/flight/dispatcher/ui/sheet-edit-flight";

export default function FlightDispatcherPage() {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const context = useAuth();
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());
  const [sortBookingId, setSortBookingId] = useState<string | null>(null);

  const sortBooking = bookingData
    ?.filter((booking) => booking.corporateBookingData.status !== "inactive")
    ?.filter((booking) => {
      return !!booking.flight.find(
        (flight) => flight?.dispatcher?._id === context?.user?.userData?._id,
      );
    });

  const sortFlight = bookingData
    ?.find((booking) => booking._id === sortBookingId)
    ?.flight.filter(
      (flight) => flight?.dispatcher?._id === context?.user?.userData?._id,
    );

  console.log("sortBooking", sortBooking, sortFlight);

  return (
    <div className="px-12 max-w-screen-2xl flex flex-col m-auto ">
      <CarouselBooking
        sortBooking={sortBooking}
        setSortBookingId={setSortBookingId}
      />

      <div className="grid grid-cols-4 gap-4 mt-6 w-full">
        <FlightList sortFlight={sortFlight} setIsOpenSheet={setIsOpenSheet} />
        <ChartFakeComponent />
      </div>
      <SheetEditFlight isOpen={isOpenSheet} setIsOpen={setIsOpenSheet} />
    </div>
  );
}
