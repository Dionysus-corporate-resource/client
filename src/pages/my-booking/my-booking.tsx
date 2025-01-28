import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { MyBookingListTable } from "@/widgets/booking-list";
// import FilterPanel from "@/entities/filter-panel/filter-panel";
import AdvertisingCard from "@/entities/advertising-card/advertising-card";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "../home/api/query-option";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";

export default function MyBooking() {
  const user = useAtomValue(userStorageAtom);
  const { data: bookingData, isPending } = useQuery(
    bookingQueryOption.getAll(),
  );

  const tableDataActive = bookingData?.filter(
    (booking) => booking?.user?._id === user?._id,
  );
  const tableDataArchive = bookingData
    ?.filter((booking) => booking?.user?._id === user?._id)
    .filter((booking) => booking?.status === "inactive");

  return (
    // container
    <div className="mx-auto w-full grid grid-cols-1 p-6">
      <div className="h-full overflow-y-auto no-scrollbar">
        <Tabs
          defaultValue="active"
          className="overflow-hidden space-y-4 overflow-y-auto no-scrollbar"
        >
          <div className="flex gap-6 justify-between">
            <TabsList>
              <TabsTrigger value="active" className="space-x-2">
                {/* <List className="w-4 h-4" /> */}
                <span>Активные</span>
              </TabsTrigger>
              <TabsTrigger value="archive" className="space-x-2">
                {/* <MapPinned className="w-4 h-4" /> */}
                <span>Архив</span>
              </TabsTrigger>
            </TabsList>
            {/* <FilterPanel /> */}
          </div>
          {/* Content */}
          <TabsContent value="active" className="h-full px-6">
            <MyBookingListTable tableData={tableDataActive} />
          </TabsContent>
          <TabsContent value="archive">
            <MyBookingListTable tableData={tableDataArchive} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
