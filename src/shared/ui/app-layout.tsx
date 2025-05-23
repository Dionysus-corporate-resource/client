import { Outlet } from "react-router";
import { MainNav } from "./main-nav";
import { Toaster } from "../components/ui/toaster";
import { useEffect, useState } from "react";

export default function AppLayout() {
  const [isHeaderVisible, setHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.pageYOffset;

  //     if (currentScrollPos <= 80) return;

  //     // Показываем хедер, если прокручиваем вверх
  //     if (prevScrollPos > currentScrollPos) {
  //       setHeaderVisible(true);
  //     } else {
  //       // Скрываем хедер, если прокручиваем вниз
  //       setHeaderVisible(false);
  //     }

  //     // Обновляем предыдущую позицию прокрутки
  //     setPrevScrollPos(currentScrollPos);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [prevScrollPos]);
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`w-full bg-[#141414] text-white z-[20]
        px-8 mx-auto flex items-center transition-transform duration-300`}
      >
        <MainNav />
      </div>
      <header
        className={`fixed top-0 left-0 w-full bg-[#141414] text-white z-[20]
          px-8 mx-auto flex items-center transition-transform duration-300  ${
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
