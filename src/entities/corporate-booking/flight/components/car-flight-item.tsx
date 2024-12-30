import { ICar } from "../add-flight-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  TooltipContent,
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ChevronRight,
  ChevronsRight,
  CircleChevronRight,
  Dot,
  Footprints,
} from "lucide-react";
import { useState } from "react";

type ISteps = {
  label: "Оформлен" | "Погрузка" | "В дороге" | "На выгрузке" | "Оплачено";
  isNext: boolean;
  description: string;
  precenge: number;
};

export default function CarFlightItem({ car }: { car: ICar }) {
  const [steps, setSteps] = useState<ISteps[]>([
    {
      label: "Оформлен",
      description: "В оформление документов  входит составление реестра и ...",
      isNext: false,
      precenge: 4,
    },
    {
      label: "Погрузка",
      description: "Водитель приехал на погрузку",
      isNext: false,
      precenge: 26,
    },
    {
      label: "В дороге",
      description: "Водитель загрузился и едет к точку выгрузки",
      isNext: false,
      precenge: 50,
    },
    {
      label: "На выгрузке",
      description: "Водитель приехал и выгружается",
      isNext: false,
      precenge: 72,
    },
    {
      label: "Оплачено",
      description: "Водитель отъездил свой рейс и ждет оплаты",
      isNext: false,
      precenge: 100,
    },
  ]);
  const [precenge, setPrecenge] = useState(0);

  const ChangeStatusCheckbox = (
    labelChecked: ISteps["label"],
    precenge: number,
  ) => {
    setPrecenge(precenge);
    setSteps((prev) =>
      prev.map(
        (step) =>
          step.label === labelChecked
            ? { ...step, isNext: !step.isNext } // Изменяем isNext для найденного объекта
            : step, // Остальные объекты остаются неизменными
      ),
    );
  };

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

        <div className="relative flex flex-col w-full space-y-2">
          <div className="flex justify-between py-2">
            {steps.map((step) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col gap-2  items-center">
                      <div
                        className="flex items-center space-x-2 rounded-md p-1  bg-white z-10 w-fit"
                        onClick={() =>
                          ChangeStatusCheckbox(step.label, step.precenge)
                        }
                      >
                        {/* <Checkbox
                          id={step.label}
                          checked={step.isNext}
                          onCheckedChange={() =>
                            ChangeStatusCheckbox(step.label, step.precenge)
                          }
                        /> */}
                        {/* <CircleChevronRight className="w-4 h-4" /> */}
                        {/* <ChevronsRight className="w-4 h-4" /> */}/
                      </div>
                      <Label
                        htmlFor={step.label}
                        className="text-muted-foreground text-xs"
                      >
                        {step.label}
                      </Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px]">{step.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          <div className="absolute bottom-[42px] left-0 w-full">
            <Progress value={precenge} className="w-full h-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
