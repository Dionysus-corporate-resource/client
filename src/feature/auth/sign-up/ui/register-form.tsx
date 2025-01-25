import { Construction, Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { NavLink } from "react-router";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/app/providers/auth-provider";
import { toast } from "@/shared/hooks/use-toast";

type FormData = {
  email: string;
  password: string;
  phone: string;
  nameCompany?: string;
};

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const authContext = useAuth();
  const [isCustomer, setIsCustomer] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    phone: "",
    nameCompany: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.password.length < 6) {
      return toast({
        title: "Ошибка валидации",
        description: "Пароль должен быть не менее 6 символов",
        variant: "destructive",
      });
    }
    // Формируем данные для отправки
    const dataToSend: FormData = {
      email: formData.email,
      password: formData.password,
      phone: formData.phone.replace(/[\s()-]/g, ""),
      ...(isCustomer && formData.nameCompany
        ? { nameCompany: formData.nameCompany }
        : {}),
    };

    // console.log("dataToSend", dataToSend);
    authContext
      ?.logUp(dataToSend)
      .then(() =>
        toast({
          title: "Вы зарегестрировались",
          description: "Поздравляю, регистрация прошла успешно!",
        }),
      )
      .catch((err) =>
        toast({
          title: "Ошибка",
          description: err?.response?.data?.message,
          variant: "destructive",
        }),
      );
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
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
            <h1 className="text-xl font-bold">
              Приветсвуем в
              <NavLink to="/" className="underline underline-offset-4">
                {" "}
                Груз Рынок
              </NavLink>
            </h1>
            <div className="text-center text-sm">
              Уже регистрировались на нашем сайте?{" "}
              <NavLink to="/login" className="underline underline-offset-4">
                Войти
              </NavLink>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Почта */}
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                {/* <AtSign className="w-4 h-6" /> */}
                <Label htmlFor="email">Почта</Label>
              </div>
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
              />
            </div>
            {/* Пароль */}
            <div className="grid gap-2 relative">
              <Label htmlFor="email">Пароль</Label>
              <Input
                id="password"
                type={!showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="**********"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-10 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4" />
                )}
              </span>
            </div>
            {/* Телефон */}
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                type="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="7 918 522 96 65"
                required
              />
            </div>
            {/* Выбор роли */}
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isCustomer}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setIsCustomer(checked);
                  }
                }}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Зарегистрироваться как логист или заказчик
              </label>
            </div>
            {isCustomer && (
              <>
                {/* Имя компании */}
                <div className="grid gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    {/* <AtSign className="w-4 h-6" /> */}
                    <Label htmlFor="company-name">
                      Название организации или ИП
                    </Label>
                  </div>
                  <Input
                    id="company-name"
                    type="company-name"
                    name="nameCompany"
                    value={formData.nameCompany}
                    onChange={handleChange}
                    placeholder="ООО Дионис или ИП Михайлов"
                    required
                  />
                </div>
              </>
            )}
            <Button type="submit" className="w-full mt-2">
              Зарегистрировать
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
        Нажимая Зарегистрировать, вы соглашаетесь с{" "}
        <a href="#">Публичной офертой</a> и <a href="#">Приватной политикой</a>.
      </div>
    </div>
  );
}
