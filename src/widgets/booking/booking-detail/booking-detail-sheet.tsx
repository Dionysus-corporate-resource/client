import BookingDetailContent from "@/entities/booking/ui/booking-detail-content";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";
import { Dispatch, ReactNode, SetStateAction } from "react";

export default function BookingDetailSheet({
  bookingId,
  actionSlot,
  onOpenChange,
  open,
}: {
  bookingId: string | null;
  actionSlot?: ReactNode;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {actionSlot && (
        <SheetTrigger className="h-full">{actionSlot}</SheetTrigger>
      )}

      <SheetContent
        side="left"
        className="w-[400px] sm:w-[540px] sm:max-w-[640px] lg:w-[620px] overflow-y-auto z-[99999]
        ex:w-[100vw] ex:p-2"
      >
        <SheetHeader
          className="flex flex-row items-center gap-2
          ex:px-2"
        >
          {/* <PackageOpen className="w-4 h-4 text-muted-foreground" /> */}
          <SheetTitle>Детали заявки</SheetTitle>
        </SheetHeader>
        {bookingId && <BookingDetailContent bookingId={bookingId} />}
      </SheetContent>
    </Sheet>
  );
}
