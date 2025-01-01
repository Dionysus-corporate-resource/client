import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete, Edit, MoreHorizontal } from "lucide-react";

export default function DropDownMenuFlightItem({
  setIsOpenSheet,
  setFlighEditId,
  setIsOpenRemoveFlightDialog,
  flightId,
}: {
  setIsOpenSheet: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenRemoveFlightDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setFlighEditId: React.Dispatch<React.SetStateAction<string | null>>;
  flightId: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="h-7 w-7 ">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Настройки рейса</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            setIsOpenSheet(true);
            setFlighEditId(flightId);
          }}
        >
          Редактировать
          <DropdownMenuShortcut>
            <Edit className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            setFlighEditId(flightId);
            setIsOpenRemoveFlightDialog(true);
          }}
        >
          Удалить рейс
          <DropdownMenuShortcut>
            <Delete className="h-4 w-4" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
