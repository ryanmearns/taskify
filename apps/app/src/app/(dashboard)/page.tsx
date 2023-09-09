import { Flex } from "@playbook/ui";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "../../auth/auth";
import * as todos from "../../server/actions/todos";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const data = await todos.getTodos();

  return <List todos={data} />;
}

const List = (props: { todos: NonNullable<todos.GetTodosResult> }) => (
  <Flex
    direction={"column"}
    className="border border-input rounded-md w-full divide-y"
  >
    {props.todos.map((todo) => (
      <div
        key={todo.uuid}
        className="p-4 text-sm hover:bg-slate-50 cursor-pointer flex justify-between items-center"
      >
        <Flex direction={"column"} gap={"xs"}>
          <span>Message</span>
          <span className="text-xs text-muted-foreground">{todo.todo}</span>
        </Flex>
      </div>
    ))}
  </Flex>
);
