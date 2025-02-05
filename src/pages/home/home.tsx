import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Checkbox } from "@/shared/components/ui/checkbox";
import SortBookingPanel from "@/feature/filter-panel/sort-booking-panel";
import { bookingQueryOption } from "./api/query-option";
import { useQuery } from "@tanstack/react-query";
import FilterBookingPanel from "@/feature/filter-panel/filter-booking-panel";
import { useAtom } from "jotai";
import { isMapViewFullAtom } from "./model/sort-atom";
import {
  ArrowUpDown,
  Filter,
  List,
  Map,
  PanelRightDashed,
  Search,
  X,
} from "lucide-react";
import { MobileFilterPanel } from "@/widgets/mobile/mobile-filter-panel/mobile-filter-panel";
import { MobileSortedPanel } from "@/widgets/mobile/mobile-sorted-panel/mobile-sorted-panel";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Toggle } from "@/shared/components/ui/toggle";

export default function HomePage() {
  const { data, isPending } = useQuery(bookingQueryOption.getAll());
  const filterBooking = data?.filter((booking) => booking?.status === "active");
  const [isMapViewFull, setIsMapViewFull] = useAtom(isMapViewFullAtom);
  const [isOpenMobileFilter, setIsOpenMobileFilter] = useState(true);
  const [isOpenMobileSorted, setIsOpenMobileSorted] = useState(false);
  const [isOpenFilterAndSorted, setIsOpenFilterAndSorted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  if (isPending) return <div>Загрузка...</div>;

  return (
    <div
      className="mx-auto flex flex-col flex-1
      px-2 sm:px-6 pt-2 sm:pt-4 gap-0 sm:gap-2"
    >
      <Tabs defaultValue={location.pathname}>
        <div className="relative flex gap-6 justify-between">
          <div className="flex gap-6">
            <TabsList>
              <TabsTrigger
                value="/table-view"
                className="space-x-2
                hidden xl:flex"
                onClick={() => navigate("/table-view")}
              >
                <List className="w-4 h-4" />
                <span className="">Список</span>
              </TabsTrigger>
              <TabsTrigger
                value="/map-view"
                className="space-x-2"
                onClick={() => navigate("/map-view")}
              >
                <Map className="w-4 h-4" />
                <span className="ex:text-xs">Карта</span>
              </TabsTrigger>

              <TabsTrigger
                value="/"
                className="space-x-2"
                onClick={() => navigate("/")}
              >
                <PanelRightDashed className="w-4 h-4" />

                <span className="ex:text-xs">Карточки</span>
              </TabsTrigger>
            </TabsList>
            <div
              className="items-center space-x-2 mr-2
              hidden 2xl:flex"
            >
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
          <div
            className="flex items-center gap-4
            ex:gap-2"
          >
            {/* Кнопка открытия панели сортировки */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpenMobileSorted((prev) => !prev)}
                className={cn(
                  "bg-muted p-1 focus:outline-none flex justify-start items-center rounded-md",
                  isOpenMobileSorted && "border bg-red-50 border-red-50",
                  "sm:hidden",
                )}
              >
                {isOpenMobileSorted ? (
                  <X className="text-red-400 w-4 h-4 m-0.5" />
                ) : (
                  <ArrowUpDown className="w-4 h-4 m-[3px]" />
                )}
              </button>

              <Toggle
                className="ex:hidden xl:hidden"
                pressed={isOpenMobileFilter}
                aria-label="Toggle italic"
                onClick={() => setIsOpenMobileFilter((prev) => !prev)}
              >
                <ArrowUpDown className="h-4 w-4" />
                <span className="ex:hidden">фильтрация</span>
              </Toggle>
            </div>
            {/* Кнопка открытия панели фильтрации */}
            <div className="xl:hidden">
              <button
                onClick={() => setIsOpenMobileFilter((prev) => !prev)}
                className={cn(
                  "bg-muted p-1 focus:outline-none flex justify-start items-center rounded-md",
                  isOpenMobileFilter && "border bg-red-50 border-red-50",
                  "sm:hidden",
                )}
              >
                {isOpenMobileFilter ? (
                  <X className="text-red-400 w-4 h-4 m-0.5" />
                ) : (
                  <Filter className="w-4 h-4 m-[3px]" />
                )}
              </button>

              <Toggle
                className="ex:hidden xl:hidden"
                aria-label="Toggle italic"
                pressed={isOpenMobileSorted}
                onClick={() => setIsOpenMobileSorted((prev) => !prev)}
              >
                <Filter className="h-4 w-4" />
                <span className="ex:hidden">сортировка</span>
              </Toggle>
            </div>

            {/* Кнопка открытия общей панели фильтрации и сортировки */}
            <Toggle
              className="hidden xl:flex px-4"
              aria-label="Toggle italic"
              pressed={isOpenFilterAndSorted}
              onClick={() => setIsOpenFilterAndSorted((prev) => !prev)}
            >
              <Search className="h-4 w-4" />
              Расширенный поиск
            </Toggle>
          </div>
        </div>
      </Tabs>
      {/* // Страниы */}
      <div
        className="h-full
        space-y-2 xl:space-y-4"
      >
        <div
          className="flex flex-col justify-between gap-2
          xl:grid xl:grid-cols-1"
        >
          {isOpenFilterAndSorted && (
            <FilterBookingPanel
              placeUse="desktop"
              filterBooking={filterBooking}
              sortedPanelSlot={<SortBookingPanel placeUse="desktop" />}
            />
          )}

          {isOpenMobileSorted && (
            <MobileSortedPanel
              sortPanelSlot={<SortBookingPanel placeUse="mobile" />}
            />
          )}
          {isOpenMobileFilter && (
            <MobileFilterPanel
              filterPanelSlot={
                <FilterBookingPanel
                  placeUse="mobile"
                  filterBooking={filterBooking}
                  sortedPanelSlot={<SortBookingPanel placeUse="desktop" />}
                />
              }
            />
          )}
        </div>

        <Outlet />
      </div>
    </div>
  );
}

// <div className="container mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
