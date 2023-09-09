import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuNextLink,
  NavigationMenuItem,
} from "../components/navigation-menu";
import { Flex } from "../layout/flex";
import { usePathname } from "next/navigation";
import { Button, ButtonCounter, ButtonIcon } from "../components/button";
import { cn } from "../lib/utils";

type NavigationItems = {
  label: string;
  icon: React.ReactElement;
  href: string;
  count?: string;
}[];

const Dashboard = (props: { children: React.ReactNode }) => (
  <div className="lg:flex-row flex flex-col min-h-screen">{props.children}</div>
);

const DashboardMobile = (props: { children: React.ReactNode }) => {
  return (
    <Flex
      className="lg:hidden border-b bg-white border-secondary top-0 z-50"
      position={"sticky"}
      direction={"column"}
    >
      {props.children}
    </Flex>
  );
};

const DashbboardMobileHeader = (props: { children: React.ReactNode }) => (
  <Flex justify={"between"} align={"center"} className="px-4 pt-4 pb-4">
    {props.children}
  </Flex>
);

const DashboardMobileNavigation = (props: {
  navigationItems: NavigationItems;
}) => {
  const pathname = usePathname();

  return (
    <Flex className="px-3 overflow-x-auto over no-scrollbar">
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {props.navigationItems.map((item) => (
            <NavigationMenuItem
              key={item.href}
              className={
                pathname === item.href
                  ? "pb-2 border-b-2 border-slate-500"
                  : "pb-2 border-b-2 border-transparent"
              }
            >
              <NavigationMenuNextLink href="/" asChild>
                <Button variant={"ghost"}>
                  <ButtonIcon Icon={item.icon} orientation={"leading"} />
                  {item.label}
                </Button>
              </NavigationMenuNextLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </Flex>
  );
};

const DashboardSidebar = (props: { children: React.ReactNode }) => {
  return (
    <Flex
      justify={"between"}
      direction={"column"}
      className="w-64 hidden lg:flex border-r h-screen sticky top-0 bg-muted/20"
    >
      <Flex direction={"column"} gap={"lg"}>
        {props.children}
      </Flex>
    </Flex>
  );
};

const DashboardSidebarHeader = (props: { children: React.ReactNode }) => (
  <Flex justify={"between"} align={"center"} className="px-4 pt-4">
    {props.children}
  </Flex>
);

const DashboardSidebarNavigation = (props: {
  navigationItems: NavigationItems;
}) => {
  const pathname = usePathname();

  return (
    <Flex direction={"column"} gap={"xs"} className="pr-4">
      <NavigationMenu className="w-full flex-col">
        <NavigationMenuList className="flex flex-col w-full gap-1">
          {props.navigationItems.map((item) => (
            <NavigationMenuItem
              key={item.href}
              className={cn(
                pathname === item.href
                  ? "pl-2 border-l-4 border-slate-400"
                  : "pl-2 border-l-4 border-transparent",
                "w-full"
              )}
            >
              <NavigationMenuNextLink href="/" asChild className="w-full">
                <Button variant={"ghost"} justify={"start"} block>
                  <ButtonIcon Icon={item.icon} orientation={"leading"} />

                  <span className="grow flex items-start">{item.label}</span>
                  {item.count && <ButtonCounter>{item.count}</ButtonCounter>}
                </Button>
              </NavigationMenuNextLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </Flex>
  );
};

const DashboardMain = (props: {
  children: React.ReactNode;
  inset?: boolean;
}) => (
  <Flex
    grow
    className={cn(!props.inset && "max-w-full px-4 py-4 md:py-8 lg:px-12")}
    align={"start"}
    direction={"column"}
    justify={"start"}
    gap={props.inset ? "none" : "2xl"}
  >
    {props.children}
  </Flex>
);

const DashboardMainHeader = (props: {
  inset?: boolean;
  children: React.ReactNode;
}) => (
  <Flex
    justify={"between"}
    align={"center"}
    position={props.inset ? "sticky" : "relative"}
    className={cn(
      props.inset && "border-b border-input top-0",
      "w-full bg-white z-10"
    )}
    padding={props.inset ? "lg" : "none"}
  >
    {props.children}
  </Flex>
);

export {
  Dashboard,
  DashboardMobile,
  DashbboardMobileHeader,
  DashboardMobileNavigation,
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarNavigation,
  DashboardMain,
  DashboardMainHeader,
  type NavigationItems,
};
