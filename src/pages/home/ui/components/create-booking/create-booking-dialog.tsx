import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateBookingDialog from "./create-booking-form";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

export default function BookingCreateItemDialog({ isOpen, setIsOpen }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <CreateBookingDialog />
      </DialogContent>
    </Dialog>
  );
}
