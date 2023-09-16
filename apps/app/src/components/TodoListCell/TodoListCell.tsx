import { TodoList } from "../TodoList/TodoList";
import { Cell } from "@/components/utils/cell";
import { getTenant } from "@/services/tenant";
import { getTodos } from "@/services/todos";
import { EmptyState } from "@playbook/ui";
import { ListPlus } from "lucide-react";

const QUERY = async () => {
  const { workspace } = await getTenant();

  return await getTodos({ workspaceUuid: workspace.uuid });
};

export function TodoListCell() {
  return (
    <Cell Failure={<Failure />} Loading={<Loading />}>
      <Data />
    </Cell>
  );
}

async function Data() {
  const data = await QUERY();

  if (!data || data.length === 0) {
    return <Empty />;
  }

  return <Success data={data} />;
}

const Loading = () => <div>Loading ...</div>;

const Failure = () => <div>Something went wrong</div>;

const Empty = () => (
  <EmptyState
    title="No todos"
    description="Get started by creating a new todo."
    Icon={<ListPlus />}
  />
);

const Success = ({ data }: { data: Awaited<ReturnType<typeof QUERY>> }) => (
  <TodoList data={data} />
);
