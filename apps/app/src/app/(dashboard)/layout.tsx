import {
  DashbboardMobileHeader,
  Dashboard,
  DashboardMain,
  DashboardMobile,
  DashboardSidebar,
  DashboardSidebarHeader,
  Flex,
} from "@playbook/ui";
import { Shapes } from "lucide-react";
import { CreateTodoForm } from "../_forms/create-todo";
import {
  MobileNavigation,
  SidebarNavigation,
} from "./_components/dashboard-navigation";
import { UserDropdown } from "./_components/user-nav";

const Logo = () => (
  <Flex gap={"xs"} align={"center"} justify={"center"}>
    <Shapes className="h-5 w-5" />
    <span className="font-medium text-lg">OpenDo</span>
  </Flex>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dashboard>
      {/* // Mobile top navbar */}
      <DashboardMobile>
        <DashbboardMobileHeader>
          <Logo />
          <UserDropdown />
        </DashbboardMobileHeader>
        <MobileNavigation />
      </DashboardMobile>
      {/* // Desktop sidebar */}
      <DashboardSidebar>
        <DashboardSidebarHeader>
          <Logo />
          <UserDropdown />
        </DashboardSidebarHeader>
        <Flex align={"center"} justify={"between"} className="px-4">
          <CreateTodoForm />
        </Flex>
        <SidebarNavigation />
      </DashboardSidebar>
      {/* //Main */}
      <DashboardMain>{children}</DashboardMain>
    </Dashboard>
  );
}
