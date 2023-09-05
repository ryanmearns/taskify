import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Calendar, Flex } from "@playbook/ui";

const meta: Meta<typeof Calendar> = {
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (arg) => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
      <Flex>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </Flex>
    );
  },
};
