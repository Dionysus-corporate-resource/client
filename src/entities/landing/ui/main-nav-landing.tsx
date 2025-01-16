import { NavLink } from "react-router-dom";
import { Construction } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

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
    </div>
  );
}
