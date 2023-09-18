"use server";

import { api } from "@/server/api";
import { updateTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateTodoProject = api.protectedAction(
  z.object({ uuid: z.string(), projectUuid: z.string() }),
  async (input, ctx) => {
    const data = await updateTodo({
      uuid: input.uuid,
      workspaceUuid: ctx.workspace.uuid,
      projectUuid: input.projectUuid,
    });

    revalidatePath("/app");

    return data;
  }
);
