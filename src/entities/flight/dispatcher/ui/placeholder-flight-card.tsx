import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EmptyDriverCard() {
  return (
    <div className="w-full p-4 rounded-md border border-dashed text-sm cursor-pointer">
      <div className="flex flex-col items-end space-y-2">
        <div className="flex w-full items-center justify-between">
          <div className="space-x-2">
            <Badge variant="secondary" className="mt-1">
              Номер авто
            </Badge>
            <Badge variant="secondary" className="mt-1">
              Номер прицепа
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <p className="mt-1 text-lg font-medium text-muted-foreground">
              ФИО водителя
            </p>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button
            size="sm"
            variant="link"
            className="text-muted-foreground cursor-default"
          >
            Нет данных
          </Button>
          <span className="text-sm text-muted-foreground">Телефон</span>
        </div>
      </div>
    </div>
  );
}
