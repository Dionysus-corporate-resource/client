import { BadgeRussianRuble } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { useNavigate } from "react-router";
import { Progress } from "@/shared/components/ui/progress";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const [lineRedirect, setLineRedirect] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setLineRedirect((prev) => prev - 1);
    }, 100);

    return () => clearInterval(timeInterval);
  }, []);
  useEffect(() => {
    if (lineRedirect <= 0) {
      navigate("/profile");
    }
  }, [lineRedirect, navigate]);

  return (
    <div className="container mx-auto flex justify-center">
      <div className="flex items-center justify-center bg-background p-4">
        <Card className="max-w-xl">
          <CardHeader className="">
            {/* <div className="flex justify-center mb-4">
              <BadgeCheck className="h-12 w-12" />
            </div> */}

            <div className="flex items-center gap-4">
              <BadgeRussianRuble className="h-8 w-8" />
              <div className="space-y-0">
                <CardTitle className="text-2xl font-bold">
                  Вы вернулись
                </CardTitle>
                <CardDescription>
                  Вас перенаправят на страницу профиля
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Детали подписки */}
            <div className="space-y-3 rounded-lg bg-muted/50 p-3">
              <div className="text-muted-foreground">
                <p>
                  Если вы оплатили подписку, она появиться в вашем профиле.
                  Обычно это происходит сразу, но может занять и несколько
                  минут. Если вдруг подписка не появилась, напишите в поддержку
                </p>
              </div>
              {/* <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Дата покупки</span>
                </div>
                <div className="flex-grow relative mx-2">
                  <div className="absolute -bottom-2 inset-0 border-b border-dotted border-muted-foreground/30" />
                </div>
                <span className="font-medium">31.01.25</span>
              </div> */}

              {/* <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="h-4 w-4" />
                  <span>Дата окончания</span>
                </div>
                <div className="flex-grow relative mx-2">
                  <div className="absolute -bottom-2 inset-0 border-b border-dotted border-muted-foreground/30" />
                </div>
                <span className="font-medium">29.02.25</span>
              </div> */}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4">
            <Progress value={lineRedirect} className="h-2" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
