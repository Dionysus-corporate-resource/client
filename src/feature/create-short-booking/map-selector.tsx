import "leaflet/dist/leaflet.css";
import { Map, Placemark, YMaps } from "@pbe/react-yandex-maps";
import { useEffect, useState } from "react";
import { TBasicInfo } from "@/shared/model/types/booking";

type Props = {
  setCoordinates?: (e: [number, number] | null) => void;
  formData: TBasicInfo;
};

export default function MapSelector({ setCoordinates, formData }: Props) {
  const defaultPosition: [number, number] = formData?.loadingLocation
    ?.coordinates || [55.75, 37.57];
  // console.log("позиция изменилась", defaultPosition);

  const [center, setCenter] = useState<[number, number]>(
    formData?.loadingLocation?.coordinates || [55.75, 37.57],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (formData?.loadingLocation?.coordinates) {
        setCenter(formData?.loadingLocation.coordinates);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [formData?.loadingLocation?.coordinates]);

  const handleMapClick = (event: ymaps.IEvent) => {
    const coords = event.get("coords");
    if (setCoordinates) setCoordinates(coords);

    // console.log("Координаты клика:", coords);
    // console.log("event", event);
  };

  return (
    <div className="w-full h-full">
      <YMaps
        query={{
          apikey: "e7f81961-a083-48fe-b94f-914620e7d372",
          lang: "ru_RU",
          // load: "package.full",
          suggest_apikey: "b53c7cf5-43b8-4331-9d4f-06db83c2ce5a",
        }}
      >
        <Map
          style={{ width: "100%" }}
          // className="relative ex:h-[200px] h-[calc(100vh-450px)] rounded-md overflow-hidden"
          className="w-full h-full"
          defaultState={{ center: defaultPosition, zoom: 5 }}
          state={{
            center,
            zoom: 5,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
          onClick={handleMapClick}
        >
          <Placemark
            geometry={defaultPosition}
            options={{
              preset: "twirl#blueIcon",
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
}
