import { workspace } from "@/db/schema";
import { WorkspaceSchema } from "@/db/types";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export const getWorkspace = async ({ tenantId }: { tenantId: string }) => {
  return await db.query.workspace.findFirst({
    where: eq(workspace.tenantId, tenantId),
  });
};

export const createWorkspace = async (arg: Omit<WorkspaceSchema, "uuid">) => {
  return await db.insert(workspace).values({ uuid: nanoid(16), ...arg });
};

export const updateWorkspace = async (arg: WorkspaceSchema) => {
  return await db
    .update(workspace)
    .set(arg)
    .where(eq(workspace.tenantId, arg.tenantId));
};

export const deleteWorkspace = async (arg: WorkspaceSchema) => {
  return await db.delete(workspace).where(eq(workspace.tenantId, arg.tenantId));
};
