import { boolean, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  uuid: varchar("uuid", { length: 8 }).primaryKey().notNull(),
  todo: varchar("content", { length: 5120 }),
  completed: boolean("completed").default(false).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
