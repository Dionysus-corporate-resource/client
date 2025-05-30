import { Outlet } from "react-router";
import { MainNav } from "./main-nav";
import { Toaster } from "../components/ui/toaster";

export default function AppLayout() {
  // const [isHeaderVisible, setHeaderVisible] = useState(true);
  // const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

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
    <div className="relative flex flex-col min-h-screen">
      <div className={`w-full bg-[#141414] text-white z-[20]`}>
        <MainNav />
        <div className="absolute top-[65px] left-0 border-background/10 border-t-[1px] w-screen" />
      </div>

      <div className="relative flex-1 flex">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
