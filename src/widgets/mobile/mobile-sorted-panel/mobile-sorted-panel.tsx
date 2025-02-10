import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

export function MobileSortedPanel({
  sortPanelSlot,
}: {
  sortPanelSlot: ReactNode;
}) {
  return (
    <div
      className="w-full mt-2 borde border-green-600
    xl:hidden"
    >
      {/* Мобильное меню */}
      <nav className={cn("w-full z-10 borde border-pink-600 bg-background")}>
        <div className="w-full">{sortPanelSlot}</div>
      </nav>
    </div>
  );
}
