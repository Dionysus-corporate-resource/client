import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { BookingListTable, BookingListCard } from "@/widgets/booking-list";
import FilterPanel from "@/feature/filter-panel/filter-panel";
import MapPage from "../map/map-page";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "./api/query-option";

export default function HomePage() {
  const { data: bookingData, isPending } = useQuery(
    bookingQueryOption.getAll(),
  );
  console.log("home booking", bookingData);

  return (
    // container  md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px]
    <div className="mx-auto flex flex-1 md:grid gap-6 p-4 md:p-6">
      <div className="h-full overflow-y-auto no-scrollbar">
        <Tabs
          defaultValue="map"
          className="overflow-hidden space-y-4 overflow-y-auto no-scrollbar"
        >
          <div className="flex gap-6 justify-between">
            <TabsList>
              <TabsTrigger value="booking-list-table" className="space-x-2">
                {/* <List className="w-4 h-4" /> */}
                <span>Список</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="space-x-2">
                {/* <MapPinned className="w-4 h-4" /> */}
                <span>Карта</span>
              </TabsTrigger>

              <TabsTrigger value="booking-list-card" className="space-x-2">
                {/* <ReceiptText className="w-4 h-4" /> */}
                <span>Карточки</span>
              </TabsTrigger>
            </TabsList>
            <FilterPanel />
          </div>
          {/* Content */}
          <TabsContent value="booking-list-table" className="h-full">
            <BookingListTable />
          </TabsContent>
          <TabsContent value="map">
            <MapPage bookingData={bookingData} isPending={isPending} />
          </TabsContent>
          <TabsContent value="booking-list-card">
            <BookingListCard />
          </TabsContent>
        </Tabs>
      </div>
      {/* <div className="">
        <AdvertisingCard />
      </div> */}
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
