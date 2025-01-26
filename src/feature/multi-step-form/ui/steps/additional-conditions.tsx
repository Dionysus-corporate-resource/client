import { useState } from "react";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";

import { Textarea } from "@/shared/components/ui/textarea";
import ContactsManager from "../add-contacts-form";

export function AdditionalTransportation({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  const [errors] = useState<Record<string, string>>({});

  return (
    <div className="grid grid-cols-3 gap-6 p-4 rounded-lg">
      {/* Доп инфа */}
      <div className="space-y-2">
        <Label
          htmlFor="additionalInformation"
          className="flex items-center gap-2"
        >
          {/* <Clock className="w-4 h-4" /> */}
          <span>Дополнительная информация *</span>
        </Label>
        <Textarea
          id="additionalInformation"
          placeholder="Дополнительная информация, которую не удалось указать ранее, или что-то важно, касающееся заявки"
          className="transition-all"
          value={formData.additionalConditions?.additionalInformation}
          onChange={(e) =>
            updateFormData({
              additionalConditions: {
                additionalInformation: e.target.value,
                contacts: formData.additionalConditions.contacts,
              },
            })
          }
        ></Textarea>
      </div>
      {/* Сроки оплаты */}
      <div className="space-y-2 col-span-2">
        <Label
          htmlFor="paymentDeadline"
          className="flex items-center justify-between gap-2"
        >
          {/* <Route className="w-4 h-4" /> */}
          <span>Контакты *</span>
          {/* <Badge variant="secondary" className="ml-2 text-muted-foreground">
            Обязательное поле
          </Badge> */}
        </Label>
        <ContactsManager formData={formData} updateFormData={updateFormData} />
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
