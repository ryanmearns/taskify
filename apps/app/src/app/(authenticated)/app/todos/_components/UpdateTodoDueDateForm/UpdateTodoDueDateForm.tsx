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
} from "@playbook/ui";
import { format } from "date-fns";
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
        <Button variant={"outline"}>
          <ButtonIcon orientation="leading" Icon={<CalendarIcon />} />
          {dueDate ? (
            format(dueDate, "dd/MM/yyyy")
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
