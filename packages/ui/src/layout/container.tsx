import * as React from "react";
import { cn } from "../lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("container pt-2", className)} {...props} />
  )
);

export { Container };
