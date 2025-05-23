import { useAuth } from "@/app/providers/auth-provider";
import useProfileEdit from "@/feature/auth/profile/hooks/use-profile-edit";
import { Button } from "@/shared/components/ui/button";
import useFormatters from "@/shared/hooks/use-formatters";
import { BadgeHelp, LogOut, Ticket, Tickets, UserPen } from "lucide-react";
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
    <div className="relative w-full pb-12">
      <div className="absolute top-0 left-0 h-[361px] w-full bg-blue-300 z-[-1] bg-gradient-to-b from-[#333333] to-[#64A5FE]" />

      <div className="container mx-auto w-full rounded-2xl bg-background mt-[300px] p-4">
        <div className="grid grid-cols-2 gap-6">
          {/* профль */}
          <div className="col-span-2 flex justify-between items-start">
            <div className="flex gap-6 items-center">
              <div className="w-[130px] h-[130px] rounded-xl overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={imgRoleVariant(userData?.roles)}
                  // src="https://images.unsplash.com/photo-1742330425089-1f91d18eaa4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                <span className="text-sm font-medium text-primary/80">
                  {userData?.email}
                </span>
                <span className="text-sm font-medium">
                  {userData && formatPhoneNumber(userData?.phone)}
                </span>

                <div className="flex gap-2">
                  {userData?.userName && (
                    <div className="bg-primary/80 text-background py-1 px-3 text-sm font-semibold mt-2 rounded-xl w-fit">
                      {userData?.roles === "customer"
                        ? "Заказчик"
                        : "Перевозчик"}
                    </div>
                  )}
                  {userData?.roles === "customer" && (
                    <div className="bg-[#E8F1FF] text-[hsl(var(--access-primary))] py-1 px-3 text-sm font-semibold mt-2 rounded-xl w-fit">
                      {userData?.companyPublicData?.nameCompany}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <NavLink
                to="/edit-profile"
                className="flex items-center gap-4 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold rounded-xl py-3 px-4"
              >
                <UserPen className="w-5 h-5 text-primary/80" />
                Редактировть профиль
              </NavLink>
              <Button
                className="flex items-center gap-4 bg-primary/90 text-sm font-semibold rounded-xl"
                onClick={authContext?.logOut}
              >
                <LogOut className="w-5 h-5 text-background/80" />
                Выйти
              </Button>
            </div>
          </div>

          {/* предупреждение */}
          <div className="col-span-2 px-3">
            <span className="text-xs font-medium text-primary/60 block max-w-[371px]">
              Изменить роль и другие личные данные можно нажав на кнопку
              “Редактировать профиль” в правом верхнем углу
            </span>
          </div>
          {/* тарифы */}
          <div className="px-3 mt-16 space-y-6">
            <span className="text-base font-medium">Ваши подписки:</span>
            <div className="flex flex-col gap-4">
              {/* карочка подписки */}
              <div className="border rounded-xl shadow-md p-4 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <span className="text-lg font-medium">
                      Доступные заявки
                    </span>
                    <span className="text-sm font-normal text-primary/60">
                      активна
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-primary/5">
                    <Ticket className="w-5 h-5 text-primary/80" />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-primary/60">
                      Осталось заявок
                    </span>
                    <span className="text-sm font-medium text-primary/80">
                      3 из 12 шт.
                    </span>
                  </div>
                  <div className="w-full h-2 bg-primary/10 rounded-xl"></div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <BadgeHelp className="w-4 h-4" />
                    <span className="text-sm">
                      Подробнее можно ознакомиться здесь
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[hsl(var(--access-primary))] text-xs font-medium rounded-xl p-4"
                  >
                    Приобрести еще
                  </Button>
                </div>
              </div>
              {/* карочка подписки */}
              <div className="border rounded-xl shadow-md p-4 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-0">
                    <span className="text-lg font-medium">
                      Безлимитная подписка
                    </span>
                    <span className="text-sm font-normal text-primary/60">
                      не активна
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-primary/5">
                    <Tickets className="w-5 h-5 text-primary/80" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-end">
                    <span className="text-xs text-primary/60">
                      Осталось дней
                    </span>
                    <span className="text-sm font-medium text-primary/80">
                      Подписка не оплачена
                    </span>
                  </div>
                  <div className="w-full h-2 bg-primary/10 rounded-xl"></div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <BadgeHelp className="w-4 h-4" />
                    <span className="text-sm">
                      Подробнее можно ознакомиться здесь
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className="bg-[hsl(var(--access-primary))] text-xs font-medium rounded-xl p-4"
                  >
                    Получить
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* история покпок */}
          <div className="px-3 mt-16 space-y-6">
            <span className="text-base font-medium">История операций:</span>
            <div className="flex flex-col gap-4">
              {/* картточка истории оплаты*/}
              <div className="flex flex-col gap-4 bg-primary/5 rounded-xl p-4 px-5">
                <span className="text-lg font-medium text-primary/60">
                  Пакет обычных заявок
                </span>
                <div className="flex justify-between items-end">
                  <span className="text-2xl leading-none font-bold text-primary/60">
                    2 шт.
                  </span>
                  <span className="text-sm font-medium text-primary/30">
                    Дата покупки: 23.05.2025
                  </span>
                </div>
              </div>
              {/* картточка истории оплаты*/}
              <div className="flex flex-col gap-4 bg-primary/5 rounded-xl p-4 px-5">
                <span className="text-lg font-medium text-primary/60">
                  Пакет обычных заявок
                </span>
                <div className="flex justify-between items-end">
                  <span className="text-2xl leading-none font-bold text-primary/60">
                    2 шт.
                  </span>
                  <span className="text-sm font-medium text-primary/30">
                    Дата покупки: 23.05.2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
