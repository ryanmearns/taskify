"use server";

import { api } from "@/server/api";
import { deleteTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import z from "zod";

export const deleteTodoAction = api.protectedAction(
  z.object({
    uuid: z.string(),
  }),
  async (input, ctx) => {
    await deleteTodo({
      uuid: input.uuid,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/app");
  }
);
