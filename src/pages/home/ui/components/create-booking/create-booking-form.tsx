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
import { Button } from "@/components/ui/button";
import { Input, Input as TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectShared } from "../shared/select-shared";
import {
  ArrowDownWideNarrow,
  Calendar,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  Hash,
  Loader,
  MapPin,
  Navigation,
  Percent,
  Repeat,
  Ruler,
  Smile,
  TruckIcon,
  Weight,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="mx-auto rounded-xl flex-col justify-between h-fit ">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Создание заявки</CardTitle>
        <CardDescription>
          Заполните форму для создания карточки груза
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-screen-2xl"
      >
        <CardContent>
          <div className="grid grid-cols-2 justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center text-primary">
                {/* <Info className="h-5 w-5 mr-2" /> */}
                Общая информация
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-4 w-full">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Название заявки
                    </Label>
                    <Input
                      id="cargoName"
                      name="cargoName"
                      placeholder="Например: Жмых"
                      value={formData.cargoName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex gap-2 w-full">
                    <div className="space-y-2 w-full">
                      <Label
                        htmlFor="icon"
                        className="text-muted-foreground flex items-center gap-2"
                      >
                        <Smile className="h-4 w-4" />
                        Выберите смайлик
                      </Label>
                      <SelectShared
                        options={options.icons}
                        handleSelectChange={handleSelectChange}
                        formDataValue={formData.icon}
                        name="icon"
                        // className="w-[150px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="weight"
                        className="text-muted-foreground flex items-center gap-2"
                      >
                        <Weight className="h-4 w-4" />
                        Вес груза (тонн)
                      </Label>
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
                  <div className="space-y-2">
                    {/* <Label
                      htmlFor="additionalInfo"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Info className="h-4 w-4" />
                      Дополнительная информация
                    </Label> */}
                    <Textarea
                      placeholder="Дополнительная информация"
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      // size="l"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* <Separator /> */}

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center text-primary">
                {/* <Truck className="h-5 w-5 mr-2" /> */}
                Перевозка груза
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-full">
                  <div className="space-y-2">
                    <Label
                      htmlFor="loadAddress"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Адрес погрузки
                    </Label>
                    <TextInput
                      // label="Погрузка"
                      id="loadingLocation"
                      name="loadingLocation"
                      placeholder="Ростов-на-Дону"
                      value={formData.loadingLocation}
                      onChange={handleChange}
                      // size="l"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="unloadAddress"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4" />
                      Адрес разгрузки
                    </Label>
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
                </div>
                <div className="flex gap-2 w-full">
                  <div className="space-y-2">
                    <Label
                      htmlFor="distance"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Navigation className="h-4 w-4" />
                      Дистанция (км)
                    </Label>
                    <TextInput
                      // label="Дистанция"
                      id="distance"
                      name="distance"
                      placeholder="300 km"
                      value={formData.distance}
                      onChange={handleChange}
                      // size="l"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="loadDate"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Дата погрузки
                    </Label>
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
            </div>

            {/* <Separator /> */}

            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center text-primary">
                {/* <DollarSign className="h-5 w-5 mr-2" /> */}
                Условия перевозки
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 w-full">
                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="rate"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <DollarSign className="h-4 w-4" />
                      Ставка (р/т)
                    </Label>
                    <TextInput
                      // label="Ставка"
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      // size="l"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="paymentType"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <CreditCard className="h-4 w-4" />
                      Тип оплаты
                    </Label>
                    <SelectShared
                      options={options.paymentMethod}
                      handleSelectChange={handleSelectChange}
                      formDataValue={formData.paymentMethod}
                      name="paymentMethod"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="loadType"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Loader className="h-4 w-4" />
                      Тип погрузки
                    </Label>
                    <SelectShared
                      options={options.loadingType}
                      handleSelectChange={handleSelectChange}
                      formDataValue={formData.loadingType}
                      name="loadingType"
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="advance"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Percent className="h-4 w-4" />
                      Аванс (%)
                    </Label>
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
                  </div>

                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="advanceTime"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      Время получения аванса
                    </Label>
                    <SelectShared
                      options={options.period}
                      handleSelectChange={handleSelectChange}
                      formDataValue={formData.period}
                      name="period"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <Separator /> */}

            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center text-primary">
                {/* <MapPin className="h-5 w-5 mr-2" /> */}
                Требования к транспорту
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="vehicleType"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <TruckIcon className="h-4 w-4" />
                      Тип машины
                    </Label>
                    <SelectShared
                      options={options.carType}
                      handleSelectChange={handleSelectChange}
                      formDataValue={formData.carType}
                      name="carType"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="unloadType"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <ArrowDownWideNarrow className="h-4 w-4" />
                      Тип выгрузки
                    </Label>
                    <SelectShared
                      options={options.carTypeUnLoading}
                      handleSelectChange={handleSelectChange}
                      formDataValue={formData.carTypeUnLoading}
                      name="carTypeUnLoading"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex gap-2 w-full">
                  <div className="space-y-2">
                    <Label
                      htmlFor="vehicleCount"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Hash className="h-4 w-4" />
                      Кол-во тс
                    </Label>
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
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="transportNeed"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Repeat className="h-4 w-4" />
                      Период
                    </Label>
                    <SelectShared
                      options={options.carPeriod}
                      handleSelectChange={handleSelectChange}
                      formDataValue={formData.carPeriod}
                      name="carPeriod"
                    />
                  </div>

                  <div className="space-y-2 w-full">
                    <Label
                      htmlFor="heightLimit"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Ruler className="h-4 w-4" />
                      Высота ограничения
                    </Label>
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
