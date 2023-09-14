"use server";

import { requireAuth } from "@/auth/utils";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import { actionError, actionSuccess } from "../../types/actions";
import { db } from "../db";

const updateNameSchema = z.object({
  name: z.string(),
  userId: z.string(),
});

export const updateName = async (arg: z.infer<typeof updateNameSchema>) => {
  try {
    await requireAuth();

    const input = updateNameSchema.safeParse(arg);

    if (!input.success) {
      return actionError("BAD_REQUEST");
    }

    const data = await db
      .update(schema.users)
      .set({ name: input.data.name })
      .where(eq(schema.users.id, input.data.userId));

    revalidatePath("/");

    return actionSuccess(data);
  } catch (error) {
    return actionError("INTERNAL_SERVER_ERROR");
  }
};

const updateEmailSchema = z.object({
  email: z.string(),
  userId: z.string(),
});

export const updateEmail = async (arg: z.infer<typeof updateEmailSchema>) => {
  try {
    await requireAuth();

    const input = updateEmailSchema.safeParse(arg);

    if (!input.success) {
      return actionError("BAD_REQUEST");
    }

    const data = await db
      .update(schema.users)
      .set({ email: input.data.email })
      .where(eq(schema.users.id, input.data.userId));

    revalidatePath("/");

    return actionSuccess(data);
  } catch (error) {
    return actionError("INTERNAL_SERVER_ERROR");
  }
};
