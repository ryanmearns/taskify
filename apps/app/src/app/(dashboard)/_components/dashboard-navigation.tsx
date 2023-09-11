"use client";

import {
  DashboardMobileNavigation,
  DashboardSidebarNavigation,
  NavigationItems,
} from "@playbook/ui";
import { Cog, List } from "lucide-react";

const navigation: NavigationItems = [
  { label: "Todos", icon: <List />, href: "/todos" },
  { label: "Settings", icon: <Cog />, href: "/settings" },
];

export const MobileNavigation = () => (
  <DashboardMobileNavigation navigationItems={navigation} />
);

export const SidebarNavigation = () => (
  <DashboardSidebarNavigation navigationItems={navigation} />
);
