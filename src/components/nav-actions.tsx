import { Bug, Copy, CopyIcon, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import CreateProposalsDevelopmentDialog from "@/pages/proposals-development/ui/components/create-proposals-development/create-proposals-development-dialog";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/app/providers/auth-provider";

type IProps = {
  setCopyBookingTemplate: () => void;
};

export function NavActions({ setCopyBookingTemplate }: IProps) {
  const location = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const data = [
    [
      {
        label: "Скопировать все заявки",
        icon: CopyIcon,
        action: setCopyBookingTemplate,
      },
    ],
  ];

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* <ButtonIcon
        variantIcons="Sun"
        theme={theme}
        actions={toggleTheme}
        variant="outline"
        styleButton="middle"
      ></ButtonIcon> */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup
                  key={index}
                  className="border-b last:border-none border-[hsl(var(--border))] "
                >
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {/* {group.map((item, index) => (
                        <SidebarMenuItem key={index} onClick={item.action}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))} */}

                      {location.pathname === "/product" && user && (
                        <SidebarMenuItem
                          key="copy"
                          onClick={setCopyBookingTemplate}
                        >
                          <SidebarMenuButton className="active:scale-95 transition-transform duration-200">
                            <Copy />
                            Скопировать заявки
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}

                      <CreateProposalsDevelopmentDialog>
                        <SidebarMenuItem key="additionaly">
                          <SidebarMenuButton className="active:scale-95 transition-transform duration-200">
                            <Bug />
                            Нашли ошибку?
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </CreateProposalsDevelopmentDialog>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  );
}
