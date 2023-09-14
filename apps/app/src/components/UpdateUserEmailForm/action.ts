"use server";

import { api } from "@/server/api";
import { updateUser } from "@/services/user";
import { revalidatePath } from "next/cache";
import z from "zod";

export const updateUserEmailAction = api.protectedAction(
  z.object({
    email: z.string().email(),
  }),
  async (input, ctx) => {
    const data = await updateUser({
      id: ctx.session.user.id,
      email: input.email,
    });

    revalidatePath("/app");

    return data;
  }
);
