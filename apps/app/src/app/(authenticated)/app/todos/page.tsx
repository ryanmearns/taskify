import { TodoListCell } from "@/components/TodoListCell/TodoListCell";
import {
  Button,
  ButtonIcon,
  DashboardMain,
  DashboardMainHeader,
  Flex,
} from "@playbook/ui";
import { Plus } from "lucide-react";
import Link from "next/link";

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
          <Link href={"/app/todos/new"}>
            <Button variant="outline" block>
              <ButtonIcon Icon={<Plus />} orientation={"leading"} />
              Create todo
            </Button>
          </Link>
        </Flex>
      </DashboardMainHeader>
      <TodoListCell />
    </DashboardMain>
  );
}
