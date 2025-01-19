import { z } from "zod";

export const basicInfoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export const detailsSchema = z.object({
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

export const formSchema = z.object({
  basicInfo: basicInfoSchema,
  details: detailsSchema,
});

export type FormData = z.infer<typeof formSchema>;

export type Step = {
  id: number;
  title: string;
  description: string;
};

export type StepperProps = {
  steps: Step[];
  currentStep: number;
};

// TODO: что такое (stepData: Partial<FormData>) => void;
export type FormStepProps = {
  formData: FormData;
  updateFormData: (stepData: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
};
