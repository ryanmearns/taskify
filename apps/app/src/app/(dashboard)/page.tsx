import { Flex } from "@playbook/ui";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "../../auth/auth";
import * as messages from "../../server/actions/messages";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const data = await messages.getMessages();

  return <List messages={data} />;
}

const List = (props: { messages: NonNullable<messages.GetMessagesResult> }) => (
  <Flex
    direction={"column"}
    className="border border-input rounded-md w-full divide-y"
  >
    {props.messages.map((message) => (
      <div
        key={message.uuid}
        className="p-4 text-sm hover:bg-slate-50 cursor-pointer flex justify-between items-center"
      >
        <Flex direction={"column"} gap={"xs"}>
          <span>Message</span>
          <span className="text-xs text-muted-foreground">
            {message.content}
          </span>
        </Flex>
      </div>
    ))}
  </Flex>
);
