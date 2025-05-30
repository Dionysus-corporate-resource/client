import {
  LoadingType,
  PaymentType,
  TContact,
  TLocation,
} from "@/shared/model/types/booking";

export type formData = {
  distance: string;
  loadingLocation: TLocation;
  unLoadingLocation: string;
  tonnage: string;
  culture: string;
  ratePerTon: string;
  companyName: string;
  contact: TContact;
  //
  loadingMethod: string;
  maxVehicleHeight: string;
  vehicleType: string;
  unloadingType: string;
  additionalInformation: string;
  //
  paymentType: PaymentType;
  loadingType: LoadingType;
  isCharterNeeded: boolean;
  estimatedLoadingDate: Date;
};

export type FormStepProps = {
  formData: formData;
  updateFormData: (stepData: Partial<formData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
};
