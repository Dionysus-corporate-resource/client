import { ICompanyPublicDto } from "./company-public";

export type IUserRoles = "super_viser" | "customer" | "driver";

export type IUser = {
  userName: string;
  email: string;
  phone: string;
  companyPublicData?: ICompanyPublicDto | null;
  roles: IUserRoles;
};

export type IUserDto = IUser & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
