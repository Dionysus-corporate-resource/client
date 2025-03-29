import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ElementType } from "react";

export default function AnalyticsShortCard({
  label,
  count,
  labelFooter = "+12%",
  icon: Icon,
}: {
  label: string;
  count: number;
  labelFooter?: string;
  icon: ElementType;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{count}</div>
        <p className="text-xs text-muted-foreground">
          {labelFooter} чем в вчера
        </p>
      </CardContent>
    </Card>
  );
}
