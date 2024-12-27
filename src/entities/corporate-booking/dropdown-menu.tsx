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
import { IBookingDto } from "@/shared/model/types/booking";
import { CarFront, Copy, Settings, SquarePen, Eraser } from "lucide-react";

type IProps = {
  corporateBooking: IBookingDto["corporateBookingData"];
  setIsOpenToogle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenRemoveSure: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenAddFlight: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function DropDownMenu({
  corporateBooking,
  setIsOpenToogle,
  setIsOpenRemoveSure,
  setIsOpenAddFlight,
}: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button style={{ borderRadius: "30px" }} variant="ghost" size="icon">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Настройки</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setIsOpenAddFlight(true)}>
          Поставить рейс
          <DropdownMenuShortcut>
            <CarFront className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Изменить роль</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            {/* <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() =>
                  onChangeRolesForLagistician(logisticianId, ["manager"])
                }
              >
                Менеджер
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  onChangeRolesForLagistician(logisticianId, ["dispatcher"])
                }
              >
                Диспетчер
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Дальше, больше...</DropdownMenuItem>
            </DropdownMenuSubContent> */}
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setIsOpenToogle(true)}>
          Отредактировать
          <DropdownMenuShortcut>
            <SquarePen className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CopyCorporateBookingText corporateBooking={corporateBooking} />
          <DropdownMenuShortcut>
            <Copy className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        {/* Удаление, обвернутое диалоговым окном */}

        <DropdownMenuItem onClick={() => setIsOpenRemoveSure(true)}>
          Удалить
          <DropdownMenuShortcut>
            <Eraser className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
