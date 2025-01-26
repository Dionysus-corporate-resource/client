export type IBooking = {
  basicInfo: {
    distance: string;
    loadingLocation: {
      name: string;
      coordinates: [number, number] | null;
    };
    unLoadingLocation: string;
    tonnage: string;
    culture: string;
  };
  conditionsTransportation: {
    loadingMethod: string;
    scaleCapacity: string;
    loadingDate: Date;
  };
  detailTransportation: {
    demurrage: string;
    allowedShortage: string;
    paymentType: "cash" | "nds" | "without_nds";
    ratePerTon: string;
    paymentDeadline: string;
  };
  additionalConditions: {
    additionalInformation: string;
    contacts: {
      name: string;
      phone: string;
    }[];
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
