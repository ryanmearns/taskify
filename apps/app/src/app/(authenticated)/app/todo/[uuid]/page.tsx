import { TodoItemCell } from "@/components/TodoItemCell/TodoItemCell";

export default async function Page({ params }: { params: { uuid: string } }) {
  return <TodoItemCell uuid={params.uuid} />;
}
