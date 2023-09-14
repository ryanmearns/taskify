import { and, eq } from "drizzle-orm";
import { db } from "@/server/db";
import * as schema from "@/db/schema";
import { TodoSchema } from "@/db/types";
import { nanoid } from "nanoid";

export const todos = async () => {
  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });
};

export const todo = async (arg: Pick<TodoSchema, "uuid">) => {
  return await db.query.todos.findFirst({
    where: eq(schema.todos.uuid, arg.uuid),
  });
};

export const createTodo = async (arg: Omit<TodoSchema, "uuid">) => {
  return await db.insert(schema.todos).values({ uuid: nanoid(8), ...arg });
};

export const updateTodo = async (arg: TodoSchema) => {
  return await db
    .update(schema.todos)
    .set(arg)
    .where(
      and(
        eq(schema.todos.uuid, arg.uuid),
        eq(schema.todos.workspaceUuid, arg.workspaceUuid)
      )
    );
};

export const deleteTodo = async (arg: TodoSchema) => {
  return await db
    .delete(schema.todos)
    .where(
      and(
        eq(schema.todos.uuid, arg.uuid),
        eq(schema.todos.workspaceUuid, arg.workspaceUuid)
      )
    );
};
