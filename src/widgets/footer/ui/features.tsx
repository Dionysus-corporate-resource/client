import { Shield, Truck, Clock, BarChart } from "lucide-react";

export function Features() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Преимущества платформы
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Создаем будущее грузоперевозок уже сегодня
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-blue-500/10" />
              <div className="relative">
                <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3">
                  {feature.icon}
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: <Truck className="h-6 w-6 text-blue-600" />,
    title: "Большая база перевозчиков",
    description:
      "Тысячи проверенных перевозчиков готовы выполнить ваш заказ в любой точке России",
  },
  {
    icon: <Shield className="h-6 w-6 text-blue-600" />,
    title: "Безопасные сделки",
    description:
      "Контроль оплаты и документов. Страхование грузов на крупные суммы",
  },
  {
    icon: <Clock className="h-6 w-6 text-blue-600" />,
    title: "Быстрое оформление",
    description:
      "Создание заявки занимает 2 минуты. Первые отклики приходят через 10 минут",
  },
  {
    icon: <BarChart className="h-6 w-6 text-blue-600" />,
    title: "Аналитика и контроль",
    description:
      "Отслеживание грузов онлайн. Подробная статистика по всем перевозкам",
  },
];
