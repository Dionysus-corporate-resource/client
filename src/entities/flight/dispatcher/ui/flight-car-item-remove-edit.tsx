import { Truck, Phone, User, Container, Trash2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { ICar } from "@/shared/model/types/booking";

export default function FlightCarItemRemoveEdit({
  car,
  removeActionSlot,
}: {
  car: ICar;
  removeActionSlot?: () => void;
}) {
  return (
    <div className="w-full transition-all duration-200 hover:shadow-md border rounded-md shadow-sm relative">
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-4">
          {/* Vehicle and Trailer Numbers Row */}
          {/* <div className="flex gap-8"> */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-50 text-blue-600 flex-shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Номер машины</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {car.numberCar}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-purple-50 text-purple-600 flex-shrink-0">
                <Container className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Номер прицепа</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {car.numberTrailer}
                </p>
              </div>
            </div>
          </div>
          {/* </div> */}

          {/* Driver Name and Phone Row */}
          {/* <div className="flex gap-8  "> */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-green-50 text-green-600 flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Водитель</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {car.driverFullName}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 ">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-amber-50 text-amber-600 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-gray-500">Телефон</p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {car.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 absolute right-2 top-2">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center justify-center w-7 h-7 rounded-md bg-red-50 text-red-600 flex-shrink-0
                cursor-pointer
                "
                onClick={removeActionSlot}
              >
                <Trash2 className="w-4 h-4" />
              </div>
              {/* <div className="min-w-0">
                <p className="text-xs text-gray-500">Не подходит</p>

                <p className="text-sm font-medium text-gray-900 truncate">
                  Удалить
                </p>
              </div> */}
            </div>
          </div>
        </div>
        {/* </div> */}
      </CardContent>
    </div>
  );
}
