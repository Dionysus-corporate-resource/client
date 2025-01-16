import { BadgeCheck, HelpCircle, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { PricingToggle } from "@/entities/subscribe";
import { ComparisonTable } from "@/entities/subscribe";
import { NavLink } from "react-router";

export default function SubscriptionsPageShort() {
  const subscriptions = [
    {
      name: "Базовый",
      priceMonthly: "990",
      priceYearly: "9900",
      description:
        "Идеально подходит для небольших компаний и индивидуальных перевозчиков",
      popular: false,
      features: {
        "Основные функции": ["До 10 активных заявок", "Email поддержка"],
        Интеграции: ["Базовый API доступ", "Экспорт в Excel"],
      },
      highlight: "Начните работу прямо сейчас",
    },
    {
      name: "Профессиональный",
      priceMonthly: "2490",
      priceYearly: "24900",
      description: "Оптимальный выбор для растущего бизнеса",
      popular: true,
      features: {
        "Основные функции": [
          "До 50 активных заявок",
          "Расширенная статистика",
          "Приоритетная поддержка",
          "Уведомления в Telegram",
        ],
        Интеграции: ["Расширенный API доступ", "Интеграция с 1С"],
      },
      highlight: "Самый популярный выбор",
    },
    {
      name: "Корпоративный",
      priceMonthly: "4990",
      priceYearly: "49900",
      description: "Максимальные возможности для крупных компаний",
      popular: false,
      features: {
        "Основные функции": [
          "Неограниченное количество заявок",
          "Поддержка 24/7",
          "White label решение",
        ],
        Интеграции: ["Полный API доступ", "Индивидуальные доработки"],
      },
      highlight: "Максимум возможностей",
    },
  ];

  const faqs = [
    {
      question: "Как происходит оплата?",
      answer:
        "Оплата производится банковской картой или по безналичному расчету. При оплате картой списание происходит автоматически в начале каждого периода.",
    },
    {
      question: "Можно ли сменить тариф?",
      answer:
        "Да, вы можете изменить тариф в любое время. При переходе на более дорогой тариф доплата рассчитывается пропорционально оставшемуся времени.",
    },
    {
      question: "Есть ли пробный период?",
      answer:
        "Да, мы предоставляем 14 дней бесплатного использования для всех тарифов. В течение этого времени вы можете протестировать все функции выбранного тарифа.",
    },
    {
      question: "Какие способы оплаты доступны?",
      answer:
        "Мы принимаем оплату банковскими картами Visa, Mastercard, МИР, а также поддерживаем безналичный расчет для юридических лиц.",
    },
  ];

  return (
    <div className="container mx-auto flex justify-center items-center py-10 space-y-16">
      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 mt-2">
        {subscriptions.map((subscription) => (
          <Card
            key={subscription.name}
            className={`relative flex flex-col transition-all duration-200 hover:shadow-lg ${
              subscription.popular ? "border-primary shadow-lg scale-105" : ""
            }`}
          >
            {subscription.popular && (
              <Badge
                className="absolute -top-2 left-1/2 -translate-x-1/2"
                variant="default"
              >
                Популярный выбор
              </Badge>
            )}
            <CardHeader className="flex flex-col gap-4 text-center">
              <CardTitle className="text-xl">{subscription.name}</CardTitle>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    {subscription.priceMonthly}
                  </span>
                  <span className="text-muted-foreground">₽/мес</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  или {subscription.priceYearly} ₽/год (экономия 17%)
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {subscription.description}
              </p>
              <Badge variant="secondary" className="w-fit mx-auto">
                {subscription.highlight}
              </Badge>
            </CardHeader>

            <CardContent className="flex-1">
              {Object.entries(subscription.features).map(
                ([category, features]) => (
                  <div key={category} className="mb-6 last:mb-0">
                    <h3 className="text-sm font-medium mb-2">{category}</h3>
                    <ul className="space-y-2 text-sm">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <NavLink to="/landing/subscribe" className="w-full">
                <Button
                  className="w-full transition-transform duration-200 hover:scale-105"
                  variant={subscription.popular ? "default" : "outline"}
                  size="lg"
                >
                  Выбрать тариф
                </Button>
              </NavLink>

              <p className="text-xs text-center text-muted-foreground">
                14 дней бесплатно, отмена в любое время
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
