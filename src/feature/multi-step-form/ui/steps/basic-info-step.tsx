import { useState } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  // CommandSeparator,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { cityesLocations } from "@/shared/lib/cityes";
import { Checkbox } from "@/shared/components/ui/checkbox";
import MapSelector from "../map-selector";

type IAdressLocation = {
  name: string;
  coordinates: [number, number];
};

export function BasicInfoStep({
  formData,
  updateFormData,
  isViewMap,
  setIsViewMap,
  // onNext,
}: FormStepProps) {
  const [open, setOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  // const [errors] = useState<Record<string, string>>({});

  const [selectedLocation, setSelectedLocation] =
    useState<IAdressLocation | null>(null);
  console.log("selectedLocation", selectedLocation);

  const setCoordinatesHandle = (e: [number, number] | null) => {
    console.log("setCoordinatesHandle", e);
    setCoordinates(e);
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: formData.basicInfo.loadingLocation.name,
          coordinates: e,
        },
      },
    });
  };

  const handleSelect = (value: IAdressLocation) => {
    setSelectedLocation(value);
    setOpen(false);
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: value?.name,
          coordinates: value?.coordinates,
        },
      },
    });
  };

  const [search, setSearch] = useState("");

  const filteredLocations = (addresses: IAdressLocation[]) => {
    if (!search) return addresses; // Если поиск пустой, возвращаем все адреса
    return addresses.filter((location) =>
      location.name.toLowerCase().includes(search.toLowerCase()),
    );
  };

  return (
    <div className="grid gap-4 p-4 rounded-lg grid-cols-2 ">
      {/* Левая колонка с формой */}
      <div className="grid gap-4 grid-cols-1 h-fit ">
        {/* Место погрузки */}
        <div className="space-y-2">
          <Label
            htmlFor="loadingLocation"
            className="flex items-center justify-between"
          >
            <span>Место погрузки *</span>
            <div className="flex items-center space-x-2 mr-2">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Ввести место погрузки вручную
              </label>
              <Checkbox
                checked={isViewMap}
                onCheckedChange={(checked) => {
                  if (setIsViewMap) {
                    // проверяем что setIsViewMap существует
                    setIsViewMap(Boolean(checked));
                  }
                }}
              />
            </div>
          </Label>

          {!isViewMap ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  Выбрано: {formData?.basicInfo?.loadingLocation?.name}
                  {/* {selectedLocation?.name} */}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command className="z-[9999]">
                  <CommandInput
                    placeholder="Type a command or search..."
                    className="z-[9999]"
                    onValueChange={setSearch}
                  />
                  <CommandList className="z-[9999]">
                    <CommandEmpty>No results found.</CommandEmpty>
                    {cityesLocations.map((city) => {
                      const filtered = filteredLocations(city.adress);
                      if (filtered.length === 0) return null;

                      return (
                        <>
                          <CommandGroup key={city.region} heading={city.region}>
                            {filtered.map((location) => (
                              <CommandItem
                                key={location.name}
                                onSelect={() => handleSelect(location)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData?.basicInfo?.loadingLocation
                                      ?.name === location.name
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {location.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                          <CommandSeparator />
                        </>
                      );
                    })}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <Input
                placeholder="Введите место погрузки"
                value={formData?.basicInfo?.loadingLocation?.name}
                onChange={(e) =>
                  updateFormData({
                    basicInfo: {
                      ...formData.basicInfo,
                      loadingLocation: {
                        name: e.target.value,
                        coordinates: coordinates,
                      },
                    },
                  })
                }
              />
              {!formData?.basicInfo?.loadingLocation?.coordinates && (
                <p className="mt-1 text-sm text-red-500">
                  Пожалуйста, выберите точку на карте.
                </p>
              )}
            </>
          )}
        </div>

        {/* Другие поля формы */}
        <div>
          <Label htmlFor="distance">Расстояние *</Label>
          <Input
            id="distance"
            placeholder="Укажите расстояние"
            value={formData.basicInfo?.distance}
            type="number"
            onChange={(e) =>
              updateFormData({
                basicInfo: {
                  ...formData.basicInfo,
                  distance: Number(e.target.value),
                },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tonnage">Тоннаж *</Label>
          <Input
            id="tonnage"
            placeholder="Укажите тоннаж"
            value={formData.basicInfo?.tonnage}
            type="number"
            onChange={(e) =>
              updateFormData({
                basicInfo: {
                  ...formData.basicInfo,
                  tonnage: Number(e.target.value),
                },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unLoadingLocation">Место выгрузки *</Label>
          <Input
            id="unLoadingLocation"
            placeholder="Укажите место выгрузки"
            value={formData.basicInfo?.unLoadingLocation || ""}
            onChange={(e) =>
              updateFormData({
                basicInfo: {
                  ...formData.basicInfo,
                  unLoadingLocation: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="culture">Культура *</Label>
          <Input
            id="culture"
            placeholder="Укажите культуру"
            value={formData.basicInfo?.culture || ""}
            onChange={(e) =>
              updateFormData({
                basicInfo: { ...formData.basicInfo, culture: e.target.value },
              })
            }
          />
        </div>
      </div>

      {/* Правая колонка с картой */}

      <div className="h-full">
        <MapSelector
          formData={formData}
          setCoordinates={setCoordinatesHandle}
          // coordinates={coordinates}
        />
      </div>
    </div>
  );
}

// const handleNext = () => {
//   const newErrors: Record<string, string> = {};
//   if (!formData.basicInfo?.firstName) {
//     newErrors.firstName = "First name is required";
//   }
//   if (!formData.basicInfo?.lastName) {
//     newErrors.lastName = "Last name is required";
//   }
//   if (!formData.basicInfo?.email) {
//     newErrors.email = "Email is required";
//   }

//   if (Object.keys(newErrors).length === 0) {
//     onNext();
//   } else {
//     setErrors(newErrors);
//   }
// };
