import { ChangeEvent } from "react";
import { Input } from "@/shared//components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { FormStepProps } from "../../model/types";

import MapSelector from "../map-selector";
import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/lib/utils";

// type FlattenedItem = {
//   name: string;
//   coordinates: [number, number];
//   type: "district" | "city" | "village";
// };

// type RegionWithLocation = {
//   region: string;
//   location: FlattenedItem[];
// };

// Функция для преобразования одного региона в нужный формат
// function flattenRegion(region: IRegion): RegionWithLocation {
//   const location: FlattenedItem[] = [];

//   // Проходим по районам
//   region.districts.forEach((district) => {
//     location.push({
//       name: district.name,
//       coordinates: district.coordinates,
//       type: "district",
//     });

//     // Добавляем деревни в районе
//     district.villages?.forEach((village) => {
//       location.push({
//         name: village.name,
//         coordinates: village.coordinates,
//         type: "village",
//       });
//     });

//     // Проходим по городам в районе
//     district.cities?.forEach((city) => {
//       location.push({
//         name: city.name,
//         coordinates: city.coordinates,
//         type: "city",
//       });

//       // Проходим по деревням в городе
//       city.villages?.forEach((village) => {
//         location.push({
//           name: village.name,
//           coordinates: village.coordinates,
//           type: "village",
//         });
//       });
//     });
//   });

//   // Если в регионе есть отдельные города
//   region.city?.forEach((city) => {
//     location.push({
//       name: city.name,
//       coordinates: city.coordinates,
//       type: "city",
//     });

//     city.villages?.forEach((village) => {
//       location.push({
//         name: village.name,
//         coordinates: village.coordinates,
//         type: "village",
//       });
//     });
//   });

//   return {
//     region: region.region,
//     location: location,
//   };
// }

// Функция для обработки массива регионов
// function flattenRegions(regions: IRegion[]): RegionWithLocation[] {
//   return regions.map(flattenRegion);
// }
export function BasicInfoStep({
  formData,
  updateFormData,

  // onNext,
}: FormStepProps) {
  // const [open, setOpen] = useState(false);
  // const [errors] = useState<Record<string, string>>({});

  // const [selectedLocation, setSelectedLocation] = useState<ILocation | null>(
  //   null,
  // );
  // console.log("selectedLocation", selectedLocation);

  // const handleSelect = (value: ILocation) => {
  //   setSelectedLocation(value);
  //   setOpen(false);

  //   updateFormData({
  //     basicInfo: {
  //       ...formData.basicInfo,
  //       loadingLocation: {
  //         name: value?.name,
  //         coordinates: value?.coordinates,
  //       },
  //     },
  //   });
  // };

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

  // const [search, setSearch] = useState("");
  // const filteredLocations = (
  //   addresses: RegionWithLocation,
  // ): RegionWithLocation["location"] => {
  //   if (!search) return addresses.location; // Если поиск пустой, возвращаем все адреса

  //   return addresses.location.filter((location) =>
  //     location.name.toLowerCase().includes(search.toLowerCase()),
  //   );
  // };

  return (
    <div
      className="grid rounded-lg
       xl:pt-6 grid-cols-1  xl:grid-cols-3 lg:gap-6 items-start space-y-6 xl:space-y-0"
    >
      {/* Карта */}
      <div className="h-full md col-span-2">
        <MapSelector
          formData={formData}
          // coordinates={coordinates}
        />
      </div>

      {/* Поля формы */}
      <div
        className="grid grid-cols-1 w-full h-fit gap-6
        ex:px-2"
      >
        {/* Место погрузки */}
        <div className="space-y-2">
          <Label
            htmlFor="loadingLocation"
            className="flex items-end justify-between"
          >
            Место погрузки
          </Label>
          <Input disabled value={formData?.basicInfo?.loadingLocation?.name} />
        </div>

        {/* Расстояние */}
        <div className="space-y-2">
          <Label
            htmlFor="distance"
            className="flex items-end justify-between"
            // ex:text-xs"
          >
            Расстояние (км)
            <Badge
              variant="secondary"
              className={cn(
                "hidden",
                !formData?.basicInfo?.distance &&
                  "block text-red-400 bg-red-50",
              )}
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
            Тоннаж (тонн)
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
            Место выгрузки{" "}
            <Badge
              variant="secondary"
              className={cn(
                "hidden",
                !formData?.basicInfo?.unLoadingLocation &&
                  "block text-red-400 bg-red-50",
              )}
              // ex:text-xs"
            >
              Обязательное поле
            </Badge>
          </Label>
          <Input
            id="unLoadingLocation"
            disabled
            placeholder="Укажите место выгрузки"
            value={formData.basicInfo?.unLoadingLocation || ""}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="culture" className="flex items-end justify-between">
            Культура{" "}
            <Badge
              variant="secondary"
              className={cn(
                "hidden",
                !formData?.basicInfo?.culture && "block text-red-400 bg-red-50",
              )}
            >
              Обязательное поле
            </Badge>
          </Label>
          <Input
            id="culture"
            placeholder="Укажите культуру"
            disabled
            value={formData.basicInfo?.culture}
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

// <Popover open={open} onOpenChange={setOpen}>
//   <PopoverTrigger asChild>
//     <Button
//       variant="outline"
//       role="combobox"
//       aria-expanded={open}
//       className="w-full justify-between"
//       // ex:text-xs"
//     >
//       Выбрано: {formData?.basicInfo?.loadingLocation?.name}
//       {/* {selectedLocation?.name} */}
//       <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//     </Button>
//   </PopoverTrigger>
//   <PopoverContent className="w-full p-0" align="start">
//     <Command className="z-[9999]">
//       <CommandInput
//         placeholder="Type a command or search..."
//         className="z-[9999]"
//         onValueChange={setSearch}
//       />
//       <CommandList className="z-[9999]">
//         <CommandEmpty>Нет результатов</CommandEmpty>
//         {cityesLocations.map((region) => {
//           const filtered = filteredLocations(flattenRegion(region));
//           if (filtered.length === 0) return null;

//           return (
//             <>
//               <CommandGroup
//                 key={region.region}
//                 heading={region.region}
//               >
//                 {filtered.map((location) => (
//                   <CommandItem
//                     key={location.name}
//                     onSelect={() => handleSelect(location)}
//                   >
//                     <Check
//                       className={cn(
//                         "mr-2 h-4 w-4",
//                         formData?.basicInfo?.loadingLocation
//                           ?.name === location.name
//                           ? "opacity-100"
//                           : "opacity-0",
//                       )}
//                     />
//                     {location.name}
//                   </CommandItem>
//                 ))}
//               </CommandGroup>
//               <CommandSeparator />
//             </>
//           );
//         })}
//       </CommandList>
//     </Command>
//   </PopoverContent>
// </Popover>
