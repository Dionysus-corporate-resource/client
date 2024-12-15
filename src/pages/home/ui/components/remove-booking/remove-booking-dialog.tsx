import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { bookingApi } from "@/pages/home/api/booking-api";
import { queryClient } from "@/shared/api/query-client";
import { IBookingDto } from "@/shared/model/types/booking";
import { useMutation } from "@tanstack/react-query";

export default function RemoveBookingDialogSure({
  corporateBooking,
  isOpen,
  setIsOpen,
}: {
  corporateBooking: IBookingDto["corporateBookingData"];
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
}) {
  const removeMutation = useMutation({
    mutationFn: () => bookingApi.remove(corporateBooking._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });

  const removeBooking = () => {
    removeMutation.mutate();
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Точно удаляем?</AlertDialogTitle>
          <AlertDialogDescription>
            При удалении, заявку невозможно будет востановить, в будущем мы
            планируем вместо удаления перетаскивать не актуальные заявки в архив
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={removeBooking}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
