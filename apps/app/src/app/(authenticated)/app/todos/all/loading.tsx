import { DashboardMain, Flex } from "@playbook/ui";
import { TodoListLoading } from "../_components/TodoList/TodoList.skeleton";

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
          <h1 className="text-xl font-semibold">Inbox</h1>
          <p className="text-sm font-normal text-foreground/50">
            View all todos.
          </p>
        </Flex>
        <Flex></Flex>
      </Flex>
      <TodoListLoading />
    </DashboardMain>
  );
}
