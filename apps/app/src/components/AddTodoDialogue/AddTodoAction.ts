"use server";

import { protectedAction } from "@/server/action";
import { createTodo } from "@/services/todos";
import { revalidatePath } from "next/cache";
import z from "zod";

const schema = z.object({ content: z.string() });

export const addTodoAction = protectedAction(schema, async (input, ctx) => {
  await createTodo({
    content: input.content,
    workspaceUuid: ctx.workspace.uuid,
  });

  revalidatePath("/");
});
