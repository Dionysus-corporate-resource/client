import { NavLink } from "react-router-dom";
import {
  ALargeSmall,
  BriefcaseBusiness,
  Construction,
  Headset,
  UserCog,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { userStorageAtom } from "../model/atoms/user-atom";
import { useAtomValue } from "jotai";

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
    <div className="flex justify-between items-center gap-6 md:gap-10 w-full relative">
      <div className="flex items-center gap-12 ">
        <NavLink to="/landing" className="flex items-center space-x-2">
          <Construction className="w-6 h-6" />
          {/* <div className="border p-1 rounded-md bg-white">
            <img src="/icons8-truck-30.png" className="w-6 h-6" />
          </div> */}
          <span className="inline-block font-semibold text-lg">
            {headerContent.logoTitle}
          </span>
        </NavLink>
        <nav className="flex gap-6 -mb-1 text-">
          {headerContent.linksMain.map((link) => (
            <NavLink
              to={link.navigate}
              className={({ isActive }) =>
                `flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              {link?.icon && <link.icon className="w-4 h-4" />}
              {link.linkLabel}
            </NavLink>
          ))}
        </nav>
      </div>

      {userData?.companyPublicData?.nameCompany && (
        <span className="text-sm font-medium text-muted-foreground absolute left-1/2 -translate-x-1/2 flex gap-12">
          <p>{userData?.companyPublicData?.nameCompany}</p>

          {/* <h1 className="text-red-300 font-mono">
            Сайт находиться в разработке и тестируется
          </h1> */}
        </span>
      )}

      {userData ? (
        <div className="flex items-center gap-4">
          <NavLink to="/profile">
            <Button variant="link" className="text-">
              <UserCog className="w-4 h-4" />
              Профиль
            </Button>
          </NavLink>
        </div>
      ) : (
        <div className="space-x-2">
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
