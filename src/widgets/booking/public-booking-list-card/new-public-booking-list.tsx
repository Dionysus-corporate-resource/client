import { Button } from "@/shared/components/ui/button";
import { TBookingDto } from "@/shared/model/types/booking";
import BookingDetailSheet from "../booking-detail/booking-detail-sheet";
import BookingCard from "@/entities/booking/booking-card";

export default function NewPublicBookingList({
  bookings,
}: {
  bookings: TBookingDto[] | undefined;
}) {
  return (
    <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
      {bookings?.map((booking) => (
        <BookingCard
          booking={booking}
          bookingDetailSlot={
            <BookingDetailSheet
              bookingId={booking?._id}
              actionSlot={
                <Button
                  className="rounded-[30px] shadow-none text-xs font-semibold px-4 py-5 text-[hsl(var(--access-primary))]"
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
