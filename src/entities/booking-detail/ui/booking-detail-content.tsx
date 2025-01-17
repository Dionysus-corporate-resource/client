import { Check, MapPin, Sparkles, Star, Subscript, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { useNavigate } from "react-router-dom";

interface BookingDetailContentProps {
  requestNumber: string;
  date: string;
  customer: string;
  hasRating?: boolean;
  price: number;
  distance: number;
  location: string;
  unloadingLocation: string;
  volume: number;
  cargo: string;
  loadingMethod: string;
  weightCapacity: number;
  loadingDate: string;
}

export default function BookingDetailContent({
  requestNumber = "647740",
  date = "17 января 2025",
  customer = "ООО КСВ-ШИППИНГ",
  // hasRating = false,
  price = 1.85,
  distance = 540,
  location = "Самойловский, Самойловка рп",
  unloadingLocation = "Место выгрузки не указано, Касторное рп, Касторенский Район",
  volume = 500,
  cargo = "Подсолнечник",
  loadingMethod = "Маниту",
  weightCapacity = 60,
  loadingDate = "21.01.2025",
}: BookingDetailContentProps) {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl w-full">
      <div className="">
        <div className="flex justify-between items-start mb-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold">Заявка №{requestNumber}</h1>
            <p className="text-muted-foreground">{date}</p>
          </div>
          {/* <Button size="sm" className="mr-6">
            <Sparkles className="w-4 h-4" />
            Оплатить доступ
          </Button> */}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">{customer}</h2>
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            <Star className="w-3 h-3 mr-2" />
            Нет оценок
          </Badge>
        </div>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
            <TabsTrigger
              value="info"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Информация
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Отзывы{" "}
              <Badge variant="secondary" className="ml-1 h-5">
                0
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="dialog"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Диалог
            </TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-muted-foreground">
                  Контакты недоступны, для просмотра необходимо сменить тариф
                </p>
              </div>
              <Button
                size="sm"
                className="w-full"
                onClick={() => navigate("/landing/subscribe")}
              >
                <Sparkles className="w-4 h-4" />
                Оплатить доступ
              </Button>

              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      className="font-semibold bg-muted/50"
                      colSpan={4}
                    >
                      Основная информация
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ценна</TableCell>
                    <TableCell className="text-end">1.85 ₽/кг</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Расстояние</TableCell>
                    <TableCell className="text-end">500 км</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Объем перевозки
                    </TableCell>
                    <TableCell className="text-end">320 тонн</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Груз</TableCell>
                    <TableCell className="text-end">Подсолнечник</TableCell>
                  </TableRow>
                </TableBody>
                {/* Условия погрузки */}
                <TableBody>
                  <TableRow>
                    <TableCell
                      className="font-semibold bg-muted/50"
                      colSpan={4}
                    >
                      Условия погрузки
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Способ погрузки
                    </TableCell>
                    <TableCell className="text-end">Маниту</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Грузоподъемность весов
                    </TableCell>
                    <TableCell className="text-end">60 тонн</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Дата начала погрузки
                    </TableCell>
                    <TableCell className="text-end">21.03.2025</TableCell>
                  </TableRow>
                </TableBody>
                {/* Детали перевозки */}
                <TableBody>
                  <TableRow>
                    <TableCell
                      className="font-semibold bg-muted/50"
                      colSpan={4}
                    >
                      Детали перевозки
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Простой</TableCell>
                    <TableCell className="text-end">
                      1000 с 4х суток со дня погрузки
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Допустимая недостача
                    </TableCell>
                    <TableCell className="text-end">0.2%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Вид оплаты</TableCell>
                    <TableCell className="text-end">Наличный расчет</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Сроки оплаты</TableCell>
                    <TableCell className="text-end">
                      Перечислением на расчётный счёт, ИП обязательно
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="py-4 text-center text-muted-foreground">
              Отзывов пока нет
            </div>
          </TabsContent>

          <TabsContent value="dialog">
            <div className="py-4 text-center text-muted-foreground">
              Диалог недоступен
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
