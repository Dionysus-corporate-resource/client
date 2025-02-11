import { Outlet } from "react-router";
import { MainNav } from "./main-nav";
import { Toaster } from "../components/ui/toaster";
import { useWindowSize } from "../hooks/use-window-size";

export default function AppLayout() {
  const { width } = useWindowSize();
  console.log(width);
  // sticky top-0 z-50
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full py-2 md:py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6 mx-auto flex items-center border-b">
        <MainNav />
      </header>
      <div className="flex-1 flex">
        <Outlet />

        <Toaster />
      </div>
    </div>
  );
}
