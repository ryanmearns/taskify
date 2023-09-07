import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ButtonCounter,
  ButtonIcon,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Flex,
  IconButton,
  Input,
  Label,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuNextLink,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
  cn,
} from "@playbook/ui";
import {
  AlignLeft,
  ArrowBigRight,
  Blocks,
  Bot,
  Cog,
  CornerDownRight,
  Github,
  Keyboard,
  LifeBuoy,
  Link,
  LogOut,
  MessageSquareDashed,
  MessageSquarePlus,
  MessagesSquare,
  MoreHorizontal,
  Pen,
  Plus,
  Settings,
  Shapes,
  Terminal,
  Trash2,
  User,
} from "lucide-react";
import { usePathname } from "next/navigation";

const meta: Meta<typeof Flex> = {
  component: Flex,
  parameters: {
    layout: "full-screen",
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Bots: Story = {
  render: (arg) => {
    return (
      <Dashboard>
        {/* // Mobile top navbar */}
        <DashboardMobile>
          <DashbboardMobileHeader>
            <Logo />
            <UserDropdown />
          </DashbboardMobileHeader>
          <DashboardMobileNavigation navigationItems={navigation} />
        </DashboardMobile>
        {/* // Desktop sidebar */}
        <DashboardSidebar>
          <DashboardSidebarHeader>
            <Logo />
            <UserDropdown />
          </DashboardSidebarHeader>
          <Flex align={"center"} justify={"between"} className="px-4">
            <CreateThreadDialogue />
          </Flex>
          <DashboardSidebarNavigation navigationItems={navigation} />
        </DashboardSidebar>
        {/* //Main */}
        <DashboardMain>
          <DashboardHeader />
          <List />
        </DashboardMain>
      </Dashboard>
    );
  },
};

export const Chat: Story = {
  render: (arg) => {
    return (
      <Dashboard>
        {/* // Mobile top navbar */}
        <DashboardMobile>
          <DashbboardMobileHeader>
            <Logo />
            <UserDropdown />
          </DashbboardMobileHeader>
          <DashboardMobileNavigation navigationItems={navigation} />
        </DashboardMobile>
        {/* // Desktop sidebar */}
        <DashboardSidebar>
          <DashboardSidebarHeader>
            <Logo />
            <UserDropdown />
          </DashboardSidebarHeader>
          <Flex align={"center"} justify={"between"} className="px-4">
            <CreateThreadDialogue />
          </Flex>
          <DashboardSidebarNavigation navigationItems={navigation} />
        </DashboardSidebar>
        {/* //Main */}
        <DashboardMain>
          <CreateThreadForm />
        </DashboardMain>
      </Dashboard>
    );
  },
};

// Custom components

const Logo = () => (
  <Flex gap={"xs"} align={"center"}>
    <Shapes className="h-6 w-6 rotate-90" />
    <span className="font-semibold text-lg">CallbackAI</span>
  </Flex>
);

const UserDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="cursor-pointer">
        <AvatarImage
          src="https://github.com/ryanmearns.png"
          alt="@ryanmearns"
        />
        <AvatarFallback>RM</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
          <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Keyboard className="mr-2 h-4 w-4" />
          <span>Keyboard shortcuts</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Github className="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <LifeBuoy className="mr-2 h-4 w-4" />
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const navigation: NavigationItems = [
  { label: "Chat", icon: <Terminal />, href: "/" },
  { label: "Bots", icon: <Bot />, href: "/", count: "3" },
  { label: "Prompts", icon: <AlignLeft />, href: "/" },
  { label: "Chains", icon: <Link />, href: "/" },
  { label: "Threads", icon: <MessagesSquare />, href: "/" },
  { label: "Settings", icon: <Cog />, href: "/" },
];

// Dashboard components

type NavigationItems = {
  label: string;
  icon: React.ReactElement;
  href: string;
  count?: string;
}[];

const Dashboard = (props: { children: React.ReactNode }) => (
  <div className="border rounded lg:flex-row flex flex-col min-h-screen">
    {props.children}
  </div>
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
              className={cn(
                pathname === item.href
                  ? "pl-2 border-l-2 border-slate-500"
                  : "pl-2 border-l-2 border-transparent",
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

const DashboardHeader = (props: { inset?: boolean }) => (
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
    <Flex direction={"column"} gap={"xs"}>
      <h1 className="text-xl font-semibold">My bots</h1>
      <p className="text-sm text-muted-foreground hidden md:block">
        Create and chat with custom chatbots.
      </p>
    </Flex>
    <CreateBotDialogue />
  </Flex>
);

const CreateThreadDialogue = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button block>
        <ButtonIcon Icon={<MessageSquarePlus />} orientation={"leading"} />
        New thread
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create thread</DialogTitle>
        <DialogDescription>
          Select a bot and create a new thread.
        </DialogDescription>
      </DialogHeader>
      <Flex direction={"column"} gap={"md"}>
        <Label htmlFor="model">Bot</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Bots</SelectLabel>
              <SelectItem value="openai">
                <Flex align={"center"} gap={"sm"}>
                  <Bot className="h-3.5 w-3.5" />
                  <span>Start-up assistant</span>
                </Flex>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Flex>
      <Flex direction={"column"} gap={"md"}>
        <Textarea id="message" placeholder="Ask anything" className="h-60" />
      </Flex>
      <DialogFooter>
        <Button type="submit" variant={"solid"} size={"md"}>
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const CreateBotDialogue = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button size={"md"} className="flex-none">
        <ButtonIcon Icon={<Plus />} orientation={"leading"} />
        Create bot
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create bot</DialogTitle>
        <DialogDescription>Configure a bot to chat with.</DialogDescription>
      </DialogHeader>
      <Flex direction={"column"} gap={"md"}>
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Enter name" className="col-span-3" />
      </Flex>
      <Flex direction={"column"} gap={"md"}>
        <Label htmlFor="model">Model</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Models</SelectLabel>
              <SelectItem value="openai">OpenAI ChatGPT-3</SelectItem>
              <SelectItem value="meta">Meta Llama-2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Flex>
      <Flex direction={"column"} gap={"md"}>
        <Label htmlFor="system message">System message</Label>
        <Textarea
          id="system message"
          placeholder="Enter system message"
          className="col-span-3 h-60"
        />
      </Flex>
      <DialogFooter>
        <Button type="submit" variant={"solid"} size={"md"}>
          Create
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

const List = () => (
  <Flex
    direction={"column"}
    className="border border-input rounded-md w-full divide-y"
  >
    {Array(24).fill(
      <div className="p-4 text-sm hover:bg-slate-50 cursor-pointer flex justify-between items-center">
        <Flex direction={"column"} gap={"xs"}>
          <span>Startup assistant</span>
          <span className="text-xs text-muted-foreground">
            Created 3 days ago
          </span>
        </Flex>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconButton Icon={<MoreHorizontal />} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Pen className="mr-2 h-4 w-4" />
                <span>Edit</span>
                <DropdownMenuShortcut>⇧⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Blocks className="mr-2 h-4 w-4" />
                <span>Config</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )}
  </Flex>
);

const CreateThreadForm = () => (
  <Flex
    direction={"column"}
    justify={"center"}
    align={"center"}
    className="w-full h-full"
    gap={"lg"}
  >
    <Flex
      className="w-full sm:max-w-[660px]"
      direction={"column"}
      gap={"lg"}
      padding={"lg"}
    >
      <div className="flex flex-col space-y-1.5 text-center">
        <h1 className="text-xl font-semibold leading-none tracking-tight">
          Create thread
        </h1>
        <p className="text-sm text-muted-foreground">
          Select a bot and create a new thread.
        </p>
      </div>
      <Flex direction={"column"} gap={"md"}>
        <Label htmlFor="model">Bot</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a bot" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Bots</SelectLabel>
              <SelectItem value="openai">
                <Flex align={"center"} gap={"sm"}>
                  <Bot className="h-3.5 w-3.5" />
                  <span>Start-up assistant</span>
                </Flex>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Flex>
      <Flex direction={"column"} gap={"md"}>
        <Label>Prompt</Label>
        <Textarea id="message" placeholder="Ask anything" className="h-60" />
      </Flex>
      <Button type="submit" variant={"solid"} size={"lg"}>
        <ButtonIcon orientation={"leading"} Icon={<MessageSquarePlus />} />
        Create
      </Button>
    </Flex>
  </Flex>
);
