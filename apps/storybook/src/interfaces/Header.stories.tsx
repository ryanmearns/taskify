import type { Meta, StoryObj } from "@storybook/react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Flex,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuNextLink,
  navigationMenuTriggerStyle,
} from "@playbook/ui";
import { Boxes, Cloud, Codepen } from "lucide-react";
import Link from "next/link";

const meta: Meta<typeof Flex> = {
  component: Flex,
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
      <Flex align={"center"} justify={"between"}>
        <Flex className="grow" align={"center"} gap={"md"}>
          <Flex gap={"sm"}>
            <Boxes className="h-6 w-6" />
            <span className="font-medium">CloudBox</span>
          </Flex>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuNextLink href={"/overview"}>
                  Overview
                </NavigationMenuNextLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuNextLink href={"/activity"}>
                  Activity
                </NavigationMenuNextLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuNextLink href={"/usage"}>
                  Usage
                </NavigationMenuNextLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuNextLink href={"/settings"}>
                  Settings
                </NavigationMenuNextLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Flex>
        <Avatar>
          <AvatarImage
            src="https://github.com/ryanmearns.png"
            alt="@ryanmearns"
          />
          <AvatarFallback>RM</AvatarFallback>
        </Avatar>
      </Flex>
    );
  },
};
