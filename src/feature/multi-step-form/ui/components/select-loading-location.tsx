import { useState } from "react";
import {
  cityesLocations,
  IRegion,
  District,
  City,
  Village,
} from "@/shared/lib/cityes";
import { Label } from "@/shared/components/ui/label";
import { FormData } from "@/feature/edit-booking-multi-step-form/model/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

export default function LocationSelector({
  updateFormData,
  formData,
}: {
  updateFormData: (stepData: Partial<FormData>) => void;
  formData: FormData;
}) {
  const [selectedRegion, setSelectedRegion] = useState<IRegion | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = useState<
    City | Village | null
  >(null);

  // Обработчик выбора региона
  const handleRegionChange = (regionSelect: IRegion) => {
    const region =
      cityesLocations.find((r) => r.region === regionSelect.region) || null;
    setSelectedRegion(region);
    console.log("selectedLocation - ", selectedLocation);
    setSelectedDistrict(region?.districts[0] || null);
    setSelectedLocation(null);

    if (!region) return null;

    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: region.districts[0].name,
          coordinates: region.districts[0].coordinates,
        },
      },
    });
  };

  // Обработчик выбора района
  const handleDistrictChange = (districtSelect: District) => {
    const district =
      selectedRegion?.districts.find((d) => d.name === districtSelect.name) ||
      null;
    setSelectedDistrict(district);
    setSelectedLocation(null);

    if (!district) return;

    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: district.name,
          coordinates: district.coordinates,
        },
      },
    });
  };

  // Обработчик выбора города или села
  const handleLocationChange = (cityOrVillage: City | Village) => {
    const name = cityOrVillage.name;
    const city = selectedDistrict?.cities?.find((c) => c.name === name);
    const village = selectedDistrict?.villages?.find((v) => v.name === name);
    setSelectedLocation(city || village || null);

    if (city) {
      updateFormData({
        basicInfo: {
          ...formData.basicInfo,
          loadingLocation: {
            name: city.name,
            coordinates: city.coordinates,
          },
        },
      });
    } else if (village) {
      updateFormData({
        basicInfo: {
          ...formData.basicInfo,
          loadingLocation: {
            name: village.name,
            coordinates: village.coordinates,
          },
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {/* <h2>Выбранно: {formData?.basicInfo?.loadingLocation?.name}</h2> */}

      {/* Выбор региона */}
      <Select
        value={selectedRegion?.region}
        onValueChange={(value) => {
          const region = cityesLocations.find((r) => r.region === value);
          if (region) handleRegionChange(region);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Выберите регион" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Регионы России</SelectLabel>
            {cityesLocations.map((region) => (
              <SelectItem value={region.region}>{region.region}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Выбор района */}
      {selectedRegion && (
        <div className="space-y-1">
          <Label>Район:</Label>

          <Select
            value={selectedDistrict?.name}
            onValueChange={(value) => {
              const district = selectedRegion.districts.find(
                (d) => d.name === value,
              );
              if (district) handleDistrictChange(district);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Выберите регион" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Районы в {selectedRegion.region}</SelectLabel>
                {selectedRegion.districts.map((district) => (
                  <SelectItem value={district.name}>{district.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Выбор города или села */}
      {selectedDistrict &&
        (!!selectedDistrict.cities || !!selectedDistrict.villages) && (
          <div className="space-y-1">
            <Label>Город / Село:</Label>
            <Select
              onValueChange={(value) => {
                const cities = selectedDistrict.cities?.find(
                  (c) => c.name === value,
                );
                const village = selectedDistrict.villages?.find(
                  (v) => v.name === value,
                );
                if (cities) handleLocationChange(cities);
                else if (village) handleLocationChange(village);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите населенный пункт" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Населенные пункты в {selectedDistrict?.name}
                  </SelectLabel>
                  {selectedDistrict.cities?.map((city) => (
                    <SelectItem value={city.name}>{city.name}</SelectItem>
                  ))}
                  {selectedDistrict.villages?.map((village) => (
                    <SelectItem value={village.name}>{village.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
    </div>
  );
}
