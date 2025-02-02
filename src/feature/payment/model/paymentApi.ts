import instance from "@/shared/model/api/axios-instance";

export const paymentApi = {
  handlePurchase: async ({
    priceOneBooking,
    countBooking,
  }: {
    priceOneBooking: number;
    countBooking: number;
  }) => {
    try {
      const response = await instance.post("api/create-payment/limit-booking", {
        priceOneBooking,
        countBooking,
      });

      window.location.href = response.data.confirmationUrl;
    } catch (error) {
      alert("Ошибка при создании платежа");
      console.error(error);
    }
  },
  handleUnlimitSubscription: async ({
    typeSubscriprion,
    countMonthSubscribe,
  }: {
    typeSubscriprion: string;
    countMonthSubscribe: number;
  }) => {
    try {
      const response = await instance.post(
        "api/create-payment/un-limit-booking",
        {
          typeSubscriprion,
          countMonthSubscribe,
        },
      );
      window.location.href = response.data.confirmationUrl;
    } catch (error) {
      console.error(error);
    }
  },
};
