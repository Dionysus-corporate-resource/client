import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Как это работает
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Простой процесс для грузоотправителей и перевозчиков
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Для грузоотправителей */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-8 text-xl font-semibold text-slate-900">
              Для грузоотправителей
            </h3>
            <div className="space-y-8">
              {shipper_steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{step.title}</h4>
                    <p className="mt-1 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-8 w-full">
              Создать заявку
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Для перевозчиков */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-8 text-xl font-semibold text-slate-900">
              Для перевозчиков
            </h3>
            <div className="space-y-8">
              {carrier_steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500 text-sm font-medium text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">{step.title}</h4>
                    <p className="mt-1 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-8 w-full">
              Стать перевозчиком
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const shipper_steps = [
  {
    title: "Создайте заявку",
    description: "Укажите параметры груза, маршрут и условия перевозки",
  },
  {
    title: "Выберите перевозчика",
    description: "Сравните предложения и выберите лучшее по цене и условиям",
  },
  {
    title: "Заключите сделку",
    description: "Подтвердите заказ и дождитесь подачи транспорта",
  },
  {
    title: "Отслеживайте доставку",
    description: "Следите за перемещением груза в реальном времени",
  },
];

const carrier_steps = [
  {
    title: "Пройдите проверку",
    description: "Загрузите документы и пройдите верификацию компании",
  },
  {
    title: "Находите заказы",
    description: "Просматривайте актуальные заявки по вашим направлениям",
  },
  {
    title: "Делайте предложения",
    description: "Предлагайте свои условия и цены на перевозку",
  },
  {
    title: "Получайте оплату",
    description: "Выполняйте заказ и получайте оплату через систему",
  },
];
