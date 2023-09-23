import { getServerAuthSession } from "@/auth/utils";
import { DashboardMain, DashboardMainHeader, Flex } from "@playbook/ui";
import { redirect } from "next/navigation";
import { UpdateEmailForm } from "./_components/UpdateUserEmailForm/UpdateUserEmailForm";
import { UpdateNameForm } from "./_components/UpdateUserNameForm/UpdateUserNameForm";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <DashboardMain>
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
    </DashboardMain>
  );
}
