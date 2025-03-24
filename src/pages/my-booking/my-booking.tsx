import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import MyBookingListTable from "@/widgets/booking/my-booking-list-table/my-booking-list-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "../home/api/query-option";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { BookingCard, SkeletonBookingCard } from "@/entities/booking";
import BookingDetailSheet from "@/widgets/booking/booking-detail/booking-detail-sheet";
import { Button } from "@/shared/components/ui/button";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  FolderClock,
  FolderOpenDot,
  PanelRightDashed,
  Settings,
} from "lucide-react";
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
import { useNavigate } from "react-router";
import { bookingApi } from "../home/api/booking-api";
import { queryClient } from "@/shared/model/api/query-client";
import { toast } from "@/shared/hooks/use-toast";
import { IBookingDto } from "@/shared/model/types/booking";
import { useState } from "react";

export default function MyBooking() {
  const { data: bookingData } = useQuery(bookingQueryOption.getAll());
  const user = useAtomValue(userStorageAtom);
  const [selectStatus, setSelectStatus] =
    useState<IBookingDto["status"]>("active");

  const navigate = useNavigate();

  const tableDataActiveOrArchive = bookingData
    ?.filter((booking) => booking?.user?._id === user?._id)
    .filter((booking) => booking?.status === selectStatus);
  const tableDataActive = bookingData
    ?.filter((booking) => booking?.user?._id === user?._id)
    .filter((booking) => booking?.status === "active");
  const tableDataArchive = bookingData
    ?.filter((booking) => booking?.user?._id === user?._id)
    .filter((booking) => booking?.status === "inactive");

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
    // container
    <div
      className="container mx-auto w-full grid grid-cols-1 bg-primary/0
      ex:p-4 sm:p-4 md:p-6"
    >
      <div className="h-full overflow-y-auto no-scrollbar">
        <Tabs
          defaultValue="card-view_active"
          className="overflow-hidden space-y-4 overflow-y-auto no-scrollbar "
        >
          {/* Панель для мобильной версии */}
          <div className="block xl:hidden">
            <TabsList>
              <TabsTrigger
                value="card-view_active"
                className="items-center gap-2"
                onClick={() => setSelectStatus("active")}
              >
                <FolderOpenDot className="w-4 h-4" />
                <span className="ex:text-xs">Активные</span>
              </TabsTrigger>
              <TabsTrigger
                value="card-view_inactive"
                className="items-center gap-2"
                onClick={() => setSelectStatus("inactive")}
              >
                <FolderClock className="w-4 h-4" />
                <span className="ex:text-xs">Архив</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Панель для desktop версии */}
          <div className="gap-6 justify-between hidden xl:flex">
            <TabsList>
              <TabsTrigger
                value="card-view_active"
                onClick={() => setSelectStatus("active")}
                className="items-center gap-2 hidden xl:flex"
              >
                <PanelRightDashed className="w-4 h-4" />

                <span className="ex:text-xs">Вид карточками</span>
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="items-center gap-2
                hidden xl:flex"
              >
                <FolderOpenDot className="w-4 h-4" />
                <span className="ex:text-xs">Активные</span>
              </TabsTrigger>
              <TabsTrigger
                value="archive"
                className="items-center gap-2
                hidden xl:flex"
              >
                <FolderClock className="w-4 h-4" />
                <span className="ex:text-xs">Архив</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Содержимое страниц */}
          <TabsContent
            value={`card-view_${selectStatus}`}
            className="min-h-[calc(100vh-150px)]"
          >
            <span className="text-muted-foreground">
              Всего заявок: {tableDataActiveOrArchive?.length} шт.
            </span>
            <div
              className="w-full grid gap-4 mt-2
             grid-cols-1 md:grid-cols-2 md:w-full lg:grid-cols-2 xl:grid-cols-3 lg:w-full 2xl:grid-cols-3 2xl:w-full"
            >
              {!tableDataActiveOrArchive
                ? Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonBookingCard key={index} />
                  ))
                : tableDataActiveOrArchive?.map((booking, index) => (
                    <BookingCard
                      key={booking._id}
                      orderNumber={index + 1}
                      booking={booking}
                      showStatus={true}
                      bookingDetailSlot={
                        <BookingDetailSheet
                          bookingId={booking?._id}
                          actionSlot={
                            <Button size="sm" variant="secondary">
                              Подробнее
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                            </Button>
                          }
                        />
                      }
                      bookingEditSlot={
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <Button size="sm" variant="secondary" className="">
                              <p className="ex:hidden">Редактировать</p>
                              <Settings className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="mr-6">
                            <DropdownMenuLabel>
                              Меню редактирования
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/edit-booking/${booking._id}`)
                              }
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
                            <DropdownMenuItem
                              onClick={() => handleRemove(booking._id)}
                            >
                              Удалить заявку
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      }
                    />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="h-full">
            <div className="grid grid-cols-3 gap-12">
              <MyBookingListTable
                tableData={tableDataActive}
                bookingEditSlot={(booking: IBookingDto) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button>
                        <Settings className="w-4 h-4" />
                      </button>
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
                      <DropdownMenuItem
                        onClick={() => handleRemove(booking._id)}
                      >
                        Удалить заявку
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              {/* <ChartMyBooking /> */}
            </div>
          </TabsContent>
          <TabsContent value="archive" className="h-full">
            <div className="grid grid-cols-3 5 gap-12">
              <MyBookingListTable
                tableData={tableDataArchive}
                bookingEditSlot={(booking: IBookingDto) => (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button>
                        <Settings className="w-4 h-4" />
                      </button>
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
                      <DropdownMenuItem
                        onClick={() => handleRemove(booking._id)}
                      >
                        Удалить заявку
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              />
              {/* <ChartMyBooking /> */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
