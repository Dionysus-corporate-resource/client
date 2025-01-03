import { useAuth } from "@/app/providers/auth-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NewMiniBookingCard } from "@/entities/corporate-booking";
import { PlaceholderCard } from "@/shared";
import { IBookingDto } from "@/shared/model/types/booking";
import { Dispatch } from "react";

export default function CarouselBooking({
  sortBooking,
  setSortBookingId,
}: {
  sortBooking: IBookingDto[] | undefined;
  setSortBookingId: Dispatch<React.SetStateAction<string | null>>;
}) {
  const context = useAuth();
  return (
    <Carousel
      className="w-full max-w-screen-2xl"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="pb-2">
        {sortBooking?.length === 0 ? (
          <CarouselItem>
            <div className="h-[124px] w-full">
              {!!context?.user?.corporateRoles?.find(
                (role) => role === "manager",
              ) === true ? (
                <PlaceholderCard
                  url="https://i.pinimg.com/736x/bc/16/b1/bc16b1144c5031c52f6a2ec90b81705e.jpg"
                  // url="https://i.pinimg.com/736x/87/3d/29/873d29ec762ff8f8a4abd3cb38bb5f3c.jpg"
                  title="Ох, похоже вы еще не выложили не одной заявки."
                  description="Перейдите в Студию, там вы сможете это исправить"
                  additionallyStylesForImagesBlock="h-[130px] w-[50%]"
                  additionallyStylesForMainBlock="gap-16"
                  additionallyStylesForImage=""
                />
              ) : (
                <PlaceholderCard
                  url="https://i.pinimg.com/736x/bc/16/b1/bc16b1144c5031c52f6a2ec90b81705e.jpg"
                  // url="https://i.pinimg.com/736x/87/3d/29/873d29ec762ff8f8a4abd3cb38bb5f3c.jpg"
                  title="Ох, похоже вы еще не поставили не одного рейса"
                  description="Перейдите на главную страницу, там вы сможете найти заявки и поставить на них машины"
                  additionallyStylesForImagesBlock="h-[130px] w-[50%]"
                  additionallyStylesForMainBlock="gap-16"
                  additionallyStylesForImage=""
                />
              )}

              {/* <PlaceholderBookingCard /> */}
            </div>
          </CarouselItem>
        ) : sortBooking ? (
          <>
            {sortBooking?.map((corporateBooking) => (
              <CarouselItem
                key={corporateBooking._id}
                className="basis-1/3"
                onClick={() =>
                  setSortBookingId(corporateBooking.corporateBookingData._id)
                }
              >
                <div className="h-full w-full">
                  <NewMiniBookingCard
                    booking={corporateBooking.corporateBookingData}
                  />
                </div>
              </CarouselItem>
            ))}
          </>
        ) : (
          <CarouselItem key={1}>
            <div className="p-1 h-full">Скелетон</div>
          </CarouselItem>
        )}

        {sortBooking &&
          sortBooking?.length <= 2 &&
          !!context?.user?.corporateRoles?.find(
            (role) => role === "manager",
          ) && (
            <PlaceholderCard
              url="https://i.pinimg.com/736x/d7/03/f6/d703f601b731b14c08db3ec6b6cab0b3.jpg"
              // url="https://i.pinimg.com/736x/8c/91/e7/8c91e7e38c130b00a25731fdb0628d98.jpg"
              title="Больше заявок - больше денег!"
              description="Давай не ленись, взял и созвонился с заказчком, диспечерам тоже нужно на что-то жить"
              additionallyStylesForImagesBlock="h-[130px]"
              additionallyStylesForMainBlock="ml-4 pr-8"
              additionallyStylesForImage="top-4"
            />
          )}

        {sortBooking &&
          sortBooking?.length <= 2 &&
          !!context?.user?.corporateRoles?.find(
            (role) => role === "dispatcher",
          ) && (
            <PlaceholderCard
              url="https://i.pinimg.com/736x/b8/b3/4e/b8b34ed372f9e896b30f28e1d1fb2b71.jpg"
              // url="https://i.pinimg.com/736x/8c/91/e7/8c91e7e38c130b00a25731fdb0628d98.jpg"
              title="Стремитесь к большему"
              description="Прозванивайте перевозчиков, хоть это и бесполезно, но вдруг кто-то встанет"
              additionallyStylesForImagesBlock="h-[130px]"
              additionallyStylesForMainBlock="ml-4 pr-8 gap-4"
              additionallyStylesForImage=""
            />
          )}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
