import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { MapPin } from "lucide-react";

interface TableData {
  id: string;
  customer: string;
  culture: string;
  loadingPoint: string;
  unloadingPoint: string;
  volume: string;
  distance: string;
  rate: number;
}

const tableData: TableData[] = [
  {
    id: "1",
    customer: "ООО Агрохолдинг",
    culture: "Пшеница",
    loadingPoint: "Ростов-на-Дону",
    unloadingPoint: "Новороссийск",
    volume: "500 тонн",
    distance: "300 км",
    rate: 15000,
  },
  {
    id: "2",
    customer: "ИП Иванов",
    culture: "Кукуруза",
    loadingPoint: "Краснодар",
    unloadingPoint: "Туапсе",
    volume: "300 тонн",
    distance: "150 км",
    rate: 12000,
  },
  {
    id: "3",
    customer: "АО РусПоле",
    culture: "Ячмень",
    loadingPoint: "Волгоград",
    unloadingPoint: "Ростов-на-Дону",
    volume: "400 тонн",
    distance: "450 км",
    rate: 18000,
  },
  {
    id: "4",
    customer: "ООО ЮгЗерно",
    culture: "Подсолнечник",
    loadingPoint: "Ставрополь",
    unloadingPoint: "Новороссийск",
    volume: "200 тонн",
    distance: "500 км",
    rate: 20000,
  },
  {
    id: "5",
    customer: "КФХ Светлый путь",
    culture: "Соя",
    loadingPoint: "Майкоп",
    unloadingPoint: "Туапсе",
    volume: "150 тонн",
    distance: "200 км",
    rate: 13000,
  },
];

export default function BookingListTable() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
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
              <TableCell>{row.customer}</TableCell>
              <TableCell>{row.culture}</TableCell>
              <TableCell className="flex gap-2">
                <MapPin className="w-4 h-4" />
                {row.loadingPoint}
              </TableCell>
              <TableCell>{row.unloadingPoint}</TableCell>
              <TableCell>{row.volume}</TableCell>
              <TableCell>{row.distance}</TableCell>
              <TableCell className="text-right font-semibold">
                {row.rate.toLocaleString()} ₽
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
