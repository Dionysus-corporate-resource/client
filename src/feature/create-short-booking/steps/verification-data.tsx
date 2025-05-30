import { FormStepProps } from "../types";
import { TBookingDto } from "@/shared/model/types/booking";
import BookingPreviewCard from "../ui/booking-preview-card";

export default function VerificationDataStep({ formData }: FormStepProps) {
  const dateNow = new Date().toISOString();
  const bookingData: Omit<TBookingDto, "user"> = {
    _id: "1",
    status: "active",
    basicInfo: {
      distance: formData.distance,
      loadingLocation: formData.loadingLocation,
      unLoadingLocation: formData.unLoadingLocation,
      tonnage: formData.tonnage,
      culture: formData.culture,
      ratePerTon: formData.ratePerTon,
      companyName: formData.companyName,
      contact: formData.contact,
    },
    additionalConditions: null,
    view: 141,
    createdAt: dateNow,
    updatedAt: dateNow,
  };
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-primary/60">
        Ваша заявка будет выглядеть так
      </span>
      <BookingPreviewCard booking={bookingData as TBookingDto} />
    </div>
  );
}
