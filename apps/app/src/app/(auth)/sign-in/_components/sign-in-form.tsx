"use client";

import { Button, Flex, Input, Label, cn } from "@playbook/ui";
import * as React from "react";
import { Loader2 } from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <Flex direction={"column"} gap={"lg"}>
          <Flex gap={"sm"} direction={"column"}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </Flex>
          <Flex gap={"sm"} direction={"column"}>
            <Label htmlFor="email">Access code</Label>
            <Input
              id="access-code"
              type="password"
              placeholder="Enter access code"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
          </Flex>
          <Button disabled={isLoading} size={"md"}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send email login link
          </Button>
        </Flex>
      </form>
    </div>
  );
}
