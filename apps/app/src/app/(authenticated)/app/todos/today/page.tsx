import { getProjects } from "@/services/project";
import { getTenant } from "@/services/tenant";
import { getTodosDueToday } from "@/services/todos";
import { DashboardMain, Flex } from "@playbook/ui";
import { NewTodoForm } from "../_components/NewTodoForm/NewTodoForm";
import { TodoList } from "../_components/TodoList/TodoList";

export default async function Page() {
  const { workspace } = await getTenant();

  const data = await getTodosDueToday({ workspaceUuid: workspace.uuid });

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
      <h1 className="text-xl font-semibold">Today</h1>
      <p className="text-sm font-normal text-foreground/50">
        View todos due today.
      </p>
    </Flex>
    <Flex>
      <NewTodoForm />
    </Flex>
  </Flex>
);
