import { Button } from "@/components/ui/button";
import { BookUp } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function PlaceholderBookingCard() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full items-center justify-center rounded-md border  cursor-pointer">
      <div className="flex items-center">
        <img
          src="/images/nc-newsletter.svg"
          alt="Иллюстрация пустого состояния"
          className="object-contain h-1/6 w-1/6 mx-8"
        />
        <div className="container">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] pb-2">
            Поиск и сортировка заявок
          </h1>
          <p className="max-w-2xl text-lg font-light text-foreground">
            Здесь все заявки вашей компании, спользуйте поисковую строку и
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
  );
}
