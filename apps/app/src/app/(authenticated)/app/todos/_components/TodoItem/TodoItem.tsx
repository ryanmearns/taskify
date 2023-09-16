import { Todo } from "@/db/types";

export const TodoItem = (props: { todo: Todo }) => {
  return <div>{JSON.stringify(props.todo).toString()}</div>;
};
