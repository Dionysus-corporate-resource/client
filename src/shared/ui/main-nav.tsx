import { useAuth } from "@/app/providers/auth-provider";
import { NavLink, useNavigate } from "react-router";

export type TLinksHeader = {
  icon?: React.ComponentType<{ className?: string }>;
  linkLabel: string;
  navigate: string;
};

function imgRoleVariant(role: "customer" | "driver" | undefined) {
  if (!role)
    return "https://images.unsplash.com/photo-1742330425089-1f91d18eaa4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  switch (role) {
    case "customer":
      return "https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    case "driver":
      return "https://images.unsplash.com/photo-1615563164538-89e1da13fcc4?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  }
}

export function MainNav() {
  const {
    token,
    user: { userData },
  } = useAuth();

  const navigate = useNavigate();
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
    // {
    //   linkLabel: "Новости",
    //   navigate: "/news",
    // },
    // {
    //   linkLabel: "Поддержка",
    //   navigate: "/support",
    // },
    {
      linkLabel: "Тарифы",
      navigate: "/subscribe",
    },
  ];

  return (
    <div className="container mx-auto px-8">
      {/* container mx-auto */}
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
        <div
          onClick={() => navigate("/profile")}
          className="w-[35px] h-[35px] rounded-[30px] bg-background hover:cursor-pointer overflow-hidden"
        >
          <img
            src={imgRoleVariant(userData?.roles)}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
      {/* border-t-[1px] */}
      <div className="py-3 pb-4 flex justify-between items-center  border-background/15">
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

        {token && (
          <div className="flex gap-2">
            <span className="font-medium text-sm text-background/60">
              Заявки:{" "}
              {userData &&
              userData?.activeSubscriptions?.purchasedBooking
                ?.remainingBookings > 0
                ? userData?.activeSubscriptions?.purchasedBooking
                    ?.remainingBookings
                : " 0"}{" "}
              шт.
            </span>
            <span className="font-medium text-sm text-background/60">
              Подписка:{" "}
              {userData?.activeSubscriptions?.unLimitedBookingSubscription
                ?.isPurchased
                ? "активна"
                : "не активна"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
