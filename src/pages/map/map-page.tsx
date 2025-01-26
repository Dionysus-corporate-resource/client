import BookingCard from "@/entities/booking/ui/booking-card";
import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MapPin } from "lucide-react";
import { renderToString } from "react-dom/server";
import { IBookingDto } from "@/shared/model/types/booking";

const CustomMarkerIcon = ({ count }: { count: number }) => {
  const getStyle = (count: number) => {
    if (count > 10) {
      return {
        backgroundColor: "#FF5252", // Красный для большого количества
        size: "48px",
        iconSize: 20,
      };
    }
    if (count > 5) {
      return {
        backgroundColor: "#FFB74D", // Оранжевый для среднего
        size: "44px",
        iconSize: 18,
      };
    }
    return {
      backgroundColor: "#4A90E2", // Синий для малого
      size: count > 1 ? "44px" : "34px",
      iconSize: 18,
    };
  };

  const style = getStyle(count);

  if (count > 1) {
    return (
      <div
        style={{
          backgroundColor: style.backgroundColor,
          width: style.size,
          height: style.size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          color: "white",
          fontWeight: "600",
          flexDirection: "row",
          gap: "4px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          border: "2px solid rgba(255, 255, 255, 0.8)",
          transition: "all 0.2s ease-in-out",
          padding: "8px",
          backdropFilter: "blur(4px)",
        }}
        className="hover:scale-110 marker-pulse"
      >
        <span
          style={{
            fontSize: `${parseInt(style.size) / 3}px`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "0.5px",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          {count}
        </span>
        <MapPin
          size={style.iconSize}
          color="white"
          style={{
            filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
          }}
        />
      </div>
    );
  }

  // Для одиночного маркера
  return (
    <div
      style={{
        backgroundColor: style.backgroundColor,
        width: style.size,
        height: style.size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        border: "2px solid rgba(255, 255, 255, 0.8)",
        transition: "all 0.2s ease-in-out",
        transform: "translateY(-2px)",
      }}
      className="hover:scale-110"
    >
      <MapPin
        size={style.iconSize}
        color="white"
        style={{
          filter: "drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1))",
        }}
      />
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
}: {
  bookingData: IBookingDto[] | undefined;
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
      <div className="flex flex-col gap-4 pr-2 overflow-y-auto max-h-[calc(100vh-15rem)] scroll-smooth">
        {bookingData?.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            bookingDetailSlot={<BookingDetailSheet />}
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
