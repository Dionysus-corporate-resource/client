import { NavLink, Outlet } from "react-router";
import { MainNav, Props } from "./main-nav";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  BriefcaseBusiness,
  Package,
  PackageOpen,
  PackagePlus,
  Sparkle,
} from "lucide-react";
import { Badge } from "../components/ui/badge";

export default function AppLayout() {
  const headerContent: Props["headerContent"] = {
    logoTitle: "DionysCompany",
    linksMain: [
      {
        // icon: BriefcaseBusiness,
        linkLabel: "Заявки",
        navigate: "/",
      },
      {
        // icon: BadgeRussianRuble,
        linkLabel: "Подписки",
        navigate: "/subscribe",
      },
      {
        // icon: ChartSpline,
        linkLabel: "Аналитика",
        navigate: "/analytics",
      },
    ],
    linksFooter: [
      {
        icon: BriefcaseBusiness,
        linkLabel: "Заявки",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 mx-auto flex h-14 items-center">
          <MainNav headerContent={headerContent} />
        </div>
        <div className="px-6 mx-auto flex items-center justify-between gap-16">
          <Tabs defaultValue="info" className="">
            <TabsList
              className="justify-start h-auto p-0 bg-transparent
              rounded-none"
            >
              <NavLink to="/">
                <TabsTrigger
                  value="booking"
                  className="pb-4 pt-2 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  <Package className="w-4 h-4" />
                  <span>Заявки</span>
                </TabsTrigger>
              </NavLink>

              <TabsTrigger
                value="my-booking"
                className="pb-4 pt-2 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <PackageOpen className="w-4 h-4" />
                <span>Мои заявки</span>
                <Badge variant="secondary" className="ml-1 h-5">
                  0
                </Badge>
              </TabsTrigger>
              <TabsTrigger
                value="create-booking"
                className="pb-4 pt-2 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                <PackagePlus className="w-4 h-4" />
                <span>Создать заявку</span>
              </TabsTrigger>

              <NavLink to="/subscribe">
                <TabsTrigger
                  value="subscribe"
                  className="pb-4 pt-2 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  <Sparkle className="w-4 h-4" />
                  <span>Тарифы</span>
                </TabsTrigger>
              </NavLink>
            </TabsList>
          </Tabs>
          <Badge variant="secondary">Add content/feature</Badge>
        </div>
      </header>
      <div className="flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}
