import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-6 flex items-center flex-row gap-4">
        <div className="text-muted-foreground">{icon}</div>
        <h3 className="font-semibold tracking-tight">{title}</h3>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
}
