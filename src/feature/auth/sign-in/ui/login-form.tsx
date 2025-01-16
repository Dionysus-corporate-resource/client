import { Construction } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { NavLink } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md">
                <Construction className="size-6" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Приветсвуем в Дионис.</h1>
            <div className="text-center text-sm">
              Еще не были на нашем сайте?{" "}
              <NavLink to="/register" className="underline underline-offset-4">
                Зарегистрироваться
              </NavLink>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                {/* <AtSign className="w-4 h-6" /> */}
                <Label htmlFor="email">Почта</Label>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="**********"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2">
              Войти
            </Button>
          </div>
          {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              или
            </span>
          </div>
          <Button variant="outline" className="w-full flex gap-2">
            <PhoneCall />
            Продолжить через телефон
          </Button> */}
        </div>
      </form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        Нажимая войти, вы соглашаетесь с <a href="#">Публичной офертой</a> и{" "}
        <a href="#">Приватной политикой</a>.
      </div>
    </div>
  );
}
