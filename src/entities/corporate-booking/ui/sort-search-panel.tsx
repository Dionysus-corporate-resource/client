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
import { NavLink } from "react-router-dom";

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
    <div className="grid grid-cols-1 w-full gap-8 p-4 rounded-md">
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          <div className="container">
            <NavLink
              className="group mb-2 inline-flex items-center px-0.5 text-sm font-medium"
              to="/docs/components/sidebar"
            >
              <NavLink to="/product">
                <span className="underline-offset-4 group-hover:underline">
                  Посмотреть мои рейсы
                </span>
              </NavLink>
            </NavLink>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] pb-2">
              Поиск и сортировка заявок
            </h1>
            <p className="max-w-2xl text-lg font-light text-foreground ">
              Здесь все заявки вашей компании, спользуйте поисковую строку и
              селект сортировки, чтобы найти нужную заявку
            </p>
            {/* <div className="mt-4">
                  <SortBooking
                    bookings={bookingData}
                    setSortItems={setSortBooking}
                    selectOptions={selectOptions}
                  />
                </div> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 w-full ">
        {/* <div className="flex justify-between items-center pr-6">
          <div className="flex items-center gap-4 py-2">
            <img
              src="/images/nc-scale-a-process.svg"
              alt="Иллюстрация пустого состояния"
              className="w-14 h-14  ml-4"
            />
            <img
              src="/images/nc-newsletter.svg"
              alt="Иллюстрация пустого состояния"
              className="w-12 h-12  ml-4"
            />
            <div className="">
              <h3 className="text-lg font-medium text-gray-900 max-w-md">
                Панель сортировки и поиска
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Используйте поле вводе и варианты сортировки, чтобы найти нужную
                заявку
              </p>
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
    </div>
  );
}
