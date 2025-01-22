import { useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export function DetailTransportation({
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
        <Label htmlFor="demurrage" className="flex items-center gap-2">
          {/* <Clock className="w-4 h-4" /> */}
          <span>Простой *</span>
        </Label>
        <Input
          id="demurrage"
          placeholder="Укажите время простоя (часы)"
          className={`transition-all ${errors.demurrage ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.demurrage}
          onChange={(e) => handleChange("demurrage", e.target.value)}
        />
        {errors.demurrage && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.demurrage}
          </p>
        )}
      </div>

      {/* Допустимая недостача */}
      <div className="space-y-2">
        <Label htmlFor="allowedShortage" className="flex items-center gap-2">
          {/* <Percent className="w-4 h-4" /> */}
          <span>Допустимая недостача *</span>
        </Label>
        <Input
          id="allowedShortage"
          placeholder="Укажите процент недостачи"
          type="number"
          className={`transition-all ${errors.allowedShortage ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.allowedShortage}
          onChange={(e) =>
            handleChange("allowedShortage", Number(e.target.value))
          }
        />
        {errors.allowedShortage && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.allowedShortage}
          </p>
        )}
      </div>

      {/* Вид оплаты */}
      <div className="space-y-2">
        <Label htmlFor="paymentType" className="flex items-center gap-2">
          {/* <Wallet className="w-4 h-4" /> */}
          <span>Вид оплаты *</span>
        </Label>
        <Select
          value={formData.detailTransportation?.paymentType}
          onValueChange={(value: "cash" | "nds" | "without_nds") =>
            handleChange("paymentType", value)
          }
        >
          <SelectTrigger
            className={`w-full ${errors.paymentType ? "border-destructive" : ""}`}
          >
            <SelectValue placeholder="Выберите тип оплаты" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Тип оплаты</SelectLabel>
              <SelectItem value="cash">Наличный</SelectItem>
              <SelectItem value="nds">С НДС</SelectItem>
              <SelectItem value="without_nds">Без НДС</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.paymentType && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.paymentType}
          </p>
        )}
      </div>

      {/* Ставка */}
      <div className="space-y-2">
        <Label htmlFor="ratePerTon" className="flex items-center gap-2">
          {/* <BanknoteIcon className="w-4 h-4" /> */}
          <span>Ставка *</span>
        </Label>
        <Input
          id="ratePerTon"
          placeholder="Укажите ставку за тонну"
          type="number"
          className={`transition-all ${errors.ratePerTon ? "border-destructive" : ""}`}
          value={formData.detailTransportation?.ratePerTon}
          onChange={(e) => handleChange("ratePerTon", Number(e.target.value))}
        />
        {errors.ratePerTon && (
          <p className="text-sm text-destructive flex items-center gap-1">
            <span className="inline-block w-1 h-1 bg-destructive rounded-full" />
            {errors.ratePerTon}
          </p>
        )}
      </div>

      {/* Сроки оплаты */}
      <div className="space-y-2">
        <Label htmlFor="paymentDeadline" className="flex items-center gap-2">
          {/* <Route className="w-4 h-4" /> */}
          <span>Сроки оплаты *</span>
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
