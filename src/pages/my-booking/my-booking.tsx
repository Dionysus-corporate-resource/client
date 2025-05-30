import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "../home/api/query-option";
import BookingDetailSheet from "@/widgets/booking/booking-detail/booking-detail-sheet";
import { Button } from "@/shared/components/ui/button";
import { Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { NavLink, useNavigate } from "react-router";
import { bookingApi } from "../home/api/booking-api";
import { queryClient } from "@/shared/model/api/query-client";
import { toast } from "@/shared/hooks/use-toast";
import { TBookingDto } from "@/shared/model/types/booking";
import { useMemo, useState } from "react";
import BookingCard from "@/entities/booking/booking-card";
import { userApi } from "@/feature/auth/profile/api/user-api";

export default function MyBookingPage() {
  const navigate = useNavigate();
  const { data: bookingData } = useQuery(bookingQueryOption.getAll());
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getDataProfile(),
  });
  const [selectStatus, setSelectStatus] =
    useState<TBookingDto["status"]>("active");

  const userBookings = useMemo(() => {
    if (!bookingData || !userData) return [];
    return bookingData
      .filter((booking) => booking.user === userData._id)
      .filter((booking) => booking?.status === selectStatus);
  }, [bookingData, userData, selectStatus]);

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
      data: TBookingDto["status"];
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
    <div className="container mx-auto flex flex-col">
      <div className="flex justify-between mt-16">
        <Tabs defaultValue="active" className="w-fit">
          <TabsList className="rounded-[30px] px-2 py-2">
            <TabsTrigger
              value="active"
              className="px-4 py-2 rounded-[30px] font-semibold text-sm"
              onClick={() => setSelectStatus("active")}
            >
              Активные
            </TabsTrigger>
            <TabsTrigger
              value="archive"
              className="px-4 py-2 rounded-[30px] font-semibold text-sm"
              onClick={() => setSelectStatus("archive")}
            >
              Архив
            </TabsTrigger>
            <TabsTrigger
              value="inactive"
              className="px-4 py-2 rounded-[30px] font-semibold text-sm"
              onClick={() => setSelectStatus("inactive")}
            >
              Не активные
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="h-fit w-fit text-base font-semibold text-white px-6 py-4 rounded-[30px] bg-[#64A5FE]">
              Создать заявку
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="rounded-[30px] py-2 px-2 mt-2">
            <DropdownMenuItem className="rounded-[30px]">
              <NavLink
                to="/create-booking/detail"
                className="pl-2 pr-8  text-base font-normal"
              >
                Детальную
              </NavLink>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-[30px]">
              <NavLink
                to="/create-booking/short"
                className="px-2 pr-8 text-base font-normal"
              >
                Короткую
              </NavLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4">
        {userBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            bookingDetailSlot={
              <BookingDetailSheet
                bookingId={booking?._id}
                actionSlot={
                  <Button
                    className="rounded-[30px] shadow-none text-xs font-semibold px-4 py-5 text-[hsl(var(--access-primary))]"
                    style={{ background: "#E8F1FF" }}
                  >
                    Подробнее
                  </Button>
                }
              />
            }
            bookingEditSlot={
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button className="">
                    <Settings2 className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-6 rounded-[30px] py-2 px-2">
                  {/* <DropdownMenuLabel>Меню редактирования</DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  {booking?.additionalConditions ? (
                    <DropdownMenuItem
                      className="rounded-[30px]"
                      onClick={() =>
                        navigate(`/edit-booking-detail/${booking._id}`)
                      }
                    >
                      <span className="px-2">Редактировть заявку</span>
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      className="rounded-[30px]"
                      onClick={() =>
                        navigate(`/edit-booking-short/${booking._id}`)
                      }
                    >
                      <span className="px-2">Редактировть заявку</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="rounded-[30px]">
                      <span className="px-2">Изменить статус</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent className="rounded-[30px] py-2 px-2">
                        <DropdownMenuItem
                          className="rounded-[30px]"
                          onClick={() =>
                            updateStatusMutation.mutate({
                              data: "active",
                              bookingId: booking?._id,
                            })
                          }
                        >
                          <span className="px-2">Активная</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-[30px]"
                          onClick={() =>
                            updateStatusMutation.mutate({
                              data: "archive",
                              bookingId: booking?._id,
                            })
                          }
                        >
                          <span className="px-2">Архив</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-[30px]"
                          onClick={() =>
                            updateStatusMutation.mutate({
                              data: "inactive",
                              bookingId: booking?._id,
                            })
                          }
                        >
                          <span className="px-2">Не актуальная</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem
                    className="rounded-[30px]"
                    onClick={() => handleRemove(booking._id)}
                  >
                    <span className="px-2">Удалить заявку</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            }
          />
        ))}
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
