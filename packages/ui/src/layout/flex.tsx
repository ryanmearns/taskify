import * as React from "react";
import { cn } from "../lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const flexVariants = cva("flex", {
  variants: {
    align: {
      none: "",
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
    justify: {
      none: "",
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
    },
    gap: {
      none: "gap-0",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
      "2xl": "gap-6",
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
    grow: {
      true: "grow",
    },
  },
  defaultVariants: {
    gap: "none",
    direction: "row",
    position: "relative",
    padding: "none",
    align: "none",
  },
});

interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      position,
      padding,
      direction,
      gap,
      justify,
      align,
      grow,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        flexVariants({
          className,
          position,
          padding,
          direction,
          gap,
          justify,
          align,
          grow,
        })
      )}
      {...props}
    />
  )
);

Flex.displayName = "Flex";

export { Flex, flexVariants };
