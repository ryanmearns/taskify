"use server";

import { api } from "@/server/api";
import { updateTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateTodoDueDateAction = api.protectedAction(
  z.object({ uuid: z.string(), dueDate: z.string() }),
  async (input, ctx) => {
    const data = await updateTodo({
      uuid: input.uuid,
      dueDate: input.dueDate,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/app");

    return data;
  }
);
