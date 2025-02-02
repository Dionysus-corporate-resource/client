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
        "grid gap-8 lg:gap-8 mt-2",
        subscriptions.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2",
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
