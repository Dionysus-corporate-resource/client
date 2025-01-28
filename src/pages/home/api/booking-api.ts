import { FormData } from "@/feature/multi-step-form/model/types";
import instance from "@/shared/model/api/axios-instance";
import { IBookingDto } from "@/shared/model/types/booking";

export const bookingApi = {
  getAll: async (): Promise<IBookingDto[]> => {
    try {
      const response = await instance.get("/booking");
      console.log("bookingApi getAll", response.data);

      return response.data;
    } catch (err) {
      console.error(err);
      // throw  Error("Ошибка при получении заявок");
      throw err;
    }
  },
  getOne: async (bookingId: string): Promise<IBookingDto> => {
    try {
      const response = await instance.get(`/booking/${bookingId}`);
      console.log("bookingApi getOne", response.data);

      return response.data;
    } catch (err) {
      console.error(err);
      // throw  Error("Ошибка при получении заявок");
      throw err;
    }
  },
  create: async (data: FormData): Promise<IBookingDto> => {
    try {
      const response = await instance.post("/booking", data);
      console.log("bookingApi create", response.data);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  update: async (data: FormData, bookingId: string): Promise<IBookingDto> => {
    try {
      const response = await instance.put(`/booking/${bookingId}`, data);
      console.log("bookingApi update", response.data);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
