"use client";

import {
  Avatar,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@playbook/ui";
import { Github, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";

export const UserDropdown = () => {
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();

  const avatarImg = session?.user?.image
    ? session.user.image
    : `https://avatar.vercel.sh/${session?.user?.name}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatarImg} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={"/app/settings"}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <div className="p-2 flex gap-4 justify-between items-center">
          <p className="text-xs">Theme</p>
          <Select onValueChange={(val) => setTheme(val)} value={theme}>
            <SelectTrigger className="w-[180px] text-xs">
              <SelectValue className="text-xs" placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-xs" value="light">
                Light
              </SelectItem>
              <SelectItem className="text-xs" value="dark">
                Dark
              </SelectItem>
              <SelectItem className="text-xs" value="system">
                System
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
