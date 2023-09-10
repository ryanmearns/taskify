"use client";

import {
  Form,
  FormButton,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  f,
  zodResolver,
} from "@playbook/forms";
import { Input } from "@playbook/ui";
import { signIn } from "next-auth/react";
import * as React from "react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  code: z.string(),
});

export function SignInForm() {
  const [isPending, startTransition] = React.useTransition();

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
        <FormButton
          isPending={isPending}
          block
          defaultText="Send email"
          pendingText="Sending email"
        />
      </form>
    </Form>
  );
}
