import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Star,
  TrendingUp,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { StatsSection } from "@/entities/landing";
import { TestimonialCard } from "@/entities/landing";
import { FeatureCard } from "@/entities/landing";
import { LogoCloud } from "@/entities/landing";

export default function LandingPage() {
  return (
    <div className="w-full mx-auto flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge variant="secondary" className="rounded-full">
                Новая версия 2.0 уже доступна
              </Badge>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Управляйте грузоперевозками
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Автоматизируйте работу с заявками, управляйте автопарком и
                контролируйте все процессы в одном месте
              </p>
            </div>
            <div className="space-x-4">
              <Button
                size="lg"
                className="transition-transform hover:scale-105"
              >
                Начать бесплатно
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Демо-версия
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Бесплатный пробный период 14 дней. Без кредитной карты.
            </p>
          </div>
        </div>
      </section>

      {/* Logo Cloud */}
      <LogoCloud />

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="secondary">Возможности</Badge>
                <Badge variant="secondary">Автоматизация</Badge>
                <Badge variant="secondary">Контроль</Badge>
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Все необходимые инструменты в одном месте
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Оптимизируйте процессы и сократите время на рутинные задачи
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <FeatureCard
              icon={<Truck className="h-10 w-10" />}
              title="Управление автопарком"
              description="Контролируйте местоположение и состояние транспорта в режиме реального времени"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10" />}
              title="Работа с водителями"
              description="Назначайте рейсы, отслеживайте выполнение и управляйте документами"
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10" />}
              title="Аналитика и отчеты"
              description="Получайте детальную статистику и стройте прогнозы на основе данных"
            />
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
                Нам доверяют более 1000 компаний
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Узнайте, что говорят наши клиенты о работе с нами
              </p>
            </div>
          </div>
          <div className="mx-auto grid gap-6 py-12 lg:grid-cols-3">
            <TestimonialCard
              quote="Внедрение системы позволило нам сократить время обработки заявок на 40% и увеличить количество выполненных рейсов."
              author="Александр Петров"
              role="Директор по логистике"
              company="ТК Экспресс"
            />
            <TestimonialCard
              quote="Удобный интерфейс и отличная техподдержка. Все наши пожелания были учтены и реализованы в кратчайшие сроки."
              author="Елена Смирнова"
              role="Руководитель отдела перевозок"
              company="Логистик Про"
            />
            <TestimonialCard
              quote="Благодаря системе мы смогли оптимизировать маршруты и снизить расходы на топливо на 25%. Рекомендуем!"
              author="Дмитрий Иванов"
              role="Генеральный директор"
              company="АвтоЛайн"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Часто задаваемые вопросы
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Ответы на популярные вопросы о нашем сервисе
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Как начать работу с системой?
                </AccordionTrigger>
                <AccordionContent>
                  Начать работу очень просто: зарегистрируйтесь на сайте,
                  выберите подходящий тариф и получите доступ к системе. Мы
                  предоставляем 14 дней бесплатного пробного периода, чтобы вы
                  могли оценить все возможности сервиса.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Какие интеграции поддерживаются?
                </AccordionTrigger>
                <AccordionContent>
                  Мы поддерживаем интеграции с популярными системами учета (1С,
                  SAP), спутник��вого мониторинга, а также предоставляем API для
                  разработки собственных интеграций.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Как происходит техническая поддержка?
                </AccordionTrigger>
                <AccordionContent>
                  Мы предоставляем техническую поддержку по email, телефону и
                  через чат на сайте. Время реакции зависит от выбранного
                  тарифа. Для корпоративных клиентов доступен персональный
                  менеджер.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Готовы начать?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Присоединяйтесь к тысячам компаний, которые уже оптимизировали
                свою работу с нашей помощью
              </p>
            </div>
            <div className="space-x-4">
              <Button
                size="lg"
                className="transition-transform hover:scale-105"
              >
                Попробовать бесплатно
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Запросить демо
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>14 дней бесплатно</span>
              <CheckCircle2 className="h-4 w-4 text-primary ml-4" />
              <span>Без кредитной карты</span>
              <CheckCircle2 className="h-4 w-4 text-primary ml-4" />
              <span>Отмена в любое время</span>
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
            >
              Публичная оферта
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
