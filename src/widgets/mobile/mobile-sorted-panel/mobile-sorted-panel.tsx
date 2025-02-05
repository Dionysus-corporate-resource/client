import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

export function MobileSortedPanel({
  sortPanelSlot,
}: {
  sortPanelSlot: ReactNode;
}) {
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
      {/* Бургер-кнопка */}
      {/* <button
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
      </button> */}

      {/* Мобильное меню */}
      <nav className={cn("w-full z-10 borde border-pink-600 bg-background")}>
        <div className=" w-full">{sortPanelSlot}</div>
      </nav>
    </div>
  );
}
