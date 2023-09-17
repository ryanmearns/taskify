"use client";

import {
  DashboardMobileNavigation,
  DashboardSidebarNavigation,
  NavigationItems,
} from "@playbook/ui";
import { Calendar, CalendarDays, Cog, Folder, List, Tag } from "lucide-react";

export const MobileNavigation = () => (
  <DashboardMobileNavigation navigationItems={navigation} />
);

export const SidebarNavigation = () => (
  <DashboardSidebarNavigation navigationItems={navigation} />
);

const navigation: NavigationItems = [
  { label: "All", icon: <List />, href: "/app/todos/all" },
  { label: "Today", icon: <Calendar />, href: "/app/todos/today" },
  { label: "Upcoming", icon: <CalendarDays />, href: "/app/todos/upcoming" },
  { label: "Projects", icon: <Folder />, href: "/app/projects" },
  { label: "Labels", icon: <Tag />, href: "/app/labels" },
  { label: "Settings", icon: <Cog />, href: "/app/settings" },
];
