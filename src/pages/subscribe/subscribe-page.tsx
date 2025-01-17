import { Check, HelpCircle } from "lucide-react";
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

export default function SubscriptionsPage() {
  const subscriptions = [
    {
      name: "Базовый",
      priceMonthly: "990",
      priceYearly: "9900",
      description:
        "Идеально подходит для небольших компаний и индивидуальных перевозчиков",
      popular: false,
      features: {
        "Основные функции": [
          "До 10 активных заявок",
          "Базовая статистика",
          "Email поддержка",
        ],
        Интеграции: ["Базовый API доступ", "Экспорт в Excel"],
        Пользователи: ["1 пользователь", "Базовые роли"],
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
        Интеграции: [
          "Расширенный API доступ",
          "Интеграция с 1С",
          "Экспорт в любом формате",
        ],
        Пользователи: [
          "До 5 пользователей",
          "Настраиваемые роли",
          "Командная работа",
        ],
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
          "Полная аналитика",
          "Персональный менеджер",
          "Поддержка 24/7",
          "White label решение",
        ],
        Интеграции: [
          "Полный API доступ",
          "Интеграция с любыми системами",
          "Индивидуальные доработки",
        ],
        Пользователи: [
          "Неограниченное количество пользователей",
          "Полное управление ролями",
          "Корпоративная безопасность",
        ],
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
    <div className="container mx-auto py-10 space-y-32 mt-44">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          Тарифные планы
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Выберите подходящий тариф для вашего бизнеса. Все тарифы включают
          14-дневный пробный период
        </p>
        <PricingToggle />
      </div>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
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
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                className="w-full transition-transform duration-200 hover:scale-105"
                variant={subscription.popular ? "default" : "outline"}
                size="lg"
              >
                Выбрать тариф
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                14 дней бесплатно, отмена в любое время
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>

      <ComparisonTable subscriptions={subscriptions} />

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Часто задаваемые вопросы
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  {faq.question}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="text-center space-y-4 bg-muted/50 rounded-lg p-8">
        <h2 className="text-2xl font-semibold">Нужна помощь с выбором?</h2>
        <p className="text-muted-foreground max-w-[600px] mx-auto">
          Наша команда поможет подобрать оптимальный тариф под ваши задачи и
          ответит на все вопросы
        </p>
        <Button size="lg" className="mt-4">
          Связаться с поддержкой
        </Button>
      </div>
    </div>
  );
}
