import { publicProcedure, router } from "../trpc";
import z from "zod";
import { nanoid } from "nanoid";
import { db } from "../db";
import { schema } from "../../db";

export const messagesRouter = router({
  findMany: publicProcedure.query(async () => {
    return await db.query.messages.findMany();
  }),
  create: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ input }) => {
      return await db.insert(schema.messages).values({
        uuid: nanoid(8),
        content: input.message,
      });
    }),
});
