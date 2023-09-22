import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL as string;

const client = postgres(connectionString, { max: 1 });

const db = drizzle(client);

async function main() {
  console.log("Running migration");
  await migrate(db, { migrationsFolder: "./src/db/migrations" });
  console.log("Finished migration");
  process.exit();
}

main();
