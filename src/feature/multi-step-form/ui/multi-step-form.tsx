import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { FormData, Step } from "../model/types";
import { BasicInfoStep } from "./steps/basic-info-step";
import { DetailsStep } from "./steps/details-step";
import { ReviewStep } from "./steps/review-step";
import { ConfirmationStep } from "./steps/confirmation-step";
import { Stepper } from "./stepper";

const steps: Step[] = [
  {
    id: 1,
    title: "Basic Info",
    description: "Personal information",
  },
  {
    id: 2,
    title: "Details",
    description: "Contact details",
  },
  {
    id: 3,
    title: "Review",
    description: "Review your info",
  },
  {
    id: 4,
    title: "Confirmation",
    description: "Form submitted",
  },
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    basicInfo: {
      firstName: "",
      lastName: "",
      email: "",
    },
    details: {
      phone: "",
      address: "",
      city: "",
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
        return <BasicInfoStep {...props} />;
      case 2:
        return <DetailsStep {...props} />;
      case 3:
        return <ReviewStep {...props} />;
      case 4:
        return <ConfirmationStep />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Multi-step Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
            Back
          </Button>
          <Button
            onClick={
              currentStep === steps.length - 1 ? handleSubmit : handleNext
            }
          >
            {currentStep === steps.length - 1 ? "Submit" : "Next"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
