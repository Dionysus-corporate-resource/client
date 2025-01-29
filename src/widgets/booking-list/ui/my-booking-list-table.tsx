import { Button } from "@/shared/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { IBookingDto } from "@/shared/model/types/booking";
import { Eye, FilePenLine, MapPin } from "lucide-react";
import { useNavigate } from "react-router";

type Props = {
  tableData: IBookingDto[] | undefined;
};
export default function MyBookingListTable({ tableData: bookingData }: Props) {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Просмотры</TableHead>
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
              <TableCell className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                {booking?.view}
              </TableCell>

              <TableCell>{booking?.basicInfo?.culture}</TableCell>
              <TableCell className="flex gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
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
              <TableCell className="text-right flex justify-end">
                <Button
                  variant="secondary"
                  className="border flex flex-row gap-4"
                  onClick={() => navigate(`/edit-booking/${booking._id}`)}
                >
                  <FilePenLine className="w-4 h-4" />
                  Редактировать
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
