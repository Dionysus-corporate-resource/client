import instance from "@/shared/api/axios-instance";
import { IFormData } from "../add-flight-dialog";
import { IBookingDto } from "@/shared/model/types/booking";

export const flightApi = {
  create: async ({
    corporateBookingId,
    body,
  }: {
    corporateBookingId: IBookingDto["corporateBookingData"]["_id"];
    body: IFormData;
  }) => {
    try {
      const response = await instance.post(
        `company/flight/${corporateBookingId}`,
        body,
      );
      // console.log("flightApi create", response);
      // console.log("flightApi create", corporateBookingId, body);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
