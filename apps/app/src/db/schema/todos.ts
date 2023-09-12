import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  // Default columns
  uuid: varchar("uuid", { length: 8 }).primaryKey().notNull(),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // Added columns
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  todo: varchar("content", { length: 5120 }),
});
