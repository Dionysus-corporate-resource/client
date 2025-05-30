import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { IUserRoles } from "@/shared/model/types/user";

import InputMask from "react-input-mask";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import useProfileEdit from "../hooks/use-profile-edit";
import { useNavigate } from "react-router";

export default function ProfileEditForm() {
  const {
    state: { isChangeForm, formData, isLoading },
    actions: { setIsChangeForm, setFormData, handleChange, handleSubmit },
  } = useProfileEdit();

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-1">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs font-medium text-primary/60">
            Имя
          </Label>
          <Input
            value={formData.userName}
            onChange={handleChange}
            id="name"
            name="userName"
            placeholder="Иван Петров"
            className="border bg-background py-6 px-5 rounded-[30px] text-base font-medium"
          />
        </div>
        <div
          className={cn("space-y-1", formData.roles !== "customer" && "hidden")}
        >
          <Label
            htmlFor="company"
            className="text-xs font-medium text-primary/60"
          >
            Компания
          </Label>
          <Input
            value={formData.companyName ?? ""}
            onChange={handleChange}
            name="companyName"
            id="companyName"
            className="border bg-background py-6 px-5 rounded-[30px] text-base font-medium"
            placeholder="ООО 'Компания'"
          />
        </div>
        {/* Телефон */}
        <div className="flex flex-col gap-2 pt-1">
          <Label
            htmlFor="phone"
            className="text-xs font-medium text-primary/60"
          >
            Телефон
          </Label>

          <InputMask
            mask="+7 (999) 999-99-99"
            name="phone"
            value={formData?.phone}
            onChange={handleChange}
            className="border bg-background py-3.5 px-4 rounded-[30px] text-base font-medium"
            placeholder="+7 (999) 999-99-99"
          />
        </div>

        <div className="space-y-1">
          <Label className="text-xs font-medium text-primary/60">
            Род деятельности
          </Label>

          <Select
            value={formData?.roles}
            onValueChange={(value: IUserRoles) => {
              setIsChangeForm(true);
              setFormData((prev) => ({ ...prev, roles: value }));
            }}
          >
            <SelectTrigger className="w-full py-6  rounded-[30px] border text-base font-medium">
              <SelectValue placeholder="Поля сортировки" />
            </SelectTrigger>
            <SelectContent className="rounded-[30px]">
              <SelectGroup>
                <SelectLabel className="text-xs font-normal text-primary/60 p-4">
                  Ваша роль:
                </SelectLabel>
                <SelectItem value="driver" className="rounded-[30px]">
                  <div className="text-base py-1 px-4">Водитель</div>
                </SelectItem>
                <SelectItem value="customer" className="rounded-[30px]">
                  <div className="text-base py-1 px-4">Заказчик / Логист</div>
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-end mt-10">
        {isChangeForm && (
          <Button
            type="submit"
            className="w-fit py-6 rounded-[30px] bg-[hsl(var(--access-primary))] hover:bg-primary/80 text-background font-medium"
          >
            Сохранить изменения
          </Button>
        )}

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="w-fit py-3 px-6 rounded-[30px] font-medium bg-primary/5 text-primary"
        >
          Назад
        </button>
      </div>
    </form>
  );
}
