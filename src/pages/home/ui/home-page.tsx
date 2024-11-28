import BookingItem from "./components/booking-item";
import { IBookingDto } from "@/shared/model/types/booking";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOptions } from "../api/query-options";

export default function HomePage() {
  const { data: bookings } = useQuery(bookingQueryOptions.getAll());

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6">
      {bookings?.map((booking: IBookingDto) => (
        <BookingItem booking={booking} />
      ))}
    </div>
  );
}

// <div className="mx-auto h-60 w-full max-w-3xl rounded-xl bg-muted/50" />
// <div className="mx- h-60 w-full max-w-3xl rounded-xl bg-muted/50" />
// <div className="mx-auto h-60 w-full max-w-3xl rounded-xl bg-muted/50" />
