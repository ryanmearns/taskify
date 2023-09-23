import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ButtonIcon,
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
  Separator,
} from "@playbook/ui";
import {
  ArrowDownSquare,
  Boxes,
  Cog,
  LayoutDashboard,
  MoreHorizontal,
  Pen,
  Pocket,
  Search,
  Tag,
  Trash,
  Trash2,
  Upload,
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
      <div className="border rounded lg:flex-row flex flex-col lg:h-screen">
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
      <ButtonIcon Icon={<LayoutDashboard />} orientation={"leading"} />
      My files
    </Button>
    <Button variant={"ghost"} block>
      <ButtonIcon Icon={<Trash />} orientation={"leading"} />
      Deleted files
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
      <ArrowDownSquare className="h-6 w-6 -rotate-90" />
      <span className="font-semibold text-lg">DropPocket</span>
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
            <ArrowDownSquare className="h-6 w-6" />
            <span className="font-semibold text-lg">DropPocket</span>
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
          <Button block>
            <ButtonIcon Icon={<Tag />} orientation={"leading"} />
            New tag
          </Button>
          <IconButton Icon={<Search />} />
        </Flex>
        <Flex direction={"column"} gap={"xs"}>
          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon Icon={<LayoutDashboard />} orientation={"leading"} />
            My files
          </Button>

          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon Icon={<Trash />} orientation={"leading"} />
            Deleted files
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
      <h1 className=" text-xl font-semibold">My files</h1>
      <p className="text-sm text-muted-foreground hidden md:block">
        Upload and search your uploaded files.
      </p>
    </Flex>
    <Button size={"md"} className="flex-none">
      <ButtonIcon Icon={<Upload />} orientation={"leading"} />
      Upload file
    </Button>
  </Flex>
);

const List = () => (
  <Flex direction={"column"} className="border rounded w-full divide-y">
    {Array(24).fill(
      <div className="p-4 text-sm hover:bg-slate-50 cursor-pointer flex justify-between items-center">
        <Flex direction={"column"} gap={"xs"}>
          <span>Resume.docx</span>
          <span className="text-xs text-muted-foreground">
            Added 3 days ago
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
