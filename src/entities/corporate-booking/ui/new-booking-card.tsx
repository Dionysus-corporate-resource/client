import { Weight, Route, MapPin, User, CircleDot, Blocks } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IBookingDto } from "@/shared/model/types/booking";
import { useState } from "react";
import DropDownMenuSettingBooking from "./dropdown-menu";
import RemoveBookingDialogSure from "@/pages/home/ui/components/remove-booking/remove-booking-dialog";
import { SheetAddFlight } from "@/entities/flight/dispatcher";
import {
  getStatusColorForBookingCard,
  getStatusForBookingCard,
} from "../hooks/useGetResultForBookingCard";
import { SheetToggleBooking } from "@/widgets";
import { motion } from "framer-motion";

export default function NewBookingCard({
  booking,
  changeIsOpenStateAndGetDetailBooking,
}: {
  booking: IBookingDto["corporateBookingData"];
  changeIsOpenStateAndGetDetailBooking: (
    booking: IBookingDto["corporateBookingData"],
  ) => void;
}) {
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const [isOpenRemoveSure, setIsOpenRemoveSure] = useState(false);
  const [isOpenAddFlight, setIsOpenAddFlight] = useState(false);

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div key={booking?._id} variants={itemVariants}>
      <div
        className="w-full h-full transition-all duration-200 shadow-sm border rounded-md
          fade-in
        "
      >
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex-shrink-0">
                  {/* <Wheat className="w-4 h-4" /> */}
                  <span>{booking?.generalInformation?.icon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-gray-900">
                      {booking?.generalInformation?.cargoName}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={getStatusColorForBookingCard(booking?.status)}
                    >
                      <CircleDot className="w-3 h-3 mr-1" />
                      {getStatusForBookingCard(booking?.status)}
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 -ml-2"
                  onClick={() => changeIsOpenStateAndGetDetailBooking(booking)}
                >
                  <Blocks className="h-4 w-4" />
                  {/* <CircleHelp className="h-4 w-4" /> */}
                </Button>
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
                  <span className="text-gray-400  flex-shrink-0">→</span>
                  <span className="text-gray-600 line-clamp-2  max-w-[50%] leading-tight">
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
        <SheetToggleBooking
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
    </motion.div>
  );
}
