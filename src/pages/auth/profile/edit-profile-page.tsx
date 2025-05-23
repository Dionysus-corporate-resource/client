import { ProfileEditForm } from "@/feature/auth/profile";
import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";

export default function EditProfilePage() {
  return (
    <div className="relative w-full pb-12">
      <div className="absolute top-0 left-0 h-[361px] w-full bg-blue-300 z-[-1] bg-gradient-to-b from-[#333333] to-[#64A5FE]" />

      <div className="container mx-auto w-full rounded-2xl bg-background mt-[300px] p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* профль */}
          <div className="col-span-2 flex justify-between items-start">
            <div className="flex gap-6 items-start">
              <div className="flex flex-col gap-2 pl-2">
                <span className="text-2xl font-medium">
                  Редактирование профиля
                </span>
                <span className="text-sm font-normal text-primary/60 block w-[550px]">
                  Вы можете изменить данные профиля, а после в правом верхнем
                  углу, либо сохранить изменения, либо отменить их и вернуться
                  назад
                </span>
              </div>
            </div>

            <div className="space-x-2">
              <NavLink
                to="/profile"
                className="flex items-center gap-4 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold rounded-xl py-2.5 px-4"
              >
                <ArrowLeft className="w-5 h-5 text-primary/80" />
                Вернуться назад
              </NavLink>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xl font-medium">Личные данные</span>

            <ProfileEditForm />
          </div>
        </div>
      </div>
    </div>
  );
}
