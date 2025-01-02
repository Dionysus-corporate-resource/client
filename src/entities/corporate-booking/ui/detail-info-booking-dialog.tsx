import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Ruler,
  MessageSquare,
  CircleDot,
  PackageCheck,
} from "lucide-react";
import { IBookingDto } from "@/shared/model/types/booking";
import {
  getloadingTypeForBookingCard,
  getPaymentColorForBookingCard,
  getPaymentForBookingCard,
  getStatusColorForBookingCard,
  getStatusForBookingCard,
} from "../hooks/useGetResultForBookingCard";

export default function DetailInfoBookingDialog({
  isOpen,
  setIsOpen,
  detailBooking,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  detailBooking: IBookingDto["corporateBookingData"];
}) {
  console.log(
    "detailBooking?.requiredTransport?.carHeightLimit",
    detailBooking?.requiredTransport?.carHeightLimit,
  );
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-amber-600">
                <Wheat className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {detailBooking?.generalInformation?.cargoName}
                  </h2>
                  <Badge
                    variant="secondary"
                    className={getStatusColorForBookingCard(
                      detailBooking?.status,
                    )}
                  >
                    <CircleDot className="w-3 h-3 mr-1" />
                    {getStatusForBookingCard(detailBooking?.status)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={getPaymentColorForBookingCard(
                      detailBooking?.terms?.paymentMethod,
                    )}
                  >
                    <Wallet className="w-3 h-3 mr-1" />
                    {getPaymentForBookingCard(
                      detailBooking?.terms?.paymentMethod,
                    )}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Weight className="w-4 h-4" />
                  <span>
                    {detailBooking?.generalInformation?.cargoAmount} тонн
                  </span>
                  <span className="text-gray-300">•</span>
                  <Route className="w-4 h-4" />
                  <span>{detailBooking?.location?.distance} км</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Route Section */}
            <div className="rounded-lg p-4 bg-gray-50">
              {/* <div className="flex  items-center gap-2 text-sm font-medium text-gray-900 mb-3">
                <MapPin className="w-4 h-4" />
                Маршрут
              </div> */}
              <div className="flex items-center gap-3">
                <div className="flex-1 p-3 bg-white rounded-md border ">
                  <div className="text-xs text-gray-500 mb-1">Откуда</div>
                  <div className="font-medium">
                    {detailBooking?.location?.loadingLocation}
                  </div>
                </div>
                <ArrowDown className="w-4 h-4 rotate-[-90deg] text-gray-400" />
                <div className="flex-1 p-3 bg-white rounded-md border ">
                  <div className="text-xs text-gray-500 mb-1">Куда</div>
                  <div className="font-medium">
                    {detailBooking?.location?.unloadingLocation}
                  </div>
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4">
              {detailBooking?.manager?.userName && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    Менеджер
                  </div>
                  <div className="font-medium">
                    {detailBooking?.manager?.userName}
                  </div>
                </div>
              )}

              {detailBooking?.location?.loadingLocationDate && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    Дата погрузки
                  </div>
                  <div className="font-medium">
                    {detailBooking?.location?.loadingLocationDate}
                  </div>
                </div>
              )}

              {detailBooking?.terms?.advancePercentage !== 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Percent className="w-4 h-4" />
                    Аванс
                  </div>
                  <div className="font-medium">
                    {detailBooking?.terms?.advancePercentage}
                  </div>
                </div>
              )}

              {detailBooking?.terms?.price && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <DollarSign className="w-4 h-4" />
                    Ставка
                  </div>
                  <div className="font-medium">
                    {detailBooking?.terms?.price} р/тонн
                  </div>
                </div>
              )}

              {detailBooking?.terms?.loadingType && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <PackageCheck className="w-4 h-4" />
                    Тип загрузки
                  </div>
                  <div className="font-medium">
                    {getloadingTypeForBookingCard(
                      detailBooking?.terms?.loadingType,
                    )}
                  </div>
                </div>
              )}

              {detailBooking?.requiredTransport?.carType && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Truck className="w-4 h-4" />
                    Тип машины
                  </div>
                  <div className="font-medium">
                    {detailBooking?.requiredTransport?.carType}
                  </div>
                </div>
              )}

              {detailBooking?.requiredTransport?.carTypeUnLoading && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <ArrowDown className="w-4 h-4" />
                    Тип выгрузки
                  </div>
                  <div className="font-medium">
                    {detailBooking?.requiredTransport?.carTypeUnLoading}
                  </div>
                </div>
              )}

              {detailBooking?.requiredTransport?.carHeightLimit !== null &&
                detailBooking?.requiredTransport?.carHeightLimit !== 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Ruler className="w-4 h-4" />
                      Ограничение высоты
                    </div>
                    <div className="font-medium">
                      {detailBooking?.requiredTransport?.carHeightLimit}м
                    </div>
                  </div>
                )}
            </div>

            {/* Additional Info */}
            {detailBooking?.additionalInfo && (
              <>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MessageSquare className="w-4 h-4" />
                    Дополнительная информация
                  </div>
                  <p className="font-medium">{detailBooking?.additionalInfo}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
