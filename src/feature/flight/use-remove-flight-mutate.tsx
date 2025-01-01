import { flightApi } from "@/entities/corporate-booking/flight/api/flight-api";
import { queryClient } from "@/shared/api/query-client";
import { useMutation } from "@tanstack/react-query";

type RemoveFlightParams = {
  bookingId: string;
  flightId: string;
};

export default function useRemoveFlightMutate() {
  const removeMutate = useMutation({
    mutationKey: ["flight"],
    mutationFn: ({ bookingId, flightId }: RemoveFlightParams) =>
      flightApi.remove({ bookingId, flightId }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });

  return removeMutate;
}
