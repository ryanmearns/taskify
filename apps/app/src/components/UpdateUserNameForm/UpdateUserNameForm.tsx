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
import { useSession } from "next-auth/react";
import * as React from "react";
import toast from "react-hot-toast";

const UpdateNameForm = (props: { session: Session }) => {
  const [name, setName] = React.useState(props.session.user.name);
  const [isPending, startTransition] = React.useTransition();
  const { data: session, update } = useSession();

  React.useEffect(() => {
    session && setName(session.user.name);
  }, [session]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Name</CardTitle>
        <CardDescription>Update your name</CardDescription>
      </CardHeader>
      <CardContent>
        <Input
          className="max-w-xl"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Flex className="grow">
          <p className="text-xs text-muted-foreground">
            Please use 32 characters at maximum.
          </p>
        </Flex>
        <Button size={"md"} onClick={() => setName(props.session.user.name)}>
          Reset
        </Button>
        <Button
          size={"md"}
          variant={"solid"}
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
              try {
                await user.updateName({
                  userId: props.session.user.id,
                  name: name,
                });
                await update({ name: name });
              } catch (err) {
                // Roll back change on error
                await update({ name: props.session.user.name });
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

export { UpdateNameForm };
