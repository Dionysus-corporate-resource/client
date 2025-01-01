import { useAuth } from "@/app/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CopyCorporateBookingText from "@/feature/corporate-booking/copy-corporate-booking-text";
import useChangeStatusCorporateBooking from "@/feature/corporate-booking/toggle-status";
import { IBookingDto } from "@/shared/model/types/booking";
import { CarFront, Copy, Settings, SquarePen, Eraser } from "lucide-react";

type IProps = {
  corporateBooking: IBookingDto["corporateBookingData"];
  setIsOpenToogle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenRemoveSure: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAddFlight: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DropDownMenuSettingBooking({
  corporateBooking,
  setIsOpenToogle,
  setIsOpenRemoveSure,
  setIsOpenAddFlight,
}: IProps) {
  const toggleStatusMutate = useChangeStatusCorporateBooking();
  const context = useAuth();
  const isMyBooking =
    context?.user?.userData?._id === corporateBooking?.manager?._id;
  const isDispatcher = context?.user?.corporateRoles.find(
    (role) => role === "dispatcher",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Settings className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Настройки заявки</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isDispatcher && (
          <DropdownMenuItem onClick={() => setIsOpenAddFlight(true)}>
            Поставить рейс
            <DropdownMenuShortcut>
              <CarFront className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
        {!isDispatcher && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Изменить статус</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() =>
                    toggleStatusMutate.mutate({
                      corporateBookingId: corporateBooking._id,
                      status: "active",
                    })
                  }
                >
                  Активна
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    toggleStatusMutate.mutate({
                      corporateBookingId: corporateBooking._id,
                      status: "inProgress",
                    })
                  }
                >
                  В работе
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    toggleStatusMutate.mutate({
                      corporateBookingId: corporateBooking._id,
                      status: "inactive",
                    })
                  }
                >
                  Не активна
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Дальше, больше...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        )}

        <DropdownMenuSeparator />
        {isMyBooking && (
          <DropdownMenuItem onClick={() => setIsOpenToogle(true)}>
            Отредактировать
            <DropdownMenuShortcut>
              <SquarePen className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem>
          <CopyCorporateBookingText corporateBooking={corporateBooking} />
          <DropdownMenuShortcut>
            <Copy className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {/* Удаление, обвернутое диалоговым окном */}
        {isMyBooking && (
          <DropdownMenuItem onClick={() => setIsOpenRemoveSure(true)}>
            Удалить
            <DropdownMenuShortcut>
              <Eraser className="h-4 w-4" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
