import { getServerAuthSession } from "@/auth/auth";
import { redirect } from "next/navigation";

export default function Page() {
  const session = getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  redirect("/todos");
}
