import instance from "@/shared/api/axios-instance";
import {
  CorporateLogisticianDto,
  IRolesCorporate,
} from "@/shared/model/types/user";

export type IcreateNewLogisticianBody = {
  email: string;
  password: string;
  userName: string;
  phone: string;
};

export const employeesApi = {
  getAll: async (): Promise<CorporateLogisticianDto[]> => {
    const response = await instance.get("/company/employee");
    console.log("employeesApi", response.data);
    return response.data;
  },
  createNewLogistician: async (body: IcreateNewLogisticianBody) => {
    const response = await instance.post("/company/register-employee", body);
    console.log("createNewLogistician", response.data);
    return response.data;
  },
  removeLogistician: async (logisticianId: string) => {
    const response = await instance.delete(
      `/company/employee/${logisticianId}`,
    );
    console.log("createNewLogistician", response.data);
    return response.data;
  },
  toggleLogisticianRole: async (
    logisticianId: string,
    roles: IRolesCorporate[],
  ) => {
    const body = {
      roles,
    };
    const response = await instance.put(
      `/company/employee/${logisticianId}`,
      body,
    );
    console.log("createNewLogistician", response.data);
    return response.data;
  },
};
