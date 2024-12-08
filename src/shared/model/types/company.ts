import { CorporateLogisticianDto } from "./user";

export type ICompanyDto = {
  _id: string;
  nameCompany: string;
  employees: CorporateLogisticianDto[];
  // corporateBooking: IBookingDto[];
  corporateBooking: {
    corporateBookingData: string;
    _id: string;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
