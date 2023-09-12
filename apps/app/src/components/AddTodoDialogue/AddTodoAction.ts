"use server";

import { schema } from "@/db/index";
import { db } from "@/server/db";
import { actionError, actionSuccess } from "@/types/actions";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import z from "zod";

const addTodoSchema = z.object({ todo: z.string() });

export const addTodoAction = async (arg: z.infer<typeof addTodoSchema>) => {
  const input = addTodoSchema.safeParse(arg);

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
