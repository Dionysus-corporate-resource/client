import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../types";
import { Input } from "@/shared/components/ui/input";
import useFormatters from "@/shared/hooks/use-formatters";

export default function ContactStep({
  formData,
  updateFormData,
}: FormStepProps) {
  const { formatPhoneGpt } = useFormatters();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Ставка за тонну (₽/тонн.)
        </Label>
        <Input
          placeholder="Пшеница"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={`${formData.ratePerTon} ₽`}
          onChange={(e) => {
            let value = e.target.value
              .replace(/₽/g, "") // Удаляем знак рубля для обработки
              .trim()
              .replace(/,/g, ".")
              .replace(/[^0-9.]/g, "")
              .replace(/\.{2,}/g, ".")
              .replace(/^\./, "0.")
              .replace(/(\.\d*)\./g, "$1");

            // Удаляем лишние нули в начале (если нужно)
            if (
              value.startsWith("0") &&
              value.length > 1 &&
              !value.startsWith("0.")
            ) {
              value = value.replace(/^0+/, "");
            }

            updateFormData({ ratePerTon: value });
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">
          Компания ИП/ООО
        </Label>
        <Input
          placeholder="ИП Вектор"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.companyName}
          onChange={(e) =>
            updateFormData({
              companyName: e.target.value,
            })
          }
        />
      </div>
      <span className="text-base font-normal">Контакты для связи</span>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">Имя</Label>
        <Input
          placeholder="Роман"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formData.contact.name}
          onChange={(e) =>
            updateFormData({
              contact: {
                ...formData.contact,
                name: e.target.value,
              },
            })
          }
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium text-primary/60">Телефон</Label>
        <Input
          placeholder="+7 (___) ___-__-__"
          className="border bg-background py-6 px-5 rounded-[30px] text-sm font-normal placeholder:text-primary/40"
          value={formatPhoneGpt(formData.contact.phone)}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/\D/g, ""); // Удаляем всё, кроме цифр
            let formattedValue = "";

            // Форматируем по шаблону +7 (XXX) XXX-XX-XX
            if (rawValue.length > 0) {
              formattedValue = "+7 ";
              if (rawValue.length > 1) {
                formattedValue += `(${rawValue.substring(1, 4)}`;
              }
              if (rawValue.length > 4) {
                formattedValue += `) ${rawValue.substring(4, 7)}`;
              }
              if (rawValue.length > 7) {
                formattedValue += `-${rawValue.substring(7, 9)}`;
              }
              if (rawValue.length > 9) {
                formattedValue += `-${rawValue.substring(9, 11)}`;
              }
            }
            console.log("formattedValue", formattedValue);

            updateFormData({
              contact: {
                ...formData.contact,
                phone: rawValue.substring(0, 11), // Сохраняем только цифры (макс 11)
              },
            });
          }}
          maxLength={18} // Максимальная длина с символами маски
        />
      </div>
    </div>
  );
}
