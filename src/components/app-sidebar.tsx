"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  GitBranchPlus,
  PackagePlus,
  SquareChartGantt,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useAuth } from "@/app/providers/auth-provider";
import PERMISSIONS from "@/shared/api/permissions";
import ChangelogDialog from "@/pages/documentation/documentation-page";
import { useState, useEffect } from "react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  all: {
    nameLabel: "Навигация",
    routes: [
      {
        title: "Все заявки",
        url: "/product",
        icon: SquareChartGantt,
        isActive: true,
      },
    ],
  },
  // manager: {
  //   nameLabel: "Для менеджеров",
  //   routes: [
  //     {
  //       name: "Студия",
  //       url: "/product/manager",
  //       icon: PackagePlus,
  //     },
  //   ],
  // },
  manager: {
    nameLabel: "Для менеджеров",
    routes: [
      {
        title: "Студия",
        url: "/product/manager",
        icon: PackagePlus,
        isActive: true,
      },
    ],
  },
  allTeams: {
    nameLabel: "Сотрудникам",
    routes: [
      {
        title: "Предложения",
        url: "/product/proposals-development",
        icon: GitBranchPlus,
        isActive: true,
      },
    ],
  },
};
// const CURRENT_VERSION = process.env.REACT_APP_VERSION || "1.0.0";

const CURRENT_VERSION = "0.2.0 beta";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isOpenDocumentation, setIsOpenDocumentation] = useState(false);

  const authContext = useAuth();

  useEffect(() => {
    const savedVersion = localStorage.getItem("appVersion");

    if (savedVersion !== CURRENT_VERSION) {
      // Версии не совпадают - показать модальное окно
      setIsOpenDocumentation(true);

      // Обновить версию в localStorage
      localStorage.setItem("appVersion", CURRENT_VERSION);
    }
  }, []);

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      style={{ borderColor: "hsl(var(--border))" }}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div onClick={() => setIsOpenDocumentation(true)}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v{CURRENT_VERSION}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.all} />

        {authContext?.user?.corporateRoles.some(
          (role) =>
            role === PERMISSIONS.CAN_VIEW_MANAGER ||
            role === PERMISSIONS.CAN_VIEW_DISPATCHER ||
            role === PERMISSIONS.CAN_VIEW_GENERAL_DIRECTOR,
        ) && <NavMain items={data.allTeams} />}

        {authContext?.user?.corporateRoles.some(
          (role) =>
            role === PERMISSIONS.CAN_VIEW_MANAGER ||
            role === PERMISSIONS.CAN_VIEW_GENERAL_DIRECTOR,
        ) && <NavMain items={data.manager} />}
      </SidebarContent>
      <SidebarFooter>{authContext?.token && <NavUser />}</SidebarFooter>
      <SidebarRail />
      <ChangelogDialog
        isOpen={isOpenDocumentation}
        setIsOpen={setIsOpenDocumentation}
        versionApp={CURRENT_VERSION}
      />
    </Sidebar>
  );
}
