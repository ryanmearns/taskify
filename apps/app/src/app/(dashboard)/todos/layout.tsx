import { DashboardMain, DashboardMainHeader, Flex } from "@playbook/ui";
import { AddTodo } from "./_AddTodo/form";

export default function Layout({ children }: { children: React.ReactNode }) {
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
          <AddTodo />
        </Flex>
      </DashboardMainHeader>
      {children}
    </DashboardMain>
  );
}
