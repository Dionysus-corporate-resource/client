import BookingDetailContent from "@/entities/booking/ui/booking-detail-content";
import { Button } from "@/shared/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ArrowRight } from "lucide-react";

export default function BookingDetailSheet({
  bookingId,
}: {
  bookingId: string;
}) {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
        // variant="secondary"
        // className="bg-[hsl(var(--access-primary))] text-white "
        >
          Подробнее
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] max-w-[400px] sm:w-[540px] sm:max-w-[540px] lg:w-[520px] overflow-y-auto z-[999]">
        <SheetHeader>
          <SheetTitle>Детали заявки</SheetTitle>
        </SheetHeader>
        <BookingDetailContent bookingId={bookingId} />
      </SheetContent>
    </Sheet>
  );
}
