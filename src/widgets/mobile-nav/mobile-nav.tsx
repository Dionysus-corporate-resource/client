import { useState, useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { NavLink } from "react-router";
import { UserCog } from "lucide-react";

export function MobileNav() {
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
    <div className="md:hidden" ref={menuRef}>
      {/* Бургер-кнопка */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-8 w-8 focus:outline-none"
      >
        <span className="sr-only">Открыть меню</span>
        <div className="absolute left-1/2 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            className={cn(
              "absolute h-0.5 w-5 transform bg-current transition duration-300 ease-in-out",
              isOpen ? "translate-y-0 rotate-45" : "-translate-y-2",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-5 transform bg-current transition duration-300 ease-in-out",
              isOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute h-0.5 w-5 transform bg-current transition duration-300 ease-in-out",
              isOpen ? "translate-y-0 -rotate-45" : "translate-y-2",
            )}
          />
        </div>
      </button>

      {/* Мобильное меню */}
      <nav
        className={cn(
          "absolute border rounded-md left-0 top-16 w-full bg-background shadow-lg transition-all duration-300 ease-in-out",
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <div className="container flex flex-col space-y-2 px-4 py-4">
          <NavLink
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium transition-colors hover:text-primary flex items-center gap-2"
          >
            <UserCog className="w-6 h-6" />
            Профиль
          </NavLink>
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Мои заявки
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Обсуждения
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="text-lg font-medium transition-colors hover:text-primary"
          >
            Поддержка
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
