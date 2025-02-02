import instance from "@/shared/model/api/axios-instance";
import { IUserDto, IUserRoles } from "@/shared/model/types/user";

export type IUpdateProfile = {
  userName: string;
  phone: string;
  roles: IUserRoles;
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
