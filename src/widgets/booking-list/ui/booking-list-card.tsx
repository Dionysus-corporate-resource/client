import BookingCard from "@/entities/booking/ui/booking-card";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";

export default function BookingListCard() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 18 }, (_, index) => (
        <BookingCard key={index} bookingDetailSlot={<BookingDetailSheet />} />
      ))}
    </div>
  );
}
