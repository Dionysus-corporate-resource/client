import { Outlet } from "react-router";
import { MainNav } from "./main-nav";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
