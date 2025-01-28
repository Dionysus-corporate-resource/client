import { BookingCard, SkeletonBookingCard } from "@/entities/booking";
import { IBookingDto } from "@/shared/model/types/booking";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";

export default function BookingListCard({
  bookingData,
  isPending,
}: {
  bookingData: IBookingDto[] | undefined;
  isPending: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {isPending
        ? Array.from({ length: 10 }).map((_, index) => (
            <SkeletonBookingCard key={index} />
          ))
        : bookingData?.map((booking, index) => (
            <BookingCard
              key={booking._id}
              orderNumber={index + 1}
              booking={booking}
              bookingDetailSlot={<BookingDetailSheet />}
            />
          ))}
    </div>
  );
}
