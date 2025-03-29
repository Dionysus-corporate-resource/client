import { Outlet } from "react-router";
import { MainNav } from "./main-nav";
import { Toaster } from "../components/ui/toaster";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos <= 80) return;

      // Показываем хедер, если прокручиваем вверх
      if (prevScrollPos > currentScrollPos) {
        setHeaderVisible(true);
      } else {
        // Скрываем хедер, если прокручиваем вниз
        setHeaderVisible(false);
      }

      // Обновляем предыдущую позицию прокрутки
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full flex items-center px-6 ex:h-10 sm:h-10 md:h-16 lg:h-16 bg-primary text-hwite mx-auto">
        <MainNav />
      </div>
      <header
        className={`fixed top-0 left-0 w-full py-2 md:py-4 bg-[#333333] text-white z-[20]
          px-6 mx-auto flex items-center transition-transform duration-300  ${
            isHeaderVisible ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <MainNav />
      </header>
      <div className="relative flex-1 flex">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
