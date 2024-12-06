export type IRolesCorporate =
  | "superAdmin"
  | "manager"
  | "dispatcher"
  | "general_director";
type IRoles = "superAdmin" | "manager" | "dispatcher" | "general_director";

export type IUser = {
  userName: string;
  email: string;
  passwordHash: string;
  roles: IRoles[];
  phone: string;
};

export type IUserDto = {
  _id: string;
  userName: string;
  email: string;
  passwordHash?: string;
  phone: string;
  roles: IRoles[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// export type User<T = "client" | "server"> = T extends "client"
//   ? {
//       userName: string;
//       email: string;
//       passwordHash: string;
//       roles: string[];
//     }
//   : {
//       _id: string;
//       userName: string;
//       email: string;
//       passwordHash: string;
//       roles: string[];
//       createdAt: string;
//       updatedAt: string;
//       __v: number;
//     };
