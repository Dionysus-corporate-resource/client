import { bookingQueryOptions } from "@/pages/home/api/query-options";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/app/providers/auth-provider";
import { useState } from "react";
import { CarouselBooking, FlightList } from "@/widgets/flight/dispatcher";
import {
  DropDownMenuFlightItem,
  EmptyFlightCar,
  NewFlightCarItem,
  RemoveFlightDialog,
} from "@/entities/flight/dispatcher";
import { SheetEditFlight } from "@/widgets/flight/dispatcher/ui/sheet-edit-flight";
import { useRemoveFlightMutate } from "@/feature/flight";
import { Building2 } from "lucide-react";
import { ChartFakeOne } from "@/entities/flight";

export default function FlightDispatcherPage() {
  const removeFlightMutate = useRemoveFlightMutate();

  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [isOpenRemoveFlightDialog, setIsOpenRemoveFlightDialog] =
    useState(false);
  const [flightEditId, setFlighEditId] = useState<null | string>(null);
  //
  const context = useAuth();
  const { data: bookingData } = useQuery(bookingQueryOptions.getAll());
  const [sortBookingId, setSortBookingId] = useState<string | null>(null);

  const sortBooking = bookingData
    ?.filter((booking) => booking.corporateBookingData.status !== "inactive")
    ?.filter((booking) => {
      return !!booking.flight.find(
        (flight) => flight?.dispatcher?._id === context?.user?.userData?._id,
      );
    });

  const sortFlight = bookingData
    ?.find((booking) => booking.corporateBookingData._id === sortBookingId)
    ?.flight.filter(
      (flight) => flight?.dispatcher?._id === context?.user?.userData?._id,
    );

  // console.log("sortBooking", sortBooking, sortFlight);

  return (
    <div className="px-12 max-w-screen-2xl flex flex-col m-auto ">
      <CarouselBooking
        sortBooking={sortBooking}
        setSortBookingId={setSortBookingId}
      />

      <div className="grid grid-cols-4 gap-4 mt-6 w-full">
        <FlightList
          sortFlight={sortFlight}
          sortFlightMapSlot={sortFlight?.map((flight) => (
            <div className="mx-auto">
              {/* Header Section */}
              <div className="flex flex-col gap-2 p-4">
                <div className="flex items-end px-1 justify-between">
                  <div className="flex gap-6">
                    {/* Company Info */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-blue-50 text-blue-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Организация</p>
                        <h1 className="text-base font-medium text-gray-900">
                          {flight?.organization}
                        </h1>
                      </div>
                    </div>

                    {/* Dispatcher Info */}
                    {/* <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-green-50 text-green-600">
                        <User2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Диспетчер</p>
                        <p className="text-base font-medium text-gray-900">
                          {flight?.dispatcher?.userName}
                        </p>
                      </div>
                    </div> */}
                  </div>

                  {/* Edit Button */}
                  <DropDownMenuFlightItem
                    setIsOpenSheet={setIsOpenSheet}
                    setIsOpenRemoveFlightDialog={setIsOpenRemoveFlightDialog}
                    setFlighEditId={setFlighEditId}
                    flightId={flight._id}
                  />
                </div>

                {/* <div className="border-t" /> */}

                {/* Transport Cards List */}
                <div className="space-y-2">
                  {flight.cars.length !== 0 ? (
                    flight.cars.map((car) => (
                      // <FlightCarItem car={car} />
                      <NewFlightCarItem car={car} />
                    ))
                  ) : (
                    <EmptyFlightCar />
                  )}
                </div>
              </div>
            </div>
          ))}
        />
        <ChartFakeOne />
      </div>
      <SheetEditFlight
        isOpen={isOpenSheet}
        setIsOpen={setIsOpenSheet}
        editFlightIds={{ flightEditId, sortBookingId }}
      />
      <RemoveFlightDialog
        isOpen={isOpenRemoveFlightDialog}
        setIsOpen={setIsOpenRemoveFlightDialog}
        editFlightIds={{ flightEditId, sortBookingId }}
        removeMutateAction={() => {
          if (flightEditId && sortBookingId) {
            return removeFlightMutate.mutate({
              bookingId: sortBookingId,
              flightId: flightEditId,
            });
          }
          alert("Ошибка при удалении рейса!");
        }}
      />
    </div>
  );
}
