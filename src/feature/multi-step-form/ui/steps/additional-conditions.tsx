import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";

import { Textarea } from "@/shared/components/ui/textarea";
import ContactsManager from "../components/add-contacts-form";

export function AdditionalTransportation({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  return (
    <div
      className="grid gap-6 p-4 rounded-lg
      lg:grid-cols-2 xl:grid-cols-3"
    >
      {/* Доп инфа */}
      <div
        className="space-y-2
         col-span-2 xl:col-span-1"
      >
        <Label
          htmlFor="additionalInformation"
          className="flex items-center gap-2"
        >
          {/* <Clock className="w-4 h-4" /> */}
          <span>Дополнительная информация *</span>
        </Label>
        <Textarea
          id="additionalInformation"
          placeholder="Дополнительная информация, которую не удалось указать ранее, или важные детали, касающиеся заявки."
          className="transition-all h-[150px]"
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
      <div className="space-y-2 col-span-2">
        <Label
          htmlFor="paymentDeadline"
          className="flex items-center justify-between gap-2"
        >
          <span>Контакты *</span>
        </Label>

        <ContactsManager formData={formData} updateFormData={updateFormData} />
      </div>
    </div>
  );
}
