import { Dialog, DialogContent } from "@/components/ui/dialog";
import ToogleBookingForm from "./toggle-booking-form";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
  bookingId: string;
};

export default function BookingToogleItemDialog({
  isOpen,
  setIsOpen,
  bookingId,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <ToogleBookingForm bookingId={bookingId} />
      </DialogContent>
    </Dialog>
  );
}
