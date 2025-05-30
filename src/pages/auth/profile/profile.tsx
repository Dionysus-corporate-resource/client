import { useAuth } from "@/app/providers/auth-provider";
import useProfileEdit from "@/feature/auth/profile/hooks/use-profile-edit";
import useFormatters from "@/shared/hooks/use-formatters";
import { NavLink } from "react-router";

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

export default function ProfilePage() {
  const authContext = useAuth();
  const {
    state: { userData, isLoading },
  } = useProfileEdit();
  const { formatPhoneNumber } = useFormatters();

  if (isLoading) return <div>Загрузка данных</div>;

  return (
    <div className="container mx-auto w-full rounded-2xl bg-background mt-10 p-5">
      <div className="grid grid-cols-2 gap-6">
        {/* профль */}
        <div className="col-span-2 flex justify-between items-start">
          <div className="flex gap-6 items-center">
            <div className="w-[140px] h-[140px] rounded-[30px] overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={imgRoleVariant(userData?.roles)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold">
                {userData?.userName
                  ? userData?.userName
                  : userData?.roles === "customer"
                    ? "Заказчик / Логист"
                    : "Перевозчик"}
              </span>
              <span className="text-sm font-normal text-primary/80">
                {userData?.email}
              </span>
              <span className="text-sm font-medium">
                {userData && formatPhoneNumber(userData.phone)}
              </span>

              <div className="flex gap-2">
                {userData && (
                  <div className="bg-primary/5 text-primary py-2 px-4 text-sm font-semibold mt-2 rounded-[30px]">
                    {userData?.roles === "customer" ? "Заказчик" : "Перевозчик"}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <NavLink
              to="/edit-profile"
              className="text-primary/90 text-sm font-semibold"
            >
              Редактировть профиль
            </NavLink>
            <span
              className="text-primary/90 text-sm font-semibold hover:cursor-pointer"
              onClick={authContext?.logOut}
            >
              Выйти
            </span>
          </div>
        </div>

        {/* предупреждение */}
        <div className="col-span-2 flex gap-2 items-center px-3">
          <span className="text-sm font-medium text-primary/80 block max-w-lg">
            Изменить роль и другие личные данные можно нажав на кнопку
            “Редактировать профиль” в правом верхнем углу
          </span>
          {/* <div className="flex items-center gap-2 bg-[#E8F1FF] text-[#64A5FE] font-medium rounded-[30px] py-3 px-4 hover:cursor-pointer">
            <span>Ясно</span>
            <X className="w-4 h-4 text-[#64A5FE] " />
          </div> */}
        </div>
        {/* тарифы */}
        <div className="px-3 mt-16 space-y-6">
          <div className="w-full flex justify-between">
            <span className="text-base font-medium">Ваши тарифы:</span>
            <NavLink
              to="/subscribe"
              className="text-xs font-medium text-primary/80 hover:underline cursor-pointer"
            >
              Купить еще +
            </NavLink>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between pb-2 border-dashed border-b">
              <span className="text-xl font-normal">Доступные заявки</span>
              <span className="text-xl font-medium">
                {
                  userData?.activeSubscriptions?.purchasedBooking
                    ?.remainingBookings
                }{" "}
                шт.
              </span>
            </div>
            <div className="flex justify-between pb-2 border-dashed border-b">
              <span className="text-xl font-normal">Безлимитная подписка</span>
              <span className="text-xl font-medium">
                {userData?.activeSubscriptions?.unLimitedBookingSubscription
                  ?.isPurchased === true
                  ? "Активна"
                  : "Не активна"}
              </span>
            </div>
          </div>
        </div>
        {/* история покпок */}
        <div className="px-3 mt-16 space-y-6">
          <span className="text-base font-medium">История операций:</span>
          <div className="flex flex-col gap-3">
            {/* картточка истории оплаты*/}
            <div className="flex flex-col items-end gap-4 bg-primary/5 rounded-[30px] py-4 px-6">
              <div className="w-full flex justify-between items-start">
                <span className="text-xl font-normal text-primary/90">
                  Пакет обычных заявок
                </span>
                <span className="text-2xl font-medium leading-none text-primary/90">
                  2 шт.
                </span>
              </div>

              <span className="text-sm font-normal text-primary/60">
                Дата покупки: 23.05.2025
              </span>
            </div>
            {/* картточка истории оплаты*/}
            <div className="flex flex-col items-end gap-4 bg-primary/5 rounded-[30px] py-4 px-6">
              <div className="w-full flex justify-between items-start">
                <span className="text-xl font-normal text-primary/90">
                  Пакет обычных заявок
                </span>
                <span className="text-2xl font-medium leading-none text-primary/90">
                  10 шт.
                </span>
              </div>

              <span className="text-sm font-normal text-primary/60">
                Дата покупки: 23.05.2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
