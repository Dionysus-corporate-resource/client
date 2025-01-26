import { Dispatch, SetStateAction } from "react";
// import { z } from "zod";

// export const basicInfoSchema = z.object({
//   distance: z.number().min(2, "Error validation"),
//   loadingLocation: z
//     .object({
//       name: z
//         .string()
//         .min(2, "Название локации должно содержать минимум 2 символа"),
//       coordinates: z
//         .tuple([z.number(), z.number()])
//         .nullable() // разрешаем null
//         .optional(), // делаем поле опциональным
//     })
//     .nullish() // разрешаем null или undefined
//     .refine((data) => data !== null && data !== undefined, {
//       message: "Необходимо выбрать место погрузки",
//     }),
//   unLoadingLocation: z.string().min(2, "Error validation"),
//   tonnage: z.number().min(2, "Error validation"),
//   culture: z.string().min(2, "Error validation"),
// });

// export const conditionsTransportationSchema = z.object({
//   loadingMethod: z.string().min(2, "Error validation"),
//   scaleCapacity: z.number().min(2, "Error validation"),
//   loadingDate: z.string().min(2, "Error validation"),
// });

// export const detailTransportationSchema = z.object({
//   demurrage: z.string(),
//   allowedShortage: z.number(),
//   paymentType: z.enum(["cash", "nds", "without_nds"], {
//     errorMap: () => ({ message: "Выберите корректный способ оплаты" }),
//   }),
//   ratePerTon: z.number().positive("Ставка должна быть положительным числом"),
//   // .min(100, "Минимальная ставка - 100 руб/т"),
//   paymentDeadline: z.string(),
// });

// export const additionalConditionsSchema = z.object({
//   additionalInformation: z.string(),
//   contacts: z.array(z.string()).min(1).max(10),
// });

// export const formSchema = z.object({
//   basicInfo: basicInfoSchema,
//   conditionsTransportation: conditionsTransportationSchema,
//   detailTransportation: detailTransportationSchema,
//   additionalConditions: additionalConditionsSchema,
// });

// export type FormData = z.infer<typeof formSchema>;
export type FormData = {
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
  isViewMap?: boolean;
  setIsViewMap?: Dispatch<SetStateAction<boolean>>;
};
