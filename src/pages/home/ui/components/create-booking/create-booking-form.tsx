import { useState } from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { IBooking, IBookingFormData } from "@/shared/model/types/booking";
import { bookingApi } from "@/pages/home/api/booking-api";
import { queryClient } from "@/shared/api/query-client";
//
// import { Button, Label } from "@gravity-ui/uikit";
// import { TextInput } from "@gravity-ui/uikit";
// import { Select } from "@gravity-ui/uikit";
import { Text } from "@gravity-ui/uikit";
import { TextArea } from "@gravity-ui/uikit";
import { Button } from "@/components/ui/button";
import { Input, Input as TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectShared } from "../shared/select-shared";
import { Separator } from "@/components/ui/separator";

const mapFormDataToBid = (data: IBookingFormData): IBooking => {
  return {
    generalInformation: {
      relevance: data.relevance,
      cargoName: data.cargoName,
      cargoAmount: data.cargoAmount,
      icon: data.icon,
    },
    location: {
      loadingLocation: data.loadingLocation,
      loadingLocationDate: data.loadingLocationDate,
      unloadingLocation: data.unloadingLocation,
      distance: data.distance,
    },
    terms: {
      price: data.price,
      paymentMethod: data.paymentMethod,
      advance: {
        percentage: data.percentage,
        period: data.period,
      },
      loadingType: data.loadingType,
    },
    requiredTransport: {
      carType: data.carType,
      carTypeUnLoading: data.carTypeUnLoading,
      carHeightLimit: data.carHeightLimit,
      carUsage: {
        count: data.count,
        carPeriod: data.carPeriod,
      },
    },
    additionalInfo: data.additionalInfo,
  };
};

export const options = {
  icons: {
    label: "Иконки",
    array: [
      {
        value: "🌽",
        option: "🌽",
      },
      {
        value: "🛢️",
        option: "🛢️",
      },
      {
        value: "🥦",
        option: "🥦",
      },
    ],
  },
  paymentMethod: {
    label: "Оплата",
    array: [
      {
        value: "NDS",
        option: "НДС",
      },
      {
        value: "without_NDS",
        option: "Без НДС",
      },
      {
        value: "cash",
        option: "Наличка",
      },
    ],
  },
  loadingType: {
    label: "Погрузка",
    array: [
      {
        value: "normal",
        option: "По норме",
      },
      {
        value: "full",
        option: "По полной",
      },
    ],
  },
  period: {
    label: "Аванс",
    array: [
      {
        value: "loading",
        option: "При погрузке",
      },
      {
        value: "un_loading",
        option: "При выгрузке",
      },
    ],
  },
  carPeriod: {
    label: "Машины на",
    array: [
      {
        value: "Каждый_день",
        option: "Каждый день",
      },
      {
        value: "Общее",
        option: "Весь объем",
      },
    ],
  },
  carType: {
    label: "Тип машины",
    array: [
      {
        value: "Самосвал",
        option: "Самосвал",
      },
      {
        value: "Танар",
        option: "Танар",
      },
      {
        value: "Полу_прицеп",
        option: "Полу прицеп",
      },
      {
        value: "Сцепка",
        option: "Сцепка",
      },
      {
        value: "Любые_машины",
        option: "Любые машины",
      },
    ],
  },
  carTypeUnLoading: {
    label: "Тип выгрузки",
    array: [
      {
        value: "Боковая",
        option: "Боковая",
      },
      {
        value: "Задняя",
        option: "Задняя",
      },
      {
        value: "На_правый_бок",
        option: "На правый бок",
      },
      {
        value: "На_левый_бок",
        option: "На левый бок",
      },
      {
        value: "Задняя_самосвальная",
        option: "Задняя самосвальная",
      },
      {
        value: "Боковая_самосвальная",
        option: "Боковая самосвальная",
      },
      {
        value: "Любая",
        option: "Любая",
      },
    ],
  },
};

