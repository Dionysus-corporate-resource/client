import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import BookingList from "@/widgets/booking-list/booking-list";
import { MapPinned, List } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
      <div className="">
        <Tabs defaultValue="booking-list">
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
          <TabsContent value="booking-list">
            <BookingList />
          </TabsContent>
          <TabsContent value="map">Change your password here.</TabsContent>
        </Tabs>
      </div>
      <div className="border">filter</div>
    </div>
  );
}
