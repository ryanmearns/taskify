"use server";

import { api } from "@/server/api";
import { updateUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import z from "zod";

export const updateUserName = api.protectedAction(
  z.object({
    name: z.string(),
  }),
  async (input, ctx) => {
    const data = await updateUser({
      id: ctx.session.user.id,
      name: input.name,
    });

    revalidatePath("/");

    return data;
  }
);
