import useFormatters from "@/shared/hooks/use-formatters";
import { FormStepProps } from "../types";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formatPaymentType = (value: FormStepProps["formData"]["paymentType"]) => {
  switch (value) {
    case "cash":
      return "Наличные";
    case "without_nds":
      return "Без НДС";
    case "nds":
      return "С НДС";
    case "nds_5":
      return "С НДС 5%";
    case "nds_10":
      return "С НДС 10%";
    case "nds_15":
      return "С НДС 15%";
    case "nds_20":
      return "С НДС 20%";
  }
};

const fieldConfig = [
  { key: "unLoadingLocation", label: "Место выгрузки", isRequired: true },
  { key: "culture", label: "Культура", isRequired: true },
  { key: "distance", label: "Расстояние", isRequired: true },
  { key: "tonnage", label: "Тоннаж", isRequired: true },
  { key: "ratePerTon", label: "Ставка за тонну", isRequired: true },
  { key: "companyName", label: "Название компании", isRequired: true },
  { key: "loadingMethod", label: "Чем грузят", isRequired: false },
  {
    key: "maxVehicleHeight",
    label: "Ограничения по высоте",
    isRequired: false,
  },
  { key: "vehicleType", label: "Какие машины подходят", isRequired: false },
  { key: "unloadingType", label: "Тип выгрузки", isRequired: false },

  {
    key: "estimatedLoadingDate",
    label: "Дата погрузки",
    format: (value: Date) => format(value, "PPP", { locale: ru }),
    isRequired: true,
  },
  {
    key: "isCharterNeeded",
    label: "Нужена хартия",
    format: (value: boolean) => (value ? "Да" : "Нет"),
    isRequired: true,
  },
  {
    key: "loadingType",
    label: "Как грузят",
    format: (value: string) => (value === "normal" ? "По норме" : "По полной"),
    isRequired: true,
  },
  {
    key: "paymentType",
    label: "Тип оплаты",
    format: (value: string) =>
      formatPaymentType(value as FormStepProps["formData"]["paymentType"]),
    isRequired: true,
  },
];

export default function VerificationDataStep({ formData }: FormStepProps) {
  const { formatPhoneNumber } = useFormatters();
  return (
    <div className="flex flex-col gap-2  max-h-[600px] pr-4 overflow-y-scroll">
      <div className="w-full flex flex-col gap-4">
        <span className="text-xs font-medium text-primary/60">
          Ваша заявка будет выглядеть так
        </span>

        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-normal">Место погрузки</p>
          <p className="text-xl font-medium max-w-sm">
            {formData?.loadingLocation.name ? (
              formData?.loadingLocation.name
            ) : (
              <span className="text-red-500">Заполните поле</span>
            )}
          </p>
        </div>

        {fieldConfig.map(({ key, label, format, isRequired }) => {
          const keys = key.split(".");
          let value: unknown = formData;

          for (const k of keys) {
            value = (value as Record<string, unknown>)?.[k];
            if (value === undefined || value === null) break;
          }

          const displayValue = format
            ? format(value as Date & boolean & string)
            : value;

          if (isRequired) {
            return (
              <div
                key={key}
                className="w-full flex justify-between items-center"
              >
                <p className="text-xl font-normal">{label}</p>
                <p className="text-xl font-medium max-w-sm">
                  {typeof displayValue === "string" &&
                  displayValue.length > 0 ? (
                    displayValue
                  ) : (
                    <span className="text-red-500">Заполните поле</span>
                  )}
                </p>
              </div>
            );
          } else if (
            typeof displayValue === "string" &&
            displayValue.length !== 0
          ) {
            return (
              <div
                key={key}
                className="w-full flex justify-between items-center"
              >
                <p className="text-xl font-normal">{label}</p>
                <p className="text-xl font-medium max-w-sm">
                  {displayValue as React.ReactNode}
                </p>
              </div>
            );
          }
        })}

        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-normal">Координаты погрузки</p>
          <p className="text-xl font-medium max-w-sm">
            {formData?.loadingLocation.coordinates ? (
              "Точка выбрана"
            ) : (
              <span className="text-red-500">Укажите точку на карте</span>
            )}
          </p>
        </div>

        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-normal">Имя</p>
          <p className="text-xl font-medium max-w-sm">
            {formData?.contact?.name ? (
              formData?.contact?.name
            ) : (
              <span className="text-red-500">Заполните поле</span>
            )}
          </p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p className="text-xl font-normal">Телефон</p>
          <p className="text-xl font-medium max-w-sm">
            {formData?.contact?.phone ? (
              formatPhoneNumber(formData?.contact?.phone)
            ) : (
              <span className="text-red-500">Заполните поле</span>
            )}
          </p>
        </div>
        {formData?.additionalInformation && (
          <div className="w-full flex flex-col gap-1">
            <p className="text-xl font-normal">Дополнительная информация</p>
            <div className="w-full flex justify-end">
              <p className="text-xl font-medium max-w-sm text-right">
                {formData?.additionalInformation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
