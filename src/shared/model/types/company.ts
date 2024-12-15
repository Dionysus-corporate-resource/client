import { IBookingDto } from "./booking";
import { CorporateLogisticianDto } from "./user";

export type ICompanyDto = {
  _id: string;
  nameCompany: string;
  employees: CorporateLogisticianDto[];
  // corporateBooking: IBookingDto[];
  corporateBooking: IBookingDto[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
