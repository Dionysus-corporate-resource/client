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
  ChevronRight,
  Sparkles,
  Ticket,
  Timer,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router";

export default function SubscriptionInfo() {
  const navigate = useNavigate();
  const user = useAtomValue(userStorageAtom);
  const purchasedBooking = user?.activeSubscriptions?.purchasedBooking;
  const unLimitedBookingSubscription =
    user?.activeSubscriptions?.unLimitedBookingSubscription;
  const showContactSubscription =
    user?.activeSubscriptions?.showContactSubscription;

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
      {!unLimitedBookingSubscription?.isPurchased && (
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
              <Badge variant="secondary">Активна</Badge>
            </div>

            {/* Прогресс */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Осталось времени</span>
                <span className="font-medium">25 дней</span>
              </div>
              <Progress value={80} className="h-1 text-blue-500" />
            </div>

            {/* Детали подписки */}
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
                <span className="font-medium">31.01.25</span>
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
                <span className="font-medium">29.02.25</span>
              </div>
            </div>

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
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground"
              >
                Продлить подписку
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Компонент доступа к контактам */}
      {!showContactSubscription?.isPurchased && (
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
            <Badge variant="secondary">Активно</Badge>
          </div>

          {/* Прогресс */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Осталось времени</span>
              <span className="font-medium">25 дней</span>
            </div>
            <Progress value={80} className="h-1 text-blue-500" />
          </div>
          {/* Детали подписки */}
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
              <span className="font-medium">31.01.25</span>
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
              <span className="font-medium">29.02.25</span>
            </div>
          </div>

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
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground"
            >
              Продлить подписку
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
