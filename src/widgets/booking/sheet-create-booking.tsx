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
          <SheetTitle>Изменить данных рейса</SheetTitle>
          <SheetDescription>
            Вы можете изменить любые данные, удалить машину или добавить новую
          </SheetDescription>
        </SheetHeader>
        <CreateBookingForm />
      </SheetContent>
    </Sheet>
  );
}
