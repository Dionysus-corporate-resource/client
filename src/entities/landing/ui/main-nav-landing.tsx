import { NavLink } from "react-router-dom";
import { Construction, UserCog } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
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

export function MainNavLanding({ headerContent }: Props) {
  const userData = useAtomValue(userStorageAtom);

  return (
    <div
      className="flex justify-between items-center md:gap-10 w-full
      ex:px-4 ex:gap-4 gap-6 "
    >
      <NavLink to="/landing" className="flex items-center space-x-2">
        <Construction
          className="w-4 h-4
        sm:w-6 sm:h-6
        "
        />

        <span className="inline-block font-semibold text-sm sm:text-lg">
          {headerContent.logoTitle}
        </span>
      </NavLink>
      <nav className="flex gap-6">
        {headerContent.linksMain.map((link) => (
          <NavLink
            to={link.navigate}
            className={({ isActive }) =>
              `ex:text-xs flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Смотркть заявки
          </NavLink>
        ))}
      </nav>
      {userData ? (
        <div className="flex items-center gap-4">
          {/* <ThemeToggle /> */}

          <NavLink
            className="ex:text-xs text-sm flex items-center gap-2"
            to="/profile"
          >
            <UserCog className="w-4 h-4 ex:hidden" />
            Профиль
          </NavLink>
        </div>
      ) : (
        <div className="space-x-2">
          <NavLink className="ex:hidden" to="/register">
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
