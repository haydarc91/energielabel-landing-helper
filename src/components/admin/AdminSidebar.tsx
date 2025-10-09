import { LayoutDashboard, FileText, Inbox, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  userEmail: string;
  onSignOut: () => void;
  onNavigate: (section: string) => void;
  activeSection: string;
}

const menuItems = [
  { title: "Dashboard", section: "dashboard", icon: LayoutDashboard },
  { title: "Website Inhoud", section: "content", icon: FileText },
  { title: "Aanvragen", section: "submissions", icon: Inbox },
];

export function AdminSidebar({ userEmail, onSignOut, onNavigate, activeSection }: AdminSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const getButtonClass = (section: string) => {
    return activeSection === section
      ? "bg-epa-green/10 text-epa-green font-medium hover:bg-epa-green/20"
      : "hover:bg-gray-100";
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <Logo className={isCollapsed ? "scale-75" : ""} />
          {!isCollapsed && (
            <div>
              <h2 className="font-bold text-epa-green">Admin Panel</h2>
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigatie</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.section}>
                  <SidebarMenuButton 
                    onClick={() => onNavigate(item.section)}
                    className={getButtonClass(item.section)}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button
          variant="ghost"
          onClick={onSignOut}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Uitloggen</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
