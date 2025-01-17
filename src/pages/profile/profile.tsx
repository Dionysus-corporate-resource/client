import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { KeyRound, PackageOpen, Save, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto mt-6">
      <div className="grid grid-cols-2 gap-4 ">
        {/* Personal Information */}
        <Card className="h-min">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-min ">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
            </div>
            <div className="w-max ">
              <CardTitle>Личные данные</CardTitle>
              <CardDescription>
                Управляйте вашей личной информацией
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 grid grid-cols-1">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Иван Петров" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Компания</Label>
                <Input id="company" placeholder="ООО 'Компания'" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (999) 999-99-99" />
              </div>
              <div className="space-y-2">
                <Label>Род деятельности</Label>
                <RadioGroup
                  defaultValue="customer"
                  className="flex space-x-4 py-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer">Заказчик перевозки</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="driver" id="driver" />
                    <Label htmlFor="driver">Водитель</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button variant="secondary" className="w-full col-span-2 mt-2">
                <Save className="w-4 h-4" />
                Сохранить
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Subscription Information */}
        <Card className="">
          <CardHeader>
            <CardTitle>Информация о подписке</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 h-full">
            <div className="rounded-lg border border-dashed p-6 text-center">
              <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">
                У вас нет ни одной подписки
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Перейдите в раздел "Тарифы" и выберите подходящий для вас
              </p>
              <Button
                className="mt-4"
                size="sm"
                onClick={() => navigate("/landing/subscribe")}
              >
                <Sparkles className="w-4 h-4" />
                Посмотреть подписки
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Password Change */}
        <Card className="h-min">
          <CardHeader>
            <CardTitle>Смена пароля</CardTitle>
            <CardDescription>
              Обновите ваш пароль для обеспечения безопасности аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Повторите пароль</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary">
                <KeyRound className="h-4 w-4 mr-1" />
                Сменить пароль
              </Button>
              <Button variant="link">Удалить аккаунт</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Уведомления</CardTitle>
          <CardDescription>
            Настройте способы получения уведомлений
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="email-notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>Email уведомления</span>
            </Label>
            <Switch id="email-notifications" />
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <Label
              htmlFor="sms-notifications"
              className="flex items-center space-x-2"
            >
              <Bell className="h-4 w-4" />
              <span>SMS уведомления</span>
            </Label>
            <Switch id="sms-notifications" />
          </div>
        </CardContent>
      </Card> */}

      {/* Connected Accounts */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Связанные аккаунты</CardTitle>
          <CardDescription>
            Подключите ваши социальные сети для быстрого входа
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5" />
              <span>Google</span>
            </div>
            <Button variant="outline" size="sm">
              Подключить
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5" />
              <span>Telegram</span>
            </div>
            <Button variant="outline" size="sm">
              Подключить
            </Button>
          </div>
        </CardContent>
      </Card> */}

      {/* Session Management */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Активные сессии</CardTitle>
          <CardDescription>
            Управляйте вашими активными сессиями на различных устройствах
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Chrome на Windows</p>
                <p className="text-xs text-muted-foreground">
                  Последняя активность: 2 часа назад
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Safari на iPhone</p>
                <p className="text-xs text-muted-foreground">
                  Последняя активность: 5 минут назад
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
