import { IUserDto } from "./user";

export type IBooking = {
  relevance: boolean;
  cargoName: string;
  cargoAmount?: number;
  loadType: "normal" | "full";
  location: {
    loadingLocation: string;
    unloadingLocation: string;
    distance: number;
  };
  terms: {
    price: number;
    paymentMethod: "NDS" | "without NDS" | "cash";
    truckType: string;
  };
  advance?: {
    percentage?: number;
  };
  additionalInfo?: string;
};

export type IBookingDto = {
  _id: string;
  relevance: boolean;
  cargoName: string;
  cargoAmount?: number;
  loadType: "normal" | "full";
  location: {
    loadingLocation: string;
    unloadingLocation: string;
    distance: number;
  };
  terms: {
    price: number;
    paymentMethod: "NDS" | "without NDS" | "cash";
    truckType: string;
  };
  advance?: {
    percentage?: number;
  };
  additionalInfo?: string;
  manager: IUserDto;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type IBookingFormData = {
  relevance: boolean;
  cargoName: string;
  cargoAmount?: number;
  loadType: "normal" | "full";
  loadingLocation: string;
  unloadingLocation: string;
  distance: number;
  price: number;
  paymentMethod: "NDS" | "without NDS" | "cash";
  truckType: string;
  percentage?: number;
  additionalInfo?: string;
};
