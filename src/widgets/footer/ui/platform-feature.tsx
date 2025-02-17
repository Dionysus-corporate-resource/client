import { Button } from "@/shared/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { ArrowRight } from "lucide-react";

export function PlatformFeatures() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Возможности платформы
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Все необходимые инструменты для эффективной работы
          </p>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="shippers" className="mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="shippers">Грузоотправителям</TabsTrigger>
              <TabsTrigger value="carriers">Перевозчикам</TabsTrigger>
            </TabsList>
            <TabsContent value="shippers" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                  {shipper_features.map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="rounded-lg bg-blue-500/10 p-3">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-slate-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative rounded-xl bg-white p-4 shadow-lg">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Интерфейс для грузоотправителей"
                    className="rounded-lg"
                  />
                  <Button className="absolute -bottom-6 left-1/2 -translate-x-1/2 shadow-lg">
                    Попробовать бесплатно
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="carriers" className="mt-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-8">
                  {carrier_features.map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="rounded-lg bg-purple-500/10 p-3">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-900">
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-slate-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative rounded-xl bg-white p-4 shadow-lg">
                  <img
                    src="/placeholder.svg?height=400&width=400"
                    alt="Интерфейс для перевозчиков"
                    className="rounded-lg"
                  />
                  <Button
                    variant="outline"
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 shadow-lg"
                  >
                    Стать перевозчиком
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

const shipper_features = [
  {
    icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
    title: "Быстрое создание заявок",
    description: "Интуитивный интерфейс для создания заявок за пару минут",
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
    title: "Автоматический подбор перевозчиков",
    description:
      "Система сама находит подходящих перевозчиков по вашим критериям",
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
    title: "Торги и аукционы",
    description: "Получайте лучшие цены через систему торгов",
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-blue-600" />,
    title: "Электронный документооборот",
    description: "Все документы в электронном виде с юридической силой",
  },
];

const carrier_features = [
  {
    icon: <ArrowRight className="h-6 w-6 text-purple-600" />,
    title: "Умный поиск заказов",
    description: "Находите заказы по вашим параметрам и направлениям",
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-purple-600" />,
    title: "Управление автопарком",
    description: "Контролируйте свой транспорт и водителей в одном месте",
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-purple-600" />,
    title: "Финансовая аналитика",
    description: "Отслеживайте доходы и расходы по каждому рейсу",
  },
  {
    icon: <ArrowRight className="h-6 w-6 text-purple-600" />,
    title: "Быстрые выплаты",
    description: "Получайте оплату сразу после выполнения заказа",
  },
];
