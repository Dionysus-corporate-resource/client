import { ChangeEvent, useState } from "react";
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
import { Badge } from "@/shared/components/ui/badge";

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
  console.log("coordinates", coordinates);
  // const [errors] = useState<Record<string, string>>({});

  const [selectedLocation, setSelectedLocation] =
    useState<IAdressLocation | null>(null);
  console.log("selectedLocation", selectedLocation);

  const setCoordinatesHandle = (e: [number, number] | null) => {
    // console.log("setCoordinatesHandle", e);
    setCoordinates(e);
    if (setIsViewMap) setIsViewMap(true);
    // updateFormData({
    //   basicInfo: {
    //     ...formData.basicInfo,
    //     loadingLocation: {
    //       name: formData.basicInfo.loadingLocation.name,
    //       coordinates: e,
    //     },
    //   },
    // });
    // сбрасываем значение, если он решил вводить его сам
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        loadingLocation: {
          name: "",
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const filteredValue = value.replace(/\D/g, "");
    updateFormData({
      basicInfo: {
        ...formData.basicInfo,
        [name]: filteredValue,
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
    <div
      className="grid space-y-6 rounded-lg
       xl:pt-6 grid-cols-1 lg:grid-cols-3 lg:gap-6"
    >
      {/* Карта */}
      <div className="h-full col-span-2">
        <MapSelector
          formData={formData}
          setCoordinates={setCoordinatesHandle}
          // coordinates={coordinates}
        />
      </div>

      {/* Поля формы */}
      <div
        className="grid gap-2 grid-cols-1 h-full w-full
        ex:px-2"
      >
        {/* Место погрузки */}
        <div className="space-y-2">
          <Label
            htmlFor="loadingLocation"
            className="flex items-end justify-between"
          >
            <div
              className="space-x-2"
              // ex:text-xs"
            >
              <span>Место погрузки *</span>
              {/* <Badge variant="secondary">Обязательное поле</Badge> */}
            </div>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="terms"
                className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70
                ex:text-xs text-sm"
              >
                Выбрать вручную
              </label>
              <Checkbox
                checked={isViewMap}
                onCheckedChange={(checked) => {
                  // сбрасываем значение, если он решил вводить его сам
                  if (checked) {
                    updateFormData({
                      basicInfo: {
                        ...formData.basicInfo,
                        loadingLocation: {
                          name: "",
                          coordinates: null,
                        },
                      },
                    });
                  } else {
                    updateFormData({
                      basicInfo: {
                        ...formData.basicInfo,
                        loadingLocation: {
                          name: "Майкопский Район",
                          coordinates: [44.6078, 40.1058],
                        },
                      },
                    });
                  }
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
                  // ex:text-xs"
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
                    <CommandEmpty>Нет результатов</CommandEmpty>
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
                        coordinates:
                          formData.basicInfo.loadingLocation?.coordinates,
                      },
                    },
                  })
                }
              />
              {!formData?.basicInfo?.loadingLocation?.coordinates && (
                <p
                  className="mt-1 text-sm text-red-500
                  ex:text-xs"
                >
                  Пожалуйста, выберите точку на карте.
                </p>
              )}
              {!formData?.basicInfo?.loadingLocation?.name && (
                <p
                  className="mt-1 text-sm text-red-500
                  ex:text-xs"
                >
                  Пожалуйста, введите место погрузки.
                </p>
              )}
            </>
          )}
        </div>

        {/* Расстояние */}
        <div className="space-y-2">
          <Label
            htmlFor="distance"
            className="flex items-end justify-between"
            // ex:text-xs"
          >
            Расстояние (км) *
            <Badge
              variant="secondary"
              className="text-muted-foreground"
              // ex:text-xs"
            >
              Обязательное поле
            </Badge>
          </Label>

          <Input
            id="distance"
            name="distance"
            placeholder="Укажите расстояние"
            value={formData.basicInfo?.distance}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="tonnage"
            className="flex items-end justify-between
            ex:text-xs"
          >
            Тоннаж (тонн) *
            {/* <Badge variant="outline" className="ml-2 text-muted-foreground">
              Желательное поле
            </Badge> */}
          </Label>
          <Input
            id="tonnage"
            name="tonnage"
            placeholder="Укажите тоннаж"
            value={formData.basicInfo?.tonnage}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="unLoadingLocation"
            className="flex items-end justify-between"
            // ex:text-xs"
          >
            Место выгрузки *{" "}
            <Badge
              variant="secondary"
              className="text-muted-foreground"
              // ex:text-xs"
            >
              Обязательное поле
            </Badge>
          </Label>
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
          <Label
            htmlFor="culture"
            className="flex items-end justify-between"
            // ex:text-xs"
          >
            Культура *{" "}
            <Badge
              variant="secondary"
              className="text-muted-foreground"
              // ex:text-xs"
            >
              Обязательное поле
            </Badge>
          </Label>
          <Input
            id="culture"
            placeholder="Укажите культуру"
            value={formData.basicInfo?.culture}
            onChange={(e) =>
              updateFormData({
                basicInfo: { ...formData.basicInfo, culture: e.target.value },
              })
            }
          />
        </div>
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
