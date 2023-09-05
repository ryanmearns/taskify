import type { Meta, StoryObj } from "@storybook/react";

import { Button, ButtonCounter, ButtonIcon, IconButton } from "@playbook/ui";
import { Plus, Search } from "lucide-react";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    variant: "outline",
    size: "sm",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (arg) => <Button {...arg}>Search</Button>,
};

export const IconLeading: Story = {
  render: (arg) => (
    <Button {...arg}>
      <ButtonIcon icon={Search} orientation={"leading"} />
      Search
    </Button>
  ),
};

export const Counter: Story = {
  render: (arg) => (
    <Button {...arg}>
      Search
      <ButtonCounter>1</ButtonCounter>
    </Button>
  ),
};

export const IconOnly: Story = {
  render: (arg) => <IconButton {...arg} icon={Search} />,
};
