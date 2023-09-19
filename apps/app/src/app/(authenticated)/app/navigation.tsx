"use client";

import {
  DashboardMobileNavigation,
  DashboardSidebarNavigation,
  NavigationItems,
} from "@playbook/ui";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarMinus,
  Cog,
  Folder,
  FolderArchive,
  Inbox,
  Tag,
} from "lucide-react";

export const MobileNavigation = () => (
  <DashboardMobileNavigation navigationItems={navigation} />
);

export const SidebarNavigation = () => (
  <DashboardSidebarNavigation navigationItems={navigation} />
);

const navigation: NavigationItems = [
  { label: "Inbox", icon: <Inbox />, href: "/app/todos/all" },
  { label: "Today", icon: <Calendar />, href: "/app/todos/today" },
  { label: "Upcoming", icon: <CalendarDays />, href: "/app/todos/upcoming" },
  { label: "Overdue", icon: <CalendarMinus />, href: "/app/todos/overdue" },
  { label: "Completed", icon: <CalendarCheck />, href: "/app/todos/completed" },
  { label: "Projects", icon: <Folder />, href: "/app/projects" },
  {
    label: "Archived",
    icon: <FolderArchive />,
    href: "/app/projects/archived",
  },
  { label: "Labels", icon: <Tag />, href: "/app/labels" },
  { label: "Settings", icon: <Cog />, href: "/app/settings" },
];
