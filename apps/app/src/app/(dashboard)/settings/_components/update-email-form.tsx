"use client";

import * as user from "@/actions/user";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
  Input,
} from "@playbook/ui";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import * as React from "react";

const UpdateEmailForm = (props: { session: Session }) => {
  const [email, setEmail] = React.useState(props.session.user.email);
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email</CardTitle>
        <CardDescription>Update your email address</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          className="max-w-xl"
          id="email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Flex className="grow">
          <p className="text-xs text-muted-foreground">
            You may need to log out and back in to see any change take effect
          </p>
        </Flex>
        <Button size={"md"} onClick={() => setEmail(props.session.user.email)}>
          Reset
        </Button>
        <Button
          size={"md"}
          variant={"solid"}
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              await user.updateEmail({
                userId: props.session.user.id,
                email: email,
              });
            });
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Saving
            </>
          ) : (
            "Save"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export { UpdateEmailForm };
