import instance from "@/shared/model/api/axios-instance";

export type TTypeSubscripe = "unLimited" | "showContact";

export const paymentApi = {
  createPurchase: async ({
    priceOneBooking,
    countBooking,
  }: {
    priceOneBooking: number;
    countBooking: number;
  }) => {
    try {
      const response = await instance.post("/payment/limit-booking", {
        priceOneBooking,
        countBooking,
      });

      window.location.href = response.data.confirmationUrl;
    } catch (error) {
      alert("Ошибка при создании платежа");
      console.error(error);
    }
  },
  createUnlimitSubscription: async ({
    typeSubscriprion,
    countMonthSubscribe,
  }: {
    typeSubscriprion: TTypeSubscripe;
    countMonthSubscribe: number;
  }) => {
    try {
      const response = await instance.post("/payment/un-limit-booking", {
        typeSubscriprion,
        countMonthSubscribe,
      });
      window.location.href = response.data.confirmationUrl;
    } catch (error) {
      console.error(error);
    }
  },
};
