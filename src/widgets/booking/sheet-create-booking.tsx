import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CreateBookingForm from "@/pages/home/ui/components/create-booking/create-booking-form";

export default function SheetCreateBooking({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="min-w-[1200px]">
        <SheetHeader>
          <SheetTitle>Создание новой заявки</SheetTitle>
          <SheetDescription>
            Вы можете создать новую заявку в этом месте
          </SheetDescription>
        </SheetHeader>
        <CreateBookingForm setIsOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  );
}
