import instance from "@/shared/api/axios-instance";
import { IBooking, IBookingDto } from "@/shared/model/types/booking";

export const bookingApi = {
  getAll: async (): Promise<IBookingDto[]> => {
    const response = await instance.get("/company/booking");
    console.log("getAll Booking", response.data);
    return response.data;
  },
  getOne: async (bookingId: string): Promise<IBookingDto> => {
    const response = await instance.get(`/company/booking/${bookingId}`);
    console.log("Get One Corporate Booking", response);
    return response.data;
  },
  create: async (data: IBooking): Promise<IBookingDto> => {
    try {
      const response = await instance.post("/company/booking", data);
      console.log("create Booking", response);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  remove: async (bookingId: string) => {
    return instance
      .delete(`/company/booking/${bookingId}`)
      .then((data) => console.log("Remove data", data))
      .catch((err) => console.error(err));
  },
  toggle: async (bookingId: string, formDataMutate: IBooking) => {
    return instance
      .put(`/company/booking/${bookingId}`, formDataMutate)
      .then((data) => console.log("Remove data", data))
      .catch((err) => console.error(err));
  },
};
