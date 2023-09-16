import { getTenant } from "@/services/tenant";
import { getTodo } from "@/services/todos";
import { TodoItem } from "../../../_components/TodoItem/TodoItem";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { uuid: string } }) {
  const { workspace } = await getTenant();

  const todo = await getTodo({
    uuid: params.uuid,
    workspaceUuid: workspace.uuid,
  });

  if (!todo) notFound();

  return <TodoItem todo={todo} />;
}
