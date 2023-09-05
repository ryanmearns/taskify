import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Flex,
  IconButton,
  cn,
} from "@playbook/ui";
import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, ChevronsLeft, ChevronsUpDown } from "lucide-react";
import * as React from "react";

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
  render: (arg) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] space-y-2"
      >
        <Flex gap={"xs"} align={"center"}>
          <CollapsibleTrigger asChild>
            <IconButton
              variant="ghost"
              icon={ChevronRight}
              size="sm"
              className={cn(isOpen && "rotate-90")}
            />
          </CollapsibleTrigger>
          <h4 className="text-sm font-semibold">Files</h4>
        </Flex>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/primitives
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
