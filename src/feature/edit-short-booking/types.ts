import { TBasicInfo } from "@/shared/model/types/booking";

export type FormStepProps = {
  formData: TBasicInfo;
  updateFormData: (stepData: Partial<TBasicInfo>) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
};
