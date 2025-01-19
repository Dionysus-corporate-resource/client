import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";

export function DetailsStep({
  formData,
  updateFormData,
  // onNext,
}: FormStepProps) {
  const [errors] = useState<Record<string, string>>({});

  // const handleNext = () => {
  //   const newErrors: Record<string, string> = {};
  //   if (!formData.details?.phone) {
  //     newErrors.phone = "Phone is required";
  //   }
  //   if (!formData.details?.address) {
  //     newErrors.address = "Address is required";
  //   }
  //   if (!formData.details?.city) {
  //     newErrors.city = "City is required";
  //   }

  //   if (Object.keys(newErrors).length === 0) {
  //     onNext();
  //   } else {
  //     setErrors(newErrors);
  //   }
  // };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.details?.phone || ""}
          onChange={(e) =>
            updateFormData({
              details: { ...formData.details, phone: e.target.value },
            })
          }
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.details?.address || ""}
          onChange={(e) =>
            updateFormData({
              details: { ...formData.details, address: e.target.value },
            })
          }
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={formData.details?.city || ""}
          onChange={(e) =>
            updateFormData({
              details: { ...formData.details, city: e.target.value },
            })
          }
        />
        {errors.city && (
          <p className="text-sm text-destructive">{errors.city}</p>
        )}
      </div>
    </div>
  );
}
