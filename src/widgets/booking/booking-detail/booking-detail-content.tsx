import { bookingQueryOption } from "@/pages/home/api/query-option";
import { useQuery } from "@tanstack/react-query";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { Dispatch, SetStateAction } from "react";
import { LoadingType, PaymentType } from "@/shared/model/types/booking";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const formatPaymentType = (value: PaymentType) => {
  switch (value) {
    case "cash":
      return "Наличные";
    case "without_nds":
      return "Без НДС";
    case "nds":
      return "С НДС";
    case "nds_5":
      return "С НДС 5%";
    case "nds_10":
      return "С НДС 10%";
    case "nds_15":
      return "С НДС 15%";
    case "nds_20":
      return "С НДС 20%";
  }
};
const formatLoadingType = (value: LoadingType) => {
  switch (value) {
    case "normal":
      return "По норме";
    case "full":
      return "По полной";
  }
};

const formatPhoneNumber = (phone: string) => {
  return phone.replace(
    /^(8|7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
    "+7 ($2) $3-$4-$5",
  );
};

export default function BookingDetailContent({
  bookingId,
  onOpenChange,
}: {
  bookingId: string;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: bookingData } = useQuery(bookingQueryOption.getOne(bookingId));

  return (
    <div className="max-w-3xl w-full pb-8">
      <div className="space-y-8">
        {/* шапка */}
        <div className="bg-[#141414] text-background p-4 rounded-b-[30px]">
          {/* header */}
          <div className="w-full flex justify-between px-2 pt-2 items-start">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-medium">Детали заявки</span>
              <div className="flex items-center gap-2 text-base font-normal text-background/80">
                <span>
                  {new Date(
                    bookingData?.createdAt as string,
                  ).toLocaleTimeString("ru-RU", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                <span>
                  {new Date(
                    bookingData?.createdAt as string,
                  ).toLocaleDateString("ru-RU", {
                    day: "2-digit",
                    month: "long",
                  })}
                </span>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="py-4 px-6 bg-background text-[#141414] font-medium rounded-[30px]"
            >
              Закрыть
            </button>
          </div>
          {/* Карта */}
          <div>
            {bookingData?.basicInfo?.loadingLocation?.coordinates && (
              <div className="space-y-1">
                <span className="text-sm font-normal text-primary/60">
                  Место погрузки
                </span>

                <div className="rounded-[30px] overflow-hidden">
                  <YMaps
                    query={{
                      apikey: "e7f81961-a083-48fe-b94f-914620e7d372",
                      lang: "ru_RU",
                      // load: "package.full",
                      suggest_apikey: "b53c7cf5-43b8-4331-9d4f-06db83c2ce5a",
                    }}
                  >
                    <Map
                      style={{
                        height: "350px",
                        width: "100%",
                        borderRadius: "30px",
                      }}
                      className="relative"
                      defaultState={{
                        center: bookingData?.basicInfo?.loadingLocation
                          ?.coordinates ?? [47.222109, 39.718813],
                        zoom: 5,
                      }}
                    >
                      <Placemark
                        key={bookingData._id}
                        geometry={
                          bookingData?.basicInfo?.loadingLocation
                            ?.coordinates ?? [47.222109, 39.718813]
                        }
                        options={{
                          preset: "twirl#blueIcon", // Пресет с синим значком
                        }}
                      />
                    </Map>
                  </YMaps>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* content */}
        <div className="px-8 space-y-8">
          {/* контакты */}
          <div className="flex flex-col gap-3">
            <span className="font-medium tex-base text-primary/40">
              Контакты
            </span>

            <div className="flex flex-col gap-1 p-6 rounded-[30px] bg-muted transition-colors">
              <p className="text-lg font-medium truncate text-primary/80">
                {bookingData?.basicInfo?.contact?.name}
              </p>
              <span className="text-xl font-medium">
                {bookingData?.basicInfo?.contact?.phone &&
                  formatPhoneNumber(bookingData?.basicInfo?.contact?.phone)}
              </span>
            </div>
          </div>

          {/* таблица */}
          <div className="w-full flex flex-col gap-4">
            <span className="text-base font-medium text-primary/40">
              Основная информация
            </span>

            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-normal">Культура</p>
              <p className="text-xl font-medium max-w-sm">
                {bookingData?.basicInfo?.culture}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-normal">Погрузка</p>
              <p className="text-xl font-medium max-w-sm text-right">
                {bookingData?.basicInfo?.loadingLocation.name}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-normal">Выгрузка</p>
              <p className="text-xl font-medium max-w-sm">
                {bookingData?.basicInfo?.unLoadingLocation}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-normal">Расстояние</p>
              <p className="text-xl font-medium max-w-sm">
                {bookingData?.basicInfo?.distance}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-normal">Тоннаж</p>
              <p className="text-xl font-medium max-w-sm">
                {bookingData?.basicInfo?.tonnage ? (
                  <>{bookingData?.basicInfo?.tonnage} тонн</>
                ) : (
                  "-"
                )}
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-normal">Ставка</p>
              <p className="text-xl font-medium max-w-sm">
                {bookingData?.basicInfo?.ratePerTon} ₽/тонн
              </p>
            </div>

            <div className="w-full flex justify-between items-center">
              <p className="text-xl font-normal">Организация</p>
              <p className="text-xl font-medium max-w-sm">
                {bookingData?.basicInfo?.companyName}
              </p>
            </div>

            {bookingData?.additionalConditions?.loadingMethod && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Метод погрузки</p>
                <p className="text-xl font-medium max-w-sm">
                  {bookingData?.additionalConditions?.loadingMethod}
                </p>
              </div>
            )}

            {bookingData?.additionalConditions?.maxVehicleHeight && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Ограничения по высоте</p>
                <p className="text-xl font-medium max-w-sm">
                  {bookingData?.additionalConditions?.maxVehicleHeight}
                </p>
              </div>
            )}

            {bookingData?.additionalConditions?.vehicleType && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Какие машины подходят</p>
                <p className="text-xl font-medium max-w-sm">
                  {bookingData?.additionalConditions?.vehicleType}
                </p>
              </div>
            )}

            {bookingData?.additionalConditions?.unloadingType && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Тип выгрузки</p>
                <p className="text-xl font-medium max-w-sm">
                  {bookingData?.additionalConditions?.unloadingType}
                </p>
              </div>
            )}
            {bookingData?.additionalConditions?.estimatedLoadingDate && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Примерная дата погрузки</p>
                <p className="text-xl font-medium max-w-sm">
                  {bookingData?.additionalConditions?.estimatedLoadingDate &&
                    format(
                      new Date(
                        bookingData.additionalConditions.estimatedLoadingDate,
                      ),
                      "d MMMM HH:mm",
                      { locale: ru },
                    )}
                </p>
              </div>
            )}

            {bookingData?.additionalConditions?.paymentType && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Тип оплаты</p>
                <p className="text-xl font-medium max-w-sm">
                  {formatPaymentType(
                    bookingData?.additionalConditions?.paymentType,
                  )}
                </p>
              </div>
            )}

            {bookingData?.additionalConditions?.loadingType && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Как грузят</p>
                <p className="text-xl font-medium max-w-sm">
                  {formatLoadingType(
                    bookingData?.additionalConditions?.loadingType,
                  )}
                </p>
              </div>
            )}
            {bookingData?.additionalConditions?.isCharterNeeded && (
              <div className="w-full flex justify-between items-center">
                <p className="text-xl font-normal">Нужна хартия?</p>
                <p className="text-xl font-medium max-w-sm">
                  {bookingData?.additionalConditions?.isCharterNeeded === true
                    ? "Да"
                    : "Нет"}
                </p>
              </div>
            )}

            {bookingData?.additionalConditions?.additionalInformation && (
              <div className="w-full flex flex-col gap-4">
                <p className="text-xl font-normal">Доп. информация</p>
                <div className="w-full flex justify-end">
                  <p className="text-xl font-medium max-w-sm text-right">
                    {bookingData?.additionalConditions?.additionalInformation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
