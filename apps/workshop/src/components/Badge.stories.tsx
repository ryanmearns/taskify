import type { Meta, StoryObj } from "@storybook/react";

import { Badge, Flex } from "@playbook/ui";

const meta: Meta<typeof Badge> = {
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (arg) => (
    <Flex gap={"sm"}>
      <Badge variant={"green"}>Completed</Badge>
      <Badge variant={"indigo"}>In-progress</Badge>
      <Badge variant={"yellow"}>Todo</Badge>
      <Badge variant={"red"}>Blocked</Badge>
      <Badge variant={"gray"}>Backlog</Badge>
    </Flex>
  ),
};
