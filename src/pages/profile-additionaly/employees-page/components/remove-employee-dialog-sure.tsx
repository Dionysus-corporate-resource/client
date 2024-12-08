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
import { queryClient } from "@/shared/api/query-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Dispatch, SetStateAction } from "react";
import { employeesApi } from "../api/employees-api";

export default function RemoveEmployeeDialogSure({
  logisticianId,
  isOpen,
  setIsOpen,
}: {
  logisticianId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const removeLogisticianMutation = useMutation({
    mutationFn: (logisticianId: string) =>
      employeesApi.removeLogistician(logisticianId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  const removeBooking = () => {
    removeLogisticianMutation.mutate(logisticianId, {
      onSuccess: () => {
        toast({
          title: "Сотрудник удален!",
          description: "Данные о сотруднике успешно удалены",
        });
        queryClient.invalidateQueries({ queryKey: ["employees"] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        toast({
          title: "Ошибка",
          description: "Не удалось удалить сотрудника",
          variant: "destructive",
        });
      },
    });
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Точно удаляем?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
