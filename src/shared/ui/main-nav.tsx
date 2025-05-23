import { NavLink, useNavigate } from "react-router";

export type TLinksHeader = {
  icon?: React.ComponentType<{ className?: string }>;
  linkLabel: string;
  navigate: string;
};

export function MainNav() {
  const linkHeader: TLinksHeader[] = [
    {
      linkLabel: "Смотреть заявки",
      navigate: "/",
    },
    {
      linkLabel: "Выложить заявку",
      navigate: "/create-booking",
    },
    {
      linkLabel: "Мои заявки",
      navigate: "/my-booking",
    },
  ];
  const linkSubHeader: TLinksHeader[] = [
    {
      linkLabel: "Новости",
      navigate: "/news",
    },
    {
      linkLabel: "Поддержка",
      navigate: "/support",
    },
    {
      linkLabel: "Тарифы",
      navigate: "/subscribe",
    },
  ];

  return (
    <div className="container mx-auto px-8">
      <div className="flex justify-between items-center py-4">
        <span className="font-bold text-2xl">Груз рынок</span>
        <div className="flex gap-8">
          {linkHeader.map((link) => (
            <NavLink
              to={link.navigate}
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-sm"
                  : "font-medium text-sm text-background/60 hover:text-background"
              }
            >
              {link.linkLabel}
            </NavLink>
          ))}
        </div>
        <div className="w-[35px] h-[35px] rounded-[30px] bg-background"></div>
      </div>
      <div className="py-3 flex justify-between items-center border-t-[1px] border-background/15">
        <div className="flex gap-6">
          {linkSubHeader.map((link) => (
            <NavLink
              to={link.navigate}
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-sm"
                  : "font-medium text-sm text-background/60 hover:text-background"
              }
            >
              {link.linkLabel}
            </NavLink>
          ))}
        </div>

        <span className="font-medium text-sm text-background/60">
          У вас 3 заявки
        </span>
      </div>
    </div>
  );
}
