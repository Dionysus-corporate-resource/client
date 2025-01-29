import { Package, Route, Coins, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

export default function TemplateOneBookingCard() {
  return (
    <Card className="w-full max-w-md border bg-card">
      {/* Заголовок с номером заявки и статусом */}
      <CardHeader className="pb-4 flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Заявка №2381</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            19 янв, 14:30
          </div>
        </div>
        <Badge variant="secondary" className="h-6">
          Активная
        </Badge>
      </CardHeader>

      <CardContent className="grid gap-6">
        {/* Маршрут */}
        <div className="relative grid grid-cols-[1fr_1fr] gap-4 py-2">
          {/* Линия между точками маршрута */}
          {/* <div className="absolute top-[24px] left-[15px] w-[calc(100%-30px)] h-[2px] bg-muted" /> */}

          {/* Точка погрузки */}
          <div className="relative">
            <div className="absolute w-3 h-3 rounded-full bg-green-500 top-[5px] left-0" />
            <div className="pl-6">
              <p className="text-sm font-medium">Краснодар</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Место погрузки
              </p>
            </div>
          </div>

          {/* Точка выгрузки */}
          <div className="relative">
            <div className="absolute w-3 h-3 rounded-full bg-red-500 top-[5px] left-0" />
            <div className="pl-6">
              <p className="text-sm font-medium">Ростов-на-Дону</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Место выгрузки
              </p>
            </div>
          </div>
        </div>

        {/* Детали перевозки */}
        <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="space-y-4">
            {/* Километраж */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
                <Route className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Расстояние</p>
                <p className="font-medium">300 км</p>
              </div>
            </div>

            {/* Груз */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
                <Package className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Тип груза</p>
                <p className="font-medium">Кукуруза</p>
              </div>
            </div>
          </div>

          {/* Ставка и кнопка */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center border">
                <Coins className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Ставка</p>
                <p className="font-medium">800 ₽/тонна</p>
              </div>
            </div>

            <Button className="w-full" variant="default">
              Подробнее
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
