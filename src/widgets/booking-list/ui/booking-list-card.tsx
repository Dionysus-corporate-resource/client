import ProductCard from "@/entities/booking-card/booking-card";

export default function BookingListCard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {Array.from({ length: 18 }, (_, index) => (
        <ProductCard key={index} />
      ))}
    </div>
  );
}
