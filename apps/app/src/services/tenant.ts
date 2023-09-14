import { getServerAuthSession } from "@/auth/utils";
import { cache } from "react";
import { getWorkspace } from "./workspace";

export const revalidate = 3600;

export const getTenant = cache(async () => {
  // Check authorised user
  const session = await getServerAuthSession();

  if (!session) {
    throw new Error("No session");
  }

  // Get user workspace
  const workspace = await getWorkspace({ tenantId: session.user.id });

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  return { session, workspace };
});
