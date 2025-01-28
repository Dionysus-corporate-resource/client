import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { IBookingDto } from "@/shared/model/types/booking";
import { MapPin } from "lucide-react";

type Props = {
  tableData: IBookingDto[] | undefined;
};
export default function MyBookingListTable({ tableData: bookingData }: Props) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Просмотры</TableHead>
            <TableHead>Заказчик</TableHead>
            <TableHead>Культура</TableHead>
            <TableHead>Погрузки</TableHead>
            <TableHead>Выгрузка</TableHead>
            <TableHead>Объем</TableHead>
            <TableHead>Расстояние</TableHead>

            <TableHead className="text-right">Ставка</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingData?.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking?.__v}</TableCell>
              <TableCell>
                {booking?.user?.companyPublicData?.nameCompany}
              </TableCell>
              <TableCell>{booking?.basicInfo?.culture}</TableCell>
              <TableCell className="flex gap-2">
                <MapPin className="w-4 h-4" />
                {booking?.basicInfo?.loadingLocation.name}
              </TableCell>
              <TableCell>{booking?.basicInfo?.unLoadingLocation}</TableCell>
              <TableCell>
                {booking?.basicInfo?.tonnage ? (
                  <>{booking?.basicInfo?.tonnage} т</>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell>{booking?.basicInfo?.distance}</TableCell>
              <TableCell className="text-right font-semibold">
                {booking?.detailTransportation?.ratePerTon} ₽/т
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
