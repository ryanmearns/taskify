import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import * as schema from "./schema";

export type SelectMessages = InferSelectModel<typeof schema.messages>;
export type InsertMessages = InferInsertModel<typeof schema.messages>;
