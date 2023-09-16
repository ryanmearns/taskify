import { getTenant } from "@/services/tenant";
import { getTodos } from "@/services/todos";
import { DashboardMain, Flex } from "@playbook/ui";
import { notFound } from "next/navigation";
import { TodoList } from "./_components/TodoList/TodoList";
import { NewTodoForm } from "./_components/NewTodoForm/NewTodoForm";

export default async function Page() {
  const { workspace } = await getTenant();

  const todos = await getTodos({ workspaceUuid: workspace.uuid });

  if (!todos) notFound();

  return (
    <DashboardMain className="container">
      <PageHeader />
      <TodoList todos={todos} />
    </DashboardMain>
  );
}

const PageHeader = () => (
  <Flex
    justify={"between"}
    align={"center"}
    position={"relative"}
    className="w-full bg-white z-10"
  >
    <Flex direction={"column"} gap={"xs"}>
      <h1 className="text-xl font-semibold">Todos</h1>
      <p className="text-sm text-muted-foreground hidden md:block">
        Keep track of your todos.
      </p>
    </Flex>
    <Flex>
      <NewTodoForm />
    </Flex>
  </Flex>
);
