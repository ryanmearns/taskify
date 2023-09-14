import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { IconButton } from "@playbook/ui";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { deleteTodoAction } from "./action";

type DeleteTodoFormProps = {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
};

export const DeleteTodoForm = (props: DeleteTodoFormProps) => {
  const handleAction = async () => {
    try {
      /**
       * Optimistic update
       */
      props.optimisticUpdate((data) => {
        return data.filter((todo) => props.todo.uuid !== todo.uuid);
      });
      /**
       * Server action
       */
      await deleteTodoAction({ uuid: props.todo.uuid });
    } catch (error) {
      toast.error("There was an error");
    }
  };

  return (
    <form action={handleAction}>
      <IconButton
        icon={<Trash />}
        type="submit"
        className="invisible group-hover:visible"
      />
    </form>
  );
};
