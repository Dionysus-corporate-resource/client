import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { NavLink } from "react-router";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/app/providers/auth-provider";
import { toast } from "@/shared/hooks/use-toast";

type FormData = {
  email: string;
  password: string;
  phone: string;
  companyName?: string;
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
    companyName: "",
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
      ...(isCustomer && formData.companyName
        ? { companyName: formData.companyName }
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
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-medium">Регистрация</h1>
            <div className="text-sm font-medium text-primary/60">
              Создайте аккаунт, чтобы выкладывать заявки и использовать все
              возможности платформы
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {/* Почта */}

            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              className="border-none bg-primary/5 py-6 px-5 rounded-[30px]"
              onChange={handleChange}
              placeholder="Почта"
              required
            />
            {/* Пароль */}
            <div className="grid gap-2 relative">
              <Input
                id="password"
                type={!showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-none bg-primary/5 py-6 px-5 rounded-[30px]"
                placeholder="Пароль"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute top-6 right-4 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? (
                  <Eye className="w-6 h-6" />
                ) : (
                  <EyeOff className="w-6 h-6" />
                )}
              </span>
            </div>
            {/* Телефон */}
            <Input
              id="phone"
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Телефон"
              className="border-none bg-primary/5 py-6 px-5 rounded-[30px]"
              required
            />
            {/* Выбор роли */}
            <div className="flex items-center space-x-3 mt-1">
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
                Я логист / заказчик
              </label>
            </div>
            {isCustomer && (
              <Input
                id="company-name"
                type="company-name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border-none bg-primary/5 py-6 px-5 rounded-[30px]"
                placeholder="ООО или ИП организации"
                required
              />
            )}
          </div>
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full py-6 px-5 rounded-[30px] bg-[hsl(var(--access-primary))]"
            >
              Зарегистрироваться
            </Button>
            <div className="font-medium text-sm space-x-3">
              <span className="text-primary/60">Уже есть аккаунт?</span>
              <NavLink to="/login">Войти</NavLink>
            </div>
          </div>
        </div>
      </form>
      {/* <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        Нажимая Зарегистрировать, вы соглашаетесь с{" "}
        <a href="#">Публичной офертой</a> и <a href="#">Приватной политикой</a>.
      </div> */}
    </div>
  );
}
