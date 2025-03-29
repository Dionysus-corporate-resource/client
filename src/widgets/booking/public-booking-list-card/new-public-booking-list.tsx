import { NewBookingCard } from "@/entities/booking";
import { IBookingDto } from "@/shared/model/types/booking";

export default function NewPublicBookingList({
  bookings,
}: {
  bookings: IBookingDto[] | undefined;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {bookings?.map((booking) => <NewBookingCard booking={booking} />)}
    </div>
  );
}
