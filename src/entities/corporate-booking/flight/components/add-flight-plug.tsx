import { PackagePlus } from "lucide-react";

export default function AddFlightPlug() {
  return (
    <div className="flex gap-4 h-full w-full items-center justify-center rounded-md border border-dashed text-sm cursor-pointer hover:bg-muted-foreground/5">
      <PackagePlus className="text-muted-foreground h-6 w-6" />
      <span className="text-[0.8rem] text-muted-foreground w-80">
        Чтобы добавить элемент, заполните форму и нажмите "Добавить машину"
      </span>
    </div>
  );
}
