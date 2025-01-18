import { Button } from "@/shared/components/ui/button";
import { FileQuestion } from "lucide-react";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-2rem)] w-full flex flex-col items-center justify-center gap-6 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-muted p-4">
          <FileQuestion className="h-12 w-12 text-muted-foreground animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <h2 className="text-xl font-semibold tracking-tight">
          Страница не найдена
        </h2>
        <p className="text-muted-foreground">
          К сожалению, запрашиваемая страница не существует или была перемещена
        </p>
      </div>
      <Button asChild>
        <NavLink to="/">Вернуться на главную</NavLink>
      </Button>
    </div>
  );
}
