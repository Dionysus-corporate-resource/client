import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { MapPin, DollarSign, Info } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { IBooking, IBookingFormData } from "@/shared/model/types/booking";
import { bookingApi } from "@/pages/home/api/booking-api";
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/shared/api/query-client";

const mapFormDataToBid = (data: IBookingFormData): IBooking => {
  return {
    relevance: data.relevance,
    cargoName: data.cargoName,
    cargoAmount: data.cargoAmount,
    loadType: data.loadType,
    location: {
      loadingLocation: data.loadingLocation,
      unloadingLocation: data.unloadingLocation,
      distance: data.distance,
    },
    terms: {
      price: data.price,
      paymentMethod: data.paymentMethod,
      truckType: data.truckType,
    },
    advance: {
      percentage: data.percentage,
    },
    additionalInfo: data.additionalInfo,
  };
};

export default function CreateBookingDialog() {
  const createBidMutation = useMutation({
    mutationFn: (formDataMutate: IBooking) => bookingApi.create(formDataMutate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });

  const [formData, setFormData] = useState<IBookingFormData>({
    relevance: true,
    cargoName: "",
    cargoAmount: 0,
    loadType: "normal",
    loadingLocation: "",
    unloadingLocation: "",
    distance: 0,
    price: 0,
    paymentMethod: "NDS",
    truckType: "",
    percentage: 0,
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const booking = mapFormDataToBid(formData);

    createBidMutation.mutate(booking, {
      onSuccess: () => {
        toast({
          title: "Форма отправлена",
          description: "Данные о грузе успешно сохранены.",
        });
        queryClient.invalidateQueries({ queryKey: ["booking"] });
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ["booking"] });
        toast({
          title: "Ошибка",
          description: "Не удалось сохранить данные о грузе.",
        });
      },
    });
  };

  return (
    <div className="mx-auto rounded-xl flex-col justify-between h-fit">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Информация о грузе</CardTitle>
        <CardDescription>
          Заполните форму для создания карточки груза
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <CardContent className="flex flex-col gap-2">
          <div className="flex justify-between gap-8">
            <div className="flex flex-col w-full gap-2">
              <Label className="text-base">Основная информация</Label>
              <Separator className="mb-2" />
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                  <div className="space-y-1">
                    <Label
                      htmlFor="cargoName"
                      className="text-sm text-muted-foreground"
                    >
                      Название груза
                    </Label>
                    <Input
                      id="cargoName"
                      name="cargoName"
                      placeholder="Например: Жмых"
                      value={formData.cargoName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label
                      htmlFor="cargoAmount"
                      className="text-sm text-muted-foreground"
                    >
                      Количество груза
                    </Label>
                    <Input
                      id="cargoAmount"
                      name="cargoAmount"
                      type="number"
                      placeholder="Например: 500"
                      value={formData.cargoAmount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex gap-4 w-full">
                  <div className="space-y-1 w-full">
                    <Label
                      htmlFor="truckType"
                      className="text-sm text-muted-foreground"
                    >
                      Тип требуемых машин
                    </Label>
                    <div className="flex">
                      {/* <Truck className="w-4 h-4 mr-2 text-muted-foreground self-center" /> */}
                      <Input
                        id="truckType"
                        name="truckType"
                        placeholder="Например: Только сцепки с задней выгрузкой"
                        value={formData.truckType}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="loadType"
                      className="text-sm text-muted-foreground"
                    >
                      Тип загрузки
                    </Label>
                    <Select
                      name="loadType"
                      value={formData.loadType}
                      onValueChange={(value) =>
                        handleSelectChange("loadType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип загрузки" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">По норме</SelectItem>
                        <SelectItem value="full">По полной</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-2">
              <Label className="text-base">Условия перевозки</Label>
              <Separator className="mb-2" />

              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="price"
                      className="text-sm text-muted-foreground"
                    >
                      Цена (₽/т)
                    </Label>
                    <div className="flex">
                      <DollarSign className="w-4 h-4 mr-2 text-muted-foreground self-center" />
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Например: 1000"
                        value={formData.price}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="paymentMethod"
                      className="text-sm text-muted-foreground"
                    >
                      Способ оплаты
                    </Label>
                    <Select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onValueChange={(value) =>
                        handleSelectChange("paymentMethod", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите способ оплаты" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Наличные</SelectItem>
                        <SelectItem value="NDS">с НДС</SelectItem>
                        <SelectItem value="without NDS">без НДС</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="additionalInfo"
                    className="text-sm text-muted-foreground"
                  >
                    Дополнительная информация
                  </Label>
                  <div className="flex">
                    <Info className="w-4 h-4 mr-2 text-muted-foreground self-start mt-2" />
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      placeholder="Например: АВАНС 50% ПРИ ПОГРУЗКЕ"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-6 w-full">
            <div className="flex flex-col gap-2 w-full">
              <Label className="text-base">Маршрут</Label>
              <Separator className="mb-2" />

              <div className="flex gap-4 w-full">
                <div className="space-y-1 w-full">
                  <Label
                    htmlFor="loadingLocation"
                    className="text-sm text-muted-foreground"
                  >
                    Место погрузки
                  </Label>
                  <div className="flex">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground self-center" />
                    <Input
                      id="loadingLocation"
                      name="loadingLocation"
                      placeholder="Например: Михайловка"
                      value={formData.loadingLocation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="space-y-1 w-full">
                  <Label
                    htmlFor="unloadingLocation"
                    className="text-sm text-muted-foreground"
                  >
                    Место разгрузки
                  </Label>
                  <div className="flex">
                    <MapPin className="w-4 h-4 mr-2 text-muted-foreground self-center" />
                    <Input
                      id="unloadingLocation"
                      name="unloadingLocation"
                      placeholder="Например: Качалино"
                      value={formData.unloadingLocation}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 space-y-1 w-full">
                  <Label
                    htmlFor="distance"
                    className="text-sm text-muted-foreground"
                  >
                    Расстояние (в км)
                  </Label>
                  <Input
                    id="distance"
                    name="distance"
                    type="number"
                    placeholder="Например: 147"
                    value={formData.distance}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit" className="w-full h-fit">
            {/* {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Отправка..." : "Отправить"} */}
            {/* disabled={isSubmitting} */}
            Создать
          </Button>
        </CardFooter>
      </form>
    </div>
  );
}

// function taxtCulc({ tax }: { tax: ITax }) {
//   switch (tax) {
//     case "NDS":
//       return <p>НДС</p>;
//     case "without NDS":
//       return <p>Без НДС</p>;
//     case "cash":
//       return <p>Наличкой</p>;
//     // case "NDS": return <p>НДС</p>
//     default:
//       return "Не известно";
//   }
// }
