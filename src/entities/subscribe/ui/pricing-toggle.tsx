import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

export function PricingToggle() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant={isYearly ? "outline" : "default"}
        onClick={() => setIsYearly(false)}
      >
        Месячная оплата
      </Button>
      <Button
        variant={isYearly ? "default" : "outline"}
        onClick={() => setIsYearly(true)}
        className="relative"
      >
        Годовая оплата
        <Badge className="absolute -top-2 -right-2 px-2 py-0.5">-17%</Badge>
      </Button>
    </div>
  );
}
