"use client";

import {
  DashboardMobileNavigation,
  DashboardSidebarNavigation,
  NavigationItems,
} from "@playbook/ui";
import { Cog, List } from "lucide-react";

export const MobileNavigation = () => (
  <DashboardMobileNavigation navigationItems={navigation} />
);

export const SidebarNavigation = () => (
  <DashboardSidebarNavigation navigationItems={navigation} />
);

const navigation: NavigationItems = [
  { label: "Todos", icon: <List />, href: "/app/todos" },
  { label: "Settings", icon: <Cog />, href: "/app/settings" },
];
