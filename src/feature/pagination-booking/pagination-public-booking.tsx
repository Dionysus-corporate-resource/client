import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { IBookingDto } from "@/shared/model/types/booking";
import { Dispatch, SetStateAction } from "react";

export function PaginationPublicBooking({
  filteredBooking,
  setPage,
  page,
  itemsPerPage,
}: {
  filteredBooking: IBookingDto[] | undefined;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
  itemsPerPage: number;
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  if (
    !filteredBooking ||
    filteredBooking.length == 0 ||
    filteredBooking.length / itemsPerPage <= 1
  )
    return null;

  return (
    <Pagination className="w-full">
      <PaginationContent className="w-full justify-between">
        <PaginationItem>
          <PaginationPrevious
            // href="#"
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
              scrollToTop();
            }}
            // disabled={page === 1}
          />
        </PaginationItem>

        <div className="flex gap-2">
          {[...Array(Math.ceil(filteredBooking.length / itemsPerPage))].map(
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  // href="/"
                  isActive={index + 1 === page}
                  onClick={() => {
                    setPage(index + 1);
                    scrollToTop();
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
        </div>
        {/* <PaginationEllipsis /> */}

        <PaginationItem>
          <PaginationNext
            // href="#"
            onClick={() => {
              setPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredBooking.length / itemsPerPage),
                ),
              );
              scrollToTop();
            }}

            // disabled={page === Math.ceil(bookings.length / itemsPerPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
