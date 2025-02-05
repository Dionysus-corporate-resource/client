import { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";
import { ArrowUpDown, X } from "lucide-react";

export function MobileSortedPanel({
  sortPanelSlot,
}: {
  sortPanelSlot: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Закрытие меню при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="xl:hidden" ref={menuRef}>
      {/* Бургер-кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-8 focus:outline-none flex justify-start items-center
        w-28 sm:w-36 ex:w-8"
      >
        <span
          className="font-medium
          text-sm sm:text-base ex:hidden"
        >
          сортировка
        </span>
        {isOpen ? (
          <X
            className="w-4 h-4 absolute top-2
          left-24 sm:left-28 ex:left-2"
          />
        ) : (
          <ArrowUpDown
            className="w-4 h-4 absolute top-2
          left-24 sm:left-28 ex:left-2"
          />
        )}
      </button>

      {/* Мобильное меню */}
      <nav
        className={cn(
          "ex:left-14 z-10 absolute border rounded-md left-20 top-16 w-[80%] bg-background shadow-lg transition-all duration-300 ease-in-out",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <div className="p-2">{sortPanelSlot}</div>
      </nav>
    </div>
  );
}
