import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Truck, Package, Clock, Shield } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-12 flex items-center border-b">
        <span className="ml-2 text-lg font-medium">лтк Дионис</span>
        <nav className="ml-auto flex">
          <NavLink
            to="/login"
            className="text-sm hover:underline underline-offset-4"
          >
            <Button variant="link">Войти</Button>
          </NavLink>
          <NavLink
            to="/register"
            className="text-sm hover:underline underline-offset-4"
          >
            <Button variant="link">Зарегистрироваться</Button>
          </NavLink>
          <NavLink
            to="/company-login"
            className="text-sm hover:underline underline-offset-4"
          >
            <Button variant="link">Войти в компанию</Button>
          </NavLink>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-12 lg:py-16 bg-black">
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-6">
                <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl text-white">
                  Надежные грузоперевозки для вашего бизнеса
                </h1>
                <p className="mx-auto max-w-[600px] text-sm text-gray-400 md:text-base">
                  Быстрая и безопасная доставка грузов по всей России.
                  Индивидуальный подход к каждому клиенту.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  size="sm"
                  className="bg-white text-black hover:bg-gray-200"
                >
                  Рассчитать стоимость
                </Button>
                <Button size="sm" variant="outline">
                  Узнать больше
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="services"
          className="w-full py-8 md:py-12 lg:py-16 bg-gray-50"
        >
          <div className="px-36 space-y-12">
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-4">
                Наши услуги
              </h2>
              <p className="max-w-[800px] text-sm text-gray-500 text-center">
                Мы - ведущая компания в сфере грузоперевозок и логистики с
                10-летним опытом работы. Наша цель - обеспечить быструю,
                безопасную и эффективную доставку грузов для наших клиентов.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-2 p-4 py-6">
                  <Truck className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold text-center">
                    Автомобильные перевозки
                  </h3>

                  <p className="max-w-[400px] text-sm text-center text-gray-500">
                    Быстрая и надежная доставка грузов автотранспортом по всей
                    стране.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-2 p-4 py-6">
                  <Package className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold text-center">
                    Складская логистика
                  </h3>
                  <p className="max-w-[400px]  text-sm text-center text-gray-500">
                    Современные складские комплексы для хранения и обработки
                    ваших грузов.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardContent className="flex flex-col items-center space-y-2 p-4 py-6">
                  <Clock className="w-8 h-8 text-primary" />
                  <h3 className="text-lg font-semibold text-center">
                    Экспресс-доставка
                  </h3>
                  <p className="max-w-[400px] text-sm text-center text-gray-500">
                    Срочная доставка грузов в кратчайшие сроки по специальным
                    тарифам.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-8 md:py-12 lg:py-16 px-36">
          <div className=" px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  О компании Дионис
                </h2>
                <p className="max-w-[600px] text-sm text-gray-500 md:text-base">
                  Мы - ведущая компания в сфере грузоперевозок и логистики с
                  10-летним опытом работы. Наша цель - обеспечить быструю,
                  безопасную и эффективную доставку грузов для наших клиентов.
                </p>
                <ul className="grid gap-2 py-4 text-sm">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" /> Гарантия
                    сохранности груза
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" /> Соблюдение сроков
                    доставки
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-primary" /> Современный
                    автопарк
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-8 md:py-12 lg:py-16 bg-gray-50"
        >
          <div className=" px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                  Свяжитесь с нами
                </h2>
                <p className="max-w-[600px] text-sm text-gray-500 md:text-base">
                  Готовы начать сотрудничество? Наши специалисты ответят на все
                  ваши вопросы и помогут выбрать оптимальное решение для ваших
                  потребностей.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex flex-col gap-2">
                  <input
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Ваше имя"
                    type="text"
                  />
                  <input
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Ваш email"
                    type="email"
                  />
                  <textarea
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]"
                    placeholder="Ваше сообщение"
                  ></textarea>
                  <Button type="submit" size="sm">
                    Отправить <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-4 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 ЛогистикПро. Все права защищены.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <NavLink to="" className="text-xs hover:underline underline-offset-4">
            Условия использования
          </NavLink>
          <NavLink to="" className="text-xs hover:underline underline-offset-4">
            Политика конфиденциальности
          </NavLink>
        </nav>
      </footer>
    </div>
  );
}
