import "dotenv/config";
import z from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string(),
    NEXTAUTH_SECRET: z.string(),
    RESEND_API_KEY: z.string(),
  })
  .parse(process.env);
