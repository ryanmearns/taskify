import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { db } from "../server/db";
import { env } from "../utils/env";
import { resend } from "../server/email";
import { VerificationEmailTemplate } from "@playbook/emails";

export const authOptions: NextAuthOptions = {
  secret: env.NEXTAUTH_SECRET,
  adapter: DrizzleAdapter(db),
  session: { strategy: "database" },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
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
  },
};

export const getServerAuthSession = () => {
  return getServerSession(authOptions);
};
