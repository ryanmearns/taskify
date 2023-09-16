import { getServerAuthSession } from "@/auth/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DashboardMain,
  DashboardMainHeader,
  Flex,
  Input,
} from "@playbook/ui";
import { redirect } from "next/navigation";
import { UpdateNameForm } from "./_components/UpdateUserNameForm/UpdateUserNameForm";
import { UpdateEmailForm } from "./_components/UpdateUserEmailForm/UpdateUserEmailForm";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <DashboardMain className="container">
      <DashboardMainHeader>
        <Flex direction={"column"} gap={"xs"}>
          <h1 className="text-xl font-semibold">Settings</h1>
          <p className="text-sm text-muted-foreground hidden md:block">
            Configure and manage your settings.
          </p>
        </Flex>
      </DashboardMainHeader>
      <UpdateNameForm session={session} />
      <UpdateEmailForm session={session} />
      <DeleteAccountForm />
    </DashboardMain>
  );
}

const DeleteAccountForm = () => {
  return (
    <Card className="w-full border-red-600 border-2">
      <CardHeader>
        <CardTitle>Delete my account</CardTitle>
        <CardDescription>
          Permanently remove your Personal Account and all of its contents. This
          action is not reversible, so please continue with caution. Type{" "}
          <strong>Delete my account</strong> into the input field.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className=" max-w-xl">
          <Input />
        </form>
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Button size={"md"} variant={"destructive"}>
          Delete account
        </Button>
      </CardFooter>
    </Card>
  );
};
