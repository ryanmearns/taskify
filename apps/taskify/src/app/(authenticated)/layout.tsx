import { getServerAuthSession } from "@/auth/utils";
import * as React from "react";
import { AuthProvider } from "./auth-provider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return <AuthProvider session={session}>{children}</AuthProvider>;
}
