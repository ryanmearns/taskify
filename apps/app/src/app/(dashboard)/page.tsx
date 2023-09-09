import {
  Checkbox,
  DashboardMainHeader,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  EmptyState,
  Flex,
  IconButton,
  cn,
} from "@playbook/ui";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "../../auth/auth";
import * as todos from "../../server/actions/todos";
import { ListPlus, MoreHorizontal, Pen, Plus, Trash2 } from "lucide-react";
import { CreateTodoForm } from "../_forms/create-todo";
import { db } from "../../server/db";
import { schema } from "@/db/index";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { TodoList } from "./_components/todo-list";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const data = await todos.getTodos();

  return (
    <>
      <DashboardMainHeader>
        <Flex direction={"column"} gap={"xs"}>
          <h1 className="text-xl font-semibold">Todos</h1>
          <p className="text-sm text-muted-foreground hidden md:block">
            Keep track of your todos.
          </p>
        </Flex>
        <Flex>
          <CreateTodoForm />
        </Flex>
      </DashboardMainHeader>
      <TodoList todos={data} />
    </>
  );
}
