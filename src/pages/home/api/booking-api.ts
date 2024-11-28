import instance from "@/shared/api/axios-instance";
import { IBooking, IBookingDto } from "@/shared/model/types/booking";

export const bookingApi = {
  getAll: async (): Promise<IBookingDto[]> => {
    return instance.get("/booking").then((data) => data.data);
  },
  getOne: async (bookingId: string): Promise<IBookingDto> => {
    return instance
      .get(`/booking/${bookingId}`)
      .then((data) => data.data)
      .catch((err) => console.error(err));
  },
  create: async (data: IBooking): Promise<IBookingDto> => {
    try {
      const response = await instance.post("/booking", data);
      console.log("create Booking", response);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  remove: async (bookingId: string) => {
    return instance
      .delete(`/booking/${bookingId}`)
      .then((data) => console.log("Remove data", data))
      .catch((err) => console.error(err));
  },
  toggle: async (bookingId: string, formDataMutate: IBooking) => {
    return instance
      .put(`/booking/${bookingId}`, formDataMutate)
      .then((data) => console.log("Remove data", data))
      .catch((err) => console.error(err));
  },
};
