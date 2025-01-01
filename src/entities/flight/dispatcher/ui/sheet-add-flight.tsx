import { Input } from "@/components/ui/input";
import { IBookingDto, ICar, ICarDto } from "@/shared/model/types/booking";
import AddFlightPlug from "@/entities/corporate-booking/flight/components/add-flight-plug";
import { Button } from "@/components/ui/button";
import { Phone, Save, Tag, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import AddFlightBtn from "@/entities/corporate-booking/flight/components/add-flight-btn";
import { useRef, useState } from "react";
import CarFlightItem from "@/entities/corporate-booking/flight/components/car-flight-item";
import { useMutation } from "@tanstack/react-query";
import { flightApi } from "@/entities/corporate-booking/flight/api/flight-api";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/shared/api/query-client";

export type IFormData = {
  organization: string;
  cars: ICar[];
};

type Props = {
  corporateBooking: IBookingDto["corporateBookingData"];
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

export default function SheetAddFlight({
  isOpen,
  setIsOpen,
  corporateBooking,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const triggerFormSubmit = () => {
    formRef.current?.requestSubmit();
  };

  //
  const corporateBookingId = corporateBooking._id;
  const createFlightMutatuon = useMutation({
    mutationFn: ({
      corporateBookingId,
      formData,
    }: {
      corporateBookingId: IBookingDto["corporateBookingData"]["_id"];
      formData: IFormData;
    }) => flightApi.create({ corporateBookingId, body: formData }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      queryClient.invalidateQueries({ queryKey: ["flight"] });
      // Добавь другие запросы, если нужно
    },
  });

  const [carData, setCarData] = useState<ICar>({
    numberCar: "",
    numberTrailer: "",
    driverFullName: "",
    phone: "",
  });
  const [formData, setFormData] = useState<IFormData>({
    organization: "",
    cars: [],
  });
  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, organization: value }));
  };
  const handleChangeCarData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setCarData((prev: ICar) => ({ ...prev, [name]: value }));
  };
  const handleSubmitCarData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData((prev) => ({ ...prev, cars: [...prev.cars, carData] }));
    setCarData({
      numberCar: "",
      numberTrailer: "",
      driverFullName: "",
      phone: "",
    });
  };

  const handleSubmitFormData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("formData", formData);
    createFlightMutatuon.mutate(
      { corporateBookingId, formData },
      {
        onSuccess: (data: { message: string }) => {
          console.log(data);
          toast({
            title: "Успешно",
            description: data?.message,
          });
        },
      },
    );
    setFormData({
      organization: "",
      cars: [],
    });
    setCarData({
      numberCar: "",
      numberTrailer: "",
      driverFullName: "",
      phone: "",
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="min-w-[1200px]">
        <SheetHeader>
          <SheetTitle>Поставить машины на рейс</SheetTitle>
          <SheetDescription>
            Вы можете изменить любые данные, удалить машину или добавить новую
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="flex flex-col gap-6">
            <form
              ref={formRef}
              onSubmit={handleSubmitFormData}
              className="flex gap-2 h-fit"
            >
              <div className="space-y-2 w-full">
                <Label htmlFor="driverFullName" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Карточка предпринимателя
                </Label>
                <Input
                  value={formData.organization}
                  onChange={handleChangeFormData}
                  placeholder="ИП Михайлов"
                  required
                />
                <div className="text-[0.8rem] text-muted-foreground">
                  Введите Название организации или ИП
                </div>
              </div>
              {/* <Button size="sm" variant="outline" type="submit">
                Сохранить
                <Save />
              </Button> */}
            </form>
            <Separator />
            <form
              onSubmit={handleSubmitCarData}
              className="flex flex-col space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numberCar" className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    Номер машины
                  </Label>
                  <Input
                    name="numberCar"
                    onChange={handleChangeCarData}
                    value={carData.numberCar}
                    placeholder="FG23H1532"
                    required
                  />
                  {/* <div className="text-[0.8rem] text-muted-foreground">
                    Введите номер машины
                  </div> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numberTrailer" className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    Номер прицепа
                  </Label>
                  <Input
                    name="numberTrailer"
                    onChange={handleChangeCarData}
                    value={carData.numberTrailer}
                    placeholder="FG23H1532"
                  />
                  {/* <div className="text-[0.8rem] text-muted-foreground">
                    Введите номер прицепа
                  </div> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverFullName" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Водитель
                  </Label>
                  <Input
                    name="driverFullName"
                    onChange={handleChangeCarData}
                    value={carData.driverFullName}
                    placeholder="Быков Анатолий Владимирович"
                    required
                  />
                  {/* <div className="text-[0.8rem] text-muted-foreground">
                    Введите ФИО водителя
                  </div> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    Телефон
                  </Label>
                  <Input
                    name="phone"
                    onChange={handleChangeCarData}
                    value={carData.phone}
                    placeholder="+7 900 743 12 43"
                  />
                  {/* <div className="text-[0.8rem] text-muted-foreground">
                    Введите телефон водителя
                  </div> */}
                </div>
              </div>
              <span className="text-muted-foreground pb-2">
                Обращайте внимания на данные, которые вводите в поля формы, ведь
                в дальнейшем они будут важны для составления реестров и
                отчетности
              </span>
              <div className="flex  gap-2 w-full">
                <AddFlightBtn />
                <Button
                  size="sm"
                  variant="outline"
                  type="submit"
                  className="w-full"
                  onClick={triggerFormSubmit}
                >
                  <Save />
                  Сохранить
                </Button>
              </div>
            </form>
          </div>

          <div>
            {formData.cars.length === 0 ? (
              <AddFlightPlug />
            ) : (
              <div className="space-y-2 max-h-[750px] pr-2 overflow-y-auto">
                {formData.cars.map((car, index) => (
                  <CarFlightItem
                    key={`${index}-${car.numberCar}-${car.numberTrailer}`}
                    car={car}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Поставить на рейс</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
