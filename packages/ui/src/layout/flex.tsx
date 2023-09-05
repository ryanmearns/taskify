import * as React from "react";
import { cn } from "../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const flexVariants = cva("flex", {
  variants: {
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    },
    direction: {
      row: "flex-row",
      column: "flex-col",
    },
    position: {
      static: "static",
      relative: "relative",
      absolute: "absolute",
      fixed: "fixed",
      sticky: "sticky",
    },
    padding: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-3",
      lg: "p-4",
    },
  },
  defaultVariants: {
    gap: "sm",
    direction: "row",
    position: "relative",
    padding: "sm",
  },
});

interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, position, padding, direction, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(flexVariants({ position, padding, direction, gap }))}
      {...props}
    />
  )
);

Flex.displayName = "Flex";

export { Flex, flexVariants };
