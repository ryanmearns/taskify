"use client";

import { DeleteTodoForm } from "../DeleteTodoForm/DeleteTodoForm";
import { UpdateTodoStatusForm } from "../UpdateTodoStatusForm/UpdateTodoStatusForm";
import { Todos } from "@/db/types";
import { useOptimistic } from "@/utils/hooks/use-optimistic";
import { EmptyState, Flex, cn } from "@playbook/ui";
import { ListPlus } from "lucide-react";
import Link from "next/link";
import { UpdateTodoDueDateForm } from "../UpdateTodoDueDateForm/UpdateTodoDueDateForm";

const TodoListError = () => <div>There was an error</div>;

const TodoListLoading = () => <div>Loading ...</div>;

const TodoList = (props: { todos: Todos }) => {
  const [optimisticTodos, updateOptimisticTodo] = useOptimistic(props.todos);

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
          className="text-sm group hover:bg-slate-50 cursor-pointer flex px-4 items-center gap-2"
        >
          <Flex align={"center"} gap={"md"} grow>
            <div className="mt-1">
              <UpdateTodoStatusForm
                todo={todo}
                optimisticUpdate={updateOptimisticTodo}
              />
            </div>
            <Link href={`/app/todos/todo/${todo.uuid}`} className="grow">
              <Flex direction={"column"} grow gap={"xs"} className="py-6">
                <span
                  className={cn(
                    "text-sm font-medium",
                    todo.status === "done" && "line-through decoration-2"
                  )}
                >
                  {todo.content}
                </span>
              </Flex>
            </Link>
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

export { TodoList, TodoListLoading, TodoListError };
