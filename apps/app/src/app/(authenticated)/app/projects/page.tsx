import { getProjects } from "@/services/project";
import { getTenant } from "@/services/tenant";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DashboardMain,
  Flex,
} from "@playbook/ui";
import { format } from "date-fns";
import { CalendarCheck, CheckCircle } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NewProjectForm } from "./_components/NewProjectForm/NewProjectForm";

export default async function Page() {
  const { workspace } = await getTenant();

  const projects = await getProjects({ workspaceUuid: workspace.uuid });

  if (!projects) notFound();

  return (
    <DashboardMain className="container">
      <PageHeader />
      <List projects={projects} />
    </DashboardMain>
  );
}

const List = (props: { projects: Awaited<ReturnType<typeof getProjects>> }) => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {props.projects.map((project) => (
        <ProjectCard key={project.uuid} project={project} />
      ))}
    </div>
  );
};

const ProjectCard = (props: {
  project: Awaited<ReturnType<typeof getProjects>>[0];
}) => {
  return (
    <Card className="w-full overflow-hidden hover:bg-slate-50 cursor-pointer">
      <Image
        src={`https://avatar.vercel.sh/${props.project.name}?size=10`}
        className="w-full h-28"
        alt="Gradient"
        width={250}
        height={150}
      />
      <CardHeader>
        <CardTitle>{props.project.name}</CardTitle>
        <CardDescription>{props.project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-4">
        <div className="flex gap-2 items-center text-sm">
          <CheckCircle className="h-4 w-4" />
          {props.project.todos.length} tasks
        </div>
        <div className="flex gap-2 items-center text-sm">
          <CalendarCheck className="h-4 w-4" />
          {props.project.dueDate
            ? format(new Date(props.project.dueDate), "PP")
            : "No due date"}
        </div>
      </CardContent>
    </Card>
  );
};

const PageHeader = () => (
  <Flex
    justify={"between"}
    align={"center"}
    position={"relative"}
    className="w-full bg-white z-10"
  >
    <Flex direction={"column"} gap={"xs"}>
      <h1 className="text-xl font-semibold">Projects</h1>
    </Flex>
    <Flex>
      <NewProjectForm />
    </Flex>
  </Flex>
);
