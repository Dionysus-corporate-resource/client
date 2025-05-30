import { TBookingDto } from "@/shared/model/types/booking";
import { DateRange } from "react-day-picker";
import { endOfDay, startOfDay } from "date-fns";

import { useState } from "react";
type ISortField = "distance" | "tonnage" | "ratePerTon" | "none";

export default function useFilteredAndSortedBooking({
  bookings,
}: {
  bookings: TBookingDto[] | undefined;
}) {
  // сосояни для сортировки
  const [sortField, setSortField] = useState<ISortField | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Обработчик выбора поля сортировки
  const handleSortFieldChange = (field: ISortField) => {
    if (sortField === field) {
      // setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      console.log(sortField);
    } else {
      setSortField(field);
      // setSortDirection("asc");
    }
  };

  // Состояния для фильтров
  const [loadingLocationFilter, setLoadingLocationFilter] =
    useState<string>("");
  const [unLoadingLocationFilter, setUnLoadingLocationFilter] =
    useState<string>("");
  const [companyNameFilter, setCompanyNameFilter] =
    useState<string>("Все заказчики");
  const [cultureFilter, setCultureFilter] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // функция для отчистки фильтрации
  const resetFiltredValue = () => {
    setLoadingLocationFilter("");
    setUnLoadingLocationFilter("");
    setCultureFilter("");
    setCompanyNameFilter("Все заказчики");
    setDate(undefined);
  };

  // Уникальный список заказчиков
  const uniqueListCompany = [
    ...new Set(
      (bookings || [])
        ?.map((booking) => {
          if (booking?.status === "active") {
            return booking?.basicInfo?.companyName;
          }
        })
        .filter((name): name is string => Boolean(name)),
    ),
  ];

  // Фильтрация и сортировка данных
  const filteredBooking = bookings
    ?.filter((booking) => {
      const isActiveStatus = booking.status === "active";
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
        new Date(
          booking?.additionalConditions?.estimatedLoadingDate || new Date(),
        ),
      ); // Обнуляем время
      const matchesDate = date
        ? loadingDate >= startOfDay(date.from || new Date(0)) &&
          loadingDate <= endOfDay(date.to || new Date(8640000000000000))
        : true;

      const matchesCompany =
        companyNameFilter === "Все заказчики"
          ? true
          : booking?.basicInfo?.companyName === companyNameFilter;

      return (
        matchesLoadingLocation &&
        matchesUnLoadingLocation &&
        matchesCulture &&
        matchesDate &&
        matchesCompany &&
        isActiveStatus
      );
    })
    .reverse()
    .sort((a, b) => {
      if (!sortField) return 0;

      let valueA: string | number | null;
      let valueB: string | number | null;

      // Обрабатываем вложенные поля
      switch (sortField) {
        case "distance":
          valueA = parseFloat(a?.basicInfo?.distance);
          valueB = parseFloat(b?.basicInfo?.distance);
          break;

        case "tonnage":
          valueA = parseFloat(a?.basicInfo?.tonnage || "0");
          valueB = parseFloat(b?.basicInfo?.tonnage || "0");
          break;

        case "ratePerTon":
          valueA = parseFloat(a?.basicInfo?.ratePerTon);
          valueB = parseFloat(b?.basicInfo?.ratePerTon);
          break;

        default:
          return 0;
      }

      // Сравниваем значения
      if ((valueA ?? 0) > (valueB ?? 0))
        return sortDirection === "asc" ? -1 : 1;
      if ((valueA ?? 0) < (valueB ?? 0))
        return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return {
    filter: {
      filteredBooking,
      uniqueListCompany,
      resetFiltredValue,
      filters: {
        loadingLocationFilter,
        unLoadingLocationFilter,
        companyNameFilter,
        cultureFilter,
        date,
      },
      setFilters: {
        setLoadingLocationFilter,
        setUnLoadingLocationFilter,
        setCompanyNameFilter,
        setCultureFilter,
        setDate,
      },
    },
    sort: {
      handleSortFieldChange,
      sortField,
      setSortField,
      sortDirection,
      setSortDirection,
    },
  };
}
