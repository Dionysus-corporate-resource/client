import { Card, CardContent } from "@/shared/components/ui/card";
import { Building2, Route, Timer, TrendingUp } from "lucide-react";

export function StatsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Building2 className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-2xl font-bold">1,000+</div>
                  <div className="text-sm text-muted-foreground">
                    Активных клиентов
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Route className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-2xl font-bold">50,000+</div>
                  <div className="text-sm text-muted-foreground">
                    Рейсов в месяц
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Timer className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-2xl font-bold">40%</div>
                  <div className="text-sm text-muted-foreground">
                    Экономия времени
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-2xl font-bold">25%</div>
                  <div className="text-sm text-muted-foreground">
                    Рост эффективности
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
