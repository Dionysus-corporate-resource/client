import instance from "@/shared/model/api/axios-instance";
import { IUser, IUserDto } from "@/shared/model/types/user";

export type IUpdateProfile = Omit<IUser, "email" | "companyPublicData"> & {
  nameCompany: string | null;
};

export const userApi = {
  updateDataProfile: async (data: IUpdateProfile) => {
    try {
      const response = await instance.patch("/users/profile", data);

      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  getDataProfile: async (): Promise<IUserDto> => {
    try {
      const response = await instance.get("/auth/me");
      console.log("getDataProfile", response.data);
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};
