import { UserDropdown } from "./_components/UserDropdown/UserDropdown";
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
import Link from "next/link";
import { getTenant } from "@/services/tenant";
import { getProjects } from "@/services/project";

const Logo = () => (
  <Link href={"/"}>
    <Flex gap={"xs"} align={"center"} justify={"center"}>
      <Shapes className="h-5 w-5" />
      <span className="font-medium text-lg">Taskify</span>
    </Flex>
  </Link>
);

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { workspace } = await getTenant();

  const projects = await getProjects({ workspaceUuid: workspace.uuid });

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
          <Flex align={"center"} justify={"between"} className="px-4"></Flex>
          <SidebarNavigation projects={projects} />
        </DashboardSidebar>
        {/* //Main */}
        {props.children}
      </Dashboard>
    </>
  );
}
