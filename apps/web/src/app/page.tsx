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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Flex,
  IconButton,
} from "@playbook/ui";
import {
  Boxes,
  Cog,
  LayoutDashboard,
  MoreHorizontal,
  Pen,
  Search,
  Tag,
  Trash,
  Trash2,
  Upload,
} from "lucide-react";

export default function Home() {
  return (
    <main className="border rounded lg:flex-row flex flex-col lg:h-screen">
      <Button>
        <ButtonIcon Icon={<Boxes />} orientation={"leading"} />
        Submit
      </Button>
    </main>
  );
}
