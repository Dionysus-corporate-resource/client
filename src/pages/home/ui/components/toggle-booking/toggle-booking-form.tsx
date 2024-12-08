import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input, Input as TextInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IBooking, IBookingFormData } from "@/shared/model/types/booking";
import { bookingApi } from "@/pages/home/api/booking-api";
import { queryClient } from "@/shared/api/query-client";
import { bookingQueryOptions } from "@/pages/home/api/query-options";
import { options } from "../create-booking/create-booking-form";
import { SelectShared } from "../shared/select-shared";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  ArrowDownWideNarrow,
  CreditCard,
  Hash,
  Loader,
  Percent,
  Repeat,
  Ruler,
  TruckIcon,
  Calendar,
  Navigation,
  MapPin,
  Weight,
  Smile,
  FileText,
} from "lucide-react";

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
      advancePercentage: data.advancePercentage,
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

export default function ToogleBookingForm({
  bookingId,
}: {
  bookingId: string;
}) {
  const { data } = useQuery(bookingQueryOptions.getOne(bookingId));

  const toggleBookingMutation = useMutation({
    mutationFn: (formDataMutate: IBooking) =>
      bookingApi.toggle(bookingId, formDataMutate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] });
    },
  });

  const [formData, setFormData] = useState<IBookingFormData>({
    icon: "🌾",
    relevance: true,
    cargoName: "",
    cargoAmount: 0,
    loadingLocation: "",
    unloadingLocation: "",
    distance: 0,
    price: 0,
    paymentMethod: "NDS",
    loadingLocationDate: "",
    advancePercentage: 0,
    loadingType: "normal",
    carType: "Любые_машины",
    carTypeUnLoading: "Любая",
    carHeightLimit: undefined,
    count: 0,
    carPeriod: "Каждый_день",
    additionalInfo: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        icon: data.corporateBookingData?.generalInformation?.icon || "🌾",
        relevance:
          data.corporateBookingData?.generalInformation?.relevance || true,
        cargoName:
          data.corporateBookingData?.generalInformation?.cargoName || "",
        cargoAmount:
          data.corporateBookingData?.generalInformation?.cargoAmount || 0,
        loadingLocation:
          data.corporateBookingData?.location?.loadingLocation || "",
        unloadingLocation:
          data?.corporateBookingData.location?.unloadingLocation || "",
        loadingLocationDate:
          data.corporateBookingData?.location?.loadingLocationDate || "",
        distance: data.corporateBookingData?.location?.distance || 0,
        price: data.corporateBookingData?.terms?.price || 0,
        paymentMethod: data?.corporateBookingData.terms?.paymentMethod || "NDS",
        advancePercentage:
          data.corporateBookingData?.terms?.advancePercentage || 0,
        loadingType: data.corporateBookingData?.terms?.loadingType || "normal",
        carType:
          data.corporateBookingData?.requiredTransport?.carType ||
          "Любые_машины",
        carTypeUnLoading:
          data.corporateBookingData?.requiredTransport?.carTypeUnLoading ||
          "Любая",
        carHeightLimit:
          data.corporateBookingData?.requiredTransport?.carHeightLimit || 0,
        count:
          data.corporateBookingData?.requiredTransport?.carUsage?.count || 0,
        carPeriod:
          data.corporateBookingData?.requiredTransport?.carUsage?.carPeriod ||
          "Каждый_день",
        additionalInfo: data.corporateBookingData?.additionalInfo || "",
      });
    }
  }, [data]);

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

    toggleBookingMutation.mutate(booking, {
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
                      htmlFor="advancePercentage"
                      className="text-muted-foreground flex items-center gap-2"
                    >
                      <Percent className="h-4 w-4" />
                      Аванс (%)
                    </Label>
                    <TextInput
                      // label="Аванс"
                      id="advancePercentage"
                      name="advancePercentage"
                      placeholder="30%"
                      type="number"
                      value={formData.advancePercentage}
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
            Изменить
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
