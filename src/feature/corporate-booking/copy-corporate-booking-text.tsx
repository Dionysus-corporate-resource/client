import { useAuth } from "@/app/providers/auth-provider";
import { IBookingDto } from "@/shared/model/types/booking";

export default function CopyCorporateBookingText({
  corporateBooking: booking,
}: {
  corporateBooking: IBookingDto["corporateBookingData"];
}) {
  const context = useAuth();

  const sentence = `
  ${booking.generalInformation.icon} ${booking.generalInformation.cargoName} ${booking.generalInformation.cargoAmount}т ${booking.generalInformation.icon}
  ‼️${booking.terms.loadingType === "normal" ? "ПО НОРМЕ" : "ПО ПОЛНОЙ"} на ${booking.location.loadingLocationDate}‼️
  🏳️ ${booking.location.loadingLocation}
  🏁 ${booking.location.unloadingLocation}
  🛣 Дистанция: ${booking.location.distance} км
  🚚 Выгрузка: ${booking.requiredTransport.carTypeUnLoading}
  💰 ${booking.terms.price}₽/т ${booking.terms.paymentMethod === "NDS" ? "С НДС" : booking.terms.paymentMethod === "without_NDS" ? "Без НДС" : "Наличные"}
  ${booking.terms.advancePercentage && `💵 Аванс:  ${booking.terms.advancePercentage}% на погрузке`}
  ${context?.user?.userData?.phone && `Контакты: ${context?.user?.userData?.phone}`}
    `;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sentence);
    } catch (err) {
      console.error("Ошибка при копировании текста:", err);
    }
  };
  return <span onClick={handleCopy}>Скопировать</span>;
}
