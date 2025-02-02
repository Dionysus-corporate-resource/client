import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Checkbox } from "@/shared/components/ui/checkbox";
import SortBookingPanel from "@/feature/filter-panel/sort-booking-panel";
import { bookingQueryOption } from "./api/query-option";
import { useQuery } from "@tanstack/react-query";
import FilterBookingPanel from "@/feature/filter-panel/filter-booking-panel";
import { useAtom } from "jotai";
import { isMapViewFullAtom } from "./model/sort-atom";
import { List, Map, PanelRightDashed } from "lucide-react";

export default function HomePage() {
  const { data, isPending } = useQuery(bookingQueryOption.getAll());
  const filterBooking = data?.filter((booking) => booking?.status === "active");
  const [isMapViewFull, setIsMapViewFull] = useAtom(isMapViewFullAtom);

  const navigate = useNavigate();
  const location = useLocation();

  if (isPending) return <div>Загрузка...</div>;

  return (
    <div className="mx-auto flex flex-col flex-1 px-6 gap-2 pt-4 ">
      <Tabs defaultValue={location.pathname}>
        <div className="flex gap-6 justify-between">
          <div className="flex gap-6">
            <TabsList>
              <TabsTrigger
                value="/table-view"
                className="space-x-2"
                onClick={() => navigate("/table-view")}
              >
                <List className="w-4 h-4" />
                <span>Список</span>
              </TabsTrigger>
              <TabsTrigger
                value="/"
                className="space-x-2"
                onClick={() => navigate("")}
              >
                <Map className="w-4 h-4" />
                <span>Карта</span>
              </TabsTrigger>

              <TabsTrigger
                value="/card-view"
                className="space-x-2"
                onClick={() => navigate("/card-view")}
              >
                <PanelRightDashed className="w-4 h-4" />

                <span>Карточки</span>
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2 mr-2">
              <Checkbox
                checked={isMapViewFull}
                onCheckedChange={(checked) => {
                  setIsMapViewFull(Boolean(checked));
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm  font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Растянут карту по ширине
              </label>
            </div>
          </div>
          {/* Панель сортировки */}
          <SortBookingPanel
          // filterBooking={filterBooking}
          />
        </div>
      </Tabs>
      {/* // Страниы */}
      <div className="space-y-4 borde border-pink-600 h-full ">
        <div className="flex justify-between gap-4">
          <FilterBookingPanel filterBooking={filterBooking} />
          <div className="flex gap-4">
            <label
              htmlFor="terms"
              className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              <span className="w-[160px]">За последние 5 дней</span>
              <Checkbox />
            </label>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
