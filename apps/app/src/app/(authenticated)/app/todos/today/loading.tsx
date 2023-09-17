import { DashboardMain, Flex } from "@playbook/ui";
import { NewTodoForm } from "../_components/NewTodoForm/NewTodoForm";
import { TodoListLoading } from "../_components/TodoList/TodoList";

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
          <h1 className="text-xl font-semibold">Todos</h1>
          <p className="text-sm text-muted-foreground hidden md:block">
            Keep track of your todos.
          </p>
        </Flex>
        <Flex>
          <NewTodoForm />
        </Flex>
      </Flex>
      <TodoListLoading />
    </DashboardMain>
  );
}
