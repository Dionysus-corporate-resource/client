import { Sheet, SheetContent } from "@/shared/components/ui/sheet";
import { Dispatch, ReactNode, SetStateAction } from "react";
import BookingDetailContent from "./booking-detail-content";

export default function BookingDetailSheetMap({
  bookingId,
  onOpenChange,
  open,
}: {
  bookingId: string | null;
  actionSlot?: ReactNode;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[400px] sm:w-[540px] sm:max-w-[640px] lg:w-[620px] overflow-y-auto z-[99999]
        ex:w-[100vw] p-0"
      >
        {bookingId && (
          <BookingDetailContent
            onOpenChange={onOpenChange}
            bookingId={bookingId}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
