import { FormStepProps } from "../../model/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

export function ReviewStep({ formData }: FormStepProps) {
  console.log("location", formData.basicInfo.loadingLocation.coordinates);
  return (
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
            {/* Основная информация */}
            <TableRow>
              <TableCell className="font-medium bg-muted" colSpan={2}>
                Основная информация
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Расстояние</TableCell>
              <TableCell>{formData.basicInfo.distance} км</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Место погрузки</TableCell>
              <TableCell>{formData.basicInfo.loadingLocation.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Местопогрузки координаты
              </TableCell>
              <TableCell>
                {formData.basicInfo.loadingLocation.coordinates}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Место выгрузки</TableCell>
              <TableCell>{formData.basicInfo.unLoadingLocation}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Тоннаж</TableCell>
              <TableCell>{formData.basicInfo.tonnage} т</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Культура</TableCell>
              <TableCell>{formData.basicInfo.culture}</TableCell>
            </TableRow>

            {/* Условия перевозки */}
            <TableRow>
              <TableCell className="font-medium bg-muted" colSpan={2}>
                Условия перевозки
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Способ погрузки</TableCell>
              <TableCell>
                {formData.conditionsTransportation.loadingMethod}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Грузоподъемность весов
              </TableCell>
              <TableCell>
                {formData.conditionsTransportation.scaleCapacity} т
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Дата погрузки</TableCell>
              <TableCell>
                {formData.conditionsTransportation.loadingDate}
              </TableCell>
            </TableRow>
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
            <TableRow>
              <TableCell className="font-medium">Простой</TableCell>
              <TableCell>{formData.detailTransportation.demurrage} ч</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Допустимая недостача
              </TableCell>
              <TableCell>
                {formData.detailTransportation.allowedShortage}%
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Тип оплаты</TableCell>
              <TableCell>
                {formData.detailTransportation.paymentType === "cash" &&
                  "Наличный"}
                {formData.detailTransportation.paymentType === "nds" && "С НДС"}
                {formData.detailTransportation.paymentType === "without_nds" &&
                  "Без НДС"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Ставка</TableCell>
              <TableCell>
                {formData.detailTransportation.ratePerTon} ₽/т
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Срок оплаты</TableCell>
              <TableCell>
                {formData.detailTransportation.paymentDeadline} дней
              </TableCell>
            </TableRow>

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
                {formData.additionalConditions.additionalInformation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Контакты</TableCell>
              <TableCell>
                {formData.additionalConditions.contacts.map(
                  (contact, index) => (
                    <div key={index}>{contact}</div>
                  ),
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
