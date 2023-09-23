"use server";

import { api } from "@/server/api";
import { createProject } from "@/services/project";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const addProjectAction = api.protectedAction(
  z.object({
    name: z.string(),
    dueDate: z.date().optional(),
    description: z.string().optional(),
  }),
  (input, ctx) => {
    const data = createProject({
      name: input.name,
      dueDate: input.dueDate,
      description: input.description,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/");

    return data;
  }
);
