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
import { Separator } from "@/components/ui/separator";
import { queryClient } from "@/shared/api/query-client";
import { bookingQueryOptions } from "@/pages/home/api/query-options";
import { options } from "../create-booking/create-booking-form";
import { SelectShared } from "../shared/select-shared";
import { Text } from "@gravity-ui/uikit";
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

  useEffect(() => {
    if (data) {
      setFormData({
        icon: data?.generalInformation?.icon || "🌽",
        relevance: data?.generalInformation?.relevance || true,
        cargoName: data?.generalInformation?.cargoName || "",
        cargoAmount: data?.generalInformation?.cargoAmount || 0,
        loadingLocation: data?.location?.loadingLocation || "",
        unloadingLocation: data?.location?.unloadingLocation || "",
        loadingLocationDate: data?.location?.loadingLocationDate || "",
        distance: data?.location?.distance || 0,
        price: data?.terms?.price || 0,
        paymentMethod: data?.terms?.paymentMethod || "NDS",
        percentage: data?.terms?.advance?.percentage || 0,
        period: data?.terms?.advance?.period || "loading",
        loadingType: data?.terms?.loadingType || "normal",
        carType: data?.requiredTransport?.carType || "Любые_машины",
        carTypeUnLoading: data?.requiredTransport?.carTypeUnLoading || "Любая",
        carHeightLimit: data?.requiredTransport?.carHeightLimit || 0,
        count: data?.requiredTransport?.carUsage?.count || 0,
        carPeriod:
          data?.requiredTransport?.carUsage?.carPeriod || "Каждый_день",
        additionalInfo: data?.additionalInfo || "",
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
