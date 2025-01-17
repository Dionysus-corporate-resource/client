import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet"; // Добавьте этот импорт
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import BookingDetailSheet from "@/widgets/booking-detail/booking-detail-sheet";

export default function MapPage() {
  const centerPosition: LatLngExpression = [47.2357, 39.7015];
  const markers = [
    {
      position: [47.2313, 39.7233] as LatLngExpression,
      text: "2.8 ₽/кг",
      color: "rgb(108,145,201)",
    },
    {
      position: [47.242, 39.7233] as LatLngExpression,
      text: "2.8 ₽/кг",
      color: "rgb(108,145,201)",
    },
    {
      position: [47.2229, 39.7187] as LatLngExpression,
      text: "1.1 ₽/кг",
      color: "var(--accent-color)",
    },
  ];

  const createCustomIcon = (text: string, color: string) => {
    return L.divIcon({
      className: "custom-div-icon",
      html: `<div style="background-color: ${color}; width: max-content; padding: 4px 8px; border-radius: 8px; color: white; font-weight: bold;">${text}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <div className="md:h-[400px] lg:h-[600px]">
      <MapContainer
        center={centerPosition}
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: "8px",
          zIndex: "0",
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            icon={createCustomIcon(marker.text, marker.color)}
          >
            <Popup>
              <p>Dop info</p>
              <BookingDetailSheet />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

// Вы можете настроить масштаб карты (zoom), изменяя его значение:
// - zoom={10} - для обзора большей территории
// - zoom={13} - для обзора района
// - zoom={15} - для детального просмотра улиц
// - zoom={17} - для просмотра зданий
