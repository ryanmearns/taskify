"use client";

import * as todos from "@/actions/todos";
import { AddTodoDialogue } from "@/components/AddTodoDialogue/AddTodoDialogue";
import { Todos } from "@/db/types";
import { useOptimistic } from "@/utils/hooks/use-optimistic";
import { Checkbox, EmptyState, Flex, IconButton, cn } from "@playbook/ui";
import { ListPlus, Trash } from "lucide-react";

export const TodoList = (props: { data: Todos }) => {
  const [optimisticTodos, updateOptimisticTodo] = useOptimistic(props.data);

  if (optimisticTodos.length === 0) {
    return (
      <EmptyState
        title="No todos"
        description="Get started by creating a new todo."
        Icon={<ListPlus />}
      >
        <AddTodoDialogue />
      </EmptyState>
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
            <form
              className="inline-flex"
              action={async () => {
                updateOptimisticTodo((data) => {
                  const updateTodo = data.find(
                    (todo) => todo.uuid === todo.uuid
                  );

                  if (!updateTodo) {
                    return data;
                  }

                  const newTodo = {
                    ...updateTodo,
                    completed: !updateTodo?.completed,
                  };

                  const newTodos = data.map((todo) => {
                    if (todo.uuid === newTodo.uuid) {
                      return newTodo;
                    } else {
                      return todo;
                    }
                  });

                  return newTodos;
                });
                await todos.updateTodo({
                  uuid: todo.uuid,
                  completed: todo.completed,
                });
              }}
            >
              <Checkbox type="submit" checked={todo.completed} />
            </form>

            <Flex direction={"column"} gap={"xs"}>
              <span
                className={cn(
                  "text-sm font-medium",
                  todo.completed && "line-through decoration-2"
                )}
              >
                {todo.todo}
              </span>
            </Flex>
          </Flex>
          <IconButton
            variant={"outline"}
            icon={<Trash />}
            className="invisible group-hover:visible"
            type="submit"
            onClick={async () => {
              updateOptimisticTodo((data) => {
                const newTodos = data.filter((todo) => todo.uuid !== todo.uuid);

                return newTodos;
              });
              await todos.deleteTodo({ uuid: todo.uuid });
            }}
          />
        </div>
      ))}
    </Flex>
  );
};
