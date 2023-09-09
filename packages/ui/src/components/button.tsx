import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      justify: {
        none: "",
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
      },
      variant: {
        solid:
          "bg-primary text-primary-foreground hover:bg-primary/90 border border-input shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 border border-destructive shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-input shadow-sm",
        ghost:
          "hover:bg-accent hover:text-accent-foreground border border-transparent",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 rounded-md px-3",
        sm: "h-8 rounded-md px-3",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
        xl: "h-11 rounded-md px-8",
      },
      block: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "sm",
      justify: "center",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, justify, block, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className, justify, block })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const ButtonIcon = (props: {
  Icon: React.ReactElement;
  orientation: "leading" | "trailing";
  className?: string;
}) => {
  return (
    <props.Icon.type
      className={cn(
        "h-3.5 w-3.5",
        props.orientation === "leading" ? "mr-2" : "ml-2",
        props.className
      )}
    />
  );
};

const ButtonCounter = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs bg-muted text-foreground font-medium h-5 w-5 rounded-md flex justify-center items-center ml-2">
    {children}
  </div>
);

export { Button, ButtonCounter, ButtonIcon, buttonVariants };
