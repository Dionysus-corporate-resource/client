import { NewBookingCard } from "@/entities/booking";
import { Button } from "@/shared/components/ui/button";
import { IBookingDto } from "@/shared/model/types/booking";
import BookingDetailSheet from "../booking-detail/booking-detail-sheet";

export default function NewPublicBookingList({
  bookings,
}: {
  bookings: IBookingDto[] | undefined;
}) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {bookings?.map((booking) => (
        <NewBookingCard
          booking={booking}
          bookingDetailSlot={
            <BookingDetailSheet
              bookingId={booking?._id}
              actionSlot={
                <Button
                  className="rounded-xl shadow-none text-xs font-semibold px-4 py-2 text-[hsl(var(--access-primary))]"
                  style={{ background: "#E8F1FF" }}
                >
                  Подробнее
                </Button>
              }
            />
          }
        />
      ))}
    </div>
  );
}
