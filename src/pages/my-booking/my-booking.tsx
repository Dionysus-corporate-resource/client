import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { MyBookingListTable } from "@/widgets/booking-list";
// import FilterPanel from "@/entities/filter-panel/filter-panel";
import AdvertisingCard from "@/entities/advertising-card/advertising-card";
import { TableData } from "@/entities/booking/model/types";

export default function MyBooking() {
  const tableDataActive: TableData[] = [
    {
      id: "1",
      customer: "ООО Агрохолдинг",
      culture: "Пшеница",
      loadingPoint: "Ростов-на-Дону",
      unloadingPoint: "Новороссийск",
      volume: "500 тонн",
      view: 12,
      distance: "300 км",
      rate: 800,
    },
    {
      id: "2",
      customer: "ИП Иванов",
      culture: "Кукуруза",
      loadingPoint: "Краснодар",
      unloadingPoint: "Туапсе",
      volume: "300 тонн",
      view: 34,
      distance: "150 км",
      rate: 1200,
    },
  ];
  const tableDataArchive: TableData[] = [
    {
      id: "1",
      customer: "ООО Агрохолдинг",
      culture: "Пшеница",
      loadingPoint: "Ростов-на-Дону",
      unloadingPoint: "Новороссийск",
      volume: "500 тонн",
      view: 12,
      distance: "300 км",
      rate: 800,
    },
  ];

  return (
    // container
    <div className="mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
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
          <TabsContent value="active" className="h-full">
            <MyBookingListTable tableData={tableDataActive} />
          </TabsContent>
          <TabsContent value="archive">
            <MyBookingListTable tableData={tableDataArchive} />
          </TabsContent>
        </Tabs>
      </div>
      <div className="">
        <AdvertisingCard />
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
