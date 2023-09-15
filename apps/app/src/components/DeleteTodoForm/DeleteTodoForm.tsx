import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { IconButton } from "@playbook/ui";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { deleteTodoAction } from "./DeleteTodoForm.action";
import { useAction } from "@/utils/actions/hook";

type DeleteTodoFormProps = {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
};

export const DeleteTodoForm = (props: DeleteTodoFormProps) => {
  const action = useAction(deleteTodoAction, {
    onMutate: (input) => {
      props.optimisticUpdate((data) => {
        return data.filter((todo) => input.uuid !== todo.uuid);
      });
    },
  });

  return (
    <IconButton
      icon={<Trash />}
      onClick={() => action.execute({ uuid: props.todo.uuid })}
      className="invisible group-hover:visible"
    />
  );
};
