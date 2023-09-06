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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@playbook/ui";
import {
  Bot,
  Cog,
  LayoutDashboard,
  MessageSquarePlus,
  MessagesSquare,
  MoreHorizontal,
  Pen,
  Plus,
  Search,
  Shapes,
  Trash,
  Trash2,
} from "lucide-react";

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
      <div className="border rounded lg:flex-row flex flex-col h-screen">
        {/* // Mobile top navbar */}
        <MobileTopNavbar />
        {/* // Desktop sidebar */}
        <DesktopSidebar />
        {/* //Main */}
        <Flex
          grow
          className="max-w-full px-4 py-4 md:py-8 lg:px-12 overflow-scroll"
          align={"start"}
          direction={"column"}
          justify={"start"}
          gap={"2xl"}
        >
          <Header />
          <List />
        </Flex>
        {/* // Mobile bottom navbar */}
        <MobileBottomNavbar />
      </div>
    );
  },
};

const MobileBottomNavbar = () => (
  <Flex
    align={"center"}
    position={"sticky"}
    className="lg:hidden border-t bg-white border-secondary bottom-0 z-50 divide-x"
    padding={"sm"}
  >
    <Button variant={"ghost"} block>
      <ButtonIcon Icon={<Bot />} orientation={"leading"} />
      Bots
    </Button>
    <Button variant={"ghost"} block>
      <ButtonIcon Icon={<MessagesSquare />} orientation={"leading"} />
      Threads
    </Button>
    <Button variant={"ghost"} block>
      <ButtonIcon Icon={<Cog />} orientation={"leading"} />
      Settings
    </Button>
  </Flex>
);

const MobileTopNavbar = () => (
  <Flex
    justify={"between"}
    align={"center"}
    position={"sticky"}
    className="lg:hidden border-b bg-white border-secondary top-0 z-50"
    padding={"md"}
  >
    <Flex gap={"xs"} align={"center"}>
      <Shapes className="h-6 w-6" />
      <span className="font-semibold text-lg">PlayAI</span>
    </Flex>
    <Avatar>
      <AvatarImage src="https://github.com/ryanmearns.png" alt="@ryanmearns" />
      <AvatarFallback>RM</AvatarFallback>
    </Avatar>
  </Flex>
);

const DesktopSidebar = () => {
  return (
    <Flex
      justify={"between"}
      direction={"column"}
      className="w-64 hidden lg:flex border-r h-screen bg-muted/20"
    >
      <Flex direction={"column"} gap={"lg"} padding={"lg"}>
        <Flex justify={"between"} align={"center"}>
          <Flex gap={"xs"} align={"center"}>
            <Shapes className="h-6 w-6" />
            <span className="font-semibold text-lg">PlayAI</span>
          </Flex>
          <Avatar>
            <AvatarImage
              src="https://github.com/ryanmearns.png"
              alt="@ryanmearns"
            />
            <AvatarFallback>RM</AvatarFallback>
          </Avatar>
        </Flex>
        <Flex align={"center"} justify={"between"} gap={"sm"}>
          <CreateThreadDialogue />
        </Flex>
        <Flex direction={"column"} gap={"xs"}>
          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon Icon={<Search />} orientation={"leading"} />
            Home
          </Button>

          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon Icon={<Bot />} orientation={"leading"} />
            Bots
          </Button>

          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon Icon={<MessagesSquare />} orientation={"leading"} />
            My threads
          </Button>

          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon Icon={<Cog />} orientation={"leading"} />
            Settings
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

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
    {Array(6).fill(
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
