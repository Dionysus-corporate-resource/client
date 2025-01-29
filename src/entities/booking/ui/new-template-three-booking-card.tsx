import { Package, ArrowRight, Clock, Calendar, Truck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Separator } from "@/shared/components/ui/separator";

export default function TemplateThreeBookingCard() {
  return (
    <Card className="w-full max-w-md border bg-card">
      {/* Заголовок с номером заявки и статусом */}
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold">
              Заявка №2381
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                14:30
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                19 января
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="h-6">
              Активная
            </Badge>
            <span className="text-xs text-muted-foreground">ID: 92831</span>
          </div>
        </div>

        {/* Быстрая информация */}
        <div className="grid grid-cols-3 gap-4 p-3 bg-muted/30 rounded-lg">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Расстояние</p>
            <p className="font-medium">300 км</p>
          </div>
          <div className="text-center border-x border-border">
            <p className="text-xs text-muted-foreground mb-1">Вес</p>
            <p className="font-medium">20 тонн</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Ставка</p>
            <p className="font-medium">800 ₽/т</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="grid gap-6">
        {/* Маршрут */}
        <div className="relative grid grid-cols-[1fr_1fr] gap-4 py-2">
          <div className="absolute top-[24px] left-[15px] w-[calc(100%-30px)] h-[2px] bg-muted" />

          <div className="relative">
            <div className="absolute w-3 h-3 rounded-full bg-green-500 top-[5px] left-0" />
            <div className="pl-6">
              <p className="text-sm font-medium">Краснодар</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Место погрузки
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                20 янв, 10:00
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute w-3 h-3 rounded-full bg-red-500 top-[5px] left-0" />
            <div className="pl-6">
              <p className="text-sm font-medium">Ростов-на-Дону</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Место выгрузки
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                20 янв, 16:00
              </p>
            </div>
          </div>
        </div>

        {/* Детали груза */}
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center">
                <Package className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Груз</p>
                <p className="font-medium">Кукуруза</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-background flex items-center justify-center">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Тип ТС</p>
                <p className="font-medium">Тент</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Дополнительно</p>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="rounded-md">
                Боковая загрузка
              </Badge>
              <Badge variant="outline" className="rounded-md">
                Верхняя загрузка
              </Badge>
              <Badge variant="outline" className="rounded-md">
                Задняя загрузка
              </Badge>
            </div>
          </div>
        </div>

        {/* Действия */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="w-full">
            Отправить заявку
          </Button>
          <Button className="w-full">
            Подробнее
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
