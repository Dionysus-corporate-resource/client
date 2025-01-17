import {
  Check,
  ChevronsUpDown,
  PackageSearch,
  PackageX,
  Search,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  // CommandSeparator,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { useState } from "react";

const cultures = [
  { label: "Пшеница", value: "wheat" },
  { label: "Овес", value: "oats" },
  { label: "Чечевица", value: "lentils" },
  { label: "Пшеница2", value: "wheat2" },
  { label: "Овес2", value: "oats2" },
  { label: "Чечевица2", value: "lentils2" },
  { label: "Пшеница3", value: "wheat3" },
  { label: "Овес3", value: "oats3" },
  { label: "Чечевица3", value: "lentils3" },
];

export default function FilterPanel() {
  const [open, setOpen] = useState(false);
  const [selectedCultures, setSelectedCultures] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelectedCultures((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const [search, setSearch] = useState("");
  const filteredCultures = cultures.filter((culture) =>
    culture.label.toLowerCase().includes(search.toLowerCase()),
  );
  console.log("search", search, filteredCultures);
  return (
    <div className="grid grid-cols-4 mb-4 md:grid-cols-4 items-start justify-start w-full gap-2">
      <div>
        {/* <label htmlFor="location" className="text-sm font-medium">
              Место выгрузки
            </label> */}
        <Input
          id="location"
          placeholder="Введите место выгрузки"
          className="w-full"
        />
      </div>

      <div>
        {/* <label className="text-sm font-medium">Культура</label> */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedCultures.length > 0
                ? `Выбрано: ${selectedCultures.length}`
                : "Выберите культуры"}
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
                <CommandGroup heading="Все культуры">
                  {filteredCultures?.map((culture, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => handleSelect(culture.value)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCultures.includes(culture.value)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {culture.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {/* <CommandSeparator />
                    <CommandGroup heading="Пшено">
                      <CommandItem>Пшеница-1</CommandItem>
                      <CommandItem>Пшеница-2</CommandItem>
                      <CommandItem>Пшеница-3</CommandItem>
                    </CommandGroup> */}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div>
        {/* <label htmlFor="customer" className="text-sm font-medium">
              Заказчик
            </label> */}
        <Input
          id="customer"
          placeholder="Введите заказчика"
          className="w-full"
        />
      </div>

      <div className="flex items-end w-full gap-2">
        <Button variant="outline" type="submit">
          <PackageSearch className="h-4 w-4" />
          Найти заявки
        </Button>
        <Button variant="ghost" type="submit">
          <PackageX className="h-4 w-4" />
          Сбросить
        </Button>
      </div>
    </div>
  );
}

// <div className="grid grid-cols-3 gap-2 mb-4">
//   <div className="col-span-2 ">
//     <div className="grid grid-cols-2 md:grid-cols-2 items-start justify-start w-full gap-2 ">
//       <div>
//         {/* <label htmlFor="location" className="text-sm font-medium">
//           Место выгрузки
//         </label> */}
//         <Input
//           id="location"
//           placeholder="Введите место выгрузки"
//           className="w-full"
//         />
//       </div>

//       <div>
//         {/* <label className="text-sm font-medium">Культура</label> */}
//         <Popover open={open} onOpenChange={setOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={open}
//               className="w-full justify-between"
//             >
//               {selectedCultures.length > 0
//                 ? `Выбрано: ${selectedCultures.length}`
//                 : "Выберите культуры"}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-full p-0" align="start">
//             <Command className="z-[9999]">
//               <CommandInput
//                 placeholder="Type a command or search..."
//                 className="z-[9999]"
//                 onValueChange={setSearch}
//               />
//               <CommandList className="z-[9999]">
//                 <CommandEmpty>No results found.</CommandEmpty>
//                 <CommandGroup heading="Все культуры">
//                   {filteredCultures?.map((culture, index) => (
//                     <CommandItem
//                       key={index}
//                       onSelect={() => handleSelect(culture.value)}
//                     >
//                       <Check
//                         className={cn(
//                           "mr-2 h-4 w-4",
//                           selectedCultures.includes(culture.value)
//                             ? "opacity-100"
//                             : "opacity-0",
//                         )}
//                       />
//                       {culture.label}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//                 {/* <CommandSeparator />
//                 <CommandGroup heading="Пшено">
//                   <CommandItem>Пшеница-1</CommandItem>
//                   <CommandItem>Пшеница-2</CommandItem>
//                   <CommandItem>Пшеница-3</CommandItem>
//                 </CommandGroup> */}
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>

//       <div>
//         {/* <label htmlFor="customer" className="text-sm font-medium">
//           Заказчик
//         </label> */}
//         <Input
//           id="customer"
//           placeholder="Введите заказчика"
//           className="w-full"
//         />
//       </div>

//       <div className="flex items-end">
//         <Button className="" type="submit">
//           <Search className="mr-2 h-4 w-4" />
//           Найти заявки
//         </Button>
//       </div>
//     </div>
//   </div>
//   <div className="p-2">
//     {selectedCultures.length > 0 && (
//       <div className="flex flex-wrap gap-2">
//         {selectedCultures.map((value) => (
//           <Badge
//             key={value}
//             variant="secondary"
//             className="cursor-pointer"
//             onClick={() => handleSelect(value)}
//           >
//             {cultures.find((c) => c.value === value)?.label}
//             <span className="ml-1">×</span>
//           </Badge>
//         ))}
//       </div>
//     )}
//   </div>
// </div>
