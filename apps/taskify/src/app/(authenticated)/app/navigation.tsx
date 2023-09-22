"use client";

import { Projects } from "@/db/types";
import {
  Avatar,
  AvatarImage,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DashboardMobileNavigation,
  DashboardSidebarNavigation,
  IconButton,
  NavigationItems,
  cn,
} from "@playbook/ui";
import {
  Calendar,
  CalendarCheck,
  CalendarDays,
  CalendarMinus,
  ChevronRight,
  Cog,
  Folder,
  Inbox,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { NewProjectForm } from "./projects/_components/NewProjectForm/NewProjectForm";
import { useLocalStorage } from "@/utils/hooks/use-local-storage";

export const MobileNavigation = () => (
  <DashboardMobileNavigation
    navigationItems={[
      ...navigation,
      { label: "Projects", icon: <Folder />, href: "/app/projects" },
    ]}
  />
);

export const SidebarNavigation = (props: { projects: Projects }) => (
  <div className="space-y-4 flex flex-col justify-between grow">
    <div className="space-y-4">
      <DashboardSidebarNavigation navigationItems={navigation} />
      <ProjectsCollapsable projects={props.projects} />
    </div>
    <DashboardSidebarNavigation navigationItems={trailingNavigation} />
  </div>
);

const ProjectsCollapsable = (props: { projects: Projects }) => {
  const [isOpen, setIsOpen] = useLocalStorage("expand-projects", false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-1"
    >
      <div className="flex items-center pl-3 pr-4 justify-between">
        <div className="flex items-center">
          <CollapsibleTrigger asChild>
            <IconButton
              variant={"ghost"}
              size={"xs"}
              className={cn(isOpen && "rotate-90", "transition-all")}
              icon={<ChevronRight />}
            />
          </CollapsibleTrigger>
          <h4 className="text-sm font-semibold ml-1">Projects</h4>
        </div>
        <NewProjectForm />
      </div>
      <CollapsibleContent className="space-y-3 px-4">
        {props.projects.map((project) => (
          <Link key={project.uuid} href={`/app/projects/${project.uuid}`}>
            <Button
              size={"sm"}
              variant={"ghost"}
              block
              className="justify-start"
            >
              <Avatar className="cursor-pointer h-4 w-4 mr-2">
                <AvatarImage src={`https://avatar.vercel.sh/${project.uuid}`} />
              </Avatar>
              <span className="truncate">{project.name}</span>
            </Button>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

const LabelssCollapsable = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-1"
    >
      <div className="flex items-center px-3">
        <CollapsibleTrigger asChild>
          <IconButton
            variant={"ghost"}
            size={"xs"}
            className={cn(isOpen && "rotate-90", "transition-all")}
            icon={<ChevronRight />}
          />
        </CollapsibleTrigger>
        <h4 className="text-sm font-semibold ml-1">Labels</h4>
      </div>
      <CollapsibleContent className="space-y-2 px-4">
        <Button size={"sm"} variant={"ghost"} block className="justify-start">
          Marketing
        </Button>
      </CollapsibleContent>
    </Collapsible>
  );
};

const navigation: NavigationItems = [
  { label: "Inbox", icon: <Inbox />, href: "/app/todos/all" },
  { label: "Today", icon: <Calendar />, href: "/app/todos/today" },
  { label: "Upcoming", icon: <CalendarDays />, href: "/app/todos/upcoming" },
  { label: "Overdue", icon: <CalendarMinus />, href: "/app/todos/overdue" },
  { label: "Completed", icon: <CalendarCheck />, href: "/app/todos/completed" },
  // { label: "Projects", icon: <Folder />, href: "/app/projects" },
  // {
  //   label: "Archived",
  //   icon: <FolderArchive />,
  //   href: "/app/projects/archived",
  // },
  // { label: "Labels", icon: <Tag />, href: "/app/labels" },
];

const trailingNavigation: NavigationItems = [
  { label: "Settings", icon: <Cog />, href: "/app/settings" },
];
