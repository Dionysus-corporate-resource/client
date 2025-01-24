import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { PackageOpen, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export default function SubscriptionInfo() {
  const navigate = useNavigate();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Информация о подписке</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 h-full">
        <div className="rounded-lg border border-dashed p-6 text-center">
          <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">
            У вас нет ни одной подписки
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Перейдите в раздел "Тарифы" и выберите подходящий для вас
          </p>
          <Button
            className="mt-4"
            size="sm"
            onClick={() => navigate("/landing/subscribe")}
          >
            <Sparkles className="w-4 h-4" />
            Посмотреть подписки
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
