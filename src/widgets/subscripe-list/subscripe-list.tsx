// FIX: не правильный путь, публичный апи не работает
import SubscripeCard, { IPlan } from "@/entities/subscribe/ui/subscripe-card";
import Payment from "@/feature/payment/payment";
import { cn } from "@/shared/lib/utils";

export default function SubscripeList({
  subscriptions,
}: {
  subscriptions: IPlan[];
}) {
  return (
    <div
      className={cn(
        "grid justify-center gap-4 mt-2",
        subscriptions.length === 3
          ? "lg:grid-cols-2 xl:grid-cols-3 2xl:gap-8"
          : "lg:grid-cols-2 xl:grid-cols-2 2xl:gap-8",
      )}
    >
      {subscriptions.map((subscription) => (
        <SubscripeCard
          subscription={subscription}
          actionPaymentSlot={<Payment subscription={subscription} />}
        />
      ))}
    </div>
  );
}
