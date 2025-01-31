import { CheckCircle2, Home, ShoppingCart } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { NavLink } from "react-router";

export default function SuccessPage() {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex items-center justify-center bg-background p-4">
        <Card className="max-w-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-500">
              Оплата прошла успешно!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-muted-foreground">
              <p>
                Спасибо за ваш заказ. Мы отправили подтверждение на вашу
                электронную почту.
              </p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Номер заказа:</span>
                <span className="font-medium">#123456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Сумма:</span>
                <span className="font-medium">5000 ₽</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full sm:w-auto">
              <NavLink to="/">
                <Home className="mr-2 h-4 w-4" />
                На главную
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <NavLink to="/">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Продолжить покупки
              </NavLink>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
