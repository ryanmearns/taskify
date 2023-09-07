import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
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
  Bot,
  Cog,
  MessageSquarePlus,
  MessagesSquare,
  MoreHorizontal,
  Pen,
  Plus,
  Shapes,
  Terminal,
  Trash2,
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
export const Home: Story = {
  render: (arg) => {
    return (
      <Dashboard>
        {/* // Mobile top navbar */}
        <DashboardMobile navigationItems={navigation}>
          <Logo />
          <UserDropdown />
        </DashboardMobile>
        {/* // Desktop sidebar */}
        <DashboardDesktop />
        {/* //Main */}
        <DashboardMain>
          <List />
        </DashboardMain>
      </Dashboard>
    );
  },
};

type NavigationItems = {
  label: string;
  icon: React.ReactElement;
  href: string;
}[];

const navigation: NavigationItems = [
  { label: "Chat", icon: <Terminal />, href: "/" },
  { label: "Bots", icon: <Bot />, href: "/" },
  { label: "Threads", icon: <MessagesSquare />, href: "/" },
  { label: "Settings", icon: <Cog />, href: "/" },
];

const Logo = () => (
  <Flex gap={"xs"} align={"center"}>
    <Shapes className="h-6 w-6" />
    <span className="font-semibold text-lg">CallbackAI</span>
  </Flex>
);

const UserDropdown = () => (
  <Avatar>
    <AvatarImage src="https://github.com/ryanmearns.png" alt="@ryanmearns" />
    <AvatarFallback>RM</AvatarFallback>
  </Avatar>
);

const Dashboard = (props: { children: React.ReactNode }) => (
  <div className="border rounded lg:flex-row flex flex-col">
    {props.children}
  </div>
);

const DashboardMobile = (props: {
  children: React.ReactNode;
  navigationItems: NavigationItems;
}) => {
  const pathname = usePathname();

  return (
    <Flex
      className="lg:hidden border-b bg-white border-secondary top-0 z-50"
      position={"sticky"}
      direction={"column"}
    >
      <Flex justify={"between"} align={"center"} className="px-4 pt-4 pb-2">
        {props.children}
      </Flex>
      <Flex className="overflow-x-scroll px-3">
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
    </Flex>
  );
};

const DashboardDesktop = () => {
  const pathname = usePathname();
  return (
    <Flex
      justify={"between"}
      direction={"column"}
      className="w-64 hidden lg:flex border-r h-screen sticky top-0 bg-muted/20"
    >
      <Flex direction={"column"} gap={"lg"}>
        <Flex justify={"between"} align={"center"} className="px-4 pt-4">
          <Logo />
          <UserDropdown />
        </Flex>
        <Flex align={"center"} justify={"between"} className="px-4">
          <CreateThreadDialogue />
        </Flex>
        <Flex direction={"column"} gap={"xs"} className="pr-4">
          <NavigationMenu className="w-full flex-col">
            <NavigationMenuList className="flex flex-col pr-4 w-full gap-1">
              {navigation.map((item) => (
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
                      {item.label}
                    </Button>
                  </NavigationMenuNextLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </Flex>
      </Flex>
    </Flex>
  );
};

const DashboardMain = (props: { children: React.ReactNode }) => (
  <Flex
    grow
    className="max-w-full px-4 py-4 md:py-8 lg:px-12"
    align={"start"}
    direction={"column"}
    justify={"start"}
    gap={"2xl"}
  >
    <Header />
    {props.children}
  </Flex>
);

const Header = () => (
  <Flex justify={"between"} align={"center"} className="w-full" gap={"md"}>
    <Flex direction={"column"} gap={"xs"}>
      <h1 className=" text-xl font-semibold">My bots</h1>
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
  <Flex direction={"column"} className="border rounded w-full divide-y">
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
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )}
  </Flex>
);
