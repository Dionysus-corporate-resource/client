import { IBookingDto } from "@/shared/model/types/booking";
import { useState } from "react";

export default function usePaginationPublicBooking({
  filteredBooking,
}: {
  filteredBooking: IBookingDto[] | undefined;
}) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Вычисляем индекс начала и конца текущей страницы
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBookings = filteredBooking?.slice(startIndex, endIndex);

  return { paginatedBookings, setPage, page, itemsPerPage };
}
