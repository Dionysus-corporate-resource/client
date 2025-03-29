import { Button } from "@/shared/components/ui/button";
import { IBookingDto } from "@/shared/model/types/booking";
import { Asterisk } from "lucide-react";

export default function NewBookingCard({ booking }: { booking: IBookingDto }) {
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(
      /^(8|7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
      "+7 ($2) $3-$4-$5",
    );
  };

  return (
    <div className="max-w-sm  flex flex-col justify-between border bg-background rounded-xl p-3 space-y-4">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-base font-medium flex gap-2">
              <Asterisk className="w-4 h-4 text-primary/80" />
              {booking?.basicInfo?.culture}
            </span>
            <div className="flex gap-1">
              {/* <Eye className="h-4 w-4 text-primary/60" /> */}
              <span className="text-xs font-normal text-primary/60">
                Посмотрели {booking?.view} чел.
              </span>
            </div>
          </div>
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

        <div className="flex flex-col pl-4 py-2 gap-2 bg-[#F9F9F9] rounded-xl">
          <div className="flex flex-col gap-0">
            <span className="text-xs font-normal text-primary/60">
              погрузка
            </span>
            <span className="text-sm font-normal">
              {booking?.basicInfo?.loadingLocation?.name}
            </span>
          </div>
          <div className="flex flex-col gap-0">
            <span className="text-xs font-normal text-primary/60">
              выгрузка
            </span>
            <span className="text-sm font-normal">
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
              {booking?.detailTransportation?.ratePerTon} ₽/т
            </div>
            {booking?.basicInfo?.tonnage && (
              <div className="w-fit py-1 px-4 text-xs  rounded-xl font-medium bg-[#8BBCFE]">
                {booking?.basicInfo?.tonnage} т
              </div>
            )}
          </div>
          <div className="">
            <div className="w-fit py-2 px-4 border text-xs rounded-xl font-medium">
              {booking?.companyPublicData?.nameCompany}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between px-1">
        <div className="flex flex-col gap-0">
          <span className="text-xs text-primary/60">
            {booking?.additionalConditions?.contacts[0].name}
          </span>
          <span className="text-sm font-medium">
            {formatPhoneNumber(
              booking?.additionalConditions?.contacts[0].phone,
            )}
          </span>
        </div>
        <Button
          className="rounded-xl shadow-none text-xs font-semibold px-4 py-2 text-[hsl(var(--access-primary))]"
          style={{ background: "#E8F1FF" }}
        >
          Подробнее
        </Button>
      </div>
    </div>
  );
}
