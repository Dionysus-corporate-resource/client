import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { BadgeCheck } from "lucide-react";
import { NavLink } from "react-router";

export type IPlan = {
  name: string;
  priceMonthly: string;
  priceYearly: string;
  description: string;
  popular: boolean;
  features: {
    "Основные функции": string[];
    Интеграции: string[];
  };
  highlight: string;
};

export default function SubscripeCard({
  subscription,
}: {
  subscription: IPlan;
}) {
  return (
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
        {Object.entries(subscription.features).map(([category, features]) => (
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
        ))}
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
  );
}
