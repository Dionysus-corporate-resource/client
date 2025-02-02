import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { ArrowUpRight, Package } from "lucide-react";
import { renderToString } from "react-dom/server";
import { IBookingDto } from "@/shared/model/types/booking";
import {
  BookingCard,
  MarkerBookingDetailShort,
  SkeletonBookingCard,
} from "@/entities/booking";

import L from "leaflet";
import "leaflet.markercluster";
import { Button } from "@/shared/components/ui/button";

import { useAtomValue } from "jotai";
import { isMapViewFullAtom, sortbookingAtom } from "../model/sort-atom";
import { cn } from "@/shared/lib/utils";

const createClusterIcon = (cluster: unknown) => {
  const count = (cluster as { getChildCount: () => number }).getChildCount();
  let size = "50px";
  let backgroundColor = "rgba(82, 139, 239, 0.8)"; // Синий цвет по умолчанию
  let backgroundColorOut = "rgba(82, 139, 239, 0.3)";
  const textColor = "white";
  let sizeOut = "38px";

  if (count > 10) {
    size = "28px";
    sizeOut = "38px";
    backgroundColor = "rgba(255, 100, 100, 0.9)";
    backgroundColorOut = "rgba(255, 100, 100, 0.3)";
  } else if (count > 5) {
    size = "28px";
    sizeOut = "38px";
    backgroundColor = "rgba(255, 170, 80, 0.9)";
    backgroundColorOut = "rgba(255, 170, 80, 0.3)";
  } else {
    size = "28px";
    sizeOut = "38px";
    backgroundColor = "rgba(82, 139, 239, 0.9)";
    backgroundColorOut = "rgba(82, 139, 239, 0.3)";
  }

  return L.divIcon({
    html: `
    <div style="
      border-radius: 50%;
      padding: 4px;
      background: ${backgroundColorOut};
      width: ${sizeOut};
      height: ${sizeOut};
      display: flex;
      align-items: center;
      justify-content: center;
    ">
    <div style="
      width: ${size};
      height: ${size};
      background: ${backgroundColor};
      color: ${textColor};
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 12px;
      font-weight: bold;
    ">
      ${count}
    </div>
    </div>
    `,
    className: "custom-cluster-icon", // Убедитесь, что вы сбросили стандартные классы
    iconSize: [parseInt(size), parseInt(size)], // Задаем размер иконки
  });
};

const CustomMarkerIcon = ({ count }: { count: number }) => {
  const getStyle = (count: number) => {
    if (count > 8) {
      return {
        backgroundColor: "rgba(255, 100, 100, 0.9)",
        backgroundColorOut: "rgba(255, 100, 100, 0.3)",
        sizeX: count > 1 ? "48px" : "28px",
        sizeY: count > 1 ? "30px" : "28px",
        sizeOutX: count > 1 ? "58px" : "38px",
        sizeOutY: count > 1 ? "40px" : "38px",
        rightX: count > 1 ? "-23px" : "-2px",
        bottomX: count > 1 ? "-5px" : "-4px",
        iconSize: 20,
      };
    }
    if (count > 3) {
      return {
        backgroundColor: "rgba(255, 170, 80, 0.9)",
        backgroundColorOut: "rgba(255, 170, 80, 0.3)",
        sizeX: count > 1 ? "48px" : "28px",
        sizeY: count > 1 ? "30px" : "28px",
        sizeOutX: count > 1 ? "58px" : "38px",
        sizeOutY: count > 1 ? "40px" : "38px",
        rightX: count > 1 ? "-23px" : "-2px",
        bottomX: count > 1 ? "-5px" : "-4px",
        iconSize: 18,
      };
    }
    return {
      backgroundColor: "rgba(82, 139, 239, 0.9)",
      backgroundColorOut: "rgba(82, 139, 239, 0.3)",
      sizeX: count > 1 ? "48px" : "28px",
      sizeY: count > 1 ? "30px" : "28px",
      sizeOutX: count > 1 ? "58px" : "36px",
      sizeOutY: count > 1 ? "40px" : "36px",
      rightX: count > 1 ? "-23px" : "-2px",
      bottomX: count > 1 ? "-5px" : "-4px",
      iconSize: 18,
    };
  };

  const style = getStyle(count);

  return (
    <div className="relative">
      <div
        style={{
          backgroundColor: style.backgroundColorOut,
          // padding: "6px",
          width: style.sizeX,
          height: style.sizeY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: "scale(1)",
          borderRadius: "600px",
        }}
        className="absolute animate-ping"
      ></div>
      <div
        style={{
          backgroundColor: style.backgroundColorOut,

          width: style.sizeOutX,
          height: style.sizeOutY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: "scale(1)",
          right: style.rightX,
          bottom: style.bottomX,
          borderRadius: "600px",
        }}
        className="absolute "
      ></div>
      <div
        style={{
          backgroundColor: style.backgroundColor,
          width: style.sizeX,
          height: style.sizeY,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6000px",
          color: "white",
          fontWeight: "600",
          backdropFilter: "blur(8px)", // Эффект стекла
          border: "2px solid hsla(var(--muted-foreground), 0.5)", // Лёгкая окантовка
          // transition: "transform 0.3s ease, box-shadow 0.3s ease",
          // transform: "scale(1)",
          cursor: "pointer",
        }}
        className="relative hover:scale-95 hover:shadow-lg"
      >
        {count > 1 ? (
          <span
            style={{
              fontSize: `${parseInt(style.sizeY) / 3}px`,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "0.5px",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
              marginRight: "6px",
            }}
          >
            {count}
          </span>
        ) : null}
        {/* // Box, PackagePlus, ArrowBigDownDash */}
        <Package
          size={style.iconSize}
          color="white"
          className="animate-"
          style={{
            filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))",
          }}
        />
      </div>
    </div>
  );
};

