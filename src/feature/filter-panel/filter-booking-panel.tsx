import { ReactNode, Dispatch } from "react";
import { SetStateAction } from "jotai";
import { Input } from "@/shared/components/ui/input";
import {
  ArrowDownRight,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  CornerRightUp,
  Package,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
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
import { cn } from "@/shared/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/shared/components/ui/calendar";
import { ru } from "date-fns/locale";
import { Label } from "@/shared/components/ui/label";
import { DateRange } from "react-day-picker";

export default function FilterBookingPanel({
  sortedPanelSlot,
  placeUse,
  filters,
  setFilters,
  uniqueListCompany,
}: {
  sortedPanelSlot: ReactNode;
  placeUse: "mobile" | "desktop";
  filters: {
    loadingLocationFilter: string;
    unLoadingLocationFilter: string;
    companyNameFilter: string;
    cultureFilter: string;
    date: DateRange | undefined;
  };
  setFilters: {
    setLoadingLocationFilter: Dispatch<SetStateAction<string>>;
    setUnLoadingLocationFilter: Dispatch<SetStateAction<string>>;
    setCompanyNameFilter: Dispatch<SetStateAction<string>>;
    setCultureFilter: Dispatch<SetStateAction<string>>;
    setDate: Dispatch<SetStateAction<DateRange | undefined>>;
  };
  uniqueListCompany: string[];
}) {
  return (
    <div
      className={cn(
        "justify-between w-full gap-1 mb-4 bg-mutedd rounded-lg lg:p-2 xl:p-4",
        placeUse === "mobile"
          ? "grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-end px-2 md:px-0 gap-x-4 gap-y-2"
          : "hidden lg:grid lg:grid-cols-1 gap-4",
      )}
    >
      <div className="hidden lg:flex gap-2 items-center text-xl font-semibold">
        <p>Панель для расширенного поиcка</p>
      </div>

      {/* Поле для фильтрации по культуре */}
      <div className="relative w-full space-y-1">
        <Label>Введите груз</Label>

        <Input
          type="text"
          value={filters.cultureFilter}
          onChange={(e) => setFilters.setCultureFilter(e.target.value)}
          placeholder="Пшеница"
          className="h-8 md:h-8 lg:h-10 xl:h-12 pl-12 bg-muted border-none"
        />
        <Package className="absolute top-8 md:top-8 lg:top-9 xl:top-10 left-4 w-4 h-4 text-muted-foreground" />
      </div>
      {/* <div className="border-b" /> */}
      {/* Поле для фильтрации по месту загрузки */}
      <div className="relative w-full space-y-1">
        <Label>Введите место загрузки</Label>
        <Input
          type="text"
          value={filters.loadingLocationFilter}
          onChange={(e) => setFilters.setLoadingLocationFilter(e.target.value)}
          placeholder="Ростов-на-Дону"
          className="h-8 md:h-8 lg:h-10 xl:h-12 pl-12 bg-muted border-none"
        />
        <ArrowDownRight className="absolute top-8 md:top-8 lg:top-9 xl:top-10 left-4 w-4 h-4 text-muted-foreground" />
      </div>
      {/* Поле для фильтрации по месту разгрузки */}
      <div className="relative w-full space-y-1">
        <Label>Введите место разгрузки</Label>

        <Input
          type="text"
          value={filters.unLoadingLocationFilter}
          onChange={(e) =>
            setFilters.setUnLoadingLocationFilter(e.target.value)
          }
          placeholder="Краснодар"
          className="h-8 md:h-8 lg:h-10 xl:h-12 pl-12 bg-muted border-none"
        />
        <CornerRightUp className="absolute top-8 md:top-8 lg:top-9 xl:top-10 left-4 w-4 h-4 text-muted-foreground" />
      </div>
      {/* Выбор даты */}
      <div
        className={cn(
          "grid gap-2 w-full",
          placeUse === "mobile" && "hidden lg:block",
        )}
      >
        <Label>Выберите дату</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-8 md:h-8 lg:h-10 xl:h-12 pl-4 w-full justify-start text-left font-normal bg-muted border-none",
                !filters.date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2" />
              {filters.date?.from ? (
                filters.date.to ? (
                  <>
                    {format(filters.date.from, "dd MMMM yyyy", { locale: ru })}{" "}
                    - {format(filters.date.to, "dd MMMM yyyy", { locale: ru })}
                  </>
                ) : (
                  format(filters.date.from, "dd MMMM yyyy", { locale: ru })
                )
              ) : (
                <span>На сегодня</span>
              )}
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
        <Label>Выбирете заказчика</Label>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="h-8 md:h-8 lg:h-10 xl:h-12 pl-12 w-full justify-between bg-muted border-none"
            >
              {filters.companyNameFilter.length > 0
                ? `Выбрано: ${filters.companyNameFilter}`
                : "Выберите Заказчика"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              {/* <CommandInput placeholder="Поиск заказчика..." /> */}
              <CommandList>
                <CommandEmpty>Ничего не найдено.</CommandEmpty>
                <CommandGroup heading="Заказчики">
                  <CommandItem
                    onSelect={() =>
                      setFilters.setCompanyNameFilter("Все заказчики")
                    }
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
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
      {sortedPanelSlot}
      {/* Кнопка сброса фильтров */}
      <Button
        className="h-10 md:h-10 xl:h-12 pl-12 mt-2 xl:mt-0 bg-primary/85"
        variant="default"
        onClick={() => {
          setFilters.setLoadingLocationFilter("");
          setFilters.setUnLoadingLocationFilter("");
          setFilters.setCultureFilter("");
          setFilters.setCompanyNameFilter("Все заказчики");
          setFilters.setDate(undefined);
        }}
      >
        Сбросить фильтрацию
      </Button>
    </div>
  );
}
