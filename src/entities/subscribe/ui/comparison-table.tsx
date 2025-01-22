import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface Subscription {
  name: string;
  features: Record<string, string[]>;
}
interface ComparisonTableProps {
  subscriptions: Subscription[];
}

export function ComparisonTable({ subscriptions }: ComparisonTableProps) {
  const features = {
    "Основные функции": [
      "Активные заявки",
      "Статистика и аналитика",
      "Техническая поддержка",
      "Уведомления в Telegram",
      "White label решение",
    ],
    Интеграции: [
      "API доступ",
      "Интеграция с 1С",
      "Экспорт данных",
      "Индивидуальные доработки",
    ],
    Пользователи: [
      "Количество пользователей",
      "Настройка ролей",
      "Командная работа",
      "Корпоративная безопасность",
    ],
  };

  const getFeatureValue = (subscription: Subscription, feature: string) => {
    switch (feature) {
      case "Активные заявки":
        return subscription.name === "Базовый"
          ? "До 10"
          : subscription.name === "Профессиональный"
            ? "До 50"
            : "Без ограничений";
      case "Статистика и аналитика":
        return subscription.name === "Базовый"
          ? "Базовая"
          : subscription.name === "Профессиональный"
            ? "Расширенная"
            : "Полная";
      case "Техническая поддержка":
        return subscription.name === "Базовый"
          ? "Email"
          : subscription.name === "Профессиональный"
            ? "Приоритетная"
            : "24/7 с персональным менеджером";
      case "Количество пользователей":
        return subscription.name === "Базовый"
          ? "1"
          : subscription.name === "Профессиональный"
            ? "До 5"
            : "Без ограничений";
      default: {
        const categoryKey = Object.keys(subscription.features).find(
          (category) =>
            subscription.features[category].some((f) => f.includes(feature)),
        ) as keyof typeof subscription.features;

        if (categoryKey !== undefined) {
          return subscription.features[categoryKey]?.some((f) =>
            f.includes(feature),
          ) ? (
            <Check className="h-4 w-4 text-primary mx-auto" />
          ) : (
            <X className="h-4 w-4 text-muted-foreground mx-auto" />
          );
        }

        return <X className="h-4 w-4 text-muted-foreground mx-auto" />;
      }
    }
  };

  return (
    <div className="hidden lg:block">
      <h2 className="text-2xl font-bold text-center mb-6">Сравнение тарифов</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Функции</TableHead>
            {subscriptions.map((sub) => (
              <TableHead key={sub.name} className="text-center">
                {sub.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(features).map(
            ([category, categoryFeatures]: [string, string[]]) => (
              <>
                <TableRow key={category}>
                  <TableCell className="font-medium bg-muted/50" colSpan={4}>
                    {category}
                  </TableCell>
                </TableRow>
                {categoryFeatures.map((feature) => (
                  <TableRow key={feature}>
                    <TableCell className="font-medium">{feature}</TableCell>
                    {subscriptions.map((sub) => (
                      <TableCell key={sub.name} className="text-center">
                        {getFeatureValue(sub, feature)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ),
          )}
        </TableBody>
      </Table>
    </div>
  );
}
