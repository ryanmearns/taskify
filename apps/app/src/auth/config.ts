import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { VerificationEmailTemplate } from "@playbook/emails";
import {
  DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { db } from "../server/db";
import { resend } from "../server/email";
import { env } from "../utils/env";

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
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
  callbacks: {},
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
