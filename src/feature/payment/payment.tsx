import { Button } from "@/shared/components/ui/button";
import { paymentApi } from "./model/paymentApi";

const Payment = ({ popular }: { popular: boolean }) => {
  return (
    <div className="application-card w-full">
      <Button
        className="w-full transition-transform duration-200 hover:scale-105"
        variant={popular ? "default" : "outline"}
        onClick={() =>
          paymentApi.handlePurchase({ applicationId: "1", price: 100 })
        }
        size="lg"
      >
        Выбрать тариф
      </Button>
    </div>
  );
};

export default Payment;
