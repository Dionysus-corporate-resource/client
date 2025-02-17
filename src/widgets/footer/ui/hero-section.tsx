import { Button } from "@/shared/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900 pt-16">
      {/* Градиентный фон */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent" />

      <div className="container mx-auto relative">
        <div className="grid gap-8 pb-16 pt-12 md:grid-cols-2 md:pb-24 md:pt-16">
          {/* Левая колонка */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                Умная платформа грузоперевозок
                <span className="text-blue-400">нового поколения</span>
              </h1>
              <p className="max-w-[600px] text-slate-300 md:text-xl">
                Соединяем грузоотправителей и перевозчиков. Автоматизируем все
                процессы от заявки до доставки.
              </p>
            </div>

            <div className="space-y-4 text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
                <span>Экономия до 30% на логистических расходах</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
                <span>Более 5000 проверенных перевозчиков</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-400" />
                <span>Страхование грузов на сумму до 10 млн ₽</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="group">
                Создать заявку
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 text-white hover:bg-white/20"
              >
                Стать перевозчиком
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-400">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-slate-900 bg-slate-800"
                  />
                ))}
              </div>
              <p>Более 10 000 компаний уже с нами</p>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="relative lg:ml-12">
            {/* Декоративная рамка */}
            <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 blur-lg" />

            {/* Основное изображение */}
            <div className="relative rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <div className="h-[500px] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1616432043562-3671ea2e5242?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Интерфейс платформы"
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>

              {/* Плавающая карточка статистики */}
              <div className="absolute -right-6 -top-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-slate-600">
                    Активных заявок
                  </p>
                  <p className="text-2xl font-bold text-slate-900">2,451</p>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <span>+12.5%</span>
                    <span className="text-slate-600">к прошлой неделе</span>
                  </div>
                </div>
              </div>

              {/* Плавающая карточка с маршрутом */}
              <div className="absolute -bottom-6 -left-6 rounded-lg bg-white p-4 shadow-lg">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      Москва → Санкт-Петербург
                    </span>
                    <span className="text-sm text-slate-600">12т</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-3/4 rounded-full bg-blue-600" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">В пути</span>
                    <span className="font-medium text-blue-600">35,000 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
