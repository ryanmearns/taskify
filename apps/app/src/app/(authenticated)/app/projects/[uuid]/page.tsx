import { getProject, getProjects } from "@/services/project";
import { getTenant } from "@/services/tenant";
import { DashboardMain, Flex } from "@playbook/ui";
import { NewTodoForm } from "../../todos/_components/NewTodoForm/NewTodoForm";
import { TodoList } from "../../todos/_components/TodoList/TodoList";
import { notFound } from "next/navigation";
import { Project } from "@/db/types";

export default async function Page(props: { params: { uuid: string } }) {
  const { workspace } = await getTenant();

  const project = await getProject({
    workspaceUuid: workspace.uuid,
    uuid: props.params.uuid,
  });

  const projects = await getProjects({ workspaceUuid: workspace.uuid });

  if (!project) notFound();

  return (
    <DashboardMain className="container">
      <PageHeader project={project} />
      <TodoList todos={project.todos} projects={projects} />
    </DashboardMain>
  );
}

const PageHeader = (props: { project: Project }) => (
  <Flex
    justify={"between"}
    align={"center"}
    position={"relative"}
    className="w-full bg-white z-10"
  >
    <Flex direction={"column"} gap={"xs"}>
      <h1 className="text-xl font-semibold">{props.project.name}</h1>
      <p className="text-sm font-normal text-foreground/50">
        {props.project.description
          ? props.project.description
          : "No description"}
      </p>
    </Flex>
    <Flex>
      <NewTodoForm />
    </Flex>
  </Flex>
);
