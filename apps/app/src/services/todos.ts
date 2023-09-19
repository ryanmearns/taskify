import { todos } from "@/db/schema";
import { TodoSchema } from "@/db/types";
import { db } from "@/server/db";
import { addDays, addWeeks } from "date-fns";
import { and, eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getTodos = async (arg: Pick<TodoSchema, "workspaceUuid">) => {
  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    where: (todos, { eq, and, lte, gte }) =>
      and(eq(todos.workspaceUuid, arg.workspaceUuid), eq(todos.status, "todo")),
  });
};

export const getTodosDueToday = async (
  arg: Pick<TodoSchema, "workspaceUuid">
) => {
  const yesterday = addDays(new Date(), -1);

  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    where: (todos, { eq, and, lte, gte }) =>
      and(
        eq(todos.workspaceUuid, arg.workspaceUuid),
        lte(todos.dueDate, new Date()),
        gte(todos.dueDate, yesterday),
        eq(todos.status, "todo")
      ),
  });
};

export const getTodosUpcoming = async (
  arg: Pick<TodoSchema, "workspaceUuid">
) => {
  const nextWeek = addWeeks(new Date(), 1);
  const yesterday = addDays(new Date(), -1);

  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    where: (todos, { eq, and, lte, gte }) =>
      and(
        eq(todos.workspaceUuid, arg.workspaceUuid),
        lte(todos.dueDate, nextWeek),
        gte(todos.dueDate, yesterday),
        eq(todos.status, "todo")
      ),
  });
};

export const getTodosOverdue = async (
  arg: Pick<TodoSchema, "workspaceUuid">
) => {
  const yesterday = addDays(new Date(), -1);

  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    where: (todos, { eq, and, lte }) =>
      and(
        eq(todos.workspaceUuid, arg.workspaceUuid),
        lte(todos.dueDate, yesterday),
        eq(todos.status, "todo")
      ),
  });
};

export const getCompletedTodos = async (
  arg: Pick<TodoSchema, "workspaceUuid">
) => {
  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
    where: (todos, { eq, and, lte, gte }) =>
      and(eq(todos.workspaceUuid, arg.workspaceUuid), eq(todos.status, "done")),
  });
};

export const getTodo = async (
  arg: Pick<TodoSchema, "uuid" | "workspaceUuid">
) => {
  return await db.query.todos.findFirst({
    where: and(
      eq(todos.uuid, arg.uuid),
      eq(todos.workspaceUuid, arg.workspaceUuid)
    ),
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
