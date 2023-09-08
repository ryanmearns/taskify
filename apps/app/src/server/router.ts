import { schema } from "../db";
import { db } from "./db";
import { router, publicProcedure } from "./trpc";
import z from "zod";
import { nanoid } from "nanoid";
import { messagesRouter } from "./routes/messages";

export const appRouter = router({
  messages: messagesRouter,
});

export type AppRouter = typeof appRouter;
