import { queryOptions } from "@tanstack/react-query";
import { bookingApi } from "./booking-api";
import { TBookingDto } from "@/shared/model/types/booking";

export const bookingQueryOption = {
  getAll: () => {
    return queryOptions({
      queryKey: ["booking"],
      queryFn: (): Promise<TBookingDto[]> => bookingApi.getAll(),
    });
  },
  getOne: (bookingId: string) => {
    return queryOptions({
      queryKey: ["booking", bookingId],
      queryFn: (): Promise<TBookingDto> => bookingApi.getOne(bookingId),
    });
  },
};
