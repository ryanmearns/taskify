import * as schema from "@/db/schema";
import { db } from "@/server/db";
import { resend } from "@/server/email";
import { env } from "@/utils/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { VerificationEmailTemplate } from "@playbook/emails";
import { nanoid } from "nanoid";
import { DefaultSession, type NextAuthOptions } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import EmailProvider from "next-auth/providers/email";
import GithubProvider from "next-auth/providers/github";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    } & DefaultJWT["user"];
  }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.name = session.name;
      }
      if (trigger === "update" && session?.email) {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        token.email = session.email;
      }
      return token;
    },
  },
  events: {
    createUser: async (arg) => {
      /**
       * Create workspace using User Id as Tenant Id
       */
      await db.insert(schema.workspace).values({
        uuid: nanoid(16),
        tenantId: arg.user.id,
      });
    },
  },
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
    EmailProvider({
      sendVerificationRequest: async ({ url, identifier: email }) => {
        try {
          await resend.sendEmail({
            to: email,
            from: "info@ryanmearns.com",
            subject: `Sign in to OpenDo`,
            react: VerificationEmailTemplate({
              url: url,
              email: email,
              brandName: "OpenDo",
            }),
          });
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    verifyRequest: "/verify-request",
  },
};
