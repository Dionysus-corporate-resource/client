type IRoles = "superAdmin" | "manager" | "dispatcher";

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
  token: string;
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
