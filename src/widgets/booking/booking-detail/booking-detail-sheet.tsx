import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { ReactNode, useState } from "react";
import BookingDetailContent from "./booking-detail-content";

export default function BookingDetailSheet({
  bookingId,
  actionSlot,
}: {
  bookingId: string | null;
  actionSlot?: ReactNode;
}) {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  return (
    <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
      {actionSlot && (
        <SheetTrigger className="h-full">{actionSlot}</SheetTrigger>
      )}

      <SheetContent
        side="left"
        className="w-[400px] sm:w-[540px] sm:max-w-[640px] lg:w-[620px] overflow-y-auto z-[99999]
        ex:w-[100vw] p-0"
      >
        {bookingId && (
          <BookingDetailContent
            onOpenChange={setIsOpenSheet}
            bookingId={bookingId}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
