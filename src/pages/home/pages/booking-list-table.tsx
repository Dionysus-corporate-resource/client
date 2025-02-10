import { Skeleton } from "@/shared/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { ArrowDownRight, CornerRightUp, Package } from "lucide-react";
import { sortbookingAtom } from "../model/sort-atom";
import { useAtomValue } from "jotai";

// interface TableData {
//   id: string;
//   customer: string;
//   culture: string;
//   loadingPoint: string;
//   unloadingPoint: string;
//   volume: string;
//   distance: string;
//   rate: number;
// }

// const tableData: TableData[] = [
//   {
//     id: "1",
//     customer: "ООО Агрохолдинг",
//     culture: "Пшеница",
//     loadingPoint: "Ростов-на-Дону",
//     unloadingPoint: "Новороссийск",
//     volume: "500 тонн",
//     distance: "300 км",
//     rate: 15000,
//   },
//   {
//     id: "2",
//     customer: "ИП Иванов",
//     culture: "Кукуруза",
//     loadingPoint: "Краснодар",
//     unloadingPoint: "Туапсе",
//     volume: "300 тонн",
//     distance: "150 км",
//     rate: 12000,
//   },
//   {
//     id: "3",
//     customer: "АО РусПоле",
//     culture: "Ячмень",
//     loadingPoint: "Волгоград",
//     unloadingPoint: "Ростов-на-Дону",
//     volume: "400 тонн",
//     distance: "450 км",
//     rate: 18000,
//   },
//   {
//     id: "4",
//     customer: "ООО ЮгЗерно",
//     culture: "Подсолнечник",
//     loadingPoint: "Ставрополь",
//     unloadingPoint: "Новороссийск",
//     volume: "200 тонн",
//     distance: "500 км",
//     rate: 20000,
//   },
//   {
//     id: "5",
//     customer: "КФХ Светлый путь",
//     culture: "Соя",
//     loadingPoint: "Майкоп",
//     unloadingPoint: "Туапсе",
//     volume: "150 тонн",
//     distance: "200 км",
//     rate: 13000,
//   },
// ];

export default function BookingListTable() {
  const sortBooking = useAtomValue(sortbookingAtom);

  // Фильтруем заявки по статусу "active" ДЛЯ КАРТЫ ЧИСТО
  const filterBooking = sortBooking?.filter(
    (booking) => booking?.status === "active",
  );
  return (
    <div className="w-full px-6 pb-6 rounded-md">
      {!filterBooking ? (
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
            {Array.from({ length: 10 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-32 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32 rounded-full" />
                </TableCell>
                <TableCell className="flex gap-2">
                  <Skeleton className="h-4 w-32 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow>
              {/* <TableHead>Заказчик</TableHead> */}
              <TableHead className="w-[220px]">Культура</TableHead>
              <TableHead className="w-[300px]">Погрузки</TableHead>
              <TableHead className="w-[300px]">Выгрузки</TableHead>
              <TableHead className="flex justify-center items-center">
                Объем
              </TableHead>
              <TableHead>Расст.</TableHead>
              <TableHead className="text-right">Ставка</TableHead>
              <TableHead className="text-center">Подробности</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-background">
            {filterBooking?.map((booking) => (
              <TableRow key={booking._id}>
                {/* <TableCell>
                  <div className="flex gap-4">
                    {booking?.companyPublicData?.nameCompany}
                  </div>
                </TableCell> */}
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {booking?.basicInfo?.culture}
                  </div>
                </TableCell>
                <TableCell>
                  {/* <MapPin className="w-4 h-4 text-muted-foreground" /> */}
                  <div className="flex gap-2">
                    <ArrowDownRight className="w-4 h-4" />
                    {booking?.basicInfo?.loadingLocation.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <CornerRightUp className="w-4 h-4 " />
                    {booking?.basicInfo?.unLoadingLocation}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {booking?.basicInfo?.tonnage ? (
                    <>{booking?.basicInfo?.tonnage} т</>
                  ) : (
                    // <Dot className="w-4 h-4" />
                    <>Не указано</>
                  )}
                </TableCell>
                <TableCell>{booking?.basicInfo?.distance} км</TableCell>
                <TableCell className="text-right font-medium">
                  {booking?.detailTransportation?.ratePerTon} ₽/т
                </TableCell>
                <TableCell className="flex justify-center">
                  <BookingDetailSheet
                    bookingId={booking?._id}
                    actionSlot={
                      <button className="hover:underline  underline-offset-4">
                        Подробнее
                      </button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

// <Button
// variant="link"
// className="bg-[hsl(var(--access-primary))] text-white "
// className="border"
// >
{
  /* <Ticket className="w-4 h-4 mr-2" /> */
}
{
  /* <Pointer className="w-4 h-4 mr-2 rotate-45" /> */
}
{
  /* <Tickets className="w-4 h-4 mr-2  text-muted-foreground" /> */
}
// Подробнее
{
  /* <ArrowUpRight className="w-4 h-4 ml-2" /> */
}
// </Button>
