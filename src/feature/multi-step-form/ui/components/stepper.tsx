import { Check } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { StepperProps } from "@/feature/edit-booking-multi-step-form/model/types";

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div
      className="relative
      hidden xl:block xl:px-6 xl:mt-6"
    >
      <div className="absolute left-0 top-8 h-0.5 w-full -translate-y-1/2 bg-muted" />
      <div
        className="absolute left-0 top-8 h-0.5 w-full -translate-y-1/2 bg-primary transition-all duration-500"
        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
      />
      <div className="relative z-10 flex justify-between ">
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="bg-background rounded-full p-2">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-500 ",
                    {
                      "border-primary bg-primary text-primary-foreground":
                        isCompleted || isCurrent,
                      "border-muted bg-background": !isCompleted && !isCurrent,
                    },
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium">{step.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
