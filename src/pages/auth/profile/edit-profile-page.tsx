import { ProfileEditForm } from "@/feature/auth/profile";

export default function EditProfilePage() {
  return (
    <div
      className="container mx-auto w-full mt-10 p-6
      flex items-center justify-center"
    >
      <div className="space-y-5 w-[500px]">
        <span className="text-base font-medium">
          Редактирование личных данных
        </span>
        <ProfileEditForm />
      </div>
    </div>
  );
}
