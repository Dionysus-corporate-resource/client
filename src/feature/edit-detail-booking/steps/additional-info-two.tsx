import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { LoadingType, PaymentType } from "@/shared/model/types/booking";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

export function AdditionalInfoTwoStep({
  formData,
  updateFormData,
}: {
  formData: FormStepProps["formData"];
  updateFormData: FormStepProps["updateFormData"];
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-1">
        <Label className="text-xs font-medium text-primary/60">
          Тип оплаты
        </Label>

        <Select
          value={formData.paymentType}
          onValueChange={(value: PaymentType) => {
            updateFormData({ paymentType: value });
          }}
        >
          <SelectTrigger className="w-full py-6  rounded-[30px] border text-sm font-normal">
            <SelectValue placeholder="Поля сортировки" />
          </SelectTrigger>
          <SelectContent className="rounded-[30px]">
            <SelectGroup>
              <SelectLabel className="text-xs font-normal text-primary/60 p-4">
                Выберите один вариант:
              </SelectLabel>
              <SelectItem value="cash" className="rounded-[30px]">
                <div className="text-base py-1 px-4">Наличный расчет</div>
              </SelectItem>
              <SelectItem value="without_nds" className="rounded-[30px]">
                <div className="text-base py-1 px-4">Без НДС</div>
              </SelectItem>
              <SelectItem value="nds" className="rounded-[30px]">
                <div className="text-base py-1 px-4">С НДС</div>
              </SelectItem>
              <SelectItem value="nds_5" className="rounded-[30px]">
                <div className="text-base py-1 px-4">С НДС 5%</div>
              </SelectItem>
              <SelectItem value="nds_10" className="rounded-[30px]">
                <div className="text-base py-1 px-4">С НДС 10%</div>
              </SelectItem>
              <SelectItem value="nds_15" className="rounded-[30px]">
                <div className="text-base py-1 px-4">С НДС 15%</div>
              </SelectItem>
              <SelectItem value="nds_20" className="rounded-[30px]">
                <div className="text-base py-1 px-4">С НДС 20%</div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-medium text-primary/60">
          Как грузят?
        </Label>

        <Select
          value={formData.loadingType}
          onValueChange={(value: LoadingType) => {
            updateFormData({ loadingType: value });
          }}
        >
          <SelectTrigger className="w-full py-6  rounded-[30px] border text-sm font-normal">
            <SelectValue placeholder="Поля сортировки" />
          </SelectTrigger>
          <SelectContent className="rounded-[30px]">
            <SelectGroup>
              <SelectLabel className="text-xs font-normal text-primary/60 p-4">
                Выберите один вариант:
              </SelectLabel>

              <SelectItem value="normal" className="rounded-[30px]">
                <div className="text-base py-1 px-4">По норме</div>
              </SelectItem>
              <SelectItem value="full" className="rounded-[30px]">
                <div className="text-base py-1 px-4">По полной</div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label className="text-xs font-medium text-primary/60">
          Нужна хартия?
        </Label>

        <Select
          value={String(formData.isCharterNeeded)}
          onValueChange={(value: string) => {
            updateFormData({ isCharterNeeded: JSON.parse(value) });
          }}
        >
          <SelectTrigger className="w-full py-6  rounded-[30px] border text-sm font-normal">
            <SelectValue placeholder="Поля сортировки" />
          </SelectTrigger>
          <SelectContent className="rounded-[30px]">
            <SelectGroup>
              <SelectLabel className="text-xs font-normal text-primary/60 p-4">
                Выберите один вариант:
              </SelectLabel>

              <SelectItem value="true" className="rounded-[30px]">
                <div className="text-base py-1 px-4">Да</div>
              </SelectItem>
              <SelectItem value="false" className="rounded-[30px]">
                <div className="text-base py-1 px-4">Нет</div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label className="text-xs font-medium text-primary/60">
          Примерная дата погрузки
        </Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal rounded-[30px] py-6 pl-6",
                !formData.estimatedLoadingDate && "text-muted-foreground",
              )}
            >
              {formData.estimatedLoadingDate ? (
                format(formData.estimatedLoadingDate, "PPP", { locale: ru })
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 rounded-[30px]" align="start">
            <Calendar
              mode="single"
              selected={formData.estimatedLoadingDate}
              onSelect={(d) => updateFormData({ estimatedLoadingDate: d })}
              initialFocus
              locale={ru}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
