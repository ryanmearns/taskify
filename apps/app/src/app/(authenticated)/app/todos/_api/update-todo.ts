"use server";

import { api } from "@/server/api";
import { updateTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import z from "zod";

export const updateTodoAction = api.protectedAction(
  z.object({
    uuid: z.string(),
    content: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["todo", "done"]).optional(),
    dueDate: z.string().optional(),
  }),
  async (input, ctx) => {
    const data = await updateTodo({
      uuid: input.uuid,
      workspaceUuid: ctx.workspace.uuid,
      content: input.content,
      status: input.status,
      dueDate: input.dueDate,
    });

    revalidatePath("/app");

    return data;
  }
);
