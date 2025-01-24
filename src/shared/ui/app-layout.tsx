import { NavLink, Outlet } from "react-router";
import { MainNav } from "./main-nav";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Package, PackageOpen, PackagePlus, Sparkle } from "lucide-react";
import { Badge } from "../components/ui/badge";
import ThemeToggle from "@/feature/toggle-theme/toggle-theme";
import { Toaster } from "../components/ui/toaster";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 mx-auto flex h-14 items-center">
          <MainNav />
        </div>
        <div className="px-6 mx-auto flex items-center justify-between gap-16">
          <Tabs defaultValue="info" className="">
            <TabsList
              className="justify-start h-auto p-0 bg-transparent
              rounded-none"
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                }
              >
                <TabsTrigger
                  value="booking"
                  className="

                  pb-4 pt-2 space-x-2 rounded-none data-[state=active]:shadow-none"
                >
                  <Package className="w-4 h-4" />
                  <span>Заявки</span>
                </TabsTrigger>
              </NavLink>

              <NavLink
                to="/my-booking"
                className={({ isActive }) =>
                  `${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                }
              >
                <TabsTrigger
                  value="my-booking"
                  className="pb-4 pt-2 space-x-2 rounded-none data-[state=active]:shadow-none"
                >
                  <PackageOpen className="w-4 h-4" />
                  <span>Мои заявки</span>
                  <Badge variant="secondary" className="ml-1 h-5">
                    0
                  </Badge>
                </TabsTrigger>
              </NavLink>

              <NavLink
                to="/create-booking"
                className={({ isActive }) =>
                  `${isActive ? "border-b-2 border-primary" : "border-b-2 border-transparent"}`
                }
              >
                <TabsTrigger
                  value="create-booking"
                  className="pb-4 pt-2 space-x-2 rounded-none data-[state=active]:shadow-none"
                >
                  <PackagePlus className="w-4 h-4" />
                  <span>Создать заявку</span>
                </TabsTrigger>
              </NavLink>

              <NavLink
                to="/subscribe"
                className={({ isActive }) =>
                  `${isActive ? "border-b-2 border-primary " : "border-b-2 border-transparent"}`
                }
              >
                <TabsTrigger
                  value="subscribe"
                  className="pb-4 pt-2 space-x-2 rounded-none data-[state=active]:shadow-none"
                >
                  <Sparkle className="w-4 h-4" />
                  <span>Тарифы</span>
                </TabsTrigger>
              </NavLink>
            </TabsList>
          </Tabs>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex-1 flex">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}
