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
                },
                {
                  label: "Место погрузки",
                  value: formData?.basicInfo?.loadingLocation?.name,
                  addEnd: "",
                },
                {
                  label: "Место выгрузки",
                  value: formData?.basicInfo?.unLoadingLocation,
                  addEnd: "",
                },
                {
                  label: "Тоннаж",
                  value: formData?.basicInfo?.tonnage,
                  addEnd: "тонн",
                },
                {
                  label: "Культура",
                  value: formData?.basicInfo?.culture,
                  addEnd: "",
                },
              ].map(({ label, value, addEnd }, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>
                    {value ? (
                      <>
                        {value} {addEnd}
                      </>
                    ) : (
                      <span
                        className="text-red-400 font-medium flex items-center gap-2
                        w-fit bg-red-100 px-2 py-1 rounded-md"
                      >
                        <X className="w-4 h-4" />
                        <p className="text-sm"> Не указано</p>
                      </span>
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
                },
                {
                  label: "Грузоподъемность весов",
                  value: formData?.conditionsTransportation?.scaleCapacity,
                  addEnd: "тонн",
                },
                {
                  label: "Дата погрузки",
                  value: formData?.conditionsTransportation?.loadingDate
                    ?.toISOString()
                    .split("T")[0],
                  addEnd: "",
                },
              ].map(({ label, value, addEnd }, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>
                    {value ? (
                      <>
                        {value} {addEnd}
                      </>
                    ) : (
                      <span
                        className="text-red-400 font-medium flex items-center gap-2
                        w-fit bg-red-100 px-2 py-1 rounded-md"
                      >
                        <X className="w-4 h-4" />
                        <p className="text-sm"> Не указано</p>
                      </span>
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
                },
                {
                  label: "Допустимая недостача",
                  value: formData?.detailTransportation?.allowedShortage,
                  addEnd: "",
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
                },
                {
                  label: "Ставка",
                  value: formData?.detailTransportation?.ratePerTon,
                  addEnd: "₽/тонна",
                },
                {
                  label: "Срок оплаты",
                  value: formData?.detailTransportation?.paymentDeadline,
                  addEnd: "",
                },
              ].map(({ label, value, addEnd }, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{label}</TableCell>
                  <TableCell>
                    {value ? (
                      <>
                        {value} {addEnd}
                      </>
                    ) : (
                      <span
                        className="text-red-400 font-medium flex items-center gap-2
                        w-fit bg-red-100 px-2 py-1 rounded-md"
                      >
                        <X className="w-4 h-4" />
                        <p className="text-sm"> Не указано</p>
                      </span>
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
                    <span
                      className="text-red-400 font-medium flex items-center gap-2
                      w-fit bg-red-100 px-2 py-1 rounded-md"
                    >
                      <X className="w-4 h-4" />
                      <p className="text-sm"> Не указано</p>
                    </span>
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
                      <p className="text-sm"> Не указано</p>
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
