"use client";

import { DeleteTodoForm } from "@/components/DeleteTodoForm/DeleteTodoForm";
import { UpdateTodoStatusForm } from "@/components/UpdateTodoStatusForm/UpdateTodoStatusForm";
import { Todos } from "@/db/types";
import { useOptimistic } from "@/utils/hooks/use-optimistic";
import { EmptyState, Flex, cn } from "@playbook/ui";
import { ListPlus } from "lucide-react";
import { UpdateTodoDueDateForm } from "../UpdateTodoDueDateForm/UpdateTodoDueDateForm";

export const TodoList = (props: { data: Todos }) => {
  const [optimisticTodos, updateOptimisticTodo] = useOptimistic(props.data);

  if (optimisticTodos.length === 0) {
    return (
      <EmptyState
        title="No todos"
        description="Get started by creating a new todo."
        Icon={<ListPlus />}
      />
    );
  }

  return (
    <Flex
      direction={"column"}
      className="border border-input rounded-md w-full divide-y"
    >
      {optimisticTodos.map((todo) => (
        <div
          key={todo.uuid}
          className="p-4 text-sm group hover:bg-slate-50 cursor-pointer flex items-center gap-2"
        >
          <Flex align={"center"} gap={"md"} grow>
            <UpdateTodoStatusForm
              todo={todo}
              optimisticUpdate={updateOptimisticTodo}
            />
            <Flex direction={"column"} gap={"xs"}>
              <span
                className={cn(
                  "text-sm font-medium",
                  todo.status === "done" && "line-through decoration-2"
                )}
              >
                {todo.content}
              </span>
            </Flex>
          </Flex>
          <DeleteTodoForm todo={todo} optimisticUpdate={updateOptimisticTodo} />
          <UpdateTodoDueDateForm
            todo={todo}
            optimisticUpdate={updateOptimisticTodo}
          />
        </div>
      ))}
    </Flex>
  );
};
