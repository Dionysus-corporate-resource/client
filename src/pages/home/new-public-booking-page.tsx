import {
  PaginationPublicBooking,
  usePaginationPublicBooking,
} from "@/feature/pagination-booking";
import NewPublicBookingList from "@/widgets/booking/public-booking-list-card/new-public-booking-list";
import FilterPublicBookingPanel from "@/widgets/filter-panel/filter-public-booking-panel";
import MapBackgroundYandex from "@/widgets/map/map-background-yandex";
import SortPublicBookingPanel from "@/widgets/sort-panel/sort-public-booking-panel";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "./api/query-option";
import useFilteredAndSortedBooking from "./hooks/use-filtered-booking";

export default function NewPublicBookingPage() {
  // get bookings
  const { data: bookings, isPending } = useQuery(bookingQueryOption.getAll());

  // filtering bookings
  const {
    filter: {
      filteredBooking,
      filters,
      setFilters,
      uniqueListCompany,
      resetFiltredValue,
    },
    sort,
  } = useFilteredAndSortedBooking({ bookings });

  // pagination bookings
  const { paginatedBookings, setPage, page, itemsPerPage } =
    usePaginationPublicBooking({
      filteredBooking,
    });

  return (
    <div className="relative w-full pb-12">
      <div className="absolute top-0 left-0 h-[361px] w-full bg-blue-300 z-[-1] bg-gradient-to-b from-[#333333] to-[#64A5FE]" />
      {/* карта */}
      <div className="px-3 mt-3 w-full">
        <div className="h-[350px] w-full rounded-t-[20px] overflow-hidden">
          <MapBackgroundYandex bookings={filteredBooking} />
        </div>
      </div>

      <div className="container mx-auto border border-background relative">
        <div className="absolute -top-12 w-full">
          <FilterPublicBookingPanel
            filters={filters}
            setFilters={setFilters}
            resetFiltredValue={resetFiltredValue}
            // uniqueListCompany={uniqueListCompany}
          />
        </div>

        <div className="grid grid-cols-4 gap-8 mt-20 z-20">
          <div className="col-span-3 space-y-2">
            <span className="text-sm font-medium text-primary/60 -mb-2">
              Всего заявок: {bookings?.length}
            </span>
            <NewPublicBookingList bookings={paginatedBookings} />
            <div className="w-full pt-4">
              <PaginationPublicBooking
                filteredBooking={filteredBooking}
                setPage={setPage}
                page={page}
                itemsPerPage={itemsPerPage}
              />
            </div>
          </div>
          <div className="col-span-1 flex flex-col mt-2">
            <div className="sticky top-8">
              <SortPublicBookingPanel
                filters={filters}
                setFilters={setFilters}
                uniqueListCompany={uniqueListCompany}
                {...sort}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
