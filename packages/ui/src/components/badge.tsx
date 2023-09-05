import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        gray: "border-transparent bg-gray-100 text-gray-700",
        green: "border-transparent bg-green-100 text-green-700",
        red: "border-transparent bg-red-100 text-red-700",
        indigo: "border-transparent bg-indigo-100 text-indigo-700",
        cyan: "border-transparent bg-cyan-100 text-cyan-700",
        none: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "green",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
