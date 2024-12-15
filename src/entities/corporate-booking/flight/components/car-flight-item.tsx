import { ICar } from "../add-flight-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function CarFlightItem({ car }: { car: ICar }) {
  return (
    <div className=" lg:max-w-[1500px] max-w-2xl py-2 px-4 rounded-md border text-sm cursor-pointer ">
      <div className="flex flex-col items-end  space-y-2">
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
            <p className="mt-1 text-lg font-medium">{car.driverFullName}</p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button size="sm" variant="link">
            Удалить
          </Button>
          <span className="text-sm text-muted-foreground">{car.phone}</span>
        </div>
      </div>
    </div>
  );
}
