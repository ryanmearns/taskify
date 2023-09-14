import { todos } from "@/db/schema";
import { TodoSchema } from "@/db/types";
import { db } from "@/server/db";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getTodos = async () => {
  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });
};

export const getTodo = async (arg: Pick<TodoSchema, "uuid">) => {
  return await db.query.todos.findFirst({
    where: eq(todos.uuid, arg.uuid),
  });
};

export const createTodo = async (arg: Omit<TodoSchema, "uuid">) => {
  return await db.insert(todos).values({ uuid: nanoid(8), ...arg });
};

export const updateTodo = async (arg: TodoSchema) => {
  return await db
    .update(todos)
    .set(arg)
    .where(
      and(eq(todos.uuid, arg.uuid), eq(todos.workspaceUuid, arg.workspaceUuid))
    );
};

export const deleteTodo = async (arg: TodoSchema) => {
  return await db
    .delete(todos)
    .where(
      and(eq(todos.uuid, arg.uuid), eq(todos.workspaceUuid, arg.workspaceUuid))
    );
};
