"use server";

import { nanoid } from "nanoid";
import { db } from "../db";
import { requireAuth } from "@/auth/utils";
import z from "zod";
import { revalidatePath } from "next/cache";
import { actionError, actionSuccess } from "../../app/types/actions";
import { schema } from "@/db/index";
import { eq } from "drizzle-orm";

const createMessageSchema = z.object({ content: z.string() });

export const createMessage = async (
  arg: z.infer<typeof createMessageSchema>
) => {
  requireAuth();

  const input = createMessageSchema.safeParse(arg);

  if (!input.success) {
    return actionError("BAD_REQUEST");
  }

  const data = await db.insert(schema.messages).values({
    uuid: nanoid(8),
    content: input.data.content,
  });

  if (!data) {
    return actionError("INTERNAL_SERVER_ERROR");
  }

  revalidatePath("/");

  return actionSuccess(data);
};

export type CreateMessageResult = Awaited<ReturnType<typeof createMessage>>;

export const getMessages = async () => {
  requireAuth();
  return await db.query.messages.findMany({
    orderBy: (messages, { desc }) => [desc(messages.createdAt)],
  });
};

export type GetMessagesResult = Awaited<ReturnType<typeof getMessages>>;

const getMessageSchema = z.object({ uuid: z.string() });

export const getMessage = async (arg: z.infer<typeof getMessageSchema>) => {
  requireAuth();

  const input = getMessageSchema.safeParse(arg);

  if (!input.success) {
    return actionError("BAD_REQUEST");
  }

  const data = await db.query.messages.findFirst({
    where: eq(schema.messages.uuid, input.data.uuid),
  });

  if (!data) {
    return actionError("INTERNAL_SERVER_ERROR");
  }

  revalidatePath("/");

  return actionSuccess(data);
};

export type GetMessageResult = Awaited<ReturnType<typeof getMessage>>;
