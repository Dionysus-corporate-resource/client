import { bookingApi } from "@/pages/home/api/booking-api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { toast } from "@/shared/hooks/use-toast";
import { queryClient } from "@/shared/model/api/query-client";
import { useMutation } from "@tanstack/react-query";

export function BookingRemoveSure({ bookingId }: { bookingId: string }) {
  console.log("bookingId", bookingId);
  // const removeMutation = useMutation({
  //   mutationFn: (bookingId: string) => bookingApi.remove(bookingId),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["booking"],
  //     });
  //     toast({
  //       title: "Заявка удалена",
  //       description: "Удаление прошло успешно",
  //     });
  //   },
  // });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <span>Удалить заявку</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены, что хотите удалить эту заявку?
          </AlertDialogTitle>
          <AlertDialogDescription>
            После удаления заявки, ее нельзя будет востановить, только создать
            заново
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
