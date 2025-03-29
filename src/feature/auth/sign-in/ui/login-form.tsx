import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { NavLink, useNavigate } from "react-router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "@/app/providers/auth-provider";
import { toast } from "@/shared/hooks/use-toast";

type FormData = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const authContext = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
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

    // console.log("dataToSend", formData);
    authContext
      ?.logIn(formData)
      .then(() =>
        toast({
          title: "Вы авторизованы",
          description: "Поздравляю, авторизация прошла успешно!",
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
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">Вход в аккаунт</h1>
            <div className="text-sm font-medium text-primary/60">
              Приветствуем вас снова!
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Почта"
              className="border-none bg-primary/5 py-6 px-5 rounded-xl"
              required
            />
            <div className="grid gap-2 relative">
              <Input
                id="password"
                type={!showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Пароль"
                className="border-none bg-primary/5 py-6 px-5 rounded-xl"
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
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full py-6 px-5 rounded-xl bg-[hsl(var(--access-primary))]"
            >
              Войти
            </Button>
            <div className="font-medium text-sm space-x-3">
              <span className="text-primary/60">Еще нет аккаунта?</span>
              <NavLink to="/login">Зарегистрироваться</NavLink>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
