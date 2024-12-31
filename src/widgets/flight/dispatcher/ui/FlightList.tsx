import {
  DropDownMenuFlightItem,
  EmptyDriverCard,
  FlightCarItem,
} from "@/entities/flight/dispatcher";
import { IBookingDto } from "@/shared/model/types/booking";

export default function FlightList({
  sortFlight,
  setIsOpenSheet,
}: {
  sortFlight: IBookingDto["flight"] | undefined;
  setIsOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="space-y-2 col-span-3">
      {sortFlight ? (
        <>
          {sortFlight?.map((flight) => (
            <div className="space-y-2 mb-4">
              {/* LogisticianId - {flight.dispatcher} */}
              <div className="flex items-center justify-between px-2">
                <span>{flight.organization} </span>
                <div className="flex gap-2 items-center">
                  <span>{flight.dispatcher.userName}</span>

                  <DropDownMenuFlightItem setIsOpenSheet={setIsOpenSheet} />
                </div>
              </div>
              {flight.cars.map((car) => (
                <FlightCarItem car={car} />
              ))}
            </div>
          ))}
        </>
      ) : (
        <EmptyDriverCard />
      )}
    </div>
  );
}
