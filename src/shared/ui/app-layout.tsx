import { NavLink } from "react-router";
import { MainNav } from "./main-nav";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Toaster } from "../components/ui/toaster";
import { useAtomValue } from "jotai";
import { userStorageAtom } from "../model/atoms/user-atom";
import { useQuery } from "@tanstack/react-query";
import { bookingQueryOption } from "@/pages/home/api/query-option";
import ThemeToggle from "@/feature/toggle-theme/toggle-theme";
import { useWindowSize } from "../hooks/use-window-size";

export default function AppLayout() {
  const userData = useAtomValue(userStorageAtom);
  const { data: bookingData } = useQuery(bookingQueryOption.getAll());

  const tableDataActive = bookingData?.filter(
    (booking) => booking?.user?._id === userData?._id,
  );
  const { width } = useWindowSize();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 mx-auto flex py-2 items-center border-b">
          <MainNav />
        </div>

        <div className="px-6 pt-0 mx-auto flex items-center justify-between gap-16 bg-muted border-background border-b ">
          <Tabs defaultValue="info" className="bg-muted">
            <TabsList
              className="justify-start h-full p-0 bg-transparent
              rounded-none"
            >
              <NavLink to="/">
                <TabsTrigger
                  value="booking"
                  className="pb-[10px] pt-[9px] -mb-[1px] space-x-2 rounded-none data-[state=active]:shadow-none "
                >
                  Заявки
                </TabsTrigger>
              </NavLink>

              {userData?.roles === "customer" && (
                <>
                  <NavLink to="/my-booking">
                    <TabsTrigger
                      value="my-booking"
                      className="pb-[10px] pt-[9px] -mb-[1px] space-x-2 rounded-none data-[state=active]:shadow-none"
                    >
                      Мои заявки
                      <Badge
                        variant="outline"
                        className="h-5 bg-background ml-2"
                      >
                        {tableDataActive?.length}
                      </Badge>
                    </TabsTrigger>
                  </NavLink>

                  <NavLink to="/create-booking">
                    <TabsTrigger
                      value="create-booking"
                      className="pb-[10px] pt-[9px] -mb-[1px] space-x-2 rounded-none data-[state=active]:shadow-none"
                    >
                      Создать заявку
                    </TabsTrigger>
                  </NavLink>
                </>
              )}

              <NavLink to="/subscribe">
                <TabsTrigger
                  value="subscribe"
                  className="pb-[10px] pt-[9px] -mb-[1px] space-x-2 rounded-none !shadow-none"
                >
                  Тарифы
                </TabsTrigger>
              </NavLink>
            </TabsList>
          </Tabs>
          <span className="text-sm">{width} px</span>
          <ThemeToggle />
        </div>
      </header>
      <div className="flex-1 flex">
        {/* <Outlet /> */}
        <Toaster />
      </div>
    </div>
  );
}
