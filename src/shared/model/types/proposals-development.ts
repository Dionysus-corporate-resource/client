import { IUserDto } from "./user";

export type IProposalDevelopment = {
  name: string;
  description?: string;
  topic: "bag" | "proposals";
  status: "in_progress" | "pending" | "done";
};

export type IProposalDevelopmentDto = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  name: string;
  description?: string;
  topic: "bag" | "proposals";
  status: "in_progress" | "pending" | "done";
  user: IUserDto;
};
