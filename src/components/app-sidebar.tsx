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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const authContext = useAuth();

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
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.all} />

        {authContext?.user?.roles.some(
          (role) =>
            role === PERMISSIONS.CAN_VIEW_MANAGER ||
            role === PERMISSIONS.CAN_VIEW_DISPATCHER,
        ) && <NavMain items={data.allTeams} />}

        {authContext?.user?.roles.some(
          (role) => role === PERMISSIONS.CAN_VIEW_MANAGER,
        ) && <NavMain items={data.manager} />}
      </SidebarContent>
      <SidebarFooter>{authContext?.token && <NavUser />}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
