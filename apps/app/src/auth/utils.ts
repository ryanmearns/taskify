import { getServerAuthSession } from "./auth";

export async function requireAuth() {
  const session = await getServerAuthSession();

  if (!session) {
    throw Error("NOT AUTHORIZED");
  }

  return session;
}
