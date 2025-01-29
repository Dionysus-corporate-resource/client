import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { PackagePlus } from "lucide-react";
import { renderToString } from "react-dom/server";
import { IBookingDto } from "@/shared/model/types/booking";
import { BookingCard, SkeletonBookingCard } from "@/entities/booking";

import L from "leaflet";
import "leaflet.markercluster";

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
        iconSize: 18,
      };
    }
    return {
      backgroundColor: "rgba(82, 139, 239, 0.9)",
      backgroundColorOut: "rgba(82, 139, 239, 0.3)",
      sizeX: count > 1 ? "48px" : "28px",
      sizeY: count > 1 ? "30px" : "28px",
      sizeOutX: count > 1 ? "58px" : "38px",
      sizeOutY: count > 1 ? "40px" : "38px",
      iconSize: 18,
    };
  };

  const style = getStyle(count);

  return (
    <div
      style={{
        backgroundColor: style.backgroundColorOut,
        // padding: "6px",
        width: style.sizeOutX,
        height: style.sizeOutY,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        transform: "scale(1)",
        borderRadius: "6px",
      }}
    >
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
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          transform: "scale(1)",
          cursor: "pointer",
        }}
        className="hover:scale-110 hover:shadow-lg"
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
        <PackagePlus
          size={style.iconSize}
          color="white"
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

export default function MapPage({
  bookingData,
  isPending,
}: {
  bookingData: IBookingDto[] | undefined;
  isPending: boolean;
}) {
  const groupedPlaces =
    bookingData?.reduce(
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

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col gap-4 pr-1 overflow-y-auto max-h-[calc(100vh-15rem)] scroll-smooth p-1">
        {isPending
          ? Array.from({ length: 10 }).map((_, index) => (
              <SkeletonBookingCard key={index} />
            ))
          : bookingData?.map((booking, index) => (
              <BookingCard
                key={booking._id}
                orderNumber={index + 1}
                booking={booking}
                bookingDetailSlot={
                  <BookingDetailSheet bookingId={booking?._id} />
                }
              />
            ))}
      </div>

      <div className="col-span-3 md:h-[400px] lg:h-[675px]">
        <MapContainer
          center={[55.75, 37.57]}
          zoom={4}
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
                  <div>
                    <h3>Количество заявок: {group.places.length}</h3>
                    {group.places.map((place) => (
                      <div key={place._id} className="mt-2">
                        <p>ID: {place._id}</p>
                        <p>Описание: {place?.basicInfo?.culture}</p>{" "}
                        {/* Замените на нужное поле */}
                        {place._id !==
                          group.places[group.places.length - 1]._id && <hr />}
                      </div>
                    ))}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
}
