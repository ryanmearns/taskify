"use client";

import { Todos } from "@/db/types";
import { useOptimistic } from "@/utils/hooks/use-optimistic";
import { EmptyState, Flex, cn } from "@playbook/ui";
import { DeleteTodoForm } from "../DeleteTodoForm/DeleteTodoForm";
import { UpdateTodoStatusForm } from "../UpdateTodoStatusForm/UpdateTodoStatusForm";
import { ListPlus } from "lucide-react";

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
          className="p-4 text-sm group hover:bg-slate-50 cursor-pointer flex justify-between items-center"
        >
          <Flex align={"center"} gap={"md"}>
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
        </div>
      ))}
    </Flex>
  );
};
