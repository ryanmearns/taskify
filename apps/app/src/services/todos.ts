import { db } from "../server/db";

export const todos = async () =>
  db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });
