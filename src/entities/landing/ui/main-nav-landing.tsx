import { NavLink } from "react-router-dom";
import { Construction, UserCog } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { useAtomValue } from "jotai";
import ThemeToggle from "@/feature/toggle-theme/toggle-theme";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

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
    <div className="flex justify-between items-center gap-6 md:gap-10 w-full ">
      <NavLink to="/landing" className="flex items-center space-x-2 ">
        <Construction
          className="w-6 h-6"
          // className="w-4 h-4"
        />
        <span className="inline-block font-semibold text-lg">
          {headerContent.logoTitle}
        </span>
      </NavLink>
      <nav className="flex gap-6">
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
      {userData ? (
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NavLink to="/profile">
            <Avatar>
              <AvatarFallback>
                <UserCog className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
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
