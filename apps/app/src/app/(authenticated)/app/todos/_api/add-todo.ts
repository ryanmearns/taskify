"use server";

import { api } from "@/server/api";
import { createTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addTodoAction = api.protectedAction(
  z.object({
    content: z.string(),
    dueDate: z.date().optional(),
    description: z.string().optional(),
  }),
  async (input, ctx) => {
    const data = await createTodo({
      content: input.content,
      workspaceUuid: ctx.workspace.uuid,
      dueDate: input.dueDate,
    });

    revalidatePath("/app");

    return data;
  }
);
