import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import { ru } from "date-fns/locale";
import { Label } from "@/shared/components/ui/label";
import { DateRange } from "react-day-picker";
import { CalendarIcon, Check } from "lucide-react";

type ISortField = "distance" | "tonnage" | "ratePerTon" | "none";

export default function SortPublicBookingPanel({
  sortField,
  handleSortFieldChange,
  sortDirection,
  setSortDirection,
  filters,
  setFilters,
  uniqueListCompany,
}: {
  sortField: ISortField | null;
  handleSortFieldChange: (field: ISortField) => void;
  sortDirection: "asc" | "desc";
  setSortDirection: Dispatch<SetStateAction<"asc" | "desc">>;
  filters: {
    companyNameFilter: string;
    date: DateRange | undefined;
  };
  setFilters: {
    setCompanyNameFilter: Dispatch<React.SetStateAction<string>>;
    setDate: Dispatch<React.SetStateAction<DateRange | undefined>>;
  };
  uniqueListCompany: string[];
}) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <span className="text-lg font-medium">Сортировка</span>
      <div className="space-y-2">
        <div className="w-full space-y-2">
          <Label className="text-xs font-medium text-primary/60">
            Свойство сортировки
          </Label>

          <Select
            value={sortField || "none"}
            onValueChange={(e) => handleSortFieldChange(e as ISortField)}
          >
            <SelectTrigger className="w-full py-7  rounded-xl border text-base font-medium text-primary/80">
              <SelectValue placeholder="Поля сортировки" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs font-normal text-primary/60">
                  Тип сортировки
                </SelectLabel>
                <SelectItem value="none">
                  <div className="text-base py-1 px-4">Не выбрано</div>
                </SelectItem>
                <SelectItem value="distance">
                  <div className="text-base py-1 px-4">Расстояние</div>
                </SelectItem>
                <SelectItem value="ratePerTon">
                  <div className="text-base py-1 px-4">Ценна</div>
                </SelectItem>
                <SelectItem value="tonnage">
                  <div className="text-base py-1 px-4">Тоннаж</div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {sortField !== null && sortField !== "none" && (
          <Select
            value={sortDirection || "asc"}
            onValueChange={(e) => setSortDirection(e as "asc" | "desc")}
          >
            <SelectTrigger className="w-full py-7 px-5 rounded-xl border text-base font-medium text-primary/80">
              <SelectValue placeholder="Тип сортировки" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-xs font-normal text-primary/60">
                  Тип сортировки
                </SelectLabel>
                <SelectItem value="asc">
                  <div className="text-base py-1 px-4">
                    От большего к меньшему
                  </div>
                </SelectItem>
                <SelectItem value="desc">
                  <div className="text-base py-1 px-4">
                    От меньшего к большему
                  </div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {/* CheckBoxs */}
      {/* <div className="space-y-2">
        <div className="flex items-center space-x-3 mt-1">
          <Checkbox className="border border-primary/20" />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Для тонаров
          </label>
        </div>
        <div className="flex items-center space-x-3 mt-1">
          <Checkbox className="border border-primary/20" />
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Проверенные заказчики
          </label>
        </div>
      </div> */}

      <div className="space-y-2">
        <Label className="text-xs font-medium text-primary/60">
          Дополнительные парметры
        </Label>
        {/* Выбор даты */}
        <div className="grid gap-2 w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-between py-7 px-5 rounded-xl border text-base font-medium text-primary/80",
                  !filters.date && "text-muted-foreground",
                )}
              >
                {filters.date?.from ? (
                  filters.date.to ? (
                    <>
                      {format(filters.date.from, "dd MMMM yyyy", {
                        locale: ru,
                      })}{" "}
                      -{" "}
                      {format(filters.date.to, "dd MMMM yyyy", { locale: ru })}
                    </>
                  ) : (
                    format(filters.date.from, "dd MMMM yyyy", { locale: ru })
                  )
                ) : (
                  <span>На сегодня</span>
                )}
                <CalendarIcon className="mr-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full pl-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={filters.date?.from}
                selected={filters.date}
                onSelect={setFilters.setDate}
                numberOfMonths={2}
                locale={ru} // Устанавливаем русскую локализацию
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Выбор заказчика */}
        <div className="w-full space-y-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-start py-7 px-5 rounded-xl border text-base font-medium text-primary/80"
              >
                {filters.companyNameFilter.length > 0
                  ? `Выбрано: ${filters.companyNameFilter}`
                  : "Выберите Заказчика"}
                {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                {/* <CommandInput placeholder="Поиск заказчика..." /> */}
                <CommandList>
                  <CommandEmpty>Ничего не найдено.</CommandEmpty>
                  <CommandGroup>
                    <span className="px-2 py-1 text-xs font-normal text-primary/60">
                      Заказчики
                    </span>
                    <CommandItem
                      onSelect={() =>
                        setFilters.setCompanyNameFilter("Все заказчики")
                      }
                      className="text-base py-2 px-4"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 ",
                          filters.companyNameFilter === "Все заказчики"
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      Все заказчики
                    </CommandItem>
                    {uniqueListCompany?.map((name, index) => (
                      <CommandItem
                        key={index}
                        onSelect={() => setFilters.setCompanyNameFilter(name)}
                        className="text-base py-2 px-4"
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            filters.companyNameFilter === name
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                        {name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
