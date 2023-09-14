import { getServerAuthSession } from "@/auth/utils";
import { SignInForm } from "@/components/SignInForm/SignInForm";
import { Flex, Separator } from "@playbook/ui";
import { Shapes } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/todos");
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
        <div className="p-8 h-full">
          <div className="mx-auto h-full flex flex-col justify-center space-y-6 w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign-in or create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign-in into account or enter your email to
                create an account.
              </p>
            </div>
            <SignInForm />
            <Separator className="bg-gradient-to-r from-white via-slate-500 to-white" />
            <p className="px-8 text-center text-sm text-muted-foreground">
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
