import { useAuth } from "@/app/providers/auth-provider";
import {
  PasswordChange,
  PersonalInfo,
  SubscriptionInfo,
} from "@/entities/profile";
import { ProfileEditForm } from "@/feature/auth/profile";

export default function ProfilePage() {
  const authContext = useAuth();

  return (
    <div className="w-full pt-6 bg-primary/5">
      <div className="container mx-auto w-full grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <PersonalInfo
            userData={authContext?.user}
            formSlot={<ProfileEditForm />}
          />

          <PasswordChange />
        </div>
        <SubscriptionInfo />
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
