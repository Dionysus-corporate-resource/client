import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ICar } from "@/shared/model/types/booking";

export default function FlightCarItem({ car }: { car: ICar }) {
  return (
    <div className="w-full p-4 rounded-md border">
      <div className="flex flex-col items-end space-y-2">
        <div className="flex w-full items-center justify-between">
          <div className="space-x-2">
            <Badge variant="secondary" className="mt-1">
              {car.numberCar}
            </Badge>
            <Badge variant="secondary" className="mt-1">
              {car.numberTrailer}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <p className="mt-1 text-lg font-medium text-muted-foreground">
              {car.driverFullName}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button
            size="sm"
            variant="link"
            className="text-muted-foreground cursor-default"
          >
            Удалить
          </Button>
          <span className="text-sm text-muted-foreground">{car.phone}</span>
        </div>
      </div>
    </div>
  );
}
