import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  ButtonIcon,
  Flex,
  IconButton,
  Separator,
} from "@playbook/ui";
import {
  Boxes,
  Cog,
  LayoutDashboard,
  Search,
  Tag,
  Trash,
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
export const Default: Story = {
  render: (arg) => {
    return (
      <Flex direction={"row"} className="border rounded">
        {/* // Desktop sidebar */}
        <DesktopSidebar />
        {/* //Main */}
        <Flex
          grow
          className="max-w-full px-4 py-4 md:py-8 lg:px-12"
          align={"start"}
          direction={"column"}
          justify={"start"}
          gap={"2xl"}
        >
          <Header />
          <List />
        </Flex>
      </Flex>
    );
  },
};

const DesktopSidebar = () => {
  return (
    <Flex
      justify={"between"}
      direction={"column"}
      className="w-64 hidden lg:flex border-r h-screen"
    >
      <Flex direction={"column"} gap={"lg"} padding={"lg"}>
        <Flex justify={"between"} align={"center"}>
          <Flex gap={"xs"} align={"center"}>
            <Boxes className="h-6 w-6" />
            <span className="font-semibold text-lg">CloudBox</span>
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
            <ButtonIcon icon={Tag} orientation={"leading"} />
            New tag
          </Button>
          <IconButton icon={Search} />
        </Flex>
        <Flex direction={"column"} gap={"xs"}>
          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon icon={LayoutDashboard} orientation={"leading"} />
            My files
          </Button>

          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon icon={Trash} orientation={"leading"} />
            Deleted files
          </Button>
          <Button variant={"ghost"} justify={"start"}>
            <ButtonIcon icon={Cog} orientation={"leading"} />
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
      <ButtonIcon icon={Upload} orientation={"leading"} />
      Upload file
    </Button>
  </Flex>
);

const List = () => (
  <Flex direction={"column"} className="border rounded w-full divide-y">
    {Array(8).fill(
      <div className="p-4 text-sm hover:bg-slate-50 cursor-pointer">
        Resume.docx
      </div>
    )}
  </Flex>
);
