import { PackagePlus } from "lucide-react";

export default function AddFlightPlug() {
  return (
    <div className="flex gap-2 h-full w-full items-center justify-center rounded-md border border-dashed text-sm cursor-pointer hover:bg-muted-foreground/5">
      <PackagePlus className="text-muted-foreground h-4 w-4" />
      <span className="text-[0.8rem] text-muted-foreground">
        Добавить машину
      </span>
    </div>
  );
}
