import type { Meta, StoryObj } from "@storybook/react";

import * as React from "react";
import { Progress } from "@playbook/ui";

const meta: Meta<typeof Progress> = {
  component: Progress,
};

export default meta;
type Story = StoryObj<typeof Progress>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (arg) => {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return <Progress value={progress} className="w-[60%]" />;
  },
};
