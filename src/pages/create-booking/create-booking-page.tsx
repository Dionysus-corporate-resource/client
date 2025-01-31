// import AdvertisingCard from "@/entities/advertising-card/advertising-card";
import { userApi } from "@/feature/auth/profile/api/user-api";
import { MultiStepForm } from "@/feature/multi-step-form";
import PageLoader from "@/shared/ui/page-loader";
import RequsetBlockingCreate from "@/widgets/request-blocking-create/request-blocking-create";
import { useQuery } from "@tanstack/react-query";

export default function CreateBookingPage() {
  const { data: userData, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => userApi.getDataProfile(),
  });

  return (
    <div className="relative mx-auto flex flex-1 md:grid gap-6 p-4 md:p-6">
      <div className="h-full overflow-y-auto no-scrollbar">
        {isLoading ? <PageLoader /> : <MultiStepForm />}
      </div>
      <RequsetBlockingCreate user={userData} />
    </div>
  );
}
