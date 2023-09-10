"use client";

import * as todos from "@/actions/todos";
import { Checkbox, EmptyState, Flex, IconButton, cn } from "@playbook/ui";
import { ListPlus, Trash } from "lucide-react";
import * as React from "react";
import { CreateTodoForm } from "../../../_forms/create-todo";

export const TodoList = (props: {
  todos: NonNullable<todos.GetTodosResult>;
}) => {
  const [optimisticTodos, updateOptimisticTodo] =
    React.experimental_useOptimistic(
      props.todos,
      (
        data,
        action:
          | {
              type: "UPDATE";
              todo: { uuid: string; completed: boolean };
            }
          | {
              type: "DELETE";
              todo: { uuid: string };
            }
      ) => {
        if (action.type === "UPDATE") {
          const updateTodo = data.find(
            (todo) => todo.uuid === action.todo.uuid
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
        } else if (action.type === "DELETE") {
          const newTodos = data.filter(
            (todo) => todo.uuid !== action.todo.uuid
          );

          return newTodos;
        } else {
          return data;
        }
      }
    );

  if (optimisticTodos.length === 0) {
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
          className="p-4 text-sm group hover:bg-slate-50 cursor-pointer flex justify-between items-center"
        >
          <Flex align={"center"} gap={"md"}>
            <form
              className="inline-flex"
              action={async () => {
                updateOptimisticTodo({
                  type: "UPDATE",
                  todo: { uuid: todo.uuid, completed: todo.completed },
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
              updateOptimisticTodo({
                type: "DELETE",
                todo: { uuid: todo.uuid },
              });
              await todos.deleteTodo({ uuid: todo.uuid });
            }}
          />
        </div>
      ))}
    </Flex>
  );
};
