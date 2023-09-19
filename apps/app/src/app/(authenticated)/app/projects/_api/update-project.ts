"use server";

import { api } from "@/server/api";
import { createProject, updateProject } from "@/services/project";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateProjectAction = api.protectedAction(
  z.object({
    uuid: z.string(),
    name: z.string(),
    dueDate: z.date().optional(),
    description: z.string().optional(),
  }),
  (input, ctx) => {
    const data = updateProject({
      uuid: input.uuid,
      name: input.name,
      dueDate: input.dueDate,
      description: input.description,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/app");

    return data;
  }
);
