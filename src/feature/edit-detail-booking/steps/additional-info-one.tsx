import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../types";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";

export function AdditionalInfoOneStep({
  formData,
  updateFormData,
}: {
  formData: FormStepProps["formData"];
  updateFormData: FormStepProps["updateFormData"];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Чем грузят?
        </Label>
        <Input
          placeholder="Маниту, кун ..."
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.loadingMethod}
          onChange={(e) => updateFormData({ loadingMethod: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Ограничения по высоте машины (метр.)
        </Label>
        <Input
          placeholder="поле можно оставить пустым"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.maxVehicleHeight}
          onChange={(e) => updateFormData({ maxVehicleHeight: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Какие машины подходят?
        </Label>
        <Input
          placeholder="Только сцепки ..."
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.vehicleType}
          onChange={(e) => updateFormData({ vehicleType: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Какая выгрузка машины нужна?
        </Label>
        <Input
          placeholder="Задняя ..."
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.unloadingType}
          onChange={(e) => updateFormData({ unloadingType: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Дополнительная информация
        </Label>
        <Textarea
          placeholder="Напишите то, что не смогли указать ..."
          className="border bg-background py-4 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.additionalInformation}
          onChange={(e) =>
            updateFormData({ additionalInformation: e.target.value })
          }
        />
      </div>
    </div>
  );
}
