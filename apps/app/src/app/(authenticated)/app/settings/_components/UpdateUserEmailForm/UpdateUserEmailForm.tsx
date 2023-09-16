"use client";

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
import { useSession } from "next-auth/react";
import * as React from "react";
import toast from "react-hot-toast";
import { updateUserEmailAction } from "../../_api/update-user-email";

const UpdateEmailForm = (props: { session: Session }) => {
  const [email, setEmail] = React.useState(props.session.user.email);
  const [isPending, startTransition] = React.useTransition();

  const { data: session, update } = useSession();

  React.useEffect(() => {
    session && setEmail(session.user.email);
  }, [session]);

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
              try {
                await updateUserEmailAction({
                  email: email,
                });
                await update({ email: email });
              } catch (err) {
                // Roll back change on error
                await update({ email: props.session.user.email });
                toast.error("There was an error. Try again.");
              }
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
