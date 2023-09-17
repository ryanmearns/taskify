import { getTenant } from "@/services/tenant";
import { getTodosDueToday } from "@/services/todos";
import { DashboardMain, Flex } from "@playbook/ui";
import { notFound } from "next/navigation";
import { NewTodoForm } from "../_components/NewTodoForm/NewTodoForm";
import { TodoList } from "../_components/TodoList/TodoList";

export default async function Page() {
  const { workspace } = await getTenant();

  const data = await getTodosDueToday({ workspaceUuid: workspace.uuid });

  if (!data) notFound();

  return (
    <DashboardMain className="container">
      <PageHeader />
      <TodoList todos={data} />
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
      <h1 className="text-xl font-semibold">Today</h1>
    </Flex>
    <Flex>
      <NewTodoForm />
    </Flex>
  </Flex>
);
