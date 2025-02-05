import { useNavigate } from "react-router";

import { AlignJustify, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export function MobileNav() {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:hidden">
        <AlignJustify className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 mt-4">
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          <UserCog className="w-4 h-4 mr-2" />
          Профиль
        </DropdownMenuItem>

        {/* <DropdownMenuSeparator />
>>>>>>> main
        <DropdownMenuItem onClick={() => navigate("/card-view")}>
          <ALargeSmall className="w-4 h-4 mr-2" />
          Обсуждения
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/subscribe")}>
          <Headset className="w-4 h-4 mr-2" />
          Поддержка
<<<<<<< HEAD
        </DropdownMenuItem>
=======
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
