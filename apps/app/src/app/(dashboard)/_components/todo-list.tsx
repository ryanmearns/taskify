"use client";

import * as todos from "@/actions/todos";
import {
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyState,
  Flex,
  IconButton,
  cn,
} from "@playbook/ui";
import { ListPlus, MoreHorizontal, Pen, Trash2 } from "lucide-react";
import * as React from "react";
import { CreateTodoForm } from "../../_forms/create-todo";

export const TodoList = (props: {
  todos: NonNullable<todos.GetTodosResult>;
}) => {
  const [optimisticTodos, updateOptimisticTodo] =
    React.experimental_useOptimistic(
      props.todos,
      (data, newData: { uuid: string; completed: boolean }) => {
        const updateTodo = data.find((todo) => todo.uuid === newData.uuid);

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
      }
    );

  if (props.todos.length === 0) {
    return (
      <EmptyState
        title="No todos"
        description=" Get started by creating a new todo."
        Icon={<ListPlus />}
      >
        <CreateTodoForm />
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
          className="p-4 text-sm hover:bg-slate-50 cursor-pointer flex justify-between items-center"
        >
          <Flex align={"center"} gap={"md"}>
            <form
              className="inline-flex"
              action={async () => {
                updateOptimisticTodo({
                  uuid: todo.uuid,
                  completed: todo.completed,
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton Icon={<MoreHorizontal />} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-36">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Pen className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ))}
    </Flex>
  );
};
