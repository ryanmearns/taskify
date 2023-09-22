import { getProject, getProjects } from "@/services/project";
import { getTenant } from "@/services/tenant";
import { DashboardMain, Flex } from "@playbook/ui";
import { notFound } from "next/navigation";
import { NewTodoForm } from "../../todos/_components/NewTodoForm/NewTodoForm";
import { TodoList } from "../../todos/_components/TodoList/TodoList";
import { UpdateProjectForm } from "../_components/UpdateProjectForm/UpdateProjectForm";
import { UpdateProjectDueDate } from "../_components/UpdateProjectDueDate/UpdateProjectDueDate";

export default async function Page(props: { params: { uuid: string } }) {
  const { workspace } = await getTenant();

  const project = await getProject({
    workspaceUuid: workspace.uuid,
    uuid: props.params.uuid,
  });

  const projects = await getProjects({ workspaceUuid: workspace.uuid });

  if (!project) notFound();

  return (
    <DashboardMain>
      <div className="w-full z-10 gap-4 md:justify-between flex flex-col md:flex-row relative md:items-center">
        <Flex direction={"column"} gap={"xs"}>
          <h1 className="text-xl font-semibold">{project.name}</h1>
          <p className="text-sm font-normal text-foreground/50">
            {project.description ? project.description : "No description"}
          </p>
        </Flex>
        <Flex gap={"sm"}>
          <UpdateProjectForm project={project} />
          <UpdateProjectDueDate project={project} />
          <NewTodoForm projects={projects} defaultProject={project} />
        </Flex>
      </div>
      <TodoList todos={project.todos} projects={projects} />
    </DashboardMain>
  );
}
