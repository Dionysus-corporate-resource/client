import { Truck, Phone, User, Container } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ICar } from "@/shared/model/types/booking";

export default function EmptyFlightCar() {
  return (
    <div className="w-full transition-all duration-200 border border-dashed rounded-md shadow-sm">
      <CardContent className="p-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-900 truncate">
            Это карточка заглушка
          </p>
          <span className="text-xs text-muted-foreground">
            Вы еще не поставили машины на этот рейс
          </span>
        </div>
        {/* </div> */}
      </CardContent>
    </div>
  );
}
