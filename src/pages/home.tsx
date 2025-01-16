import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import BookingList from "@/widgets/booking-list/booking-list";
import { MapPinned, List } from "lucide-react";
import MapPage from "./map/map-page";

export default function HomePage() {
  return (
    <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
      <div className="h-full">
        <Tabs
          defaultValue="booking-list"
          className="h-full overflow-hidden space-y-4"
        >
          <TabsList>
            <TabsTrigger value="booking-list" className="space-x-2">
              <List className="w-4 h-4" />
              <span>Список</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="space-x-2">
              <MapPinned className="w-4 h-4" />
              <span>Карта</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="booking-list" className="h-full">
            <BookingList />
          </TabsContent>
          <TabsContent value="map" className="h-full overflow-hidden">
            <MapPage />
          </TabsContent>
        </Tabs>
      </div>
      <div className="border">filter</div>
    </div>
  );
}
