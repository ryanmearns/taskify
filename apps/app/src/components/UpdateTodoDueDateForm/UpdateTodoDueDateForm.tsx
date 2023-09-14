import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
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
import { updateTodoDueDateAction } from "./action";

type UpdateTodoDueDateFormProps = {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
};

export const UpdateTodoDueDateForm = (props: UpdateTodoDueDateFormProps) => {
  const dueDate = props.todo.dueDate ? new Date(props.todo.dueDate) : undefined;

  const handleAction = async (date: Date) => {
    try {
      /**
       * Optimistic update
       */
      props.optimisticUpdate((data) => {
        const updateTodo = data.find((todo) => props.todo.uuid === todo.uuid);

        if (!updateTodo) {
          return data;
        }

        const newTodo: Todo = {
          ...updateTodo,
          dueDate: date.toString(),
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
      /**
       * Server action
       */
      await updateTodoDueDateAction({
        uuid: props.todo.uuid,
        dueDate: date.toString(),
      });
    } catch (error) {
      toast.error("There was an error");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"}>
          <ButtonIcon orientation="leading" Icon={<CalendarIcon />} />
          {dueDate ? (
            format(dueDate, "PPPP")
          ) : (
            <span className="text-muted-foreground font-normal">No date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={16}
        className="w-auto p-0"
        align="center"
      >
        <Calendar
          mode="single"
          selected={dueDate}
          onSelect={handleAction}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};
