"use client";

import {
  DashboardMobileNavigation,
  DashboardSidebarNavigation,
  NavigationItems,
} from "@playbook/ui";
import { Cog, MessageSquare } from "lucide-react";

const navigation: NavigationItems = [
  { label: "Todos", icon: <MessageSquare />, href: "/" },
  { label: "Settings", icon: <Cog />, href: "/settings" },
];

export const MobileNavigation = () => (
  <DashboardMobileNavigation navigationItems={navigation} />
);

export const SidebarNavigation = () => (
  <DashboardSidebarNavigation navigationItems={navigation} />
);
