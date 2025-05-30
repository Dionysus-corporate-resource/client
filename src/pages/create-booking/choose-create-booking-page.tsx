import CreateBookingCard from "@/entities/booking/choose-create-booking-card";
import { userApi } from "@/feature/auth/profile/api/user-api";
import PageLoader from "@/shared/ui/page-loader";
import RequsetBlockingCreateRoles from "@/widgets/request-blocking-create/request-blocking-create";
import { useQuery } from "@tanstack/react-query";

export default function ChooseCreateBookingPage() {
  const { isLoading, data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getDataProfile(),
  });

  return (
    <div className="container relative mx-auto flex flex-1">
      <div className="w-full grid grid-cols-2 justify-between items-center h-fit mt-[60px]">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">Создайте свою заявку</h1>
          <span className="text-xl font-normal text-primary/80">
            Выберите подходящий вариант: Короткая заявка — для быстрого
            размещения только самой важной информации, или Детальная заявка — с
            дополнительными условиями, чтобы привлечь опытных перевозчиков.
          </span>
        </div>

        <div className="flex flex-col items-end gap-4">
          <CreateBookingCard
            title="Детальная"
            description="Заполняйте дополнительные поля, это привлечет более опытных водителей"
            time="5"
            link="detail"
          />
          <CreateBookingCard
            title="Короткая"
            description="Заполняйте самое необходимое и экономьте свое время"
            time="8"
            link="short"
          />
        </div>
      </div>
      {isLoading ? (
        <PageLoader />
      ) : (
        <RequsetBlockingCreateRoles user={userData} />
      )}
    </div>
  );
}
