import { redirect } from "next/navigation";
import { getServerAuthSession } from "../auth/auth";
import { Flex } from "@playbook/ui";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main>
      <Flex>{JSON.stringify(session)}</Flex>
    </main>
  );
}
