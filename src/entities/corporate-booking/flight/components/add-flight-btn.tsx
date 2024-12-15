import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

export default function AddFlightBtn() {
  return (
    <Button
      className="flex gap-2 w-full items-center justify-center"
      variant="outline"
      type="submit"
    >
      <PackagePlus className=" h-4 w-4" />
      <span>Добавить машину</span>
    </Button>
  );
}
