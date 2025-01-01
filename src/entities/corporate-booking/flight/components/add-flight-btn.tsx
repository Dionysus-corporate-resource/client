import { Button } from "@/components/ui/button";
import { PackagePlus } from "lucide-react";

export default function AddFlightBtn() {
  return (
    <Button
      className="flex gap-2  items-center justify-center w-full"
      // variant="outline"
      type="submit"
      size="sm"
    >
      <PackagePlus className=" h-4 w-4" />
      <span>Добавить машину</span>
    </Button>
  );
}
