import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { IBookingDto } from "@/shared/model/types/booking";
import { Eye, EyeOff, MapPin, SlidersVertical } from "lucide-react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { bookingApi } from "@/pages/home/api/booking-api";
import { queryClient } from "@/shared/model/api/query-client";
import { toast } from "@/shared/hooks/use-toast";

export type IStateRemoveSureType = {
  isOpenDialog: boolean;
  removeBookindId: string | null;
};

type Props = {
  tableData: IBookingDto[] | undefined;
};

export default function MyBookingListTable({ tableData: bookingData }: Props) {
  const navigate = useNavigate();
  const removeMutation = useMutation({
    mutationFn: (bookingId: string) => bookingApi.remove(bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      toast({
        title: "Заявка удалена",
        description: "Удаление прошло успешно",
      });
    },
  });
  const updateStatusMutation = useMutation({
    mutationFn: ({
      data,
      bookingId,
    }: {
      data: IBookingDto["status"];
      bookingId: string;
    }) => bookingApi.updateStatus(data, bookingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      toast({
        title: "Заявка обновила свой статус",
        description: "Обновлении статуса прошло успешно",
      });
    },
  });

  const handleRemove = (bookingId: string) => {
    const isConfirmed = window.confirm(
      "Вы уверены, что хотите удалить заявку?",
    );
    if (isConfirmed) {
      removeMutation.mutate(bookingId);
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Просмотры</TableHead>
            <TableHead>Культура</TableHead>
            <TableHead>Погрузки</TableHead>
            <TableHead>Выгрузка</TableHead>
            <TableHead>Объем</TableHead>
            <TableHead>Расстояние</TableHead>
            <TableHead className="text-right">Ставка</TableHead>
            <TableHead className="text-right w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingData?.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                {booking?.view}
              </TableCell>

              <TableCell>{booking?.basicInfo?.culture}</TableCell>
              <TableCell className="flex gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                {booking?.basicInfo?.loadingLocation.name}
              </TableCell>
              <TableCell>{booking?.basicInfo?.unLoadingLocation}</TableCell>
              <TableCell>
                {booking?.basicInfo?.tonnage ? (
                  <>{booking?.basicInfo?.tonnage} т</>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{booking?.basicInfo?.distance}</TableCell>
              <TableCell className="text-right  font-semibold">
                {booking?.detailTransportation?.ratePerTon} ₽/т
              </TableCell>
              <TableCell className="text-right flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" className="">
                      <SlidersVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mr-6">
                    <DropdownMenuLabel>Меню редактирования</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate(`/edit-booking/${booking._id}`)}
                    >
                      Изменить заявку
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Перенести в архив
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem
                            className="flex gap-6"
                            onClick={() =>
                              updateStatusMutation.mutate({
                                data: "active",
                                bookingId: booking?._id,
                              })
                            }
                          >
                            Актуальна
                            <Eye className="w-4 h-4" />
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="flex gap-6 justify-between"
                            onClick={() =>
                              updateStatusMutation.mutate({
                                data: "inactive",
                                bookingId: booking?._id,
                              })
                            }
                          >
                            В архив
                            <EyeOff className="w-4 h-4" />
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem onClick={() => handleRemove(booking._id)}>
                      Удалить заявку
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
