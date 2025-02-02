import { BookingCard, SkeletonBookingCard } from "@/entities/booking";
import { Button } from "@/shared/components/ui/button";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { useAtomValue } from "jotai";
import { ArrowUpRight } from "lucide-react";
import { sortbookingAtom } from "../model/sort-atom";

export default function BookingListCard() {
  const sortBooking = useAtomValue(sortbookingAtom);

  // Фильтруем заявки по статусу "active" ДЛЯ КАРТЫ ЧИСТО
  const filterBooking = sortBooking?.filter(
    (booking) => booking?.status === "active",
  );

  return (
    <div className="grid grid-cols-4 gap-4 p-1">
      {!filterBooking
        ? Array.from({ length: 10 }).map((_, index) => (
            <SkeletonBookingCard key={index} />
          ))
        : filterBooking?.map((booking, index) => (
            <BookingCard
              key={booking._id}
              orderNumber={index + 1}
              booking={booking}
              bookingDetailSlot={
                <BookingDetailSheet
                  bookingId={booking?._id}
                  actionSlot={
                    <Button
                      variant="secondary"
                      // className="bg-[hsl(var(--access-primary))] text-white "
                    >
                      Подробнее
                      <ArrowUpRight className="w-4 h-4 ml-2" />
                    </Button>
                  }
                />
              }
            />
          ))}
    </div>
  );
}
