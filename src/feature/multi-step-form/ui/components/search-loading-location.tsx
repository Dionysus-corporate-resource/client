import { Input } from "@/shared/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { FormData } from "../../model/types";
import instance from "@/shared/model/api/axios-instance";

type IPlace = {
  formatted: string;
  geometry: { lat: number; lng: number };
};

export default function SearchLoadingLocation({
  updateFormData,
  formData,
}: {
  updateFormData: (stepData: Partial<FormData>) => void;
  formData: FormData;
}) {
  const [suggestions, setSuggestions] = useState<
    { label: string; lat: number; lng: number }[]
  >([]);
  const [activeSearch, setActiveSearch] = useState(false);
  const lastQuery = useRef(""); // Для отслеживания последнего запроса
  const controller = useRef<AbortController | null>(null); // Для отмены предыдущих запросов

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (
        formData?.basicInfo?.loadingLocation?.name &&
        formData?.basicInfo?.loadingLocation?.name.length > 2
      ) {
        // Проверяем, что запрос отличается от последнего
        if (lastQuery.current !== formData?.basicInfo?.loadingLocation?.name) {
          lastQuery.current = formData?.basicInfo?.loadingLocation?.name;
          fetchLocations(formData?.basicInfo?.loadingLocation?.name);
        }
      }
    }, 1000); // ⏳ Ждем 1000 мс перед запросом

    return () => clearTimeout(delayDebounceFn);
  }, [formData?.basicInfo?.loadingLocation?.name]);

  const fetchLocations = async (query: string) => {
    console.log("Запрос на получение возможных мест");

    // Если уже был запрос, отменяем его
    if (controller.current) {
      controller.current.abort();
    }

    try {
      // Создаем новый AbortController для нового запроса
      controller.current = new AbortController();

      const response = await instance.get(`/geocode/${query}`, {
        signal: controller.current.signal,
      });

      const data = await response.data;
      console.log(data);

      setSuggestions(
        data.results.map((place: IPlace) => ({
          label: place.formatted,
          lat: place.geometry.lat,
          lng: place.geometry.lng,
        })),
      );
    } catch (error) {
      console.error("Ошибка при запросе данных", error);
    }
  };

  const handleSelect = (location: {
    label: string;
    lat: number;
    lng: number;
  }) => {
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: location.label,
          coordinates: [location.lat, location.lng],
        },
      },
    });
    setSuggestions([]);
    setActiveSearch(false);
  };

  return (
    <div className="">
      <Input
        type="text"
        value={formData.basicInfo.loadingLocation.name}
        onClick={() => setActiveSearch(true)}
        onChange={(e) => {
          updateFormData({
            basicInfo: {
              ...formData.basicInfo,
              loadingLocation: {
                name: e.target.value,
                coordinates: formData.basicInfo.loadingLocation.coordinates,
              },
            },
          });
        }}
        placeholder="Введите место..."
        className="border p-2 w-full"
      />
      {suggestions.length > 0 && activeSearch && (
        <ul className="border bg-white shadow-md rounded-md mt-1">
          {suggestions.map((place, index) => (
            <>
              <li
                key={place.label + index}
                className="p-2 cursor-pointer hover:bg-muted"
                onClick={() => handleSelect(place)}
              >
                {place.label}
              </li>
              <div className="border-b" />
            </>
          ))}
        </ul>
      )}
    </div>
  );
}