const createCustomIcon = (count: number) => {
  return divIcon({
    html: renderToString(<CustomMarkerIcon count={count} />),
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function MapPage() {
  const isMapViewFull = useAtomValue(isMapViewFullAtom);
  const sortBooking = useAtomValue(sortbookingAtom);

  // Фильтруем заявки по статусу "active" ДЛЯ КАРТЫ ЧИСТО
  const filterBooking = sortBooking?.filter(
    (booking) => booking?.status === "active",
  );

  const groupedPlaces =
    filterBooking?.reduce(
      (acc, place) => {
        // Получаем координаты
        const coordinates = place?.basicInfo?.loadingLocation?.coordinates;

        // Проверяем, что координаты существуют и имеют правильный формат
        if (!coordinates || coordinates.length !== 2) {
          return acc;
        }

        // Создаем ключ из координат
        const key = coordinates.join(",");

        // Если ключа еще нет в acc, создаем его
        if (!acc[key]) {
          acc[key] = {
            coordinates,
            places: [], // Храним оригинальные объекты place
          };
        }

        // Добавляем place в массив
        acc[key].places.push(place);

        return acc;
      },
      {} as Record<
        string,
        { coordinates: [number, number]; places: IBookingDto[] }
      >,
    ) || {}; // Если bookingData undefined, возвращаем пустой объект
  if (!sortBooking) return <div>Загрузка...</div>;
  return (
    <div
      className={cn(
        "grid grid-cols-8 gap-2 max-h-[calc(100vh-0px)]",
        isMapViewFull && "grid-cols-1",
      )}
    >
      <div
        className={cn(
          "col-span-6 h-[calc(100vh-240px)] border rounded-lg",
          isMapViewFull && "col-span-1",
        )}
      >
        {isMapViewFull && (
          <MapContainer
            center={[55.75, 37.57]}
            zoom={isMapViewFull ? 5 : 4}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
            className="leaflet-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <MarkerClusterGroup
              chunkedLoading
              maxClusterRadius={60}
              spiderfyOnMaxZoom={true}
              showCoverageOnHover={false}
              iconCreateFunction={createClusterIcon}
            >
              {Object.values(groupedPlaces).map((group, index) => (
                <Marker
                  key={index}
                  position={group.coordinates as [number, number]}
                  icon={createCustomIcon(group.places.length)}
                >
                  <Popup>
                    <MarkerBookingDetailShort group={group} />
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        )}
        {!isMapViewFull && (
          <MapContainer
            center={[55.75, 37.57]}
            zoom={isMapViewFull ? 4 : 4}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "8px",
            }}
            className="leaflet-container"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <MarkerClusterGroup
              chunkedLoading
              maxClusterRadius={60}
              spiderfyOnMaxZoom={true}
              showCoverageOnHover={false}
              iconCreateFunction={createClusterIcon}
            >
              {Object.values(groupedPlaces).map((group, index) => (
                <Marker
                  key={index}
                  position={group.coordinates as [number, number]}
                  icon={createCustomIcon(group.places.length)}
                >
                  <Popup>
                    <MarkerBookingDetailShort group={group} />
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        )}
      </div>
      <div
        className={cn(
          "col-span-2 flex flex-col gap-4 pr-2 pl-4 pt-4 rounded-lg pb-4 bg-primary/0 overflow-y-auto max-h-[calc(100vh-240px)]",
          isMapViewFull && "hidden",
        )}
      >
        <span className="font-normal text-sm text-muted-foreground">
          Всего заявок: {filterBooking?.length} шт.
        </span>
        {!sortBooking
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonBookingCard key={index} />
            ))
          : sortBooking?.map((booking, index) => (
              <BookingCard
                key={booking._id}
                orderNumber={index + 1}
                booking={booking}
                bookingDetailSlot={
                  <BookingDetailSheet
                    bookingId={booking?._id}
                    actionSlot={
                      <Button
                        variant="secondary"
                        // className="bg-[hsl(var(--access-primary))] text-white "
                      >
                        Подробнее
                        {/* <ArrowRight className="w-4 h-4 ml-2" /> */}
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </Button>
                    }
                  />
                }
              />
            ))}
      </div>
    </div>
  );
}
