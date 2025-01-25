// FIX: не правильный путь, публичный апи не работает
import SubscripeCard, { IPlan } from "@/entities/subscribe/ui/subscripe-card";

export default function SubscripeList({
  subscriptions,
}: {
  subscriptions: IPlan[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8 mt-2">
      {subscriptions.map((subscription) => (
        <SubscripeCard subscription={subscription} />
      ))}
    </div>
  );
}