export default function CreateBookingForm() {
  const createBidMutation = useMutation({
    mutationFn: (formDataMutate: IBooking) => bookingApi.create(formDataMutate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast({
        title: "Форма отправлена",
        description: "Заявка создана, поздравляю!",
      });
      // setOpen((prev) => !prev);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
      toast({
        title: "Ошибка",
        description: "Не удалось создать заявку(",
        variant: "destructive",
      });
    },
  });

  const [formData, setFormData] = useState<IBookingFormData>({
    icon: "🌽",
    relevance: true,
    cargoName: "",
    cargoAmount: 0,
    loadingLocation: "",
    unloadingLocation: "",
    distance: 0,
    price: 0,
    paymentMethod: "NDS",
    loadingLocationDate: "",
    percentage: 0,
    period: "loading",
    loadingType: "normal",
    carType: "Любые_машины",
    carTypeUnLoading: "Любая",
    carHeightLimit: undefined,
    count: 0,
    carPeriod: "Каждый_день",
    additionalInfo: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const booking = mapFormDataToBid(formData);
    console.log("Create Data", booking);
    createBidMutation.mutate(booking, {
      onSuccess: () => {
        setFormData({
          icon: "",
          relevance: true,
          cargoName: "",
          cargoAmount: 0,
          loadingLocation: "",
          unloadingLocation: "",
          distance: 0,
          price: 0,
          paymentMethod: "NDS",
          loadingLocationDate: "",
          percentage: 0,
          period: "loading",
          loadingType: "normal",
          carType: [],
          carTypeUnLoading: [],
          carHeightLimit: undefined,
          count: 0,
          carPeriod: "Каждый_день",
          additionalInfo: "",
        });
      },
    });
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto rounded-xl flex-col justify-between h-fit">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Создание заявки</CardTitle>
        <CardDescription>
          Заполните форму для создания карточки груза
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-screen-sm"
      >
        <CardContent>
          <div className="grid grid-cols-1 justify-between gap-8">
            <div className="space-y-4">
              {/* <Text variant="subheader-2">Информация о грузе</Text> */}
              <Label className="text-base">Основная информация</Label>
              <Separator className="mb-2" />
              {/* <Separator className="mb-2" /> */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <SelectShared
                    options={options.icons}
                    handleSelectChange={handleSelectChange}
                    formDataValue={formData.icon}
                    name="icon"
                    className="w-[150px]"
                  />

                  <Input
                    id="cargoName"
                    name="cargoName"
                    placeholder="Например: Жмых"
                    value={formData.cargoName}
                    onChange={handleChange}
                  />

                  <TextInput
                    // label="Вес"
                    id="cargoAmount"
                    name="cargoAmount"
                    type="number"
                    placeholder="Например: 500"
                    value={formData.cargoAmount}
                    onChange={handleChange}
                    // size="l"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Label className="text-base">Перевозка</Label>
              <Separator className="mb-2" />
              {/* <Separator className="mb-2" /> */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <TextInput
                    // label="Погрузка"
                    id="loadingLocation"
                    name="loadingLocation"
                    placeholder="Ростов-на-Дону"
                    value={formData.loadingLocation}
                    onChange={handleChange}
                    // size="l"
                  />

                  <TextInput
                    // label="Выгрузка"
                    id="unloadingLocation"
                    name="unloadingLocation"
                    placeholder="Тальяти"
                    value={formData.unloadingLocation}
                    onChange={handleChange}
                    // size="l"
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <TextInput
                    // label="Дистанция"
                    id="distance"
                    name="distance"
                    placeholder="300 km"
                    value={formData.distance}
                    onChange={handleChange}
                    // size="l"
                  />

                  <TextInput
                    // label="Дата погрузки"
                    id="loadingLocationDate"
                    name="loadingLocationDate"
                    placeholder="20 марта 2024"
                    value={formData.loadingLocationDate}
                    onChange={handleChange}
                    // size="l"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Text variant="subheader-2">Условия перевозки</Text>
              {/* <Separator className="mb-2" /> */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <TextInput
                    // label="Ставка"
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    // size="l"
                  />

                  <SelectShared
                    options={options.paymentMethod}
                    handleSelectChange={handleSelectChange}
                    formDataValue={formData.paymentMethod}
                    name="paymentMethod"
                  />

                  <SelectShared
                    options={options.loadingType}
                    handleSelectChange={handleSelectChange}
                    formDataValue={formData.loadingType}
                    name="loadingType"
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <TextInput
                    // label="Аванс"
                    id="percentage"
                    name="percentage"
                    placeholder="30%"
                    type="number"
                    value={formData.percentage}
                    onChange={handleChange}
                    // size="l"
                  />

                  <SelectShared
                    options={options.period}
                    handleSelectChange={handleSelectChange}
                    formDataValue={formData.period}
                    name="period"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Text variant="subheader-2">Требования к транспорту</Text>
              {/* <Separator className="mb-2" /> */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <SelectShared
                    options={options.carType}
                    handleSelectChange={handleSelectChange}
                    formDataValue={formData.carType}
                    name="carType"
                  />

                  <SelectShared
                    options={options.carTypeUnLoading}
                    handleSelectChange={handleSelectChange}
                    formDataValue={formData.carTypeUnLoading}
                    name="carTypeUnLoading"
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <TextInput
                    // label="Возможность погрузки транспорта"
                    id="count"
                    name="count"
                    type="number"
                    placeholder="5 машин"
                    value={formData.count}
                    onChange={handleChange}
                    // rightContent={<Label size="s">Важно</Label>}
                    // size="l"
                  />

                  <SelectShared
                    options={options.carPeriod}
                    handleSelectChange={handleSelectChange}
                    formDataValue={formData.carPeriod}
                    name="carPeriod"
                  />

                  <TextInput
                    id="carHeightLimit"
                    name="carHeightLimit"
                    type="number"
                    placeholder="до 3.2м"
                    value={formData.carHeightLimit}
                    onChange={handleChange}
                    // size="l"
                  />
                </div>
                <TextArea
                  placeholder="Дополнительная информация"
                  id="additionalInfo"
                  name="additionalInfo"
                  size="xl"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  // size="l"
                />
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
