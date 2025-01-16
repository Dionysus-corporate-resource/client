import { NavLink } from "react-router-dom";
import {
  BadgeRussianRuble,
  BriefcaseBusiness,
  ChartSpline,
} from "lucide-react";
export function MainNav() {
  return (
    <div className="flex justify-between items-center gap-6 md:gap-10 w-full ">
      <NavLink to="/" className="flex items-center space-x-2 ">
        <span className="inline-block font-semibold text-lg">
          GrainTransport
        </span>
      </NavLink>
      <nav className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          <BriefcaseBusiness className="w-4 h-4" />
          Заявки
        </NavLink>
        <NavLink
          to="/subscribe"
          className={({ isActive }) =>
            `flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          <BadgeRussianRuble className="w-4 h-4" />
          Подписки
        </NavLink>
        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary ${
              isActive ? "text-foreground" : "text-muted-foreground"
            }`
          }
        >
          <ChartSpline className="w-4 h-4" />
          Аналитика
        </NavLink>
      </nav>
      <div>Личный кабинет</div>
    </div>
  );
}
