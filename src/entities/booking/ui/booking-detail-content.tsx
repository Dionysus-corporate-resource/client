import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { IBookingDto } from "@/shared/model/types/booking";
import { bookingQueryOption } from "@/pages/home/api/query-option";
import { useQuery } from "@tanstack/react-query";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";

function paymentType(type: IBookingDto["detailTransportation"]["paymentType"]) {
  switch (type) {
    case "cash":
      return "Наличными";
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
}
const formatPhoneNumber = (phone: string) => {
  return phone.replace(
    /^(8|7)(\d{3})(\d{3})(\d{2})(\d{2})$/,
    "+7 ($2) $3-$4-$5",
  );
};
export default function BookingDetailContent({
  bookingId,
}: {
  bookingId: string;
}) {
  const { data: bookingData } = useQuery(bookingQueryOption.getOne(bookingId));

  return (
    <div className="max-w-3xl w-full">
      <div className="space-y-4">
        {/* Время создания */}
        <div className="flex items-center justify-between mt-1">
          <div className="space-y-1">
            <div
              className="flex items-center gap-1
              ex:px-2"
            >
              <div className="flex items-center text-sm text-primary/80">
                {new Date(bookingData?.createdAt as string).toLocaleTimeString(
                  "ru-RU",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </div>
              <div className="flex items-center text-sm text-primary/80">
                {/* <Calendar className="w-4 h-4 mr-1" /> */}
                {new Date(bookingData?.createdAt as string).toLocaleDateString(
                  "ru-RU",
                  {
                    day: "2-digit",
                    month: "long",
                  },
                )}
              </div>
            </div>
          </div>
          <span className="text-xs text-muted-foreground"></span>
        </div>

        {/* Карта */}
        {bookingData?.basicInfo?.loadingLocation?.coordinates && (
          <div className="space-y-1">
            <span className="text-sm font-normal text-primary/60">
              Место погрузки
            </span>

            <div className="rounded-xl overflow-hidden">
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
                    height: "200px",
                    width: "100%",
                    borderRadius: "8px",
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
                      bookingData?.basicInfo?.loadingLocation?.coordinates ?? [
                        47.222109, 39.718813,
                      ]
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

        {bookingData?.additionalConditions?.contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl bg-muted transition-colors"
          >
            <div className="flex-1 min-w-0 ml-2">
              <p className="text-base font-normal truncate text-primary/60">
                {contact.name}
              </p>
              {contact.phone && (
                <span className="flex items-center gap-2 text-lg">
                  {formatPhoneNumber(contact.phone)}
                </span>
              )}
            </div>
          </div>
        ))}

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
            <TabsTrigger
              value="info"
              className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Информация
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              О Заказчике
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            <div className="space-y-6">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className="text-lg font-medium text-primary/80 bg-muted/50 px-4 py-4"
                      colSpan={4}
                    >
                      Основная информация
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-normal text-primary/60 text-sm p-3">
                      Место погрузки
                    </TableCell>
                    <TableCell className="text-end text-sm font-normal">
                      {bookingData?.basicInfo?.loadingLocation.name
                        ? bookingData?.basicInfo?.loadingLocation.name
                        : "-"}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-normal text-primary/60 text-sm p-3">
                      Место выгрузки
                    </TableCell>
                    <TableCell className="text-end text-sm font-normal">
                      {bookingData?.basicInfo?.unLoadingLocation
                        ? bookingData?.basicInfo?.unLoadingLocation
                        : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-normal text-primary/60 text-sm p-3">
                      Расстояние
                    </TableCell>
                    <TableCell className="text-end text-sm font-normal">
                      {bookingData?.basicInfo?.distance ? (
                        <>{bookingData?.basicInfo?.distance} км</>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-normal text-primary/60 text-sm p-3">
                      Ценна
                    </TableCell>
                    <TableCell className="text-end text-sm font-normal">
                      {bookingData?.detailTransportation?.ratePerTon ? (
                        <>{bookingData?.detailTransportation?.ratePerTon} ₽/т</>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-normal text-primary/60 text-sm p-3">
                      Объем перевозки
                    </TableCell>
                    <TableCell className="text-end text-sm font-normal">
                      {bookingData?.basicInfo?.tonnage ? (
                        <>{bookingData?.basicInfo?.tonnage} тонн</>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-normal text-primary/60 text-sm p-3">
                      Груз
                    </TableCell>
                    <TableCell className="text-end text-sm font-normal">
                      {bookingData?.basicInfo?.culture
                        ? bookingData?.basicInfo?.culture
                        : "-"}
                    </TableCell>
                  </TableRow>
                </TableBody>
                {/* Условия погрузки */}
                <TableBody>
                  <TableRow>
                    <TableCell
                      className="text-lg font-medium text-primary/80 bg-muted/50 px-4 py-4"
                      colSpan={4}
                    >
                      Условия погрузки
                    </TableCell>
                  </TableRow>
                  {bookingData?.conditionsTransportation?.loadingMethod && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Способ погрузки
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {bookingData?.conditionsTransportation?.loadingMethod}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.conditionsTransportation?.scaleCapacity && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Грузоподъемность весов
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {bookingData?.conditionsTransportation?.scaleCapacity}{" "}
                        тонн
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.conditionsTransportation?.loadingDate && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Дата начала погрузки
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {bookingData?.conditionsTransportation?.loadingDate
                          ? new Date(
                              bookingData?.conditionsTransportation?.loadingDate,
                            ).toLocaleDateString("ru-RU", {
                              day: "2-digit",
                              month: "long",
                            })
                          : "Уточнить"}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                {/* Детали перевозки */}
                <TableBody>
                  <TableRow>
                    <TableCell
                      className="text-lg font-medium text-primary/80 bg-muted/50 px-4 py-4"
                      colSpan={4}
                    >
                      Детали перевозки
                    </TableCell>
                  </TableRow>

                  {bookingData?.detailTransportation?.demurrage && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Простой
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {bookingData?.detailTransportation?.demurrage}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.detailTransportation?.allowedShortage && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Допустимая недостача
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {bookingData?.detailTransportation?.allowedShortage}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.detailTransportation?.paymentType && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Вид оплаты
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {paymentType(
                          bookingData?.detailTransportation?.paymentType,
                        )}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.detailTransportation?.paymentDeadline && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Сроки оплаты
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {bookingData?.detailTransportation?.paymentDeadline}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.additionalConditions?.additionalInformation && (
                    <TableRow>
                      <TableCell className="font-normal text-primary/60 text-sm p-3">
                        Дополнительная информация
                      </TableCell>
                      <TableCell className="text-end text-sm font-normal">
                        {
                          bookingData?.additionalConditions
                            ?.additionalInformation
                        }
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            {/* О компании */}
            <div className="flex flex-col p-3 mt-4">
              <p className="text-sm font-normal text-primary/60">Компния</p>
              <span className="text-lg">
                {bookingData?.companyPublicData?.nameCompany}
              </span>
            </div>
          </TabsContent>

          <TabsContent value="dialog">
            <div className="py-4 text-center text-muted-foreground">
              Диалог недоступен
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
