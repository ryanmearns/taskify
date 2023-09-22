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
    projectUuid: z.string().optional(),
  }),
  async (input, ctx) => {
    const data = await createTodo({
      content: input.content,
      workspaceUuid: ctx.workspace.uuid,
      dueDate: input.dueDate,
      projectUuid: input.projectUuid,
    });

    revalidatePath("/app");

    return data;
  }
);
