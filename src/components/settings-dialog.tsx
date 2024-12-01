import { Settings, User } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { ReactNode, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import ProfilePage from "@/pages/auth/profile/profile-page";
import ProfileSettings from "@/pages/profile-additionaly/settings";

const data = {
  nav: [
    {
      name: "Профиль",
      path: "/product/profile",
      icon: User,
      label: "Общая информация",
    },
    {
      name: "Настройки",
      path: "/product/profile-settings",
      icon: Settings,
      label: "Настройки",
    },
  ],
};

type Props = {
  children?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function SettingsDialog({ open, setOpen }: Props) {
  const [routing, setRouting] = useState({
    label: "Общая информация",
    path: "/product/profile",
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0  md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]  2xl:w-full border-[hsl(var(--border))]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex w-fit pr-6">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <div
                        onClick={() =>
                          setRouting((prev) => ({
                            ...prev,
                            path: item.path,
                            label: item.label,
                          }))
                        }
                      >
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={item.name === "Messages & media"}
                          >
                            <div>
                              <item.icon />
                              <span>{item.name}</span>
                            </div>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </div>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Профиль</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{routing.label}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {routing.path === "/product/profile" ? (
                <ProfilePage />
              ) : (
                <ProfileSettings />
              )}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
