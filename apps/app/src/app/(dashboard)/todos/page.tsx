import { DashboardMain, DashboardMainHeader, Flex } from "@playbook/ui";
import { TodoListCell } from "@/components/TodoListCell/TodoListCell";
import { AddTodoDialogue } from "../../../components/AddTodoDialogue/AddTodoDialogue";

export default function Page() {
  return (
    <DashboardMain className="container">
      <DashboardMainHeader>
        <Flex direction={"column"} gap={"xs"}>
          <h1 className="text-xl font-semibold">Todos</h1>
          <p className="text-sm text-muted-foreground hidden md:block">
            Keep track of your todos.
          </p>
        </Flex>
        <Flex>
          <AddTodoDialogue />
        </Flex>
      </DashboardMainHeader>
      <TodoListCell />
    </DashboardMain>
  );
}
