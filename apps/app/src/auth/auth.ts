import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { db } from "../server/db";
import { env } from "../utils/env";
import { resend } from "../server/email";
import { VerificationEmailTemplate } from "@playbook/emails";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  session: { strategy: "database" },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  providers: [
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

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
