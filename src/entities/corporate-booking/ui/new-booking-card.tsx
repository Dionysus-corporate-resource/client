import {
  Wheat,
  Weight,
  Route,
  Wallet,
  MapPin,
  User,
  Settings,
  Calendar,
  Percent,
  DollarSign,
  Truck,
  ArrowDown,
  ArrowUp,
  Ruler,
  MessageSquare,
  CircleDot,
  PackageCheck,
  PackageX,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBookingDto } from "@/shared/model/types/booking";
import { useState } from "react";
import DropDownMenuSettingBooking from "./dropdown-menu";
import BookingToogleItemDialog from "@/pages/home/ui/components/toggle-booking/toggle-booking-dialog";
import RemoveBookingDialogSure from "@/pages/home/ui/components/remove-booking/remove-booking-dialog";
import { SheetAddFlight } from "@/entities/flight/dispatcher";

export default function NewBookingCard({
  booking,
}: {
  booking: IBookingDto["corporateBookingData"];
}) {
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const [isOpenRemoveSure, setIsOpenRemoveSure] = useState(false);
  const [isOpenAddFlight, setIsOpenAddFlight] = useState(false);

  const getStatusColor = (
    status: IBookingDto["corporateBookingData"]["status"],
  ) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inProgress":
        return "bg-blue-100 text-blue-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getStatus = (status: IBookingDto["corporateBookingData"]["status"]) => {
    switch (status) {
      case "active":
        return "Активна";
      case "inProgress":
        return "В работе";
      case "inactive":
        return "Закрыта";
      default:
        return "Уточнить";
    }
  };
  const getPaymentColor = (
    type: IBookingDto["corporateBookingData"]["terms"]["paymentMethod"],
  ) => {
    switch (type) {
      case "NDS":
        return "bg-emerald-100 text-emerald-800";
      case "without_NDS":
        return "bg-yellow-100 text-yellow-800";
      case "cash":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getPayment = (
    type: IBookingDto["corporateBookingData"]["terms"]["paymentMethod"],
  ) => {
    switch (type) {
      case "NDS":
        return "НДС";
      case "without_NDS":
        return "Без НДС";
      case "cash":
        return "Наличные";
      default:
        return "Уточнить";
    }
  };

  return (
    <div className="w-full transition-all duration-200 shadow-sm border rounded-md">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Header Section */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
                <Wheat className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-gray-900">
                    {booking?.generalInformation?.cargoName}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(booking?.status)}
                  >
                    <CircleDot className="w-3 h-3 mr-1" />
                    {getStatus(booking?.status)}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Weight className="w-4 h-4" />
                  <span>{booking?.generalInformation?.cargoAmount} тонн</span>
                  <span className="text-gray-300">•</span>
                  <Route className="w-4 h-4" />
                  <span>{booking?.location?.distance} км</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                // className={getPaymentColor(booking?.terms?.paymentMethod)}
              >
                <User className="w-3 h-3 mr-1" />
                {booking?.manager?.userName}
              </Badge>

              <DropDownMenuSettingBooking
                corporateBooking={booking}
                setIsOpenToogle={setIsOpenToggle}
                setIsOpenRemoveSure={setIsOpenRemoveSure}
                setIsOpenAddFlight={setIsOpenAddFlight}
              />
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2 col-span-3">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <div className="flex items-center gap-2">
                <span className="text-gray-600 line-clamp-2 max-w-[50%] leading-tight">
                  {booking?.location?.loadingLocation}
                </span>
                <span className="text-gray-400 line-clamp-2 max-w-[50%] flex-shrink-0">
                  →
                </span>
                <span className="text-gray-600">
                  {booking?.location?.unloadingLocation}
                </span>
              </div>
            </div>

            {/* <div className="border-b col-span-3" /> */}

            {/* <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {getPayment(booking?.terms?.paymentMethod)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking?.location?.loadingLocationDate}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                Аванс {booking?.terms?.advancePercentage}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking?.terms?.price} р/км
              </span>
            </div>

            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking?.terms?.loadingType}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking?.requiredTransport?.carType}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ArrowDown className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking?.requiredTransport?.carTypeUnLoading}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {booking?.requiredTransport?.carHeightLimit}
              </span>
            </div> */}
          </div>

          {/* Additional Info */}
          {/* {booking?.additionalInfo && (
            <div className="flex items-start gap-2 text-sm bg-gray-50 rounded-md p-2">
              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
              <p className="text-gray-600">{booking?.additionalInfo}</p>
            </div>
          )} */}
        </div>
      </CardContent>
      {/* Диалог на редактирование заявки */}
      <BookingToogleItemDialog
        isOpen={isOpenToggle}
        setIsOpen={setIsOpenToggle}
        bookingId={booking._id}
      />
      {/* Диалог на удаление заявки */}
      <RemoveBookingDialogSure
        corporateBooking={booking}
        isOpen={isOpenRemoveSure}
        setIsOpen={setIsOpenRemoveSure}
      />
      {/* Диалог на добавление рейса */}
      <SheetAddFlight
        corporateBooking={booking}
        isOpen={isOpenAddFlight}
        setIsOpen={setIsOpenAddFlight}
      />
    </div>
  );
}
