import { db } from "@/server/db";
import { resend } from "@/server/email";
import { createWorkspace } from "@/services/workspace";
import { env } from "@/utils/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { VerificationEmailTemplate } from "@playbook/emails";
import { type NextAuthOptions } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import EmailProvider from "next-auth/providers/email";

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

export const authConfig: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  /**
   * JWT is required for middleware
   */
  session: { strategy: "jwt" },
  /**
   * Drizzle ORM is used as the adapter
   * {@link https://authjs.dev/reference/adapter/drizzle @auth/drizzle-adapter}.
   */
  adapter: DrizzleAdapter(db),
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        /**
         * This adds the userId to the JWT that is returned by
         * `useSession`, `getSession` and received as a prop
         * on the `SessionProvider` React Context
         */
        id: token.sub,
      },
    }),
    jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.name) {
        /**
         * Update token name with new session name
         */
        token.name = session.name;
      }
      if (trigger === "update" && session?.email) {
        /**
         * Update token email with new session email
         */
        token.email = session.email;
      }
      return token;
    },
  },
  events: {
    createUser: async (arg) => {
      /**
       * This creates a workspace using userId as the tenantId
       */
      await createWorkspace({ tenantId: arg.user.id });
    },
  },
  providers: [
    EmailProvider({
      sendVerificationRequest: async ({ url, identifier: email }) => {
        try {
          await resend.sendEmail({
            to: email,
            from: "info@ryanmearns.com",
            subject: `Sign in to Taskify`,
            react: VerificationEmailTemplate({
              url: url,
              email: email,
              brandName: "Taskify",
            }),
          });
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    /**
     * This page is redirected too after sign-in using the Email provider
     */
    verifyRequest: "/auth/verify-request",
    /**
     * This page is redirected too after a user signs in for the first time
     * @todo
     */
    // newUser: "/new-user",
  },
};
