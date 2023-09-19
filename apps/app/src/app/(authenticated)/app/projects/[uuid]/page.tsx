import { getProject, getProjects } from "@/services/project";
import { getTenant } from "@/services/tenant";
import { DashboardMain, Flex } from "@playbook/ui";
import { notFound } from "next/navigation";
import { NewTodoForm } from "../../todos/_components/NewTodoForm/NewTodoForm";
import { TodoList } from "../../todos/_components/TodoList/TodoList";
import { UpdateProjectForm } from "../_components/UpdateProjectForm/UpdateProjectForm";

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
      <Flex
        justify={"between"}
        align={"center"}
        position={"relative"}
        className="w-full bg-white z-10"
      >
        <Flex direction={"column"} gap={"xs"}>
          <h1 className="text-xl font-semibold">{project.name}</h1>
          <p className="text-sm font-normal text-foreground/50">
            {project.description ? project.description : "No description"}
          </p>
        </Flex>
        <Flex gap={"sm"}>
          <UpdateProjectForm project={project} />
          <NewTodoForm projects={projects} />
        </Flex>
      </Flex>
      <TodoList todos={project.todos} projects={projects} />
    </DashboardMain>
  );
}
