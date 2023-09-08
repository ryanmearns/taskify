import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "../db";
import postgres from "postgres";
import { env } from "../lib/env";

const client = postgres(env.DATABASE_URL, { max: 1 });

export const db = drizzle(client, { schema });
