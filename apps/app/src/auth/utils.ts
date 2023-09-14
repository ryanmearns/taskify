import { getServerSession } from "next-auth";
import { authConfig } from "./config";

export async function requireAuth() {
  const session = await getServerAuthSession();

  if (!session) {
    throw Error("NOT AUTHORIZED");
  }

  return session;
}

export const getServerAuthSession = async () => {
  const session = await getServerSession(authConfig);

  return session;
};
