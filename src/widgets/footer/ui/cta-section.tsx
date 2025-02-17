import { Button } from "@/shared/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CtaSection() {
  return (
    <section className="bg-background py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Готовы начать работу с нами?
          </h2>
          <p className="mt-4 text-lg text-primary">
            Присоединяйтесь к тысячам компаний, которые уже оптимизировали свои
            грузоперевозки с помощью нашей платформы
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="group">
              Создать заявку
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 text-primary hover:bg-white/20"
            >
              Связаться с нами
            </Button>
          </div>
          <p className="mt-4 text-sm text-primary">
            Нужна помощь? Наши специалисты готовы ответить на ваши вопросы
          </p>
        </div>
      </div>
    </section>
  );
}
