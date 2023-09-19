import { getTenant } from "@/services/tenant";
import { getTodos } from "@/services/todos";
import { DashboardMain, Flex } from "@playbook/ui";
import { notFound } from "next/navigation";
import { NewTodoForm } from "../_components/NewTodoForm/NewTodoForm";
import { TodoList } from "../_components/TodoList/TodoList";
import { getProjects } from "@/services/project";

export default async function Page() {
  const { workspace } = await getTenant();

  const todos = await getTodos({ workspaceUuid: workspace.uuid });

  const projects = await getProjects({ workspaceUuid: workspace.uuid });

  return (
    <DashboardMain className="container">
      <PageHeader />
      <TodoList todos={todos} projects={projects} />
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
      <h1 className="text-xl font-semibold">Inbox</h1>
      <p className="text-sm font-normal text-foreground/50">View all todos.</p>
    </Flex>
    <Flex>
      <NewTodoForm />
    </Flex>
  </Flex>
);
