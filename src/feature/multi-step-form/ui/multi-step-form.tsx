import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { FormData, Step } from "../model/types";
import { BasicInfoStep } from "./steps/basic-info-step";
import { ReviewStep } from "./steps/review-step";
import { Stepper } from "./stepper";
import { ConditionsTransportation } from "./steps/conditions-transportation";
import { ConfirmationStep } from "./steps/confirmation-step";
import { DetailTransportation } from "./steps/detail-transportation";
import { AdditionalTransportation } from "./steps/additional-conditions";

const steps: Step[] = [
  {
    id: 1,
    title: "Основная информация",
    description: "Personal information",
  },
  {
    id: 2,
    title: "Условия перевозки",
    description: "Contact details",
  },
  {
    id: 3,
    title: "Детали перевозки",
    description: "Review your info",
  },
  {
    id: 4,
    title: "Дополнительные условия",
    description: "Review your info",
  },
  {
    id: 5,
    title: "Проверка данных",
    description: "Review your info",
  },

  {
    id: 6,
    title: "Подтверждение",
    description: "Создание задание",
  },
];

export default function MultiStepForm() {
  const [isViewMap, setIsViewMap] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      distance: 0,
      loadingLocation: {
        name: "",
        coordinates: null,
      },
      unLoadingLocation: "",
      tonnage: 0,
      culture: "",
    },
    conditionsTransportation: {
      loadingMethod: "",
      scaleCapacity: 0,
      loadingDate: "",
    },
    detailTransportation: {
      demurrage: "",
      allowedShortage: 0,
      paymentType: "cash",
      ratePerTon: 0,
      paymentDeadline: "",
    },
    additionalConditions: {
      additionalInformation: "",
      contacts: [""],
    },
  });

  const updateFormData = (stepData: Partial<FormData>) => {
    setFormData((prev) => ({
      ...prev,
      ...stepData,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    // Here you would typically submit the form data to your backend
    console.log("Form submitted:", formData);
    handleNext();
  };

  const renderStep = () => {
    const props = {
      formData,
      updateFormData,
      onNext: handleNext,
      onBack: handleBack,
      isLastStep: currentStep === steps.length - 1,
    };

    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            {...props}
            isViewMap={isViewMap}
            setIsViewMap={setIsViewMap}
          />
        );
      case 2:
        return <ConditionsTransportation {...props} />;
      case 3:
        return <DetailTransportation {...props} />;
      case 4:
        return <AdditionalTransportation {...props} />;
      case 5:
        return <ReviewStep {...props} />;
      case 6:
        return <ConfirmationStep />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full border-none shadow-none">
      <CardHeader>
        {/* <CardTitle>Форма создания заявки</CardTitle> */}
      </CardHeader>
      <CardContent className="space-y-12">
        <Stepper steps={steps} currentStep={currentStep} />
        {renderStep()}
      </CardContent>
      {currentStep < steps.length && (
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Предыдущий этап
          </Button>
          <Button
            onClick={
              currentStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {currentStep === steps.length - 1
              ? "Создать заявку"
              : "Следующий этап"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
