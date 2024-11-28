import { IUserDto } from "./user";
export type ValidCarTypes =
  | "Самосвал"
  | "Танар"
  | "Полу_прицеп"
  | "Сцепка"
  | "Любые_машины";

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
  percentage?: number;
  period: "loading" | "un_loading";
  carType: ValidCarTypes;
  carTypeUnLoading: ValidUnloadingTypes;
  carHeightLimit?: number | undefined;
  count?: number;
  carPeriod: "Каждый_день" | "Общее";
  additionalInfo?: string;
};

// Определяем интерфейс для схемы
export type IBooking = {
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
    advance: {
      percentage?: number;
      period: "loading" | "un_loading";
    };
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

export type IBookingDto = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
    advance: {
      percentage?: number;
      period: "loading" | "un_loading";
    };
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
  manager: IUserDto;
};
