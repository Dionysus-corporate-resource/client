import { useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";
import { Clock, Route } from "lucide-react";

import { Textarea } from "@/shared/components/ui/textarea";

export function AdditionalTransportation({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  const [errors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: unknown) => {
    const newDetailTransportation = {
      ...formData.detailTransportation,
      [field]: value,
    };

    updateFormData({
      detailTransportation: newDetailTransportation,
    });
  };

  return (
    <div className="grid grid-cols-3 gap-6 p-4 rounded-lg">
      {/* Простой */}
      <div className="space-y-2">
        <Label
          htmlFor="additionalInformation"
          className="flex items-center gap-2"
        >
          <Clock className="w-4 h-4" />
          <span>Дополнительная информация</span>
        </Label>
        <Textarea
          id="additionalInformation"
          placeholder="Укажите время простоя (часы)"
          className="transition-all"
          value={formData.additionalConditions?.additionalInformation}
          onChange={(e) =>
            handleChange("additionalInformation", e.target.value)
          }
        ></Textarea>
      </div>

      {/* Сроки оплаты */}
      <div className="space-y-2">
        <Label htmlFor="paymentDeadline" className="flex items-center gap-2">
          <Route className="w-4 h-4" />
          <span>Сроки оплаты</span>
        </Label>
        <Input
          id="paymentDeadline"
          placeholder="Укажите срок в днях"
          className={`transition-all ${errors.paymentDeadline ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.paymentDeadline}
          onChange={(e) => handleChange("paymentDeadline", e.target.value)}
        />
        {errors.paymentDeadline && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.paymentDeadline}
          </p>
        )}
      </div>
    </div>
  );
}
