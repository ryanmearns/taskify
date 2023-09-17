"use client";

import { Todos } from "@/db/types";
import { useOptimistic } from "@/utils/hooks/use-optimistic";
import {
  EmptyState,
  Flex,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconButton,
  Skeleton,
  cn,
} from "@playbook/ui";
import { Info, ListPlus } from "lucide-react";
import { DeleteTodoForm } from "../DeleteTodoForm/DeleteTodoForm";
import { UpdateTodoDueDateForm } from "../UpdateTodoDueDateForm/UpdateTodoDueDateForm";
import { UpdateTodoForm } from "../UpdateTodoForm/UpdateTodoForm";
import { UpdateTodoStatusForm } from "../UpdateTodoStatusForm/UpdateTodoStatusForm";

const TodoListError = () => <div>There was an error</div>;

const TodoListLoading = () => (
  <Flex
    direction={"column"}
    className="border border-input rounded-md w-full divide-y"
  >
    <Skeleton className="h-[68px] w-full delay-0" />
    <Skeleton className="h-[68px] w-full rounded-none delay-75" />
    <Skeleton className="h-[68px] w-full rounded-none delay-100" />
    <Skeleton className="h-[68px] w-full rounded-none delay-125" />
    <Skeleton className="h-[68px] w-full rounded-none delay-150" />
    <Skeleton className="h-[68px] w-full rounded-none delay-200" />
    <Skeleton className="h-[68px] w-full rounded-none delay-300" />
    <Skeleton className="h-[68px] w-full rounded-none delay-500" />
  </Flex>
);

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
          className="text-sm group hover:bg-slate-50 flex px-4 items-center gap-2"
        >
          <Flex align={"center"} grow>
            <div className="mt-1">
              <UpdateTodoStatusForm
                todo={todo}
                optimisticUpdate={updateOptimisticTodo}
              />
            </div>
            <Flex direction={"column"} className="pl-3 pr-1 py-6">
              <span
                className={cn(
                  "text-sm font-medium",
                  todo.status === "done" && "line-through decoration-2"
                )}
              >
                {todo.content}
              </span>
            </Flex>
            {todo.description && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <IconButton size={"xs"} variant={"ghost"} icon={<Info />} />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex justify-between space-x-4">
                    <div className="space-y-1">
                      <p className="text-sm">{todo.description}</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </Flex>
          <UpdateTodoForm todo={todo} optimisticUpdate={updateOptimisticTodo} />
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

export { TodoList, TodoListError, TodoListLoading };
