import { Outlet } from "react-router";
import { Props } from "./main-nav";
import { BriefcaseBusiness } from "lucide-react";
import { MainNavLanding } from "@/entities/landing/ui/main-nav-landing";

export default function LandingLayout() {
  const headerContent: Props["headerContent"] = {
    logoTitle: "Груз Рынок",
    linksMain: [
      {
        // icon: BriefcaseBusiness,
        linkLabel: "Смотреть заявки",
        navigate: "/",
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
        <div className="container mx-auto flex h-14 items-center">
          <MainNavLanding headerContent={headerContent} />
        </div>
      </header>
      <div className="flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}
