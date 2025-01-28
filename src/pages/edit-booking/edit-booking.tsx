import EditBookingMultiStepForm from "@/feature/edit-booking-multi-step-form/ui/multi-step-form";

export default function EditBookingPage() {
  return (
    //md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px]
    <div className="mx-auto flex flex-1 md:grid gap-6 p-4 md:p-6">
      <div className="h-full overflow-y-auto no-scrollbar">
        <EditBookingMultiStepForm />
      </div>
    </div>
  );
}
