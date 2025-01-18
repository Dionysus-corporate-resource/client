import { ArrowRight, Building2 } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

export default function AdvertisingCard() {
  return (
    <Card className="w-[300px] overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-[160px] w-full overflow-hidden aspect-[16/9]">
          <img
            src="https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="CRM Dashboard Preview"
            className="object-cover w-full h-full"
          />
          <Badge className="absolute left-3 top-3 bg-white/80 text-black backdrop-blur-sm">
            Корпоративная CRM
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-2.5 p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>Для бизнеса</span>
        </div>
        <h3 className="font-semibold leading-none">Умная CRM-система</h3>
        <p className="text-sm text-muted-foreground">
          Автоматизируйте процессы, управляйте задачами и повышайте
          эффективность вашей компании
        </p>
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button className="w-full" asChild>
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Попробовать бесплатно
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
