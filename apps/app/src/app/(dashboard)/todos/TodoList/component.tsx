import { Suspense } from "react";
import { db } from "@/server/db";
import { List } from "./list";
import { ErrorBoundary } from "react-error-boundary";

const QUERY = async () =>
  await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });

const Loading = () => <div>Loading cell ...</div>;

const Failure = () => {
  return <div></div>;
};

async function Component() {
  const data = await QUERY();

  await new Promise((resolve) => setTimeout(resolve, 3000));

  throw Error("There was an error");

  return <List data={data} />;
}

export function TodosCell() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </ErrorBoundary>
  );
}
