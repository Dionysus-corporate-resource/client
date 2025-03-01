import { ICompanyPublicDto } from "./company-public";
import { IUserRoles } from "./user";

export type IUserFromBooking = {
  userName: string;
  email: string;
  phone: string;
  companyPublicData?: string | null;
  activeSubscriptions: {
    purchasedBooking: {
      allPurchasedBookings: number;
      remainingBookings: number;
    };
    unLimitedBookingSubscription: {
      isPurchased: boolean;
      purchasedAt: Date | null;
      expiresAt: Date | null;
    };
    showContactSubscription: {
      isPurchased: boolean;
      purchasedAt: Date | null;
      expiresAt: Date | null;
    };
  };
  roles: IUserRoles;
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

type IContact = {
  name: string;
  phone: string;
};

export type IBooking = {
  basicInfo: {
    distance: string;
    loadingLocation: {
      name: string;
      coordinates: [number, number] | null;
    };
    unLoadingLocation: string;
    tonnage: string | null;
    culture: string;
  };
  conditionsTransportation: {
    loadingMethod: string | null;
    scaleCapacity: string | null;
    loadingDate: Date;
  };
  detailTransportation: {
    demurrage: string | null;
    allowedShortage: string | null;
    paymentType:
      | "cash"
      | "nds"
      | "without_nds"
      | "nds_20"
      | "nds_15"
      | "nds_10"
      | "nds_5";
    ratePerTon: string;
    paymentDeadline: string | null;
  };
  additionalConditions: {
    additionalInformation: string | null;
    contacts: IContact[] | [];
  };
};
export type IBookingDto = IBooking & {
  status: "active" | "inProgress" | "inactive";
  // или user - IUserDto
  view: number;
  user: IUserFromBooking;
  companyPublicData: ICompanyPublicDto;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
};
