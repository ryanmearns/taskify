import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const messages = pgTable("messages", {
  uuid: varchar("uuid", { length: 8 }).primaryKey().notNull(),
  content: varchar("content", { length: 5120 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
