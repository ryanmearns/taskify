import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import * as schema from "@/db/schema";
import { WorkspaceSchema } from "@/db/types";

export const getWorkspaces = async () => {
  return await db.query.workspace.findMany({
    orderBy: (workspace, { desc }) => [desc(workspace.createdAt)],
  });
};

export const getWorkspace = async ({ tenantId }: { tenantId: string }) => {
  return await db.query.workspace.findFirst({
    where: eq(schema.workspace.tenantId, tenantId),
  });
};

export const createWorkspace = async (arg: WorkspaceSchema) => {
  return await db.insert(schema.workspace).values(arg);
};

export const updateWorkspace = async (arg: WorkspaceSchema) => {
  return await db
    .update(schema.workspace)
    .set(arg)
    .where(eq(schema.workspace.tenantId, arg.tenantId));
};

export const deleteWorkspace = async (arg: WorkspaceSchema) => {
  return await db
    .delete(schema.todos)
    .where(eq(schema.workspace.tenantId, arg.tenantId));
};
