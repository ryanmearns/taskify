import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "@playbook/ui";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (arg) => <Textarea placeholder="Type your message here." />,
};
