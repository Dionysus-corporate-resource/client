import ProductCard from "@/entities/booking-card/booking-card";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";

export default function BookingListCard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 18 }, (_, index) => (
        <ProductCard key={index} bookingDetailSlot={<BookingDetailSheet />} />
      ))}
    </div>
  );
}
