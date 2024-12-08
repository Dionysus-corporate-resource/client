import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  LockIcon,
  MailIcon,
  MoreHorizontal,
  Phone,
  UserPlus,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { employeesApi, IcreateNewLogisticianBody } from "./api/employees-api";
import { toast } from "@/hooks/use-toast";
import { queryClient } from "@/shared/api/query-client";
import RemoveEmployeeDialogSure from "./components/remove-employee-dialog-sure";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IRolesCorporate } from "@/shared/model/types/user";
import { useAuth } from "@/app/providers/auth-provider";

export default function ProfileAddEmployeesPage() {
  const context = useAuth();
  const { data: employeesDto } = useQuery({
    queryKey: ["employees"],
    queryFn: employeesApi.getAll,
  });
  const addNewLogisticianMutation = useMutation({
    mutationFn: (formData: IcreateNewLogisticianBody) =>
      employeesApi.createNewLogistician(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
  // состояния
  const [isOpenNewLogistician, setIsOpenNewLogistician] = useState(false);
  const [formData, setFormData] = useState<IcreateNewLogisticianBody>({
    email: "",
    password: "",
    phone: "",
    userName: "",
  });
  // обработчики
  const handleChangeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setFormData((formData) => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };
  const handleSubmitLoginInCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("add-employee Data", formData);
    addNewLogisticianMutation.mutate(formData, {
      onSuccess: () => {
        toast({
          title: "Сотрудник создан",
          description: "Данные о сотруднике успешно созданы",
        });
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        setFormData({ email: "", password: "", phone: "", userName: "" });
        // закрываем окно создание сотрудника
        setIsOpenNewLogistician(false);
      },
      onError: () => {
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        toast({
          title: "Ошибка",
          description: "Не удалось создать пользователя",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {context?.user?.corporateRoles.includes("general_director") && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row justify-between items-start space-x-3 space-y-0 rounded-md border p-4">
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-black leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Не хватает сотрудников?
              </label>
              <p className="text-sm text-muted-foreground">
                Вы можете добавить новых сотрудников в свою компанию
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpenNewLogistician((prev) => !prev)}
            >
              <UserPlus className="h-2 w-2" />
              {isOpenNewLogistician ? "Отмена" : "Добавить"}
            </Button>
          </div>
          {isOpenNewLogistician && (
            <form className="mt-6" onSubmit={handleSubmitLoginInCompany}>
              <CardContent className="grid gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName" className="flex items-center">
                      <UserX className="mr-2 h-4 w-4" />
                      Имя сотрудника
                    </Label>
                    <Input
                      id="userName"
                      type="userName"
                      name="userName"
                      onChange={handleChangeFormData}
                      placeholder="Егор Астапов"
                      required
                    />
                    <div className="text-[0.8rem] text-muted-foreground">
                      Введите имя сотрудника
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="mr-2 h-4 w-4" />
                      Телефон
                    </Label>
                    <Input
                      id="phone"
                      type="phone"
                      name="phone"
                      onChange={handleChangeFormData}
                      placeholder="+7 918 522 54 37"
                      required
                    />
                    <div className="text-[0.8rem] text-muted-foreground">
                      Введите телефон сотрудника
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <MailIcon className="mr-2 h-4 w-4" />
                      Почта
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      onChange={handleChangeFormData}
                      placeholder="m@example.com"
                      required
                    />
                    <div className="text-[0.8rem] text-muted-foreground">
                      Придумайте корпоративную почту сотруднику
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center">
                      <LockIcon className="mr-2 h-4 w-4" />
                      Пароль
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      onChange={handleChangeFormData}
                      placeholder="*********"
                      required
                    />
                    <div className="text-[0.8rem] text-muted-foreground">
                      Придумайте корпоративный пароль сотруднику
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full" size="sm">
                  Зарегистрировать сотрудника
                </Button>
              </CardContent>
            </form>
          )}
        </div>
      )}

      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Почта</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead className=" text-right">Должность</TableHead>
            {context?.user?.corporateRoles.includes("general_director") && (
              <TableHead></TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employeesDto?.map((employee) => (
            <TableRow key={employee._id}>
              <TableCell>{employee?.userData?.userName}</TableCell>
              <TableCell className="font-medium">
                {employee?.userData?.email}
              </TableCell>

              <TableCell>{employee?.userData?.phone}</TableCell>

              <TableCell className="text-right">
                <Badge variant="secondary">{employee?.corporateRoles[0]}</Badge>
              </TableCell>
              {context?.user?.corporateRoles.includes("general_director") && (
                <TableCell>
                  <PopoverSettingsLogistician
                    logisticianId={employee.userData._id}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function PopoverSettingsLogistician({
  logisticianId,
}: {
  logisticianId: string;
}) {
  const toggleLogisticianRolesMutation = useMutation({
    mutationFn: ({
      logisticianId,
      roles,
    }: {
      logisticianId: string;
      roles: IRolesCorporate[];
    }) => employeesApi.toggleLogisticianRole(logisticianId, roles),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  // open={isOpen} onOpenChange={setIsOpen}
  //
  const onChangeRolesForLagistician = (
    logisticianId: string,
    roles: IRolesCorporate[],
  ) => {
    toggleLogisticianRolesMutation.mutate(
      { logisticianId, roles },
      {
        onSuccess: () => {
          toast({
            title: "Роль сотрудника успешно изменена",
            description: "Данные о сотруднике успешно изменены",
          });
          queryClient.invalidateQueries({ queryKey: ["employees"] });
        },
        onError: () => {
          queryClient.invalidateQueries({ queryKey: ["employees"] });
          toast({
            title: "Ошибка",
            description: "Не удалось изменить роль сотрудника",
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Редактировать</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setIsOpen(true)}>
              Удалить сотрудника
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Изменить роль</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem
                    onClick={() =>
                      onChangeRolesForLagistician(logisticianId, ["manager"])
                    }
                  >
                    Менеджер
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      onChangeRolesForLagistician(logisticianId, ["dispatcher"])
                    }
                  >
                    Диспетчер
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Дальше, больше...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <RemoveEmployeeDialogSure
        logisticianId={logisticianId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
