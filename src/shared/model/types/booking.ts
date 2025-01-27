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
    paymentType: "cash" | "nds" | "without_nds";
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
  user: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};
