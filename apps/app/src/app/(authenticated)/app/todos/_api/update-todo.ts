"use server";

import { api } from "@/server/api";
import { updateTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateTodoAction = api.protectedAction(
  z.object({
    uuid: z.string(),
    content: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(["todo", "done"]).optional(),
  }),
  async (input, ctx) => {
    const data = await updateTodo({
      ...input,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/app/todos");

    return data;
  }
);
