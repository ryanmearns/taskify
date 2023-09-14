import type { Config } from "drizzle-kit";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL as string;

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: connectionString,
  },
} satisfies Config;
