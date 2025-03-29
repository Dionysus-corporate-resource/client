import { NavLink, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  ChartLine,
  Coffee,
  Menu,
  PackageOpen,
  PackagePlus,
  PackageSearch,
  UserCog2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { userStorageAtom } from "../model/atoms/user-atom";
import { useAtomValue } from "jotai";
// import ThemeToggle from "@/feature/toggle-theme/toggle-theme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useAuth } from "@/app/providers/auth-provider";
// import { MobileNav } from "@/widgets/mobile/mobile-nav/mobile-nav";

export type TLinksHeader = {
  icon?: React.ComponentType<{ className?: string }>;
  linkLabel: string;
  navigate: string;
};

export function MainNav() {
  const userData = useAtomValue(userStorageAtom);
  const navigate = useNavigate();
  const user = useAuth();
  const linksHeader: TLinksHeader[] = [
    {
      linkLabel: "Выложить заявку",
      navigate: "/create-booking",
    },
    {
      linkLabel: "Мои заявки",
      navigate: "/my-booking",
    },

    // {
    //   linkLabel: "Статсика",
    //   navigate: "/analytics",
    // },
  ];

  return (
    <div className="relative flex justify-between items-center gap-2 w-full sm:gap-4 ">
      <NavLink to="/" className="font-semibold text-sm sm:text-xl md:text-2xl">
        Груз Рынок
      </NavLink>

      {/* Навигация */}
      <nav className="flex gap-4 -mb-1 sm:gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex gap-2 items-center text-sm font-semibold transition-colors hover:text-white ${
              isActive ? "text-white" : "text-white/60"
            }
            hidden text-xs sm:text-sm xl:flex`
          }
        >
          Искать заявки
        </NavLink>
        {linksHeader.map((link) => (
          <NavLink
            to={link.navigate}
            className={({ isActive }) =>
              `flex gap-2 items-center text-sm font-medium transition-colors hover:text-white ${
                isActive ? "text-white" : "text-white/60"
              }
              ${user?.token && user?.user?.roles === "customer" ? "" : "!hidden"}
              hidden text-xs sm:text-sm xl:flex`
            }
          >
            {link?.icon && <link.icon className="w-3 h-3 sm:w-4 sm:h-4" />}
            {link.linkLabel}
          </NavLink>
        ))}
      </nav>
      {/* <MobileNav /> */}
      <div className="flex gap-4 xl:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="w-6 h-6" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 mt-4">
            <DropdownMenuItem
              onClick={() => navigate("/")}
              className="flex gap-4 justify-between"
            >
              <p>Смотреть заявки</p>
              <PackageSearch className="w-4 h-4" />
            </DropdownMenuItem>
            {linksHeader.map((nav) => (
              <DropdownMenuItem
                onClick={() => navigate(nav.navigate)}
                className="flex gap-4 justify-between"
              >
                <p>{nav.linkLabel}</p>
                {nav?.icon && <nav.icon className="w-4 h-4" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="flex gap-4 justify-between"
            >
              <p>Профиль</p>
              <UserCog2 className="w-4 h-4" />
            </DropdownMenuItem>
            {/* proposals */}
            {user?.token && (
              <DropdownMenuItem
                onClick={() => navigate("/proposals")}
                className="flex gap-4 justify-between"
              >
                <p>Предложения</p>
                <Coffee className="w-4 h-4" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {userData ? (
        <div className="items-center gap-0 hidden xl:flex text-white">
          <NavLink to="/profile">
            <Button
              variant="link"
              className="text-sm font-semibold sm:text-sm text-white"
            >
              {/* <UserCog className="w-4 h-4" /> */}
              Профиль
            </Button>
          </NavLink>
          {/* <ThemeToggle /> */}
        </div>
      ) : (
        <div className="hidden xl:block sm:space-x-2">
          <NavLink to="/register">
            <Button size="sm" variant="link" className="text-white">
              Зарегистрироваться
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button size="sm" variant="link" className="text-white">
              Войти
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
