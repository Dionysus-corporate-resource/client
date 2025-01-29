import { NavLink } from "react-router-dom";
import {
  BriefcaseBusiness,
  Construction,
  // Package,
  // PackageOpen,
  // PackagePlus,
  // Sparkle,
  UserCog,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { userStorageAtom } from "../model/atoms/user-atom";
import { useAtomValue } from "jotai";
import ThemeToggle from "@/feature/toggle-theme/toggle-theme";
// import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
// import { Badge } from "../components/ui/badge";

export type Props = {
  headerContent: {
    logoTitle: string;
    linksMain: {
      icon?: React.ComponentType<{ className?: string }>;
      linkLabel: string;
      navigate: string;
    }[];
    linksFooter: {
      icon?: React.ComponentType<{ className?: string }>;
      linkLabel: string;
    }[];
  };
};

export function MainNav() {
  const userData = useAtomValue(userStorageAtom);
  const headerContent: Props["headerContent"] = {
    logoTitle: "Груз Рынок",
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
    <div className="flex justify-between items-center gap-6 md:gap-10 w-full relative">
      <div className="flex items-center gap-12 ">
        <NavLink to="/landing" className="flex items-center space-x-2 ">
          <Construction className="w-6 h-6" />
          {/* <img src="/truck-4.svg" className="w-6 h-6" /> */}
          <span className="inline-block font-semibold text-lg">
            {headerContent.logoTitle}
          </span>
        </NavLink>
        {/* <nav className="flex gap-6 -mb-1">
          {headerContent.linksMain.map((link) => (
            <NavLink
              to={link.navigate}
              className={({ isActive }) =>
                `flex gap-2 items-center text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                }`
              }
            >
              {link?.icon && <link.icon className="w-4 h-4" />}
              {link.linkLabel}
            </NavLink>
          ))}
        </nav> */}
      </div>

      {/* <Tabs defaultValue="info" className="mx-auto ">
        <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none ">
          <TabsTrigger
            value="booking"
            className="py-4 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
          >
            <Package className="w-4 h-4" />
            <span>Заявки</span>
          </TabsTrigger>

          <TabsTrigger
            value="my-booking"
            className="py-4 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
          >
            <PackageOpen className="w-4 h-4" />
            <span>Мои заявки</span>
            <Badge variant="secondary" className="ml-1 h-5">
              0
            </Badge>
          </TabsTrigger>
          <TabsTrigger
            value="create-booking"
            className="py-4 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
          >
            <PackagePlus className="w-4 h-4" />
            <span>Создать заявку</span>
          </TabsTrigger>
          <TabsTrigger
            value="subscribe"
            className="py-4 space-x-2 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none"
          >
            <Sparkle className="w-4 h-4" />
            <span>Тарифы</span>
          </TabsTrigger>
        </TabsList>
      </Tabs> */}

      {/* userData?.companyPublicData?.nameCompany && ( */}
      <span className="text-sm font-medium absolute left-1/2 -translate-x-1/2 flex gap-12">
        {/* ООО Логистик */}
        {/* <p>{!userData?.companyPublicData?.nameCompany}</p> */}
        <a
          className="underline  underline-offset-4"
          href="/offer.html"
          target="_blank"
        >
          Публичная оферта
        </a>
        <h1 className="text-red-500">
          Сайт находиться в разработке и тестируется
        </h1>
      </span>

      {userData ? (
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <NavLink to="/profile">
            <Avatar>
              <AvatarFallback>
                <UserCog className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
          </NavLink>
        </div>
      ) : (
        <div className="space-x-2">
          <NavLink to="/register">
            <Button size="sm" variant="link">
              Зарегистрироваться
            </Button>
          </NavLink>
          <NavLink to="/login">
            <Button size="sm" variant="link">
              Войти
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
}
