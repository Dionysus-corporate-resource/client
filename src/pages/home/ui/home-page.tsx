import BookingItem from "./components/booking-item";
import { IBooking, IBookingDto } from "@/shared/model/types/booking";

import { useAtom } from "jotai";
import {
  bookingAtom,
  sortBookingAtom,
} from "@/shared/model/atoms/booking-atom";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOptions } from "../api/query-options";
import { useEffect, useState } from "react";
import {
  DetailInfoBookingDialog,
  NewBookingCard,
  SortSearchPanel,
} from "@/entities/corporate-booking";
import { motion } from "framer-motion";
import { SkeletonBlock } from "@/shared";

export default function HomePage() {
  // управление модальным окном, детальной информации заявки
  const [isOpenDetailBookind, setIsOpenDetailBookind] = useState(false);
  const [detailBooking, setDetailBooking] = useState<
    IBookingDto["corporateBookingData"] | null
  >(null);
  const changeIsOpenStateAndGetDetailBooking = (
    booking: IBookingDto["corporateBookingData"],
  ) => {
    setIsOpenDetailBookind(true);
    setDetailBooking(booking);
  };
  // получение всех заявок
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());

  const [bookingSort] = useAtom(sortBookingAtom);
  const [, setBooking] = useAtom(bookingAtom);

  useEffect(() => {
    if (bookingData) setBooking(bookingData);
    // console.log("Booking пришли", bookingData);
    // console.log("bookingSort", bookingSort);
  }, [bookingData, bookingSort]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Интервал между появлениями карточек
      },
    },
  };

  return (
    <div className="px-6 space-y-6">
      <SortSearchPanel />
      {bookingSort && bookingSort.length !== 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid 2xl:grid-cols-3 gap-4"
        >
          {bookingSort
            ?.filter(
              (booking) =>
                booking.corporateBookingData.status !== "inactive" &&
                booking.corporateBookingData.status !== "inProgress",
            )
            .map((booking: IBookingDto) => (
              <NewBookingCard
                key={booking._id}
                booking={booking.corporateBookingData}
                changeIsOpenStateAndGetDetailBooking={
                  changeIsOpenStateAndGetDetailBooking
                }
              />
            ))}
        </motion.div>
      ) : (
        <SkeletonBlock
          stylesMainGrid="grid-cols-3 gap-4 h-fit "
          stylesSkeletonItem="h-[130px]"
          countSkeletonItem={8}
        />
      )}

      <DetailInfoBookingDialog
        isOpen={isOpenDetailBookind}
        setIsOpen={setIsOpenDetailBookind}
        detailBooking={detailBooking as IBookingDto["corporateBookingData"]}
      />
    </div>
  );
}

// <div className="mx-auto h-60 w-full max-w-3xl rounded-xl bg-muted/50" />
// <div className="mx- h-60 w-full max-w-3xl rounded-xl bg-muted/50" />
