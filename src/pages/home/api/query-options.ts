import { queryOptions } from "@tanstack/react-query";
import { bookingApi } from "./booking-api";

export const bookingQueryOptions = {
  getAll: () => {
    return queryOptions({
      queryKey: ["booking"],
      queryFn: bookingApi.getAll,
    });
  },
  getOne: (bookingId: string) => {
    return queryOptions({
      queryKey: ["booking one"],
      queryFn: () => bookingApi.getOne(bookingId),
    });
  },
};
