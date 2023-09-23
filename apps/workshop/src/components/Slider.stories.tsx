import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "@playbook/ui";

const meta: Meta<typeof Slider> = {
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof Slider>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (arg) => (
    <Slider defaultValue={[50]} max={100} step={1} className={"w-[60%]"} />
  ),
};
