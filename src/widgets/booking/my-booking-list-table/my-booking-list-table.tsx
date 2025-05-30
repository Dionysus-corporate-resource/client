import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { TBookingDto } from "@/shared/model/types/booking";
import { ArrowDownRight, CornerRightUp, Dot, Eye } from "lucide-react";

import BookingDetailSheet from "../booking-detail/booking-detail-sheet";
import { ReactNode } from "react";

export type IStateRemoveSureType = {
  isOpenDialog: boolean;
  removeBookindId: string | null;
};

type Props = {
  tableData: TBookingDto[] | undefined;
  bookingEditSlot: (booking: TBookingDto) => ReactNode;
};

export default function MyBookingListTable({
  tableData: bookingData,
  bookingEditSlot,
}: Props) {
  return (
    <div
      className="w-full
      col-span-5 2xl:col-span-4"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Просм.</TableHead>
            <TableHead>Культура</TableHead>
            <TableHead>Погрузки</TableHead>
            <TableHead>Выгрузка</TableHead>
            <TableHead>Объем</TableHead>
            <TableHead>Расстояние</TableHead>
            <TableHead className="text-right">Ставка</TableHead>
            <TableHead className="text-right w-[100px]">Подробности</TableHead>
            <TableHead className="text-right w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingData?.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  {booking?.view}
                </div>
              </TableCell>

              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {/* <Package className="w-4 h-4" /> */}
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

              <TableCell className="flex justify-start ml-4">
                {booking?.basicInfo?.tonnage ? (
                  <>{booking?.basicInfo?.tonnage} т</>
                ) : (
                  <Dot className="w-4 h-4" />
                )}
              </TableCell>

              <TableCell>{booking?.basicInfo?.distance} км</TableCell>

              <TableCell className="text-right font-medium">
                {booking?.basicInfo?.ratePerTon} ₽/т
              </TableCell>

              <TableCell className="text-right">
                <BookingDetailSheet
                  bookingId={booking?._id}
                  actionSlot={
                    <button className="hover:underline  underline-offset-4">
                      Подробнее
                    </button>
                  }
                />
              </TableCell>

              <TableCell className="flex items-center justify-end">
                {bookingEditSlot(booking)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
