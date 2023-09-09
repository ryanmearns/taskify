import { LucideProps } from "lucide-react";
import * as React from "react";
import { Flex } from "../layout/flex";
import { cn } from "../lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  Icon: React.ReactElement<LucideProps>;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, Icon, children, title, description }, ref) => {
    return (
      <Flex
        direction={"column"}
        align={"center"}
        justify={"center"}
        className={cn(
          "border border-input rounded-md w-full h-full bg-muted/20 p-12",
          className
        )}
      >
        <div className="text-center">
          <Icon.type className="h-10 w-10 mx-auto stroke-1 stroke-foreground" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <div className="mt-6">{children}</div>
        </div>
      </Flex>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState };
