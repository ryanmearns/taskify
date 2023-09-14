import * as schema from "@/db/schema";
import { env } from "@/utils/env";
import { Logger } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import chalk from "chalk";

const client = postgres(env.DATABASE_URL, { max: 1 });

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    console.log(chalk.green("SQL:", query));
    params.length > 0 && console.log("PARAMS:", params);
  }
}

export const db = drizzle(client, {
  schema,
  logger: env.NODE_ENV === "development" ? new MyLogger() : false,
});
