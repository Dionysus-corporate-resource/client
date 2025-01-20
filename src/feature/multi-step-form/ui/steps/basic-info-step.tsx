import { useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";
import { MapPin, Route, Weight, Wheat } from "lucide-react";

export function BasicInfoStep({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  const [errors] = useState<Record<string, string>>({});

  // const handleNext = () => {
  //   const newErrors: Record<string, string> = {};
  //   if (!formData.basicInfo?.firstName) {
  //     newErrors.firstName = "First name is required";
  //   }
  //   if (!formData.basicInfo?.lastName) {
  //     newErrors.lastName = "Last name is required";
  //   }
  //   if (!formData.basicInfo?.email) {
  //     newErrors.email = "Email is required";
  //   }

  //   if (Object.keys(newErrors).length === 0) {
  //     onNext();
  //   } else {
  //     setErrors(newErrors);
  //   }
  // };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg">
      {/* Расстояние */}
      <div className="space-y-2">
        <Label htmlFor="distance" className="flex items-center gap-2">
          <Route className="w-4 h-4" />
          <span>Расстояние</span>
        </Label>
        <Input
          id="distance"
          placeholder="Укажите расстояние"
          className="transition-all"
          value={formData.basicInfo?.distance}
          type="number"
          onChange={(e) =>
            updateFormData({
              basicInfo: {
                ...formData.basicInfo,
                distance: Number(e.target.value),
              },
            })
          }
        />
        {errors.firstName && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.firstName}
          </p>
        )}
      </div>

      {/* Тоннаж */}
      <div className="space-y-2">
        <Label htmlFor="tonnage" className="flex items-center gap-2">
          <Weight className="w-4 h-4" />
          <span>Тоннаж</span>
        </Label>
        <Input
          id="tonnage"
          placeholder="Укажите тоннаж"
          className="transition-all"
          value={formData.basicInfo?.tonnage}
          type="number"
          onChange={(e) =>
            updateFormData({
              basicInfo: {
                ...formData.basicInfo,
                tonnage: Number(e.target.value),
              },
            })
          }
        />
        {errors.firstName && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.firstName}
          </p>
        )}
      </div>

      {/* Место погрузки */}
      <div className="space-y-2 ">
        <Label htmlFor="loadingLocation" className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>Место погрузки</span>
        </Label>
        <Input
          id="loadingLocation"
          placeholder="Укажите место погрузки"
          className="transition-all"
          value={formData.basicInfo?.loadingLocation || ""}
          onChange={(e) =>
            updateFormData({
              basicInfo: {
                ...formData.basicInfo,
                loadingLocation: e.target.value,
              },
            })
          }
        />
        {errors.firstName && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.firstName}
          </p>
        )}
      </div>

      {/* Место выгрузки */}
      <div className="space-y-2">
        <Label htmlFor="unLoadingLocation" className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>Место выгрузки</span>
        </Label>
        <Input
          id="unLoadingLocation"
          placeholder="Укажите место выгрузки"
          className="transition-all"
          value={formData.basicInfo?.unLoadingLocation || ""}
          onChange={(e) =>
            updateFormData({
              basicInfo: {
                ...formData.basicInfo,
                unLoadingLocation: e.target.value,
              },
            })
          }
        />
        {errors.firstName && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.firstName}
          </p>
        )}
      </div>

      {/* Культура */}
      <div className="space-y-2">
        <Label htmlFor="culture" className="flex items-center gap-2">
          <Wheat className="w-4 h-4" />
          <span>Культура</span>
        </Label>
        <Input
          id="culture"
          placeholder="Укажите культуру"
          className="transition-all"
          value={formData.basicInfo?.culture || ""}
          onChange={(e) =>
            updateFormData({
              basicInfo: { ...formData.basicInfo, culture: e.target.value },
            })
          }
        />
        {errors.firstName && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full" />
            {errors.firstName}
          </p>
        )}
      </div>
    </div>
  );
}
