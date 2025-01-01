import { Wheat, Weight, Route, Wallet, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IBookingDto } from "@/shared/model/types/booking";

interface GrainCardProps {
  culture: string;
  weight: number;
  distance: number;
  paymentType: "НДС" | "Без НДС" | "Наличные";
  route: {
    from: string;
    to: string;
  };
}

export default function NewMiniBookingItem({
  corporateBooking,
}: {
  corporateBooking: IBookingDto;
}) {
  return (
    <div className="w-full h-full transition-all duration-200 shadow-md hover:-translate-y-1 border rounded-md">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-50 text-amber-600">
              <Wheat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm text-gray-900">
                {
                  corporateBooking?.corporateBookingData?.generalInformation
                    ?.cargoName
                }
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Weight className="w-4 h-4" />
                <span>
                  {
                    corporateBooking?.corporateBookingData?.generalInformation
                      ?.cargoAmount
                  }{" "}
                  тонн
                </span>
              </div>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={`
              ${corporateBooking?.corporateBookingData?.terms?.paymentMethod === "NDS" ? "bg-green-100 text-green-800" : ""}
              ${corporateBooking?.corporateBookingData?.terms?.paymentMethod === "without_NDS" ? "bg-yellow-100 text-yellow-800" : ""}
              ${corporateBooking?.corporateBookingData?.terms?.paymentMethod === "cash" ? "bg-blue-100 text-blue-800" : ""}
            `}
          >
            <Wallet className="w-3 h-3 mr-1" />
            {corporateBooking?.corporateBookingData?.terms?.paymentMethod}
          </Badge>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Route className="w-4 h-4 text-gray-400" />
            <span>
              {corporateBooking?.corporateBookingData?.location?.distance} км
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">
                {
                  corporateBooking?.corporateBookingData?.location
                    ?.loadingLocation
                }
              </span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-600">
                {
                  corporateBooking?.corporateBookingData?.location
                    ?.unloadingLocation
                }
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
