import { Button } from "@/shared/components/ui/button";
import BookingDetailSheet from "../booking-detail/booking-detail-sheet";
import { ArrowUpRight } from "lucide-react";
import { TBookingDto } from "@/shared/model/types/booking";
import BookingCard from "@/entities/booking/booking-card";

export default function PublicBookingListCard({
  bookings,
}: {
  bookings: TBookingDto[] | undefined;
}) {
  return (
    <div
      className="mx-auto w-fit grid gap-4 ex:px-2 ex:mt-2 p- bg- rounded-xl
     grid-cols-1 md:grid-cols-2 md:w-full lg:grid-cols-1 xl:grid-cols-2 lg:w-full 2xl:grid-cols-2 2xl:w-full"
    >
      {bookings && bookings.length > 0 ? (
        bookings?.reverse().map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            bookingDetailSlot={
              <BookingDetailSheet
                bookingId={booking?._id}
                actionSlot={
                  <Button variant="secondary">
                    Подробнее
                    <ArrowUpRight className="w-4 h-4 ml-2" />
                  </Button>
                }
              />
            }
          />
        ))
      ) : (
        <div className="text-muted-foreground mt-24">Нет активных заявок</div>
      )}
    </div>
  );
}
