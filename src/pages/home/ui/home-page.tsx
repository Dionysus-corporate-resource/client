import BookingItem from "./components/booking-item";
import { IBookingDto } from "@/shared/model/types/booking";

import { useAtom } from "jotai";
import {
  bookingAtom,
  sortBookingAtom,
} from "@/shared/model/atoms/booking-atom";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOptions } from "../api/query-options";
import { useEffect } from "react";
import { NewBookingCard, SortSearchPanel } from "@/entities/corporate-booking";

export default function HomePage() {
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());

  const [bookingSort] = useAtom(sortBookingAtom);
  const [, setBooking] = useAtom(bookingAtom);

  useEffect(() => {
    if (bookingData) setBooking(bookingData);
    // console.log("Booking пришли", bookingData);
    // console.log("bookingSort", bookingSort);
  }, [bookingData, bookingSort]);

  return (
    <div className="px-6 space-y-6">
      <SortSearchPanel />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {bookingSort
          ?.filter(
            (booking) =>
              booking.corporateBookingData.status !== "inactive" &&
              booking.corporateBookingData.status !== "inProgress",
          )
          .map((booking: IBookingDto) => (
            // <BookingItem
            //   key={booking._id}
            //   booking={booking.corporateBookingData}
            // />
            <NewBookingCard
              key={booking._id}
              booking={booking.corporateBookingData}
            />
          ))}
      </div>
    </div>
  );
}

// <div className="mx-auto h-60 w-full max-w-3xl rounded-xl bg-muted/50" />
// <div className="mx- h-60 w-full max-w-3xl rounded-xl bg-muted/50" />
