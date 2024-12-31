import { bookingApi } from "@/pages/home/api/booking-api";
import { queryClient } from "@/shared/api/query-client";
import { IStatusCorporateBooking } from "@/shared/model/types/booking";
import { useMutation } from "@tanstack/react-query";

export default function useChangeStatusCorporateBooking() {
  const toggleStatusMutation = useMutation({
    mutationFn: ({
      corporateBookingId,
      status,
    }: {
      corporateBookingId: string;
      status: IStatusCorporateBooking;
    }) => bookingApi.toggleStatus({ corporateBookingId, status }),
    onSuccess: () => {
      // Инвалидация данных по ключу после успешной мутации
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });

  return toggleStatusMutation;
}

// const { mutate } = useChangeStatusCorporateBooking();

// mutate({ corporateBookingId: "123", stbookingatus: "approved" });
