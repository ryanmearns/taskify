import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { Checkbox } from "@playbook/ui";
import toast from "react-hot-toast";
import { updateTodoStatusAction } from "./action";

type UpdateTodoStatusFormProps = {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
};

export const UpdateTodoStatusForm = (props: UpdateTodoStatusFormProps) => {
  const handleAction = async () => {
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
      /**
       * Server action
       */
      await updateTodoStatusAction({
        uuid: props.todo.uuid,
        status: props.todo.status === "todo" ? "done" : "todo",
      });
    } catch (error) {
      toast.error("There was an error");
    }
  };

  return (
    <form className="inline-flex" action={handleAction}>
      <Checkbox
        type="submit"
        checked={props.todo.status === "done" ? true : false}
      />
    </form>
  );
};
