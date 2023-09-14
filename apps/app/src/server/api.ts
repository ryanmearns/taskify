import { getServerAuthSession } from "@/auth/utils";
import { getWorkspace } from "@/services/workspace";
import { createActionMiddleware } from "@/utils/actions/action-middleware";

/**
 * Public (unauthenticated) action
 *
 * If you want a server action to be public use this action middleware.
 * It will only parse the input and nothing more.
 *
 */
export const publicAction = createActionMiddleware();

/**
 * Protected (authenticated) action
 *
 * If you want a server action to ONLY be accessible to logged in users, use this. It verifies
 * the session is valid and guarantees `ctx.session.user` is not null and uses the userId to
 * fetch the workspace as the tenantId.
 *
 */

const isAuthed = async () => {
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

  return {
    session: session,
    workspace: workspace,
  };
};

const protectedAction = createActionMiddleware({
  buildContext: isAuthed,
});

export const api = {
  protectedAction,
  publicAction,
};
