import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { MyBookingListTable } from "@/widgets/booking-list";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "../home/api/query-option";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { ChartMyBooking } from "@/widgets/chart/chart-my-booking";
import { BookingCard, SkeletonBookingCard } from "@/entities/booking";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { Button } from "@/shared/components/ui/button";
import {
  ArrowUpRight,
  FolderClock,
  FolderOpenDot,
  PanelRightDashed,
} from "lucide-react";

export default function MyBooking() {
  const user = useAtomValue(userStorageAtom);
  const { data: bookingData } = useQuery(bookingQueryOption.getAll());

  const tableDataActive = bookingData
    ?.filter((booking) => booking?.user?._id === user?._id)
    .filter((booking) => booking?.status === "active");
  const tableDataArchive = bookingData
    ?.filter((booking) => booking?.user?._id === user?._id)
    .filter((booking) => booking?.status === "inactive");

  return (
    // container
    <div
      className="mx-auto w-full grid grid-cols-1 bg-primary/0
      ex:p-2 sm:p-4 md:p-6"
    >
      <div className="h-full overflow-y-auto no-scrollbar">
        <Tabs
          defaultValue="card-view"
          className="overflow-hidden space-y-4 overflow-y-auto no-scrollbar"
        >
          <div className="flex gap-6 justify-between">
            <TabsList>
              <TabsTrigger
                value="card-view"
                className="flex items-center gap-2"
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
            {/* <FilterPanel /> */}
          </div>
          {/* Content */}
          <TabsContent value="card-view" className="min-h-[calc(100vh-150px)]">
            <div
              className="mx-auto w-fit grid gap-4
             grid-cols-1 md:grid-cols-2 md:w-full lg:grid-cols-3 lg:w-full 2xl:grid-cols-4 2xl:w-full"
            >
              {!tableDataActive
                ? Array.from({ length: 10 }).map((_, index) => (
                    <SkeletonBookingCard key={index} />
                  ))
                : tableDataActive?.map((booking, index) => (
                    <BookingCard
                      key={booking._id}
                      orderNumber={index + 1}
                      booking={booking}
                      bookingDetailSlot={
                        <BookingDetailSheet
                          bookingId={booking?._id}
                          actionSlot={
                            <Button
                              variant="secondary"
                              // className="bg-[hsl(var(--access-primary))] text-white "
                            >
                              Подробнее
                              <ArrowUpRight className="w-4 h-4 ml-2" />
                            </Button>
                          }
                        />
                      }
                    />
                  ))}
            </div>
          </TabsContent>
          <TabsContent value="active" className="h-full">
            <div className="grid grid-cols-5 gap-12">
              <MyBookingListTable tableData={tableDataActive} />
              <ChartMyBooking />
            </div>
          </TabsContent>
          <TabsContent value="archive" className="h-full">
            <div className="grid grid-cols-5 gap-12">
              <MyBookingListTable tableData={tableDataArchive} />
              <ChartMyBooking />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
