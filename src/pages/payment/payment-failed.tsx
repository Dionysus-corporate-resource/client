import { ArrowLeft, Asterisk, BadgeX, MailIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Progress } from "@/shared/components/ui/progress";

export default function ErrorPage() {
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
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-xl">
          <CardHeader className="">
            {/* <div className="flex justify-center mb-4">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div> */}
            <div className="flex items-center gap-4">
              <BadgeX className="h-8 w-8" />
              <div className="space-y-0">
                <CardTitle className="text-2xl font-bold">
                  Ошибка оплаты
                </CardTitle>
                <CardDescription>
                  Возможные причины отмены платежа
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Детали ошибки */}
            <div className="space-y-3 rounded-lg bg-muted/50 p-3">
              {/* Пункт 1: Проверка данных */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Asterisk className="h-4 w-4" />
                  <span>Проверьте корректность введенных данных</span>
                </div>
              </div>

              {/* Пункт 2: Проверка интернета */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Asterisk className="h-4 w-4" />
                  <span>
                    Убедитесь, что у вас стабильное интернет-соединение
                  </span>
                </div>
              </div>

              {/* Пункт 3: Повторная попытка */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Asterisk className="h-4 w-4" />
                  <span>
                    Попробуйте повторить действие через несколько минут
                  </span>
                </div>
              </div>

              {/* Пункт 4: Обратная связь */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Asterisk className="h-4 w-4" />
                  <span>
                    Если проблема не решается, обратитесь в нашу службу
                    поддержки <br />
                    {/* <a
                      href="mailto:support@example.com"
                      className="text-blue-500 underline"
                    >
                      support@example.com
                    </a> */}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Progress value={lineRedirect} className="h-2" />

            <div className="flex w-full gap-2">
              <Button asChild className="w-full sm:w-auto">
                <NavLink to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Попробовать снова
                </NavLink>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <NavLink to="/">
                  <MailIcon className="mr-2 h-4 w-4" />
                  Связаться с поддержкой
                </NavLink>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
