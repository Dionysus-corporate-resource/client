import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

import { Progress } from "@/shared/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { useAtomValue } from "jotai";

import {
  BadgeInfo,
  Calendar,
  Sparkles,
  Ticket,
  Timer,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type ISubscribe = {
  isPurchased: boolean;
  purchasedAt: string | null;
  expiresAt: string | null;
};

interface SubscriptionResult {
  remainingPercentage: number;
  remainingDays: number;
}

//"2025-02-01T16:21:12.732Z"
const calculateRemainingSubscriptionTime = (
  subscription: ISubscribe | undefined,
): SubscriptionResult => {
  if (
    !subscription?.isPurchased ||
    !subscription.expiresAt ||
    !subscription.purchasedAt
  ) {
    console.log("Invalid subscription data");
    return {
      remainingPercentage: 0,
      remainingDays: 0,
    };
  }

  const now = Date.now();
  const expiresAt = new Date(subscription.expiresAt).getTime();
  const purchasedAt = new Date(subscription.purchasedAt).getTime();

  // console.log("Now:", new Date(now).toISOString());
  // console.log("PurchasedAt:", new Date(purchasedAt).toISOString());
  // console.log("ExpiresAt:", new Date(expiresAt).toISOString());

  // Если подписка еще не началась (now < purchasedAt)
  if (now < purchasedAt) {
    console.log("Subscription has not started yet");
    const totalDays = Math.ceil(
      (expiresAt - purchasedAt) / (1000 * 60 * 60 * 24),
    );
    return {
      remainingPercentage: 100,
      remainingDays: totalDays,
    };
  }

  // Если подписка уже началась
  const totalDuration = expiresAt - purchasedAt;
  const timePassed = now - purchasedAt;

  const remainingPercentage = Math.max(
    0,
    ((totalDuration - timePassed) / totalDuration) * 100,
  );

  const remainingMilliseconds = expiresAt - now;
  const remainingDays = Math.ceil(
    remainingMilliseconds / (1000 * 60 * 60 * 24),
  );

  console.log("Remaining Percentage:", remainingPercentage);
  console.log("Remaining Days:", remainingDays);

  return {
    remainingPercentage: parseFloat(remainingPercentage.toFixed(2)),
    remainingDays,
  };
};

const getNeedFormatTime = (dateString: Date | undefined | null): string => {
  if (!dateString) return "подгружаем";
  const date = new Date(dateString);

  // Получаем день, месяц и год
  const day = date.getUTCDate(); // День месяца (1-31)
  const month = date.getUTCMonth() + 1; // Месяц (0-11, поэтому добавляем 1)
  const year = date.getUTCFullYear(); // Год

  // Преобразуем день и месяц в строки и добавляем ведущий ноль, если нужно
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  return `${formattedDay}.${formattedMonth}.${year}`;
};

export default function SubscriptionInfo() {
  const user = useAtomValue(userStorageAtom);
  const purchasedBooking = user?.activeSubscriptions?.purchasedBooking;
  const navigate = useNavigate();

  const [remainTimeShowContact, setRemainTimeShowContact] = useState({
    remainingPercentage: 0,
    remainingDays: 0,
  });

  const [remainTimeUnLimitBooking, setRemainTimeUnLimitBooking] = useState({
    remainingPercentage: 0,
    remainingDays: 0,
  });

  useEffect(() => {
    if (user?.activeSubscriptions?.showContactSubscription) {
      const result = calculateRemainingSubscriptionTime(
        user.activeSubscriptions.showContactSubscription as ISubscribe,
      );
      setRemainTimeShowContact(result);
    }
  }, [user?.activeSubscriptions?.showContactSubscription]);
  useEffect(() => {
    if (user?.activeSubscriptions?.unLimitedBookingSubscription) {
      const result = calculateRemainingSubscriptionTime(
        user.activeSubscriptions.unLimitedBookingSubscription as ISubscribe,
      );
      setRemainTimeUnLimitBooking(result);
    }
  }, [user?.activeSubscriptions?.unLimitedBookingSubscription]);

  return (
    <div className="flex flex-col gap-4">
      {/* Ссылка на список тарифов */}
      {/* <Button
        variant="outline"
        className="w-full justify-between hover:bg-primary hover:text-primary-foreground"
        onClick={() => navigate("/landing/subscribe")}
      >
        <span className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Управление подписками
        </span>
        <ChevronRight className="h-4 w-4" />
      </Button> */}

      {/* Компонент с лимитом заявок */}
      {purchasedBooking && (
        <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex justify-between w-full items-start">
              <div className="flex items-center gap-4">
                <div className="rounded-md  p-4 bg-secondary">
                  {/* <FileText className="h-5 w-5 text-primary" /> */}
                  <Ticket className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-medium">Доступные заявки</h3>
                  <p className="text-sm text-muted-foreground">Обычные</p>
                </div>
              </div>
            </div>
            {/* <Badge variant="secondary">Активно</Badge> */}
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Осталось заявок</span>
              <span className="font-medium">
                {purchasedBooking.remainingBookings}
                из {purchasedBooking?.allPurchasedBookings} шт
              </span>
            </div>
            <Progress
              value={
                ((purchasedBooking?.remainingBookings ?? 0) /
                  (purchasedBooking?.allPurchasedBookings ?? 0)) *
                100
              }
              className="h-1"
            />
          </div>

          {/* Предупреждение о роли */}
          {user?.roles === "driver" && (
            <div className="text-xs text-muted-foreground">
              Чтобы выкладывать заявки, вы должны быть "Заказчиком"
            </div>
          )}
        </div>
      )}

      {/* Компонент безлимитной подписки */}
      <div className="relative rounded-xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg">
        <div className="relative space-y-6">
          {/* Заголовок */}
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-4">
                <div className="rounded-md bg-secondary p-4">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Безлимит заявок</h3>
                  <p className="text-sm text-muted-foreground">
                    Премиум подписка
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="secondary">
              {remainTimeUnLimitBooking?.remainingPercentage !== 0
                ? "Активна"
                : "Не активна"}
            </Badge>
          </div>

          {/* Прогресс */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Осталось времени</span>
              <span className="font-medium">
                {remainTimeUnLimitBooking?.remainingDays} дней
              </span>
            </div>
            <Progress
              value={remainTimeUnLimitBooking?.remainingPercentage ?? 0}
              className="h-1 text-blue-500"
            />
          </div>

          {/* Детали подписки */}
          {/* // Проверяем покупал ли он ее хотя-бы раз */}
          {user?.activeSubscriptions?.unLimitedBookingSubscription
            ?.purchasedAt && (
            <div className="space-y-3 rounded-lg bg-muted/50 p-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Дата покупки</span>
                </div>
                {/* Точечки с псевдоэлементом */}
                <div className="flex-grow relative mx-2">
                  <div className="absolute -bottom-2 inset-0 border-b border-dotted border-muted-foreground/30" />
                </div>
                <span className="font-medium">
                  {getNeedFormatTime(
                    user?.activeSubscriptions?.unLimitedBookingSubscription
                      ?.purchasedAt,
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span>Дата окончания</span>
                </div>
                {/* Точечки с псевдоэлементом */}
                <div className="flex-grow relative mx-2">
                  <div className="absolute -bottom-2 inset-0 border-b border-dotted border-muted-foreground/30" />
                </div>
                <span className="font-medium">
                  {getNeedFormatTime(
                    user?.activeSubscriptions?.unLimitedBookingSubscription
                      ?.expiresAt,
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Действия */}
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <BadgeInfo className="h-4 w-4" />
                    <span className="ml-2">Подробнее о подписке</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Нажмите для просмотра полной информации о подписке</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button
              variant="secondary"
              className="hover:bg-muted-foreground/15"
              disabled={remainTimeUnLimitBooking?.remainingPercentage !== 0}
              onClick={() => navigate("/subscribe")}
            >
              Продлить подписку
            </Button>
          </div>
        </div>
      </div>

      {/* Компонент доступа к контактам */}
      <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-secondary p-4">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Просмотр контактов</h3>
                <p className="text-sm text-muted-foreground">
                  Базовая подписка
                </p>
              </div>
            </div>
          </div>
          <Badge variant="secondary">
            {remainTimeShowContact?.remainingPercentage !== 0
              ? "Активна"
              : "Не активна"}
          </Badge>
        </div>

        {/* Прогресс */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Осталось времени</span>
            <span className="font-medium">
              {remainTimeShowContact?.remainingDays} дней
            </span>
          </div>
          <Progress
            value={remainTimeShowContact?.remainingPercentage ?? 0}
            className="h-1 text-blue-500"
          />
        </div>
        {/* Детали подписки */}
        {/* // Проверяем покупал ли он ее хотя-бы раз */}
        {user?.activeSubscriptions?.showContactSubscription?.purchasedAt && (
          <div className="space-y-3 rounded-lg bg-muted/50 p-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Дата покупки</span>
              </div>
              {/* Точечки с псевдоэлементом */}
              <div className="flex-grow relative mx-2">
                <div className="absolute -bottom-2 inset-0 border-b border-dotted border-muted-foreground/30" />
              </div>
              <span className="font-medium">
                {getNeedFormatTime(
                  user?.activeSubscriptions?.showContactSubscription
                    ?.purchasedAt,
                )}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="h-4 w-4" />
                <span>Дата окончания</span>
              </div>
              {/* Точечки с псевдоэлементом */}
              <div className="flex-grow relative mx-2">
                <div className="absolute -bottom-2 inset-0 border-b border-dotted border-muted-foreground/30" />
              </div>
              <span className="font-medium">
                {getNeedFormatTime(
                  user?.activeSubscriptions?.showContactSubscription?.expiresAt,
                )}
              </span>
            </div>
          </div>
        )}

        {/* Действия */}
        <div className="flex items-center justify-between">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-primary"
                >
                  <BadgeInfo className="h-4 w-4" />
                  <span className="ml-2">Подробнее о подписке</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Нажмите для просмотра полной информации о подписке</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="secondary"
            className="hover:bg-muted-foreground/15"
            disabled={remainTimeShowContact?.remainingPercentage !== 0}
            onClick={() => navigate("/subscribe")}
          >
            Продлить подписку
          </Button>
        </div>
      </div>
    </div>
  );
}
