import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ToogleBookingForm from "@/pages/home/ui/components/toggle-booking/toggle-booking-form";
import { SkeletonBlock } from "@/shared";
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
          <ToogleBookingForm bookingId={bookingId} setIsOpen={setIsOpen} />
        ) : (
          <>
            <SkeletonBlock
              countSkeletonItem={8}
              stylesSkeletonItem="h-[40px]"
              stylesMainGrid="gap-2 grid-cols-4 mt-8"
            />
            <SkeletonBlock
              countSkeletonItem={4}
              stylesSkeletonItem="h-[80px]"
              stylesMainGrid="gap-2 grid-cols-2 mt-6"
            />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
