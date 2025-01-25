import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { IUserDto } from "@/shared/model/types/user";
import { Badge } from "@/shared/components/ui/badge";
import { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/app/providers/auth-provider";

export default function PersonalInfo({
  userData,
  formSlot,
}: {
  userData: IUserDto | undefined | null;
  formSlot: ReactNode;
}) {
  const authContext = useAuth();
  return (
    <Card className="h-min">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="w-min ">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>ИП</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between w-full">
          <div className="space-y-1">
            <CardTitle>Личные данные</CardTitle>
            <CardDescription>
              Управляйте вашей личной информацией
            </CardDescription>
          </div>
          <div className="space-x-2">
            <Badge variant="secondary" className="h-8">
              {userData?.email}
            </Badge>
            <Button size="sm" onClick={() => authContext?.logOut()}>
              Выйти
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 grid grid-cols-1">
        {formSlot}
      </CardContent>
    </Card>
  );
}
