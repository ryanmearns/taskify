"use client";

import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { useAction } from "@/utils/actions/hook";
import {
  Button,
  ButtonIcon,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from "@playbook/ui";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { CalendarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { updateTodoDueDateAction } from "../../_api/update-todo-due-date";

type UpdateTodoDueDateFormProps = {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
};

export const UpdateTodoDueDateForm = (props: UpdateTodoDueDateFormProps) => {
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
