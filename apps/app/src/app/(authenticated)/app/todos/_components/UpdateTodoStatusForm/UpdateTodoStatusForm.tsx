import { Todo, Todos } from "@/db/types";
import { OptimisticUpdate } from "@/types/helpers";
import { useAction } from "@/utils/actions/hook";
import { Checkbox } from "@playbook/ui";
import { updateTodoStatusAction } from "../../_api/update-todo-status-form";

type UpdateTodoStatusFormProps = {
  todo: Todo;
  optimisticUpdate: OptimisticUpdate<Todos>;
};

export const UpdateTodoStatusForm = (props: UpdateTodoStatusFormProps) => {
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

        console.log(newTodos);

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
