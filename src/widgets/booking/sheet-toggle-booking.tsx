import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import ToogleBookingForm from "@/pages/home/ui/components/toggle-booking/toggle-booking-form";
import { useEffect, useState } from "react";

export default function SheetToggleBooking({
  isOpen,
  setIsOpen,
  bookingId,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bookingId: string;
}) {
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      setShowForm(false);
    }; // Очистка таймера при размонтировании компонента
  }, [isOpen]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="min-w-[1200px]">
        <SheetHeader>
          <SheetTitle>Изменить данных рейса</SheetTitle>
          <SheetDescription>
            Вы можете изменить любые данные, удалить машину или добавить новую
          </SheetDescription>
        </SheetHeader>
        {showForm ? (
          <ToogleBookingForm bookingId={bookingId} />
        ) : (
          <Skeleton className="mt-8 w-full h-[50px]" />
        )}
      </SheetContent>
    </Sheet>
  );
}
