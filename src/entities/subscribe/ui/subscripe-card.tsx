import { Badge } from "@/shared/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { userStorageAtom } from "@/shared/model/atoms/user-atom";
import { CustomTooltip } from "@/shared/ui/toltip";
import { useAtomValue } from "jotai";
import {
  BadgeCheck,
  Check,
  Ticket,
  Tickets,
  TicketsPlane,
  UserSearch,
} from "lucide-react";
import { ReactNode } from "react";

export type ITypeSubscription =
  | "limited"
  | "limitedPackage"
  | "unLimited"
  | "showContact";

export type IPlan = {
  name: string;
  timeMonth?: number;
  type: ITypeSubscription;
  priceMonthly: string;
  priceMonthlyDopInfo: string;
  priceYearly?: string;
  priceYearlyDopInfo?: string;
  description?: string;
  popular: boolean;
  features: {
    [key: string]: {
      mainFeature: string;
      descriptionFeature: string;
    }[];
  };
  highlight: string;
  freeUse?: string;
};

function getIconsForSubscription(typeSubscription: IPlan["type"]) {
  switch (typeSubscription) {
    case "limited":
      return <Ticket className="w-6 h-6" />;
    case "limitedPackage":
      return <Tickets className="w-6 h-6" />;
    case "unLimited":
      return <TicketsPlane className="w-6 h-6" />;
    default:
      return <UserSearch className="w-6 h-6" />;
  }
}

function useGetBadgeExistSubscription(
  subscriptionType: IPlan["type"],
): ReactNode {
  const user = useAtomValue(userStorageAtom);

  switch (subscriptionType) {
    case "showContact": {
      if (user?.activeSubscriptions?.showContactSubscription?.isPurchased) {
        return (
          <Badge
            className="space-x-2 w-fit h-6 z-50 bg-background"
            variant="outline"
          >
            <BadgeCheck className="w-4 h-4" />
            <span>Куплена</span>
          </Badge>
        );
      }
      return null;
    }
    case "unLimited": {
      if (
        user?.activeSubscriptions?.unLimitedBookingSubscription?.isPurchased
      ) {
        return (
          <Badge
            className="space-x-2 w-fit h-6 z-50 bg-background"
            variant="outline"
          >
            <BadgeCheck className="w-4 h-4" />
            <span>Куплена</span>
          </Badge>
        );
      }
      return null;
    }
    case "limited": {
      return (
        <Badge
          className="space-x-2 w-fit h-6 z-50 bg-background"
          variant="outline"
        >
          <Ticket className="w-4 h-4" />
          <span>
            {user?.activeSubscriptions?.purchasedBooking?.remainingBookings}
          </span>
        </Badge>
      );
    }
    case "limitedPackage": {
      return (
        <Badge
          className="space-x-2 w-fit h-6 z-50 bg-background"
          variant="outline"
        >
          <Ticket className="w-4 h-" />
          <span>
            {user?.activeSubscriptions?.purchasedBooking?.remainingBookings}
          </span>
        </Badge>
      );
    }
    default:
      return null;
  }
}

export default function SubscripeCard({
  subscription,
  actionPaymentSlot,
}: {
  subscription: IPlan;
  actionPaymentSlot: ReactNode;
}) {
  return (
    <Card
      key={subscription.name}
      className={`relative overflow-hidden flex flex-col w-[450px] transition-all duration-200 hover:shadow-lg ${
        subscription.popular ? "scale-105 shadow-lg " : ""
      }`}
    >
      <CardHeader className="flex flex-col gap-4 text-start">
        <div className="flex justify-between">
          <div className="space-y-1">
            <span className="text-xl font-medium flex justify-between">
              {subscription.name}
            </span>
            <p className="text-sm text-muted-foreground">
              {subscription.description}
            </p>
          </div>

          {useGetBadgeExistSubscription(subscription.type)}
        </div>

        <div className="flex flex-col items-start gap-1">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold">
              {/* <ArrowUpRight className="w-6 h-6" /> */}

              <div className="flex gap-4 items-center">
                {getIconsForSubscription(subscription.type)}
                {subscription.priceMonthly}
              </div>
            </span>
            <span className="text-muted-foreground">
              {subscription.priceMonthlyDopInfo}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {subscription.priceYearly && <>или</>} {subscription.priceYearly}{" "}
            {subscription?.priceYearlyDopInfo}
          </span>
        </div>

        {/* <Badge variant="secondary" className="w-fit">
          {subscription.highlight}
        </Badge> */}
      </CardHeader>

      <CardContent className="flex-1">
        {Object.entries(subscription.features).map(([category, features]) => (
          <div key={category} className="mb-6 last:mb-0">
            <h3 className="text-sm font-medium mb-2">{category}</h3>
            <ul className="space-y-2 text-sm">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <CustomTooltip
                      triggerSlot={
                        <span className="cursor-pointer">
                          {feature.mainFeature}
                        </span>
                      }
                      contentSlot={
                        <span className="text-xs text-muted-foreground italicc">
                          {feature.descriptionFeature}
                        </span>
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        {/* <NavLink to="/landing/subscribe" className="w-full">
          <Button
            className="w-full transition-transform duration-200 hover:scale-105"
            variant={subscription.popular ? "default" : "outline"}
            size="lg"
          >
            Выбрать тариф
          </Button>
        </NavLink> */}
        {actionPaymentSlot}

        <p className="text-xs text-center text-muted-foreground">
          {subscription.freeUse}
          <br />
          Акция действует до 12.02.2025
        </p>
      </CardFooter>
      {/* <div className="absolute -right-10 top-[120px]">
        <CircleAnimationGroup />
      </div> */}
    </Card>
  );
}
