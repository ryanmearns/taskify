"use server";

import { api } from "@/server/api";
import { createProject, updateProject } from "@/services/project";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateProjectDueDateAction = api.protectedAction(
  z.object({
    uuid: z.string(),
    dueDate: z.date().optional(),
  }),
  (input, ctx) => {
    const data = updateProject({
      uuid: input.uuid,
      dueDate: input.dueDate,
      workspaceUuid: ctx.workspace.uuid,
    });

    revalidatePath("/");

    return data;
  }
);
