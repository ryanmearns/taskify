import { getServerAuthSession } from "@/auth/utils";
import { Flex, Separator, buttonVariants, cn } from "@playbook/ui";
import { Inbox, Shapes } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="h-screen">
      <div className="container relative h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <Flex gap={"xs"} align={"center"}>
            <Shapes className="h-6 w-6" />
            <span className="font-semibold text-lg">OpenDo</span>
          </Flex>
        </div>
        <div className="lg:p-8 h-full">
          <div className="mx-auto flex h-full flex-col justify-center space-y-6 w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <Inbox className="h-10 w-10 mx-auto stroke-1 stroke-foreground" />
              <h1 className="text-2xl font-semibold tracking-tight">
                Check your email
              </h1>
              <p className="text-sm text-muted-foreground">
                A sign in link has been sent to your email address.
              </p>
            </div>
            <Separator className="bg-gradient-to-r from-white via-slate-500 to-white" />
            <p className="text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
