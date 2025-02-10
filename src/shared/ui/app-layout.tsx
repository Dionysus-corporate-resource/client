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
      <header className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 mx-auto flex py-2 items-center border-b">
          <MainNav />
        </div>

        {/* <div
          className="pt-0 flex items-center  gap-16 bg-muted border-background border-b
         justify-center px-2 md:px-6 sm:justify-between"
        >
          <Tabs
            defaultValue="info"
            className="bg-muted
            "
          >
            <TabsList
              className="justify-start flex gap-0 h-full p-0 bg-transparent rounded-none
              "
            >
              <NavLink to="/">
                <TabsTrigger
                  value="booking"
                  className="pb-[10px] pt-2 -mb-[1px] rounded-none data-[state=active]:shadow-none
                  text-xs md:text-sm pr-2 sm:pr-2 "
                >
                  Заявки
                </TabsTrigger>
              </NavLink>

              {userData?.roles === "customer" && (
                <>
                  <NavLink to="/my-booking">
                    <TabsTrigger
                      value="my-booking"
                      className="pb-[10px] pt-[9px] -mb-[1px] space-x-2 rounded-none data-[state=active]:shadow-none
                      text-xs md:text-sm pr-2 sm:pr-2"
                    >
                      Мои заявки
                      <Badge
                        variant="outline"
                        className="h-5 bg-background ml-2
                        hidden md:block"
                      >
                        {tableDataActive?.length}
                      </Badge>
                    </TabsTrigger>
                  </NavLink>

                  <NavLink to="/create-booking">
                    <TabsTrigger
                      value="create-booking"
                      className="pb-[10px] pt-[9px] -mb-[1px] space-x-2 rounded-none data-[state=active]:shadow-none
                      text-xs md:text-sm pr-2 sm:pr-2"
                    >
                      Создать заявку
                    </TabsTrigger>
                  </NavLink>
                </>
              )}

              <NavLink to="/subscribe">
                <TabsTrigger
                  value="subscribe"
                  className="pb-[10px] pt-[9px] -mb-[1px] space-x-2 rounded-none !shadow-none
                  text-xs md:text-sm  pr-2 sm:pr-2"
                >
                  Тарифы
                </TabsTrigger>
              </NavLink>
            </TabsList>
          </Tabs>
        </div> */}
      </header>
      <div className="flex-1 flex">
        <Outlet />

        <Toaster />
      </div>
    </div>
  );
}
