import { UserSchema } from "@/db/types";
import { db } from "@/server/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const updateUser = async (
  arg: Pick<UserSchema, "id"> & Partial<UserSchema>
) => {
  return await db.update(users).set(arg).where(eq(users.id, arg.id));
};
