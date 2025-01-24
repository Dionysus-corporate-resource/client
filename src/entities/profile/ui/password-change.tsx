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

import { KeyRound } from "lucide-react";

export default function PasswordChange() {
  return (
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
  );
}
