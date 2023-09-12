import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import SessionProvider from "./(auth)/auth-provider";
import "./globals.css";
import { getServerAuthSession } from "@/auth/utils";

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

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
      <body className={ibm.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
