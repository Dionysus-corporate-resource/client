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
};
