"use client";

import { Input, Button } from "@playbook/ui";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  f,
  zodResolver,
} from "@playbook/forms";
import z from "zod";
import { useRouter } from "next/navigation";
import { api } from "../_api/client-side";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
});

export const CreateMessageForm = () => {
  const router = useRouter();

  const createMessage = api.messages.create.useMutation({
    onSuccess: () => router.refresh(),
  });

  const form = f.useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMessage.mutate({ message: values.message });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Enter message" {...field} />
              </FormControl>
              <FormDescription>This message will be sent</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
