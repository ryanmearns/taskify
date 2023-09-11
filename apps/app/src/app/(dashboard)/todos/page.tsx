import { db } from "@/server/db";
import { List } from "./list";

export default async function Page() {
  const data = await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });

  return <List data={data} />;
}
