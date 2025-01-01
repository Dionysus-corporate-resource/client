import { LogisticianDto } from "./user";

export type ValidCarTypes =
  | "Самосвал"
  | "Танар"
  | "Полу_прицеп"
  | "Сцепка"
  | "Любые_машины";

export type IStatusCorporateBooking = "active" | "inProgress" | "inactive";

export type ValidCarTypesCheckbox = {
  id: ValidCarTypes;
  label: ValidCarTypes;
};
export type ValidUnloadingTypes =
  | "Боковая"
  | "Задняя"
  | "На_правый_бок"
  | "На_левый_бок"
  | "Задняя_самосвальная"
  | "Боковая_самосвальная"
  | "Любая";

export type IBookingFormData = {
  icon: string;
  relevance: boolean;
  cargoName: string;
  cargoAmount?: number;
  loadingType: "normal" | "full";
  loadingLocation: string;
  unloadingLocation: string;
  loadingLocationDate?: string;
  distance: number;
  price: number;
  paymentMethod: "NDS" | "without_NDS" | "cash";
  advancePercentage?: number | undefined;
  carType: ValidCarTypes;
  carTypeUnLoading: ValidUnloadingTypes;
  carHeightLimit?: number | undefined;
  count?: number;
  carPeriod: "Каждый_день" | "Общее";
  additionalInfo?: string;
};

// Определяем интерфейс для схемы
export type IBooking = {
  status: IStatusCorporateBooking;
  generalInformation: {
    icon: string;
    relevance: boolean;
    cargoName: string;
    cargoAmount?: number;
  };
  location: {
    loadingLocation: string;
    loadingLocationDate?: string;
    unloadingLocation: string;
    distance: number;
  };
  terms: {
    price: number;
    paymentMethod: "NDS" | "without_NDS" | "cash";
    advancePercentage: number | undefined;
    loadingType: "normal" | "full";
    // truckType: string; // Если поле понадобится, можно раскомментировать
  };
  requiredTransport: {
    carType: ValidCarTypes;
    carTypeUnLoading: ValidUnloadingTypes;
    carHeightLimit?: number;
    carUsage: {
      count?: number;
      carPeriod: "Каждый_день" | "Общее";
    };
  };
  additionalInfo?: string;
};

export type ICarDto = {
  numberCar: string;
  numberTrailer: string;
  driverFullName: string;
  phone: string;
  _id: string;
};

export type ICar = {
  numberCar: string;
  numberTrailer: string;
  driverFullName: string;
  phone: string;
};

export type IFlight = {
  organization: string;
  dispatcher: LogisticianDto;
  cars: ICarDto[];
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export type IBookingDto = {
  corporateBookingData: {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    status: "active" | "inProgress" | "inactive";
    generalInformation: {
      relevance: boolean;
      cargoName: string;
      cargoAmount?: number;
      icon: string;
    };
    location: {
      loadingLocation: string;
      loadingLocationDate?: string;
      unloadingLocation: string;
      distance: number;
    };
    terms: {
      price: number;
      paymentMethod: "NDS" | "without_NDS" | "cash";
      advancePercentage: number;
      loadingType: "normal" | "full";
      // truckType: string; // Если поле понадобится, можно раскомментировать
    };
    requiredTransport: {
      carType: ValidCarTypes;
      carTypeUnLoading: ValidUnloadingTypes;
      carHeightLimit?: number;
      carUsage: {
        count?: number;
        carPeriod: "Каждый_день" | "Общее";
      };
    };
    additionalInfo?: string;
    manager: LogisticianDto;
  };
  flight: {
    organization: string;
    dispatcher: LogisticianDto;
    cars: ICar[];
    createdAt: string;
    updatedAt: string;
    _id: string;
  }[];
  _id: string;
};
