export type BookingStatus = "active" | "archive" | "inactive";
export type LoadingType = "full" | "normal";
export type PaymentType =
  | "cash"
  | "without_nds"
  | "nds"
  | "nds_20"
  | "nds_15"
  | "nds_10"
  | "nds_5";

export type TContact = {
  name: string;
  phone: string;
};

export type TLocation = {
  name: string;
  coordinates: [number, number] | null;
};

export type TBasicInfo = {
  distance: string;
  loadingLocation: TLocation;
  unLoadingLocation: string;
  tonnage: string | null;
  culture: string;
  ratePerTon: string;
  companyName: string;
  contact: TContact;
};

export type TAdditionalConditions = {
  loadingMethod?: string | null;
  isCharterNeeded: boolean;
  maxVehicleHeight?: string | null;
  loadingType: LoadingType;
  vehicleType?: string | null;
  unloadingType?: string | null;
  estimatedLoadingDate?: Date | null;
  paymentType: PaymentType;
  additionalInformation?: string | null;
};

export type TBookingDto = {
  _id: string;
  status: BookingStatus;
  basicInfo: TBasicInfo;
  additionalConditions: TAdditionalConditions | null;
  user: string;
  view: number;
  createdAt: string;
  updatedAt: string;
};

export type TBooking = Omit<TBookingDto, "_id" | "createdAt" | "updatedAt">;
