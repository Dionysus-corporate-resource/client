export type IUserRoles = "customer" | "driver";
export type IPermissions = "developer" | "admin";

export type IUser = {
  userName: string;
  email: string;
  phone: string;
  companyName: string | null;
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
  permissions: IPermissions[];
};

export type IUserDto = IUser & {
  _id: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};
