"use server";

import { api } from "@/server/api";
import { updateTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import z from "zod";

export const updateTodoStatusAction = api.protectedAction(
  z.object({
    uuid: z.string(),
    status: z.enum(["todo", "done"]),
  }),
  async (input, ctx) => {
    const data = await updateTodo({
      uuid: input.uuid,
      workspaceUuid: ctx.workspace.uuid,
      status: input.status,
    });

    revalidatePath("/");

    return data;
  }
);
