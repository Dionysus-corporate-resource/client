import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { renderToString } from "react-dom/server";
import { IBookingDto } from "@/shared/model/types/booking";
import { MarkerBookingDetailShort } from "@/entities/booking";

import L from "leaflet";
import "leaflet.markercluster";

import { useAtomValue } from "jotai";
import { sortbookingAtom } from "@/pages/home/model/sort-atom";

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

const CustomMarkerIcon = ({
  count,
  booking,
}: {
  count: number;
  booking: IBookingDto[];
}) => {
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
      sizeX: count > 1 ? "48px" : "36px",
      sizeY: count > 1 ? "30px" : "24px",
      sizeOutX: count > 1 ? "58px" : "44px",
      sizeOutY: count > 1 ? "40px" : "32px",
      rightX: count > 1 ? "-23px" : "-10px",
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
          borderRadius: "6px",
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
          borderRadius: "6px",
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
          borderRadius: "6px",
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
        <span className="text-xs">
          {booking[0]?.detailTransportation?.ratePerTon}
        </span>
        {/* <Package
          size={style.iconSize}
          color="white"
          className="animate-"
          style={{
            filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.2))",
          }}
        /> */}
      </div>
    </div>
  );
};

const createCustomIcon = (count: number, booking: IBookingDto[]) => {
  return divIcon({
    html: renderToString(<CustomMarkerIcon count={count} booking={booking} />),
    className: "custom-div-icon",
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export default function MapBackground() {
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
  // grid-cols-[448px_1fr]
  return (
    <MapContainer
      center={[55.75, 37.57]}
      zoom={4}
      style={{
        width: "100%",
        height: "100%",
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
            icon={createCustomIcon(group.places.length, group.places)}
          >
            <Popup>
              <MarkerBookingDetailShort group={group} />
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
