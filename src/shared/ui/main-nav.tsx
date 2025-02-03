import { NavLink } from "react-router-dom";
import { ALargeSmall, BriefcaseBusiness, Headset, UserCog } from "lucide-react";
import { Button } from "../components/ui/button";
import { userStorageAtom } from "../model/atoms/user-atom";
import { useAtomValue } from "jotai";
// import { MobileNav } from "@/widgets/mobile/mobile-nav/mobile-nav";

export type Props = {
  headerContent: {
    logoTitle: string;
    linksMain: {
      icon?: React.ComponentType<{ className?: string }>;
      linkLabel: string;
      navigate: string;
    }[];
    linksFooter: {
      icon?: React.ComponentType<{ className?: string }>;
      linkLabel: string;
    }[];
  };
};

export function MainNav() {
  const userData = useAtomValue(userStorageAtom);
  const headerContent: Props["headerContent"] = {
    logoTitle: "Груз Рынок",
    linksMain: [
      {
        icon: ALargeSmall,
        linkLabel: "Обсуждения",
        navigate: "/card-view",
      },
      {
        icon: Headset,
        linkLabel: "Поддержка",
        navigate: "/table-view",
      },
    ],
    linksFooter: [
      {
        icon: BriefcaseBusiness,
        linkLabel: "Заявки",
      },
    ],
  };

  return (
    <div
      className="relative flex justify-between items-center gap-2 w-full
     sm:gap-4"
    >
      <div
        className="flex items-center gap-4
        sm:gap-12"
      >
        <NavLink to="/landing" className="flex items-center space-x-2">
          <img
            className="w-4 h-4
      sm:w-6 sm:h-6"
            src="truck3.png"
          />
          {/* <Package
            style={{ color: "#5D91EF" }}
            className="w-4 h-4
        sm:w-6 sm:h-6"
          /> */}

          <span className="inline-block font-semibold text-sm sm:text-lg">
            {headerContent.logoTitle}
          </span>
        </NavLink>
        {/* Навигация */}
        {/* <nav
          className="flex gap-4 -mb-1
          sm:gap-6 "
        >
          {headerContent.linksMain.map((link) => (
            <NavLink
              to={link.navigate}
              className={({ isActive }) =>
                `flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }
                hidden text-xs sm:text-sm sm:flex`
              }
            >
              {link?.icon && (
                <link.icon
                  className="w-3 h-3
                 sm:w-4 sm:h-4"
                />
              )}
              {link.linkLabel}
            </NavLink>
          ))}
        </nav> */}
      </div>
      {/* <MobileNav /> */}
      <div className="md:hidden">
        <NavLink to="/profile">
          <Button
            variant="link"
            className="ex:text-xs
            sm:text-sm"
          >
            <UserCog className="w-4 h-4" />
            Профиль
          </Button>
        </NavLink>
      </div>

      {userData?.companyPublicData?.nameCompany && (
        <span
          className="text-sm font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2 gap-12
          hidden xl:block
          "
        >
          <p>{userData?.companyPublicData?.nameCompany}</p>

          {/* <h1 className="text-red-300 font-mono">
            Сайт находиться в разработке и тестируется
          </h1> */}
        </span>
      )}

      {userData ? (
        <div
          className=" items-center gap-4
          hidden md:flex"
        >
          <NavLink to="/profile">
            <Button
              variant="link"
              className="text-xs
              sm:text-sm"
            >
              <UserCog className="w-4 h-4" />
              Профиль
            </Button>
          </NavLink>
        </div>
      ) : (
        <div
          className="hidden
          md:block md:space-x-2"
        >
          <NavLink to="/register">
            <Button size="sm" variant="link">
              Зарегистрироваться
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button size="sm" variant="link">
              Войти
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
