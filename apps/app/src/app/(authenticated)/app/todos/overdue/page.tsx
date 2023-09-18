import { getProjects } from "@/services/project";
import { getTenant } from "@/services/tenant";
import { getTodosOverdue } from "@/services/todos";
import { DashboardMain, Flex } from "@playbook/ui";
import { NewTodoForm } from "../_components/NewTodoForm/NewTodoForm";
import { TodoList } from "../_components/TodoList/TodoList";

export default async function Page() {
  const { workspace } = await getTenant();

  const data = await getTodosOverdue({ workspaceUuid: workspace.uuid });

  const projects = await getProjects({ workspaceUuid: workspace.uuid });

  return (
    <DashboardMain className="container">
      <PageHeader />
      <TodoList todos={data} projects={projects} />
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
      <h1 className="text-xl font-semibold">Overdue</h1>
    </Flex>
    <Flex>
      <NewTodoForm />
    </Flex>
  </Flex>
);
