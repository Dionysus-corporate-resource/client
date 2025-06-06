import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../types";
import { Input } from "@/shared/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export function BasicInfoStep({
  formData,
  updateFormData,
}: {
  formData: FormStepProps["formData"];
  updateFormData: FormStepProps["updateFormData"];
  clueIsInput?: boolean;
  setClueIsInput?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Культура/груз
        </Label>
        <Input
          placeholder="Пшеница"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.culture}
          onChange={(e) => updateFormData({ culture: e.target.value })}
        />
      </div>
      <div className="relative flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Место погрузки
        </Label>
        <Input
          placeholder="Ростов-на-Дону"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.loadingLocation.name}
          onChange={(e) =>
            updateFormData({
              loadingLocation: {
                ...formData.loadingLocation,
                name: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Место выгрузки
        </Label>
        <Input
          placeholder="Азов"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.unLoadingLocation}
          onChange={(e) =>
            updateFormData({ unLoadingLocation: e.target.value })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Расстояние (км)
        </Label>
        <Input
          placeholder="ваши данные"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.distance}
          onChange={(e) => updateFormData({ distance: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Тоннаж (тонн)
        </Label>
        <Input
          placeholder="ваши данные"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.tonnage as string}
          onChange={(e) => updateFormData({ tonnage: e.target.value })}
        />
      </div>
    </div>
  );
}
