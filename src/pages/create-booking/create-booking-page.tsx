import AdvertisingCard from "@/entities/advertising-card/advertising-card";
import { MultiStepForm } from "@/feature/multi-step-form";

export default function CreateBookingPage() {
  return (
    <div className="mx-auto flex flex-1 md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px] gap-6 p-4 md:p-6">
      <div className="border h-full overflow-y-auto no-scrollbar">
        <MultiStepForm />
      </div>
      <div className="">
        <AdvertisingCard />
      </div>
    </div>
  );
}
