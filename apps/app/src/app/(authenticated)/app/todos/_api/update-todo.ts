"use server";

import { api } from "@/server/api";
import { updateTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateTodoContent = api.protectedAction(
  z.object({
    uuid: z.string(),
    content: z.string(),
    description: z.string().optional(),
    status: z.enum(["todo", "done"]).optional(),
  }),
  (input, ctx) => {
    const data = updateTodo({
      ...input,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/app/todos");

    return data;
  }
);
