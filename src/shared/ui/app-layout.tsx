import { Outlet } from "react-router";
import { MainNav, Props } from "./main-nav";
import {
  // BadgeRussianRuble,
  // ChartSpline,
  BriefcaseBusiness,
} from "lucide-react";

// logoTitle: string;
// linksMain: {
//   icon?: React.ComponentType<{ className?: string }>;
//   linkLabel: string;
//   navigate: string;
// }[];
// linksFooter: {
//   icon?: ReactNode;
//   linkLabel: string;
// }[];
// };

export default function AppLayout() {
  const headerContent: Props["headerContent"] = {
    logoTitle: "GrainCompany",
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
        <div className="container mx-auto flex h-14 items-center">
          <MainNav headerContent={headerContent} />
        </div>
      </header>
      <div className="flex-1 flex">
        <Outlet />
      </div>
    </div>
  );
}
