"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SortBooking, { ISelectOptions } from "@/shared/components/sort-booking";
import {
  bookingAtom,
  sortBookingAtom,
} from "@/shared/model/atoms/booking-atom";
import { useAtom, useAtomValue } from "jotai";
import { Package, MapPin, User } from "lucide-react";
import { useState } from "react";

export default function SortSearchPanel() {
  const selectOptions: ISelectOptions[] = [
    {
      label: "Название груза",
      value: "cargoName",
    },
    {
      label: "Адрес погрузки",
      value: "loadingLocation",
    },
    {
      label: "Адрес выгрузки",
      value: "unloadingLocation",
    },
    {
      label: "Менеджер",
      value: "userName",
    },
  ];
  const [bookingData] = useAtom(bookingAtom); // Не отсортированные bookings
  const [, setSortBooking] = useAtom(sortBookingAtom); // отсортированные bookings
  return (
    <div className="grid grid-cols-1 w-full gap-2 border p-4 rounded-md">
      <div className="flex items-center gap-4 py-2">
        <img
          src="/images/nc-scale-a-process.svg"
          alt="Иллюстрация пустого состояния"
          className="w-14 h-14  ml-4"
        />
        {/* <img
          src="/images/nc-newsletter.svg"
          alt="Иллюстрация пустого состояния"
          className="w-12 h-12  ml-4"
        /> */}
        <div className="">
          <h3 className="text-lg font-medium text-gray-900 max-w-md">
            Панель сортировки и поиска
          </h3>
          <p className="text-sm text-gray-500 max-w-md">
            Ищите, пока можете ...
          </p>
        </div>
      </div>

      {/* <div className="grid grid-cols-4 gap-2">
        <div className="relative">
          <Label htmlFor="cargo" className="sr-only">
            Название груза
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Package className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="cargo"
              type="text"
              placeholder="Название груза"
              className="pl-10"
              value={searchData.cargo}
              onChange={handleChange("cargo")}
            />
          </div>
        </div>

        <div className="relative">
          <Label htmlFor="pickupAddress" className="sr-only">
            Адрес погрузки
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="pickupAddress"
              type="text"
              placeholder="Адрес погрузки"
              className="pl-10"
              value={searchData.pickupAddress}
              onChange={handleChange("pickupAddress")}
            />
          </div>
        </div>

        <div className="relative">
          <Label htmlFor="deliveryAddress" className="sr-only">
            Адрес выгрузки
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="deliveryAddress"
              type="text"
              placeholder="Адрес выгрузки"
              className="pl-10"
              value={searchData.deliveryAddress}
              onChange={handleChange("deliveryAddress")}
            />
          </div>
        </div>

        <div className="relative">
          <Label htmlFor="managerName" className="sr-only">
            Имя менеджера
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="managerName"
              type="text"
              placeholder="Имя менеджера"
              className="pl-10"
              value={searchData.managerName}
              onChange={handleChange("managerName")}
            />
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-2 gap-2">
        <SortBooking
          bookings={bookingData}
          setSortItems={setSortBooking}
          selectOptions={selectOptions}
        />
      </div>
    </div>
  );
}
