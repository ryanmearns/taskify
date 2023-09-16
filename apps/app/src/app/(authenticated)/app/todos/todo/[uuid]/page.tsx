import { getTenant } from "@/services/tenant";
import { getTodo } from "@/services/todos";

export default async function Page({ params }: { params: { uuid: string } }) {
  const { workspace } = await getTenant();

  const todo = await getTodo({
    uuid: params.uuid,
    workspaceUuid: workspace.uuid,
  });

  return <div>{JSON.stringify(todo).toString()}</div>;
}
