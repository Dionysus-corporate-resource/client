import { BookingCard, SkeletonBookingCard } from "@/entities/booking";
import { Button } from "@/shared/components/ui/button";
import { IBookingDto } from "@/shared/model/types/booking";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { ArrowUpRight } from "lucide-react";

export default function BookingListCard({
  bookingData,
  isPending,
}: {
  bookingData: IBookingDto[] | undefined;
  isPending: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-4 p-1">
      {isPending
        ? Array.from({ length: 10 }).map((_, index) => (
            <SkeletonBookingCard key={index} />
          ))
        : bookingData?.map((booking, index) => (
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
