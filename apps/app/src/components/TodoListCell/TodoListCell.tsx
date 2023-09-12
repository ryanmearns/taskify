import { Cell } from "@/components/utils/cell";
import { Scaffold } from "@/components/utils/scaffold";
import { todos } from "@/services/todos";

const QUERY = async () => {
  return await todos();
};

const Loading = () => <div>Loading ...</div>;

const Failure = () => <div>Something went wrong</div>;

async function Data() {
  const data = await QUERY();
  return <Scaffold data={data} />;
}

export function TodoListCell() {
  return (
    <Cell Failure={<Failure />} Loading={<Loading />}>
      <Data />
    </Cell>
  );
}
