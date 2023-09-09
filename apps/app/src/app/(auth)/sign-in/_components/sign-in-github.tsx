"use client";

import { Button, ButtonIcon } from "@playbook/ui";
import { Github } from "lucide-react";
import { signIn } from "next-auth/react";

export const SignInGithub = () => {
  return (
    <Button onClick={() => signIn("github")}>
      <ButtonIcon Icon={<Github />} orientation={"leading"} />
      Sign in with Github
    </Button>
  );
};
