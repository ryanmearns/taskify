import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import { db } from "../server/db";

import GitHubProvider from "next-auth/providers/github";
import { env } from "../lib/env";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  session: { strategy: "database" },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};