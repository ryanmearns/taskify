"use client";

import { Projects, Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { useAction } from "@/utils/actions/hook";
import { useOptimistic } from "@/utils/hooks/use-optimistic";
import {
  Button,
  ButtonIcon,
  Calendar,
  Checkbox,
  EmptyState,
  Flex,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from "@playbook/ui";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { CalendarIcon, Info, ListPlus, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { deleteTodoAction } from "../../_api/delete-todo";
import { updateTodoDueDateAction } from "../../_api/update-todo-due-date";
import { updateTodoStatusAction } from "../../_api/update-todo-status-form";
import { TodoSheet } from "../TodoSheet/TodoSheet";

const TodoList = (props: { todos: Todos; projects: Projects }) => {
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
        <TodoItem
          key={todo.uuid}
          todo={todo}
          updateOptimisticTodo={updateOptimisticTodo}
          projects={props.projects}
        />
      ))}
    </Flex>
  );
};

const TodoItem = (props: {
  todo: Todo;
  projects: Projects;
  updateOptimisticTodo: (
    action: Todos | ((pendingState: Todos) => Todos)
  ) => void;
}) => {
  return (
    <div className="text-sm group hover:bg-slate-50 flex px-4 items-center gap-2">
      <Flex align={"center"} grow>
        <div className="mt-1">
          <UpdateTodoStatusForm
            todo={props.todo}
            optimisticUpdate={props.updateOptimisticTodo}
          />
        </div>
        <Flex direction={"column"} className="pl-3 pr-1 py-6">
          <span
            className={cn(
              "text-sm font-medium",
              props.todo.status === "done" && "line-through decoration-2"
            )}
          >
            {props.todo.content}
          </span>
        </Flex>
        {props.todo.description && (
          <HoverCard>
            <HoverCardTrigger asChild>
              <IconButton size={"xs"} variant={"ghost"} icon={<Info />} />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <p className="text-sm">{props.todo.description}</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        )}
      </Flex>
      <TodoSheet
        todo={props.todo}
        optimisticUpdate={props.updateOptimisticTodo}
        projects={props.projects}
      />
      <DeleteTodoForm
        todo={props.todo}
        optimisticUpdate={props.updateOptimisticTodo}
      />
      <UpdateTodoDueDateForm
        todo={props.todo}
        optimisticUpdate={props.updateOptimisticTodo}
      />
    </div>
  );
};

const UpdateTodoStatusForm = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const action = useAction(updateTodoStatusAction, {
    onMutate: () => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          status: props.todo.status === "todo" ? "done" : "todo",
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
    },
  });

  return (
    <Checkbox
      type="submit"
      onClick={() =>
        action.execute({
          uuid: props.todo.uuid,
          status: props.todo.status === "todo" ? "done" : "todo",
        })
      }
      checked={props.todo.status === "done" ? true : false}
    />
  );
};

const DeleteTodoForm = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const action = useAction(deleteTodoAction, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        return data.filter((todo) => input.uuid !== todo.uuid);
      });
    },
  });

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <IconButton
            icon={<Trash />}
            onClick={() => action.execute({ uuid: props.todo.uuid })}
            className="invisible group-hover:visible"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete todo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const UpdateTodoDueDateForm = (props: {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
}) => {
  const dueDate = props.todo.dueDate ? props.todo.dueDate : undefined;

  const action = useAction(updateTodoDueDateAction, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          dueDate: input.dueDate,
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
    },
    onError: () => {
      toast.error("There was an error");
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            (props.todo.status === "done" && "text-green-600") ||
              (dueDate && isToday(dueDate) && "text-yellow-600") ||
              (dueDate && isTomorrow(dueDate) && "text-blue-600") ||
              (dueDate &&
                isPast(dueDate) &&
                props.todo.status === "todo" &&
                "text-red-600")
          )}
        >
          {dueDate ? (
            <>
              <ButtonIcon orientation="leading" Icon={<CalendarIcon />} />
              {props.todo.status === "done" && "Completed"}
              {isToday(dueDate) && props.todo.status === "todo" && (
                <span>Today</span>
              )}
              {isTomorrow(dueDate) && props.todo.status === "todo" && (
                <span>Tomorrow</span>
              )}
              {!isToday(dueDate) &&
                !isTomorrow(dueDate) &&
                props.todo.status === "todo" && (
                  <span>{format(dueDate, "PP")}</span>
                )}
            </>
          ) : (
            <span className="text-muted-foreground font-normal">No date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={(date) => {
            if (date) {
              action.execute({
                uuid: props.todo.uuid,
                dueDate: date,
              });
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export { TodoList };
