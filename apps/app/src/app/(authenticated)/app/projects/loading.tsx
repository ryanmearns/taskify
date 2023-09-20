import { DashboardMain, Flex } from "@playbook/ui";
import { NewProjectForm } from "./_components/NewProjectForm/NewProjectForm";

export default async function Loading() {
  return (
    <DashboardMain>
      <Flex
        justify={"between"}
        align={"center"}
        position={"relative"}
        className="w-full bg-white z-10"
      >
        <Flex direction={"column"} gap={"xs"}>
          <h1 className="text-xl font-semibold">Projects</h1>
          <p className="text-sm font-normal text-foreground/50">
            View all projects.
          </p>
        </Flex>
        <Flex>
          <NewProjectForm />
        </Flex>
      </Flex>
      Loading ...
    </DashboardMain>
  );
}
