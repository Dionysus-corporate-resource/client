import { AlertCircle, ArrowLeft, MailIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { NavLink } from "react-router";

export default function ErrorPage() {
  return (
    <div className="container mx-auto flex justify-center">
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
            <CardTitle className="text-2xl font-bold text-destructive">
              Ошибка оплаты
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-muted-foreground">
              <p>
                К сожалению, при обработке вашего платежа произошла ошибка.
                Пожалуйста, попробуйте еще раз или свяжитесь с нашей службой
                поддержки.
              </p>
            </div>
            <div className="border rounded-lg p-4 bg-muted">
              <p className="text-sm text-muted-foreground">
                Если проблема повторяется, убедитесь что:
              </p>
              <ul className="text-sm list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                <li>На карте достаточно средств</li>
                <li>Карта действительна и не заблокирована</li>
                <li>Все данные введены правильно</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full sm:w-auto">
              <NavLink to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Попробовать снова
              </NavLink>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <NavLink to="/">
                <MailIcon className="mr-2 h-4 w-4" />
                Связаться с поддержкой
              </NavLink>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
