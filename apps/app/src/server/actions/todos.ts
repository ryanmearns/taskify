"use server";

import { nanoid } from "nanoid";
import { db } from "../db";
import { requireAuth } from "@/auth/utils";
import z from "zod";
import { revalidatePath } from "next/cache";
import { actionError, actionSuccess } from "../../app/types/actions";
import { schema } from "@/db/index";
import { eq } from "drizzle-orm";
import { boolean } from "drizzle-orm/pg-core";

const createTodoSchema = z.object({ todo: z.string() });

export const createTodo = async (arg: z.infer<typeof createTodoSchema>) => {
  requireAuth();

  const input = createTodoSchema.safeParse(arg);

  if (!input.success) {
    return actionError("BAD_REQUEST");
  }

  const data = await db.insert(schema.todos).values({
    uuid: nanoid(8),
    todo: input.data.todo,
  });

  if (!data) {
    return actionError("INTERNAL_SERVER_ERROR");
  }

  revalidatePath("/");

  return actionSuccess(data);
};

export type CreateTodoResult = Awaited<ReturnType<typeof createTodo>>;

export const getTodos = async () => {
  requireAuth();
  return await db.query.todos.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });
};

export type GetTodosResult = Awaited<ReturnType<typeof getTodos>>;

const getTodoSchema = z.object({ uuid: z.string() });

export const getTodo = async (arg: z.infer<typeof getTodoSchema>) => {
  requireAuth();

  const input = getTodoSchema.safeParse(arg);

  if (!input.success) {
    return actionError("BAD_REQUEST");
  }

  const data = await db.query.todos.findFirst({
    where: eq(schema.todos.uuid, input.data.uuid),
  });

  if (!data) {
    return actionError("INTERNAL_SERVER_ERROR");
  }

  revalidatePath("/");

  return actionSuccess(data);
};

export type GetTodoResult = Awaited<ReturnType<typeof getTodo>>;

const updateTodoSchema = z.object({ uuid: z.string(), completed: z.boolean() });

export const updateTodo = async (arg: z.infer<typeof updateTodoSchema>) => {
  requireAuth();

  const input = updateTodoSchema.safeParse(arg);

  if (!input.success) {
    return actionError("BAD_REQUEST");
  }

  const data = await db
    .update(schema.todos)
    .set({ completed: !input.data.completed })
    .where(eq(schema.todos.uuid, input.data.uuid));

  if (!data) {
    return actionError("INTERNAL_SERVER_ERROR");
  }

  revalidatePath("/");

  return actionSuccess(data);
};

export type UpdateTodoResult = Awaited<ReturnType<typeof updateTodo>>;
