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
    <Card className="h-min border shadow-none">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="w-min">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>ИП</AvatarFallback>
          </Avatar>
        </div>
        <div
          className="grid justify-between w-full
          grid-cols-1 md:grid-cols-2 gap-4 md:gap-2"
        >
          <div className="space-y-1">
            <CardTitle>Личные данные</CardTitle>
            <CardDescription>
              Управляйте вашей личной информацией
            </CardDescription>
          </div>
          <div className="flex flex-col items-end w-full gap-2">
            <Badge variant="secondary" className="h-8 w-fit">
              {userData?.email}
            </Badge>
            <Button
              className="w-fit"
              size="sm"
              onClick={() => authContext?.logOut()}
            >
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
