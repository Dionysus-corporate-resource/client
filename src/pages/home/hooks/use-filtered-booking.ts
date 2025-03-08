import { IBookingDto } from "@/shared/model/types/booking";

export default function useFilteredBooking({
  bookings,
}: {
  bookings: IBookingDto[] | undefined;
}) {
  const filterBooking = bookings?.filter(
    (booking) => booking?.status === "active",
  );
  return filterBooking;
}
