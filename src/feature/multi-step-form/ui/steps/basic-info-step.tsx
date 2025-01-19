import { useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";

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
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          value={formData.basicInfo?.firstName || ""}
          onChange={(e) =>
            updateFormData({
              basicInfo: { ...formData.basicInfo, firstName: e.target.value },
            })
          }
        />
        {errors.firstName && (
          <p className="text-sm text-destructive">{errors.firstName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          value={formData.basicInfo?.lastName || ""}
          onChange={(e) =>
            updateFormData({
              basicInfo: { ...formData.basicInfo, lastName: e.target.value },
            })
          }
        />
        {errors.lastName && (
          <p className="text-sm text-destructive">{errors.lastName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.basicInfo?.email || ""}
          onChange={(e) =>
            updateFormData({
              basicInfo: { ...formData.basicInfo, email: e.target.value },
            })
          }
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>
    </div>
  );
}
