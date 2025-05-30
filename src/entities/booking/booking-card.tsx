// import useFormatters from "@/shared/hooks/use-formatters";
import useFormatters from "@/shared/hooks/use-formatters";
import { TBookingDto } from "@/shared/model/types/booking";
import { Eye } from "lucide-react";
import { ReactNode } from "react";

export default function BookingCard({
  booking,
  bookingDetailSlot,
  bookingEditSlot,
}: {
  booking: TBookingDto;
  bookingDetailSlot?: ReactNode;
  bookingEditSlot?: ReactNode;
}) {
  const { formatPhoneNumber } = useFormatters();
  return (
    <div className="max-w-lg w-full flex flex-col justify-between border bg-background rounded-[30px] p-5 space-y-4">
      <div className="space-y-4">
        {bookingEditSlot && (
          // <div className="bg-[#F9F9F9] px-4 pt-[8px] pb-0 rounded-[30px] flex items-center justify-end">
          //   {bookingEditSlot}
          // </div>
          <div className="bg-[#F9F9F9] rounded-[30px] pt-[8px] px-4 flex items-center justify-end">
            {bookingEditSlot}
          </div>
        )}

        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium">
              {booking?.basicInfo?.culture}
            </span>
            <span className="text-xs font-normal text-primary/60">
              {new Date(booking.createdAt).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
              })}{" "}
              {new Date(booking?.createdAt).toLocaleTimeString("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            {booking?.additionalConditions?.estimatedLoadingDate && (
              <span className="flex gap-1 items-center text-xs font-normal text-primary/60">
                погрузка на{" "}
                {new Date(
                  booking?.additionalConditions?.estimatedLoadingDate,
                ).toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "long",
                })}
              </span>
            )}
            {booking?.additionalConditions && (
              <span className="flex gap-1 items-center text-xs font-normal text-primary/60">
                <Eye className="h-4 w-4 text-primary/40" />
                {booking?.view} чел.
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col py-3 px-5 gap-2 bg-[#F9F9F9] rounded-[30px]">
          <div className="flex flex-col gap-0">
            <span className="text-xs font-normal text-primary/60">
              погрузка
            </span>
            <span className="text-base font-normal">
              {booking?.basicInfo?.loadingLocation?.name}
            </span>
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-xs font-normal text-primary/60">
              выгрузка
            </span>
            <span className="text-base font-normal">
              {booking?.basicInfo?.unLoadingLocation}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 pl-2">
          <div className="flex gap-2 text-white">
            <div className="w-fit py-1 px-4 text-xs rounded-xl font-medium bg-[#8BBCFE]">
              {booking?.basicInfo?.distance} км
            </div>
            <div className="w-fit py-1 px-4 text-xs  rounded-xl font-medium bg-[#8BBCFE]">
              {booking?.basicInfo?.ratePerTon} ₽/т
            </div>
            {booking?.basicInfo?.tonnage && (
              <div className="w-fit py-1 px-4 text-xs  rounded-xl font-medium bg-[#8BBCFE]">
                {booking?.basicInfo?.tonnage} т
              </div>
            )}
          </div>
          <div className="">
            <div className="w-fit py-2 px-4 border text-xs rounded-[30px] font-medium">
              {booking?.basicInfo?.companyName}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-1">
        <div className="flex flex-col gap-0">
          <span className="text-xs font-normal text-primary/60">
            {booking?.basicInfo?.contact?.name}
          </span>
          <span className="text-base font-normal">
            {formatPhoneNumber(booking?.basicInfo?.contact?.phone)}
          </span>
        </div>
        {booking?.additionalConditions && bookingDetailSlot}
      </div>
    </div>
  );
}
