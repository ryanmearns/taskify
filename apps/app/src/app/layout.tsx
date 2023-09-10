import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerAuthSession } from "../auth/auth";
import SessionProvider from "./(auth)/auth-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpenDo",
  description: "An open-source todo app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
