"use server";

import { api } from "@/server/api";
import { createTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import z from "zod";

export const addTodoAction = api.protectedAction(
  z.object({ content: z.string() }),
  async (input, ctx) => {
    const data = await createTodo({
      content: input.content,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/app");

    return data;
  }
);
