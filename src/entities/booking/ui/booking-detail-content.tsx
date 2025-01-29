import {
  Building2,
  Calendar,
  Clock,
  FileText,
  Phone,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
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
import { useNavigate } from "react-router-dom";
import { IBookingDto } from "@/shared/model/types/booking";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { bookingQueryOption } from "@/pages/home/api/query-option";
import { useQuery } from "@tanstack/react-query";
// Создаем кастомную иконку
const customIcon = icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function getPaymentMethodLabel(
  paymentType: IBookingDto["detailTransportation"]["paymentType"],
) {
  switch (paymentType) {
    case "cash":
      return "Наличные";
    case "nds":
      return "НДС";
    case "without_nds":
      return "Без НДС";
    default:
      return "Уточнить";
  }
}

export default function BookingDetailContent({
  bookingId,
}: {
  bookingId: string;
}) {
  const { data: bookingData } = useQuery(bookingQueryOption.getOne(bookingId));
  const user = useAtomValue(userStorageAtom);
  const isMyBooking = bookingData?.user?._id === user?._id;
  console.log(user?._id, bookingData?.user?._id);
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl w-full">
      <div className="space-y-4">
        {/* Время создания */}
        <div className="flex items-center justify-between mt-1">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center text-sm text-muted-foreground">
                {/* <Clock className="w-4 h-4 mr-1" /> */}
                {new Date(bookingData?.createdAt as string).toLocaleTimeString(
                  "ru-RU",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  },
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
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
          <span className="text-xs text-muted-foreground">
            ID: {bookingData?._id.slice(Math.floor(bookingData._id.length / 2))}
          </span>
        </div>

        {/* Карта */}
        {bookingData?.basicInfo?.loadingLocation?.coordinates && (
          <div>
            <MapContainer
              center={bookingData?.basicInfo?.loadingLocation?.coordinates}
              zoom={4}
              style={{ height: "200px", width: "100%", borderRadius: "8px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />

              {bookingData?.basicInfo?.loadingLocation?.coordinates && (
                <Marker
                  position={bookingData.basicInfo.loadingLocation.coordinates}
                  icon={customIcon}
                />
              )}
            </MapContainer>
          </div>
        )}

        {/* Котакты */}
        <div>
          <div>
            <div className="space-y-2 ">
              {isMyBooking ? (
                bookingData?.additionalConditions?.contacts.map(
                  (contact, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg bg-muted transition-colors"
                    >
                      {/* <div className="h-9 w-9 rounded-md bg-white border flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div> */}
                      <div className="flex-1 min-w-0 ml-2">
                        <p className="text-sm font-medium truncate">
                          {contact.name}
                        </p>
                        {contact.phone && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{contact.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ),
                )
              ) : (
                <div className="p-4 space-y-4 rounded-lg bg-muted/50 text-muted-foreground">
                  <p>
                    Контакты недоступны, для просмотра необходимо оплатить
                    подписку
                  </p>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => navigate("/subscribe")}
                  >
                    <Sparkles className="w-4 h-4" />
                    Оплатить доступ
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

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
                      className="font-semibold bg-muted/50"
                      colSpan={4}
                    >
                      Основная информация
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Место погрузки
                    </TableCell>
                    <TableCell className="text-end">
                      {bookingData?.basicInfo?.loadingLocation.name
                        ? bookingData?.basicInfo?.loadingLocation.name
                        : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Место выгрузки
                    </TableCell>
                    <TableCell className="text-end">
                      {bookingData?.basicInfo?.unLoadingLocation
                        ? bookingData?.basicInfo?.unLoadingLocation
                        : "-"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Расстояние</TableCell>
                    <TableCell className="text-end">
                      {bookingData?.basicInfo?.distance ? (
                        <>{bookingData?.basicInfo?.distance} км</>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ценна</TableCell>
                    <TableCell className="text-end">
                      {bookingData?.detailTransportation?.ratePerTon ? (
                        <>{bookingData?.detailTransportation?.ratePerTon} ₽/т</>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-medium">
                      Объем перевозки
                    </TableCell>
                    <TableCell className="text-end">
                      {bookingData?.basicInfo?.tonnage ? (
                        <>{bookingData?.basicInfo?.tonnage} тонн</>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Груз</TableCell>
                    <TableCell className="text-end">
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
                      className="font-semibold bg-muted/50"
                      colSpan={4}
                    >
                      Условия погрузки
                    </TableCell>
                  </TableRow>
                  {bookingData?.conditionsTransportation?.loadingMethod && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Способ погрузки
                      </TableCell>
                      <TableCell className="text-end">
                        {bookingData?.conditionsTransportation?.loadingMethod}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.conditionsTransportation?.scaleCapacity && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Грузоподъемность весов
                      </TableCell>
                      <TableCell className="text-end">
                        {bookingData?.conditionsTransportation?.scaleCapacity}{" "}
                        тонн
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.conditionsTransportation?.loadingDate && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Дата начала погрузки
                      </TableCell>
                      <TableCell className="text-end">
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
                      className="font-semibold bg-muted/50"
                      colSpan={4}
                    >
                      Детали перевозки
                    </TableCell>
                  </TableRow>

                  {bookingData?.detailTransportation?.demurrage && (
                    <TableRow>
                      <TableCell className="font-medium">Простой</TableCell>
                      <TableCell className="text-end">
                        {bookingData?.detailTransportation?.demurrage}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.detailTransportation?.allowedShortage && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Допустимая недостача
                      </TableCell>
                      <TableCell className="text-end">
                        {bookingData?.detailTransportation?.allowedShortage}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.detailTransportation?.paymentType && (
                    <TableRow>
                      <TableCell className="font-medium">Вид оплаты</TableCell>
                      <TableCell className="text-end">
                        {getPaymentMethodLabel(
                          bookingData?.detailTransportation?.paymentType,
                        )}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.detailTransportation?.paymentDeadline && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Сроки оплаты
                      </TableCell>
                      <TableCell className="text-end">
                        {bookingData?.detailTransportation?.paymentDeadline}
                      </TableCell>
                    </TableRow>
                  )}

                  {bookingData?.additionalConditions?.additionalInformation && (
                    <TableRow>
                      <TableCell className="font-medium">
                        Дополнительная информация
                      </TableCell>
                      <TableCell className="text-end">
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
            <div className="mt-6 flex items-center gap-4 px-4 py-2 rounded-lg border bg-card">
              <div className="h-10 w-10 rounded-md bg-muted-foreground/5 border flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">
                    {bookingData?.user?.companyPublicData?.nameCompany}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  <span>{32} заявок</span>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 py-1 px-2"
              >
                <Star className="h-3.5 w-3.5 fill-primary" />
                {3.5}
              </Badge>
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
