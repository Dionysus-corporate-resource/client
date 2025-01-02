import { IBookingDto } from "@/shared/model/types/booking";

export function getStatusForBookingCard(
  status: IBookingDto["corporateBookingData"]["status"],
) {
  switch (status) {
    case "active":
      return "Активна";
    case "inProgress":
      return "В работе";
    case "inactive":
      return "Закрыта";
    default:
      return "Уточнить";
  }
}

export function getStatusColorForBookingCard(
  status: IBookingDto["corporateBookingData"]["status"],
) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800";
    case "inProgress":
      return "bg-blue-100 text-blue-800";
    case "inactive":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getPaymentColorForBookingCard(
  type: IBookingDto["corporateBookingData"]["terms"]["paymentMethod"],
) {
  switch (type) {
    case "NDS":
      return "bg-emerald-100 text-emerald-800";
    case "without_NDS":
      return "bg-yellow-100 text-yellow-800";
    case "cash":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getPaymentForBookingCard(
  type: IBookingDto["corporateBookingData"]["terms"]["paymentMethod"],
) {
  switch (type) {
    case "NDS":
      return "НДС";
    case "without_NDS":
      return "Без НДС";
    case "cash":
      return "Наличные";
    default:
      return "Уточнить";
  }
}

export function getloadingTypeForBookingCard(
  type: IBookingDto["corporateBookingData"]["terms"]["loadingType"],
) {
  switch (type) {
    case "normal":
      return "По норме";
    case "full":
      return "По полной";

    default:
      return "Уточнить";
  }
}
