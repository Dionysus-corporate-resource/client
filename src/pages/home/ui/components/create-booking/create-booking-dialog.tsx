import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import CreateBookingForm from "./create-booking-form";

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

export default function CreateBookingItemDialog({ isOpen, setIsOpen }: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>Создание заявки</DialogTitle>
        <DialogDescription>
          Заполните форму для создания карточки груза
        </DialogDescription>

        <CreateBookingForm />
      </DialogContent>
    </Dialog>
  );
}
