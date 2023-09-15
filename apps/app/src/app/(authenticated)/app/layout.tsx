import { UserDropdown } from "@/components/UserDropdown/UserDropdown";
import {
  DashbboardMobileHeader,
  Dashboard,
  DashboardMobile,
  DashboardSidebar,
  DashboardSidebarHeader,
  Flex,
} from "@playbook/ui";
import { Shapes } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { MobileNavigation, SidebarNavigation } from "./navigation";

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
    <>
      <Toaster />
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
            <form />
          </Flex>
          <SidebarNavigation />
        </DashboardSidebar>
        {/* //Main */}
        {children}
      </Dashboard>
    </>
  );
}
