import { useAuth } from "@/app/providers/auth-provider";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  CompassIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignPage() {
  const context = useAuth();
  const [formDataLoginInCompany, setFormDataLoginInCompany] = useState({
    email: "",
    password: "",
    nameCompany: "",
  });
  const [formDataRegisterCompany, setFormDataRegisterCompany] = useState({
    email: "",
    password: "",
  });

  const handleChangeLoginInCompany = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = e.target;

    setFormDataLoginInCompany((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmitLoginInCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    context
      ?.logIn(formDataLoginInCompany)
      .then(() => {
        return toast({
          title: "Вы авторизованы",
          description: "Поздравляю, авторизация прошла цспешно!",
        });
      })
      .catch((err) => {
        console.error("Caught!! error:", err); // Для отладки

        return toast({
          title: `${err.response.data.message}`,
          description: "Не удалось войти(",
          variant: "destructive",
        });
      });
  };

  const handleChangeRegisterInCompany = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = e.target;

    setFormDataRegisterCompany((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmitRegisterCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // context
    //   ?.logIn(formDataRegisterCompany)
    //   .then(() => {
    //     return toast({
    //       title: "Вы авторизованы",
    //       description: "Поздравляю, авторизация прошла цспешно!",
    //     });
    //   })
    //   .catch((err) => {
    //     console.error("Caught!! error:", err); // Для отладки

    //     return toast({
    //       title: `${err.response.data.message}`,
    //       description: "Не удалось войти(",
    //       variant: "destructive",
    //     });
    //   });
  };
  return (
    <div className="flex flex-col h-screen w-screen">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-2">
        <section
          className="bg-primary text-primary-foreground p-6 sm:p-10 lg:p-16 flex flex-col justify-center"
          style={{
            backgroundImage: 'url("/images/truck1.png")',
            backgroundColor: "white",
            backgroundPosition: "center center", // Центрируем изображение
            backgroundRepeat: "no-repeat", // Отключаем повтор
            backgroundSize: "contain", // Уменьшаем масштаб, чтобы все изображение поместилось
          }}
        ></section>

        <section className="p-6 sm:p-10 lg:p-16 flex items-center justify-center">
          <div className="flex flex-col items-center w-full max-w-lg flex-1">
            <CardHeader className="space-y-1 items-center mb-0">
              <CardTitle className="text-4xl">Корпоративнй ресурс</CardTitle>
              <CardDescription>
                Площадка для вашего корпоративнй ресурса
              </CardDescription>
            </CardHeader>
            <Tabs
              defaultValue="account"
              className="w-full flex flex-col items-center"
            >
              <TabsList className="mb-10 w-fit">
                <TabsTrigger value="account">Войти</TabsTrigger>
                <TabsTrigger value="password">Cоздать компанию</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="w-full">
                <div className="w-full max-w-lg flex-1">
                  <form onSubmit={handleSubmitLoginInCompany}>
                    <CardContent className="grid gap-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 col-span-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="nameCompany"
                              className="flex items-center"
                            >
                              <CompassIcon className="mr-2 h-4 w-4" />
                              Название компании
                            </Label>
                            <Input
                              id="nameCompany"
                              type="text"
                              name="nameCompany"
                              onChange={handleChangeLoginInCompany}
                              placeholder="лтк Дионис"
                              required
                            />
                            <div className="text-[0.8rem] text-muted-foreground">
                              Введите имя компании
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className="flex items-center"
                            >
                              <MailIcon className="mr-2 h-4 w-4" />
                              Почта
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChangeLoginInCompany}
                              placeholder="m@example.com"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="password"
                              className="flex items-center"
                            >
                              <LockIcon className="mr-2 h-4 w-4" />
                              Пароль
                            </Label>
                            <Input
                              id="password"
                              type="password"
                              name="password"
                              onChange={handleChangeLoginInCompany}
                              placeholder="*********"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <Button type="submit" className="w-full">
                        Войти
                      </Button>
                    </CardContent>
                  </form>
                  <CardFooter className="flex flex-col items-center gap-4">
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                          лтк Дионис
                        </span>
                      </div>
                    </div>
                  </CardFooter>
                  <CardFooter className="flex gap-2 justify-center">
                    Don`t have an account?
                    <NavLink to="/register">Sign Up</NavLink>
                  </CardFooter>
                </div>
              </TabsContent>
              <TabsContent value="password" className="w-full">
                <div className="w-full max-w-lg flex-1">
                  <form onSubmit={handleSubmitRegisterCompany}>
                    <CardContent className="grid gap-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="grid grid-cols-1 col-span-2 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className="flex items-center"
                            >
                              <CompassIcon className="mr-2 h-4 w-4" />
                              Название компании
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              placeholder="лтк Дионис"
                              required
                            />
                            <div className="text-[0.8rem] text-muted-foreground">
                              Введите имя компании
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="userName"
                              className="flex items-center"
                            >
                              <UserIcon className="mr-2 h-4 w-4" />
                              Имя
                            </Label>
                            <Input
                              id="userName"
                              name="userName"
                              onChange={handleChange}
                              placeholder="Анатолий Палыч"
                              required
                            />
                            {/* <div className="text-[0.8rem] text-muted-foreground">
                              Имя Ген Директора
                            </div> */}
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="email"
                              className="flex items-center"
                            >
                              <MailIcon className="mr-2 h-4 w-4" />
                              Почта
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              placeholder="m@example.com"
                              required
                            />
                            {/* <div className="text-[0.8rem] text-muted-foreground">
                              Почта Ген Директора
                            </div> */}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label
                              htmlFor="password"
                              className="flex items-center"
                            >
                              <LockIcon className="mr-2 h-4 w-4" />
                              Пароль
                            </Label>
                            <Input
                              id="password"
                              type="password"
                              name="password"
                              onChange={handleChange}
                              placeholder="*********"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="phone"
                              className="flex items-center"
                            >
                              <PhoneIcon className="mr-2 h-4 w-4" />
                              Телефон
                            </Label>
                            <Input
                              id="phone"
                              type="tel"
                              name="phone"
                              required
                              onChange={handleChange}
                              placeholder="+8 (918) 555-5555"
                            />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Зарегистрировать
                      </Button>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center gap-4">
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            лтк Дионис
                          </span>
                        </div>
                      </div>
                    </CardFooter>
                  </form>

                  <CardFooter className="flex gap-2 justify-center">
                    Already have an account?
                    <NavLink to="/login">Sign in</NavLink>
                  </CardFooter>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Toaster />
    </div>
  );
}
