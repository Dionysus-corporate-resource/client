import { TableData } from "@/entities/booking/model/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Eye, MapPin } from "lucide-react";

type Props = {
  tableData: TableData[];
};
export default function MyBookingListTable({ tableData }: Props) {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Просмотры</TableHead>
            <TableHead>Заказчик</TableHead>
            <TableHead>Культура</TableHead>
            <TableHead>Погрузки</TableHead>
            <TableHead>Выгрузки</TableHead>
            <TableHead>Объем</TableHead>
            <TableHead>Расстояние</TableHead>

            <TableHead className="text-right">Ставка</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tableData.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                {row.view}
              </TableCell>
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.culture}</TableCell>
              <TableCell className="flex gap-2">
                <MapPin className="w-4 h-4" />
                {row.loadingPoint}
              </TableCell>
              <TableCell>{row.unloadingPoint}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.distance}</TableCell>

              <TableCell className="text-right font-medium">
                {row.rate.toLocaleString()} ₽/т
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
