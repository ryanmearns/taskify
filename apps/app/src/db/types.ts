import { InferSelectModel } from "drizzle-orm";
import * as schema from "./schema";

export type Todo = InferSelectModel<typeof schema.todos>;
export type Todos = InferSelectModel<typeof schema.todos>[];
