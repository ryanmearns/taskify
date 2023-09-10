import z from "zod";
import "dotenv/config";

export const env = z
  .object({
    DATABASE_URL: z.string(),
    GITHUB_ID: z.string(),
    GITHUB_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
  })
  .parse(process.env);
