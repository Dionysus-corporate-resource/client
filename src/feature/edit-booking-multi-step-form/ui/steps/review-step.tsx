import { FormStepProps } from "../../model/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import MapSelector from "../map-selector";
import { X } from "lucide-react";

export function ReviewStep({ formData }: FormStepProps) {
  console.log("formData", formData);
  return (
    <div className="space-y-2">
      <MapSelector formData={formData} />
      <div className="grid grid-cols-2 gap-6">
        {/* Левая колонка */}
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Поле</TableHead>
                <TableHead>Значение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium bg-muted" colSpan={2}>
                  Основная информация
                </TableCell>
              </TableRow>
              {/* Основная информация */}
              {[
                {
                  label: "Расстояние",
                  value: formData?.basicInfo?.distance,
                  addEnd: "км",
                  required: true,
                },
                {
                  label: "Место погрузки",
                  value: formData?.basicInfo?.loadingLocation?.name,
                  addEnd: "",
                  required: true,
                },
                {
                  label: "Место выгрузки",
                  value: formData?.basicInfo?.unLoadingLocation,
                  addEnd: "",
                  required: true,
                },
                {
                  label: "Тоннаж",
                  value: formData?.basicInfo?.tonnage,
                  addEnd: "тонн",
                  required: false,
                },
                {
                  label: "Культура",
                  value: formData?.basicInfo?.culture,
                  addEnd: "",
                  required: true,
                },
              ].map(({ label, value, addEnd, required }, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>
                    {value ? (
                      <>
                        {value} {addEnd}
                      </>
                    ) : required ? (
                      <span
                        className="text-red-400 font-medium flex items-center gap-2
                        w-fit bg-red-100 px-2 py-1 rounded-md"
                      >
                        <X className="w-4 h-4" />
                        <p className="text-sm">Обязательное поле</p>
                      </span>
                    ) : (
                      <p className="text-sm"> Не указано</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {/* Условия перевозки */}
              <TableRow>
                <TableCell className="font-medium bg-muted" colSpan={2}>
                  Условия перевозки
                </TableCell>
              </TableRow>
              {[
                {
                  label: "Способ погрузки",
                  value: formData?.conditionsTransportation?.loadingMethod,
                  addEnd: "",
                  required: false,
                },
                {
                  label: "Грузоподъемность весов",
                  value: formData?.conditionsTransportation?.scaleCapacity,
                  addEnd: "тонн",
                  required: false,
                },
                {
                  label: "Дата погрузки",
                  value: new Date(
                    formData?.conditionsTransportation?.loadingDate,
                  )
                    ?.toISOString()
                    .split("T")[0],
                  addEnd: "",

                  required: true,
                },
              ].map(({ label, value, addEnd, required }, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>
                    {value ? (
                      <>
                        {value} {addEnd}
                      </>
                    ) : required ? (
                      <span
                        className="text-red-400 font-medium flex items-center gap-2
                        w-fit bg-red-100 px-2 py-1 rounded-md"
                      >
                        <X className="w-4 h-4" />
                        <p className="text-sm">Обязательное поле</p>
                      </span>
                    ) : (
                      <p className="text-sm"> Не указано</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Правая колонка */}
        <div className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Поле</TableHead>
                <TableHead>Значение</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Детали перевозки */}
              <TableRow>
                <TableCell className="font-medium bg-muted" colSpan={2}>
                  Детали перевозки
                </TableCell>
              </TableRow>
              {[
                {
                  label: "Простой",
                  value: formData?.detailTransportation?.demurrage,
                  addEnd: "",
                  required: false,
                },
                {
                  label: "Допустимая недостача",
                  value: formData?.detailTransportation?.allowedShortage,
                  addEnd: "",
                  required: false,
                },
                {
                  label: "Тип оплаты",
                  value:
                    formData?.detailTransportation?.paymentType === "cash"
                      ? "Наличный"
                      : formData?.detailTransportation?.paymentType === "nds"
                        ? "С НДС"
                        : "Без НДС",
                  addEnd: "",
                  required: true,
                },
                {
                  label: "Ставка",
                  value: formData?.detailTransportation?.ratePerTon,
                  addEnd: "₽/тонна",
                  required: true,
                },
                {
                  label: "Срок оплаты",
                  value: formData?.detailTransportation?.paymentDeadline,
                  addEnd: "",
                  required: false,
                },
              ].map(({ label, value, addEnd, required }, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>
                    {value ? (
                      <>
                        {value} {addEnd}
                      </>
                    ) : required ? (
                      <span
                        className="text-red-400 font-medium flex items-center gap-2
                        w-fit bg-red-100 px-2 py-1 rounded-md"
                      >
                        <X className="w-4 h-4" />
                        <p className="text-sm">Обязательное поле</p>
                      </span>
                    ) : (
                      <p className="text-sm"> Не указано</p>
                    )}
                  </TableCell>
                </TableRow>
              ))}

              {/* Дополнительные условия */}
              <TableRow>
                <TableCell className="font-medium bg-muted" colSpan={2}>
                  Дополнительные условия
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  Дополнительная информация
                </TableCell>
                <TableCell>
                  {formData?.additionalConditions?.additionalInformation ? (
                    <>{formData?.additionalConditions?.additionalInformation}</>
                  ) : (
                    <p className="text-sm"> Не указано</p>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Контакты</TableCell>
                <TableCell>
                  {formData?.additionalConditions?.contacts.length > 0 ? (
                    <>
                      {formData?.additionalConditions?.contacts.map(
                        (contact) => (
                          <span className="mr-2">
                            {contact?.name} - {contact?.phone},
                          </span>
                        ),
                      )}
                    </>
                  ) : (
                    <span
                      className="text-red-400 font-medium flex items-center gap-2
                      w-fit bg-red-100 px-2 py-1 rounded-md"
                    >
                      <X className="w-4 h-4" />
                      <p className="text-sm">Обязательное поле</p>
                    </span>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
