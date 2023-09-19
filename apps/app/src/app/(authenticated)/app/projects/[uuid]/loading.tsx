import { DashboardMain, Flex, Skeleton } from "@playbook/ui";
import { NewTodoForm } from "../../todos/_components/NewTodoForm/NewTodoForm";
import { TodoListLoading } from "../../todos/_components/TodoList/TodoList.skeleton";

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
          <h1 className="text-xl font-semibold">
            <Skeleton className="h-[28px] w-96" />
          </h1>
        </Flex>
        <Flex>
          <NewTodoForm />
        </Flex>
      </Flex>
      <TodoListLoading />
    </DashboardMain>
  );
}
