import { Check } from "lucide-react";

export function ConfirmationStep() {
  return (
    <div className="py-24 border rounded-md border-dashed flex flex-col items-center justify-center space-y-4 text-center">
      <div className="rounded-full bg-primary p-3">
        <Check className="h-6 w-6 text-primary-foreground" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Заявка создана</h2>
      <p className="text-muted-foreground">
        Вы можете найти ее на главной странице или на странице мои заявки
      </p>
    </div>
  );
}
