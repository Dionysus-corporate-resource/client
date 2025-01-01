import { IFormData } from "@/entities/flight/dispatcher/ui/sheet-add-flight";
import instance from "@/shared/api/axios-instance";
import { IBookingDto, IFlight } from "@/shared/model/types/booking";

type IResponse = {
  message: string;
  requiredFlight: IFlight;
};

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
  toggle: async ({
    bookingId,
    flightId,
    body,
  }: {
    bookingId: string;
    flightId: string;
    body: IFormData;
  }) => {
    try {
      const response = await instance.put(
        `company/flight/${bookingId}/${flightId}`,
        body,
      );
      console.log("flightApi toggle", response.data);
      // console.log("flightApi create", corporateBookingId, body);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  get: async ({
    bookingId,
    flightId,
  }: {
    bookingId: string;
    flightId: string;
  }): Promise<IResponse> => {
    try {
      const response = await instance.get(
        `company/flight/${bookingId}/${flightId}`,
      );
      console.log("flightApi get", response.data);
      // console.log("flightApi create", corporateBookingId, body);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  remove: async ({
    bookingId,
    flightId,
  }: {
    bookingId: string;
    flightId: string;
  }) => {
    try {
      const response = await instance.delete(
        `company/flight/${bookingId}/${flightId}`,
      );
      console.log("flightApi delete", response.data);
      // console.log("flightApi create", corporateBookingId, body);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
