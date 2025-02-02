import { useState, useEffect } from "react";
import { useSetAtom } from "jotai";
import { filterbookingAtom } from "@/pages/home/model/sort-atom";
import { IBookingDto } from "@/shared/model/types/booking";
import { Input } from "@/shared/components/ui/input";
import { ArrowDownRight, CornerRightUp, Package } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function FilterBookingPanel({
  filterBooking,
}: {
  filterBooking: IBookingDto[] | undefined;
}) {
  const [loadingLocationFilter, setLoadingLocationFilter] =
    useState<string>("");
  const [unLoadingLocationFilter, setUnLoadingLocationFilter] =
    useState<string>("");
  const [cultureFilter, setCultureFilter] = useState<string>("");
  const setFilteredBookings = useSetAtom(filterbookingAtom);

  // Эффект для фильтрации и обновления атома
  useEffect(() => {
    if (!filterBooking) return;

    const filteredBookings = filterBooking.filter((booking) => {
      const matchesLoadingLocation = booking.basicInfo.loadingLocation.name
        .toLowerCase()
        .includes(loadingLocationFilter.toLowerCase());

      const matchesUnLoadingLocation = booking.basicInfo.unLoadingLocation
        .toLowerCase()
        .includes(unLoadingLocationFilter.toLowerCase());

      const matchesCulture = booking.basicInfo.culture
        .toLowerCase()
        .includes(cultureFilter.toLowerCase());

      return (
        matchesLoadingLocation && matchesUnLoadingLocation && matchesCulture
      );
    });

    setFilteredBookings(filteredBookings);
  }, [
    filterBooking,
    loadingLocationFilter,
    unLoadingLocationFilter,
    cultureFilter,
    setFilteredBookings,
  ]);

  return (
    <div className="flex gap-2">
      <div className="relative">
        <Input
          type="text"
          value={loadingLocationFilter}
          onChange={(e) => setLoadingLocationFilter(e.target.value)}
          placeholder="Введите место загрузки"
          className="pl-8"
        />
        <ArrowDownRight className="absolute top-2.5 left-2.5  w-4 h-4 text-muted-foreground" />
      </div>

      {/* Поле для фильтрации по unLoadingLocation */}
      <div className="relative">
        <Input
          type="text"
          value={unLoadingLocationFilter}
          onChange={(e) => setUnLoadingLocationFilter(e.target.value)}
          placeholder="Введите место разгрузки"
          className="pl-8"
        />
        <CornerRightUp className="absolute top-2.5 left-2.5  w-4 h-4 text-muted-foreground" />
      </div>

      {/* Поле для фильтрации по culture */}
      <div className="relative">
        <Input
          type="text"
          value={cultureFilter}
          onChange={(e) => setCultureFilter(e.target.value)}
          placeholder="Введите груз"
          className="pl-8"
        />
        <Package className="absolute top-2.5 left-2.5  w-4 h-4 text-muted-foreground" />
      </div>
      <Button
        variant="secondary"
        onClick={() => {
          setLoadingLocationFilter("");
          setUnLoadingLocationFilter("");
          setCultureFilter("");
        }}
      >
        Сбросисть
      </Button>
    </div>
  );
}
// <Popover open={open} onOpenChange={setOpen}>
//   <PopoverTrigger asChild>
//     <Button
//       variant="outline"
//       role="combobox"
//       aria-expanded={open}
//       className="w-full justify-between"
//     >
//       {selectedCultures.length > 0
//         ? `Выбрано: ${selectedCultures.length}`
//         : "Выберите культуры"}
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
//         <CommandEmpty>No results found.</CommandEmpty>
//         <CommandGroup heading="Все культуры">
//           {filteredCultures?.map((culture, index) => (
//             <CommandItem
//               key={index}
//               onSelect={() => handleSelect(culture.value)}
//             >
//               <Check
//                 className={cn(
//                   "mr-2 h-4 w-4",
//                   selectedCultures.includes(culture.value)
//                     ? "opacity-100"
//                     : "opacity-0",
//                 )}
//               />
//               {culture.label}
//             </CommandItem>
//           ))}
//         </CommandGroup>
//         {/* <CommandSeparator />
//             <CommandGroup heading="Пшено">
//               <CommandItem>Пшеница-1</CommandItem>
//               <CommandItem>Пшеница-2</CommandItem>
//               <CommandItem>Пшеница-3</CommandItem>
//             </CommandGroup> */}
//       </CommandList>
//     </Command>
//   </PopoverContent>
// </Popover>
