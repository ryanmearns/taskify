import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { schema } from "@/db/index";

export const todos = async () => {
  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });
};

export const todo = async ({ uuid }: { uuid: string }) => {
  return await db.query.todos.findFirst({ where: eq(schema.todos.uuid, uuid) });
};
