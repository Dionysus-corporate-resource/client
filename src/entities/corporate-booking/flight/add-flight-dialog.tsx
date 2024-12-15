import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IBookingDto } from "@/shared/model/types/booking";
import AddFlightPlug from "./components/add-flight-plug";
import { Button } from "@/components/ui/button";
import { Phone, Save, Tag, User } from "lucide-react";
import { Label } from "@/components/ui/label";
import AddFlightBtn from "./components/add-flight-btn";
import { useState } from "react";
import CarFlightItem from "./components/car-flight-item";
import { useMutation } from "@tanstack/react-query";
import { flightApi } from "./api/flight-api";
import { toast } from "@/hooks/use-toast";
import { ICar } from "@/shared/model/types/company";

export type IFormData = {
  organization: string;
  cars: ICar[];
};

type Props = {
  corporateBooking: IBookingDto["corporateBookingData"];
  isOpen: boolean;
  setIsOpen: (value: boolean | ((prevState: boolean) => boolean)) => void;
};

export default function AddFlightDialog({
  isOpen,
  setIsOpen,
  corporateBooking,
}: Props) {
  const corporateBookingId = corporateBooking._id;
  const createFlightMutatuon = useMutation({
    mutationFn: ({
      corporateBookingId,
      formData,
    }: {
      corporateBookingId: IBookingDto["corporateBookingData"]["_id"];
      formData: IFormData;
    }) => flightApi.create({ corporateBookingId, body: formData }),
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Поставить машину на рейс</DialogTitle>
          <DialogDescription>
            Заполняем на кого будет оформляться договро, и добавляем машины
            снизу, <br /> так-же заполняя всю необходимую информацию
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 lg:w-[1100px]">
          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmitFormData} className="flex gap-2 h-fit">
              <Input
                value={formData.organization}
                onChange={handleChangeFormData}
                placeholder="ИП Михайлов"
                required
              />
              <Button size="sm" variant="outline" type="submit">
                Сохранить
                <Save />
              </Button>
            </form>
            {formData.cars.length === 0 ? (
              <AddFlightPlug />
            ) : (
              <div className="space-y-2 max-h-96 pr-2 overflow-y-auto">
                {formData.cars.map((car) => (
                  <CarFlightItem key={car.numberCar} car={car} />
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmitCarData} className="space-y-2">
            <div className="grid grid-cols-2 gap-4 p-2">
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
                <div className="text-[0.8rem] text-muted-foreground">
                  Введите номер машины
                </div>
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
                <div className="text-[0.8rem] text-muted-foreground">
                  Введите номер прицепа
                </div>
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
                <div className="text-[0.8rem] text-muted-foreground">
                  Введите ФИО водителя
                </div>
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
                <div className="text-[0.8rem] text-muted-foreground">
                  Введите телефон водителя
                </div>
              </div>
            </div>
            <AddFlightBtn />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
