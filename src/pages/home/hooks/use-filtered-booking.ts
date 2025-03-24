import { IBookingDto } from "@/shared/model/types/booking";
import { DateRange } from "react-day-picker";
import { endOfDay, startOfDay } from "date-fns";

import { useState } from "react";

export default function useFilteredBooking({
  bookings,
}: {
  bookings: IBookingDto[] | undefined;
}) {
  // Состояния для фильтров
  const [loadingLocationFilter, setLoadingLocationFilter] =
    useState<string>("");
  const [unLoadingLocationFilter, setUnLoadingLocationFilter] =
    useState<string>("");
  const [companyNameFilter, setCompanyNameFilter] =
    useState<string>("Все заказчики");
  const [cultureFilter, setCultureFilter] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  // Уникальный список заказчиков
  const uniqueListCompany = [
    ...new Set(
      (bookings || [])?.map(
        (booking) => booking?.companyPublicData?.nameCompany,
      ),
    ),
  ];

  // Фильтрация данных
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
        matchesCompany &&
        isActiveStatus
      );
    })
    .reverse();

  return {
    filteredBooking,
    uniqueListCompany,
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
  };
}
