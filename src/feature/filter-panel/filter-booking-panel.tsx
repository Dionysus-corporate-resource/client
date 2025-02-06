import { useState, useEffect, ReactNode } from "react";
import { useSetAtom } from "jotai";
import { filterbookingAtom } from "@/pages/home/model/sort-atom";
import { IBookingDto } from "@/shared/model/types/booking";
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
  // CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { cn } from "@/shared/lib/utils";
import { format, endOfDay, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/shared/components/ui/calendar";
import { ru } from "date-fns/locale"; // Импортируем русскую локализацию

export default function FilterBookingPanel({
  sortedPanelSlot,
  filterBooking,
  placeUse,
}: {
  sortedPanelSlot: ReactNode;
  filterBooking: IBookingDto[] | undefined;
  placeUse: "mobile" | "desktop";
}) {
  const [openSelectNameCompany, setOpenSelectNameCompany] = useState(false);
  const [loadingLocationFilter, setLoadingLocationFilter] =
    useState<string>("");
  const [unLoadingLocationFilter, setUnLoadingLocationFilter] =
    useState<string>("");
  const [companyNameFilter, setCompanyNameFilter] =
    useState<string>("Все заказчики");
  const [cultureFilter, setCultureFilter] = useState<string>("");
  const setFilteredBookings = useSetAtom(filterbookingAtom);
  const [date, setDate] = useState<DateRange | undefined>(undefined);

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

      const loadingDate = startOfDay(
        new Date(booking?.conditionsTransportation?.loadingDate),
      ); // Обнуляем время
      const matchesDate = date
        ? loadingDate >= startOfDay(date.from || new Date(0)) &&
          loadingDate <= endOfDay(date.to || new Date(8640000000000000))
        : true;

      const matchesCompany =
        companyNameFilter === "Все заказчики"
          ? true
          : booking?.companyPublicData?.nameCompany === companyNameFilter;

      return (
        matchesLoadingLocation &&
        matchesUnLoadingLocation &&
        matchesCulture &&
        matchesDate &&
        matchesCompany
      );
    });

    setFilteredBookings(filteredBookings);
  }, [
    filterBooking,
    loadingLocationFilter,
    unLoadingLocationFilter,
    cultureFilter,
    companyNameFilter,
    date,
    setFilteredBookings,
  ]);

  // Уникальный список заказчиков
  const uniqueListCompany = [
    ...new Set(
      filterBooking?.map((booking) => booking?.companyPublicData?.nameCompany),
    ),
  ];

  return (
    <div
      className={cn(
        "justify-between w-full gap-1 py-0",
        placeUse === "mobile"
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          : "hidden xl:grid xl:grid-cols-4 xl:col-span-1",
      )}
    >
      {/* Поле для фильтрации по месту загрузки */}
      <div className="relative w-full">
        <Input
          type="text"
          value={loadingLocationFilter}
          onChange={(e) => setLoadingLocationFilter(e.target.value)}
          placeholder="Введите место загрузки"
          className="h-10 pl-8 rounded-none"
        />
        <ArrowDownRight className="absolute top-2.5 left-2.5 w-4 h-4 text-muted-foreground" />
      </div>

      {/* Поле для фильтрации по месту разгрузки */}
      <div className="relative w-full">
        <Input
          type="text"
          value={unLoadingLocationFilter}
          onChange={(e) => setUnLoadingLocationFilter(e.target.value)}
          placeholder="Введите место разгрузки"
          className="h-10 pl-8 rounded-none"
        />
        <CornerRightUp className="absolute top-2.5 left-2.5 w-4 h-4 text-muted-foreground" />
      </div>
      {/* Выбор даты */}
      <div
        className={cn(
          "grid gap-2 w-full",
          placeUse === "mobile" && "hidden lg:block",
        )}
      >
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "h-10 w-full justify-start text-left font-normal rounded-none",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd MMMM yyyy", { locale: ru })} -{" "}
                    {format(date.to, "dd MMMM yyyy", { locale: ru })}
                  </>
                ) : (
                  format(date.from, "dd MMMM yyyy", { locale: ru })
                )
              ) : (
                <span>Выберите дату</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ru} // Устанавливаем русскую локализацию
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Поле для фильтрации по культуре */}
      <div className="relative w-full">
        <Input
          type="text"
          value={cultureFilter}
          onChange={(e) => setCultureFilter(e.target.value)}
          placeholder="Введите груз"
          className="h-10 pl-8 rounded-none"
        />
        <Package className="absolute top-2.5 left-2.5 w-4 h-4 text-muted-foreground" />
      </div>

      {/* Выбор заказчика */}
      <div className="w-full">
        <Popover
          open={openSelectNameCompany}
          onOpenChange={setOpenSelectNameCompany}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="h-10 w-full justify-between rounded-none"
            >
              {companyNameFilter.length > 0
                ? `Выбрано: ${companyNameFilter}`
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
                    onSelect={() => setCompanyNameFilter("Все заказчики")}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        companyNameFilter === "Все заказчики"
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    Все заказчики
                  </CommandItem>
                  {uniqueListCompany?.map((name, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        setCompanyNameFilter(name);
                        setOpenSelectNameCompany(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          companyNameFilter === name
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
        className="h-10 w-full rounded-none"
        variant="secondary"
        onClick={() => {
          setLoadingLocationFilter("");
          setUnLoadingLocationFilter("");
          setCultureFilter("");
          setCompanyNameFilter("Все заказчики");
          setDate(undefined);
        }}
      >
        Сбросить фильтрацию
      </Button>
    </div>
  );
}
