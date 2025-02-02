import {
  CheckCircle2,
  ChevronRight,
  Star,
  Shield,
  UserCircle,
  Bell,
  Map,
  TableProperties,
  WalletCardsIcon as Cards,
  Route,
  FileText,
  Phone,
  Package,
  Search,
  MapPinned,
  MonitorSmartphone,
  PackageSearch,
  ChartArea,
  UserPen,
  FolderArchive,
  Check,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import { TestimonialCard } from "@/entities/landing";
import { FeatureCard } from "@/entities/landing";
import { useNavigate } from "react-router";

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto flex flex-col min-h-screen">
      {/* Hero Section с интерактивной картой */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('/map-background.svg')] bg-no-repeat bg-cover" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge
                variant="secondary"
                className="rounded-full bg-gradient-to-r from-primary/80 to-primary px-4 py-1 text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                Быстрый поиск перевозчиков и грузов
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Грузоперевозки без посредников
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Находите надежных перевозчиков или выгодные заказы на перевозку
                грузов. Прямое взаимодействие между заказчиками и перевозчиками.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                size="lg"
                className="transition-transform hover:scale-105"
                onClick={() => navigate("/create-booking")}
              >
                Разместить груз
                <Package className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/")}>
                Найти груз
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с видами отображения */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Удобные способы поиска грузов
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Выбирайте наиболее удобный способ просмотра доступных заявок
            </p>
          </div>
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-[400px] mx-auto mb-8">
              <TabsTrigger value="map">
                <Map className="h-4 w-4 mr-2" />
                Карта
              </TabsTrigger>
              <TabsTrigger value="cards">
                <Cards className="h-4 w-4 mr-2" />
                Карточки
              </TabsTrigger>
              <TabsTrigger value="table">
                <TableProperties className="h-4 w-4 mr-2" />
                Таблица
              </TabsTrigger>
            </TabsList>
            <TabsContent value="map" className="mt-4">
              <div className="aspect-video bg-card rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/screen-map1.png"
                  alt="Карта с грузами"
                  className="w-full "
                />
              </div>
            </TabsContent>
            <TabsContent value="cards" className="mt-4">
              <div className="aspect-video bg-card rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/screen-card1.png"
                  alt="Список карточек"
                  className="w-full"
                />
              </div>
            </TabsContent>
            <TabsContent value="table" className="mt-4">
              <div className="aspect-video bg-card rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/screen-table1.png"
                  alt="Таблица с грузами"
                  className="w-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Logo Cloud */}
      {/* <LogoCloud /> */}

      {/* Stats Section */}
      {/* <StatsSection /> */}

      {/* Features Section с расширенными возможностями */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 flex-wrap gap-2">
                <Badge
                  variant="secondary"
                  className="rounded-full bg-gradient-to-r from-primary/80 to-primary px-4 py-1 text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  Удобство
                </Badge>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-gradient-to-r from-primary/80 to-primary px-4 py-1 text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  Безопасность
                </Badge>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-gradient-to-r from-primary/80 to-primary px-4 py-1 text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  Эффективность
                </Badge>
                <Badge
                  variant="secondary"
                  className="rounded-full bg-gradient-to-r from-primary/80 to-primary px-4 py-1 text-white shadow-lg hover:shadow-xl transition-shadow"
                >
                  Автоматизация
                </Badge>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Все необходимые инструменты на одной платформе
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Полный набор функций для эффективного взаимодействия заказчиков
                и перевозчиков
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <FeatureCard
              icon={<MapPinned className="h-6 w-6" />}
              title="Интерактивная карта"
              description="Просматривайте грузы на карте, в виде списка или таблицы. Удобная фильтрация и поиск"
            />
            <FeatureCard
              icon={<MonitorSmartphone className="h-6 w-6" />}
              title="Управление заявками"
              description="Создавайте, редактируйте и отслеживайте статус ваших заявок на перевозку"
            />
            <FeatureCard
              icon={<UserPen className="h-6 w-6" />}
              title="Личный кабинет"
              description="Доступ к истории заказов, архиву заявок и статистике для заказчиков и перевозчиков"
            />
            <FeatureCard
              icon={<PackageSearch className="h-6 w-6" />}
              title="Расширенный посик"
              description="Удобная и гибкая панель сортировки и фильтрации заявок"
            />
            <FeatureCard
              icon={<FolderArchive className="h-6 w-6" />}
              title="Архив заявок"
              description="Храните историю всех заявок и легко восстанавливайте их из архива при необходимости"
            />
            <FeatureCard
              icon={<ChartArea className="h-6 w-6" />}
              title="Аналитика"
              description="Отслеживайте статистику просмотров и эффективность ваших заявок"
            />
          </div>
        </div>
      </section>

      {/* Секция для разных типов пользователей */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Преимущества для всех участников
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
              Наша платформа создана для удобства как заказчиков, так и
              перевозчиков
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <div className="flex items-center gap-4 mb-4">
                {/* <UserCircle className="h-8 w-8 text-primary" /> */}
                <h3 className="text-xl font-semibold">Для заказчиков</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Быстрый поиск надежных перевозчиков</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary " />
                  <span>Удобное создание и управление заявками</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary " />
                  <span>Отслеживание статистики просмотров</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary " />
                  <span>Архив заявок и история перевозок</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <div className="flex items-center gap-4 mb-4">
                {/* <Truck className="h-8 w-8 text-primary" /> */}
                <h3 className="text-xl font-semibold">Для перевозчиков</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Доступ к базе актуальных грузов</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Удобный поиск по направлениям</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Прямой контакт с заказчиками</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-primary" />
                  <span>Уведомления о новых заявках</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с инструкцией */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Как это работает
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
              Простой процесс взаимодействия на платформе
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border bg-background flex items-center justify-center mx-auto mb-4">
                <UserCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Регистрация</h3>
              <p className="text-sm text-muted-foreground">
                Создайте аккаунт как заказчик или перевозчик
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border bg-background flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Создание заявки</h3>
              <p className="text-sm text-muted-foreground">
                Разместите груз или найдите подходящую заявку
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border bg-background flex items-center justify-center mx-auto mb-4">
                <Route className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Выбор предложения</h3>
              <p className="text-sm text-muted-foreground">
                Выберите подходящего перевозчика или заказ
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full border bg-background flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Связь</h3>
              <p className="text-sm text-muted-foreground">
                Свяжитесь напрямую для обсуждения деталей
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-6 w-6 fill-primary text-primary" />
                ))}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Отзывы наших пользователей
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Узнайте, что говорят заказчики и перевозчики о работе с нашей
                платформой
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 py-12 lg:grid-cols-3">
            <TestimonialCard
              quote="Нашел надежного перевозчика за 30 минут. Груз доставлен вовремя и в целости."
              author="Александр Петров"
              role="Заказчик"
              company="ООО Стройматериалы"
            />
            <TestimonialCard
              quote="Удобный поиск заказов. Больше не нужно тратить время на обзвон диспетчеров."
              author="Елена Смирнова"
              role="Перевозчик"
              company="ИП Смирнова"
            />
            <TestimonialCard
              quote="Отличная платформа. За месяц нашли постоянных клиентов и увеличили загрузку машин."
              author="Дмитрий Иванов"
              role="Перевозчик"
              company="Транс-Авто"
            />
          </div>
        </div>
      </section>

      {/* Секция с актуальными направлениями */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Популярные направления
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
              Самые востребованные маршруты перевозок
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  <span className="font-semibold">
                    Москва → Санкт-Петербург
                  </span>
                </div>
                <Badge>150+ заявок</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Регулярные грузоперевозки между столицами
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  <span className="font-semibold">
                    Екатеринбург → Новосибирск
                  </span>
                </div>
                <Badge>80+ заявок</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Перевозки по Уральскому региону
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  <span className="font-semibold">Краснодар → Ростов</span>
                </div>
                <Badge>120+ заявок</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Доставка по Южному федеральному округу
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Часто задаваемые вопросы
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Ответы на популярные вопросы о нашей платформе
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Как разместить груз на платформе?
                </AccordionTrigger>
                <AccordionContent>
                  Зарегистрируйтесь как заказчик, заполните форму с описанием
                  груза, указав маршрут, вес, объем и другие параметры. Ваша
                  заявка будет доступна всем перевозчикам на платформе.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Как найти подходящий груз для перевозки?
                </AccordionTrigger>
                <AccordionContent>
                  Поиск груза доступен без регистрации, однако, чтобы созвонитьс
                  с закзчиком, вам нужно формить подписку - просмотрт контактов.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Есть ли платный функционал?</AccordionTrigger>
                <AccordionContent>
                  Да, за размещение и просмотр контактов заяввки нужно оформить
                  подписки.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Секция безопасности */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">
              Безопасность и гарантии
            </h2>
            <p className="text-muted-foreground md:text-lg max-w-[800px] mx-auto">
              Мы заботимся о безопасности наших пользователей
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <Shield className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Проверка пользователей
              </h3>
              <p className="text-sm text-muted-foreground">
                Все пользователи проходят верификацию перед получением доступа к
                платформе
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <FileText className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Юридическая защита</h3>
              <p className="text-sm text-muted-foreground">
                Все взаимодействия на платформе регулируются публичной офертой
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-lg border">
              <Bell className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Поддержка 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Наша команда поддержки всегда готова помочь в решении любых
                вопросов
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Начните работу прямо сейчас
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Присоединяйтесь к тысячам заказчиков и перевозчиков, которые уже
                используют нашу платформу
              </p>
            </div>
            <div className="space-x-4">
              <Button
                size="lg"
                className="transition-transform hover:scale-105"
                onClick={() => navigate("/register")}
              >
                Создать аккаунт
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              {/* <Button size="lg" variant="outline">

              </Button> */}
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Бесплатный пробный период</span>
              <CheckCircle2 className="h-4 w-4 text-primary ml-4" />
              <span>Круглосуточная поддержка</span>
              <CheckCircle2 className="h-4 w-4 text-primary ml-4" />
              <span>Расширеный поиск</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full border-t border-muted py-8 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                © 2025 Груз Рынок. Все права защищены.
              </p>
              <p className="text-sm text-muted-foreground">
                Скороход Р. Д., ИНН: 740703949460
              </p>
              <p className="text-sm text-muted-foreground">
                Контакты:{" "}
                <a
                  href="mailto:skorohodroman921@gmail.com"
                  className="hover:text-primary"
                >
                  skorohodroman921@gmail.com
                </a>
                ,{" "}
                <a href="tel:+79185229665" className="hover:text-primary">
                  +7 (918) 522-96-65
                </a>
              </p>
            </div>

            <a
              className="underline underline-offset-4 text-sm text-muted-foreground"
              href="https://drive.google.com/file/d/11qF2YpjL_4FQDJlr5wzz_wWcJ929z7Vg/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Публичная оферта
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
