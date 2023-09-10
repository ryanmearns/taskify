"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  f,
  zodResolver,
} from "@playbook/forms";
import { Button, Input } from "@playbook/ui";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  code: z.string(),
});

export function SignInForm() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const form = f.useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  function onSubmit(arg: z.infer<typeof formSchema>) {
    startTransition(async () => {
      await signIn("email", { email: arg.email });

      router.push("/verify-request");
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={"md"}>
          {!isPending ? (
            "Send email"
          ) : (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Sending email
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
