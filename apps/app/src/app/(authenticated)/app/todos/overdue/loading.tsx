import { DashboardMain, Flex } from "@playbook/ui";
import { TodoListLoading } from "../_components/TodoList/TodoList.skeleton";

export default async function Loading() {
  return (
    <DashboardMain className="container">
      <Flex
        justify={"between"}
        align={"center"}
        position={"relative"}
        className="w-full bg-white z-10"
      >
        <Flex direction={"column"} gap={"xs"}>
          <h1 className="text-xl font-semibold">Overdue</h1>
          <p className="text-sm font-normal text-foreground/50">
            View overdue todos.
          </p>
        </Flex>
        <Flex></Flex>
      </Flex>
      <TodoListLoading />
    </DashboardMain>
  );
}
