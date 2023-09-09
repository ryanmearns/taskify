import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import * as schema from "./schema";

export type SelectTodos = InferSelectModel<typeof schema.todos>;
export type InsertTodos = InferInsertModel<typeof schema.todos>;
