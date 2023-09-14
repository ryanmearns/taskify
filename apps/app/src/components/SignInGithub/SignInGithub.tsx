"use client";

import { Button } from "@playbook/ui";
import { signIn } from "next-auth/react";

export const SignInGithub = () => (
  <Button type="submit" size={"md"} block onClick={() => signIn("github")}>
    Sign in with Github
  </Button>
);
