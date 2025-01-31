import instance from "@/shared/model/api/axios-instance";

export const paymentApi = {
  handlePurchase: async ({
    applicationId,
    price,
  }: {
    applicationId: string;
    price: number;
  }) => {
    try {
      const response = await instance.post("/api/create-payment", {
        applicationId,
        amount: price,
        // userId: userId,
      });

      window.location.href = response.data.confirmationUrl;
    } catch (error) {
      alert("Ошибка при создании платежа");
      console.error(error);
    }
  },
};
