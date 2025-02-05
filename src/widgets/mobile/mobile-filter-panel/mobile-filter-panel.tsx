import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

export function MobileFilterPanel({
  filterPanelSlot,
}: {
  filterPanelSlot: ReactNode;
}) {
  // const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне области
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  return (
    <div
      className="w-full mt-2 borde border-green-600
      xl:hidden"
    >
      {/* Мобильное меню */}
      <nav className={cn("w-full z-10 borde border-pink-600 bg-background")}>
        <div className=" w-full">{filterPanelSlot}</div>
      </nav>
    </div>
  );
}
