import { useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";
import { DatePickerDemo } from "@/shared/ui/data-picker";

export function ConditionsTransportation({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  const [errors] = useState<Record<string, string>>({});

  return (
    <div className="grid grid-cols-3 gap-6 p-4 rounded-lg">
      {/* Способ погрузки */}
      <div className="space-y-2">
        <Label htmlFor="distance" className="flex items-center gap-2">
          {/* <Route className="w-4 h-4" /> */}
          <span>Способ погрузки *</span>
        </Label>
        <Input
          id="loadingMethod"
          placeholder="Укажите расстояние"
          className="transition-all"
          value={formData.conditionsTransportation?.loadingMethod}
          onChange={(e) =>
            updateFormData({
              conditionsTransportation: {
                ...formData.conditionsTransportation,
                loadingMethod: e.target.value,
              },
            })
          }
        />
        {errors.loadingMethod && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.loadingMethod}
          </p>
        )}
      </div>

      {/* Грузо-подъемность весов */}
      <div className="space-y-2">
        <Label htmlFor="tonnage" className="flex items-center gap-2">
          {/* <Weight className="w-4 h-4" /> */}
          <span>Грузо-подъемность весов *</span>
        </Label>
        <Input
          id="scaleCapacity"
          placeholder="Укажите тоннаж"
          className="transition-all"
          value={formData.conditionsTransportation?.scaleCapacity}
          type="number"
          onChange={(e) =>
            updateFormData({
              conditionsTransportation: {
                ...formData.conditionsTransportation,
                scaleCapacity: Number(e.target.value),
              },
            })
          }
        />
        {errors.scaleCapacity && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.scaleCapacity}
          </p>
        )}
      </div>

      {/* Начало погрузки */}
      <div className="space-y-2 ">
        <Label htmlFor="loadingLocation" className="flex items-center gap-2">
          {/* <MapPin className="w-4 h-4" /> */}
          <span>Начало погрузки *</span>
        </Label>
        <DatePickerDemo />
        {/* <Input
          id="loadingDate"
          placeholder="Укажите место погрузки"
          className="transition-all"
          value={formData.conditionsTransportation?.loadingDate || ""}
          onChange={(e) =>
            updateFormData({
              conditionsTransportation: {
                ...formData.conditionsTransportation,
                loadingDate: e.target.value,
              },
            })
          }
        /> */}
        {errors.loadingDate && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.loadingDate}
          </p>
        )}
      </div>
    </div>
  );
}
