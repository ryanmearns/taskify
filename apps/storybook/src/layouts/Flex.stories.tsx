import type { Meta, StoryObj } from "@storybook/react";

import { Flex } from "@playbook/ui";

const meta: Meta<typeof Flex> = {
  component: Flex,
  args: {
    gap: "sm",
    position: "relative",
    padding: "sm",
    direction: "row",
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
      <Flex {...arg}>
        {Array(6).fill(
          <div className="h-16 w-16 bg-slate-200 border rounded" />
        )}
      </Flex>
    );
  },
};
